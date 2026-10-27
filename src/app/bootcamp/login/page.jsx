'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';

export default function BootcampLoginPage() {
  const router = useRouter();
  const { login } = useBootcampAuth();
  const toast = useToast();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [redirectPath, setRedirectPath] = useState('');
  const [form, setForm] = useState({ email: '', username: '', login_code: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [registeredCode, setRegisteredCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mode');
      const redir = params.get('redirect');
      if (m === 'register' || m === 'login') {
        setMode(m);
      }
      if (redir) {
        setRedirectPath(redir);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleToggleMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setRegisteredCode('');
    setRegisteredStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const { email, username, login_code } = form;

    if (mode === 'login') {
      if ((!email && !username) || !login_code) {
        setError('Please enter your email or username along with your login code.');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, login_code }),
        });
        const data = await res.json();

        if (!res.ok || !data.student) {
          setError(data.error || 'Invalid credentials. Please verify your email/username and login code.');
          return;
        }

        login(data.student, data.token);
        toast.success(`Welcome back, ${data.student.username}!`);
        
        const target = redirectPath || '/bootcamp/dashboard';
        router.push(target);
      } catch (err) {
        console.error(err);
        setError('Something went wrong during login. Please try again.');
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Registration Mode
      if (!email || !username) {
        setError('Please fill in both your email address and preferred username.');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username }),
        });
        const data = await res.json();

        if (!res.ok || !data.student) {
          setError(data.error || 'Registration failed. A student with this email or username may already exist.');
          return;
        }

        setRegisteredCode(data.login_code);
        setRegisteredStudent(data.student);
        setSuccessMsg('Registration successful! You are now enrolled in the Kingshima Web Development Bootcamp.');
        
        // Auto-login locally so the session is active immediately
        login(data.student, data.token);

        toast.success(`Welcome, ${data.student.username}! Your account has been created.`);
        setForm((prev) => ({ ...prev, login_code: data.login_code }));
      } catch (err) {
        console.error(err);
        setError('Failed to register. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEnterWorkspace = (targetUrl) => {
    router.push(targetUrl);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✧</span>
          <span className={styles.logoText}>Kingshima</span>
        </Link>

        {/* Login / Register Toggle Tabs */}
        {!registeredCode && (
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => handleToggleMode('login')}
            >
              Log In
            </button>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => handleToggleMode('register')}
            >
              Register
            </button>
          </div>
        )}

        <div className={styles.header}>
          <h1 className={styles.title}>
            {registeredCode 
              ? 'Enrolled Successfully! 🎉' 
              : mode === 'login' 
              ? 'Student Login' 
              : 'Web Development Bootcamp Registration'
            }
          </h1>
          <p className={styles.subtitle}>
            {registeredCode 
              ? 'Your student account is active. Your AI Studio workspace and curriculum are now unlocked!'
              : mode === 'login'
              ? 'Sign in to access your student dashboard and interactive AI Studio.'
              : 'Register for free to unlock the Kingshima AI Studio and start mastering Web Development step-by-step.'
            }
          </p>
        </div>

        {registeredCode ? (
          <div className={styles.form}>
            <div className={styles.codeReveal}>
              <span className={styles.label}>Your Unique Login Code</span>
              <span className={styles.codeVal}>{registeredCode}</span>
            </div>
            <p className={styles.hint} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              💡 <strong>Save this code!</strong> You can use it anytime to log back into your Kingshima account.
            </p>

            <button
              type="button"
              onClick={() => handleEnterWorkspace(redirectPath || '/studio')}
              className={styles.submitBtn}
              style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', marginBottom: '8px' }}
            >
              🚀 Launch Web Dev AI Studio →
            </button>

            <button
              type="button"
              onClick={() => handleEnterWorkspace('/bootcamp/dashboard')}
              className={styles.submitBtn}
              style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)' }}
            >
              Go to Bootcamp Dashboard →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="choose_a_username"
                value={form.username}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {mode === 'login' && (
              <div className={styles.field}>
                <label htmlFor="login_code" className={styles.label}>Login Code</label>
                <input
                  id="login_code"
                  name="login_code"
                  type="text"
                  placeholder="e.g. A8X9K2L1"
                  value={form.login_code}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                />
                <span className={styles.hint}>
                  Enter the 8-character code you received when registering.
                </span>
              </div>
            )}

            {error && (
              <div className={styles.errorBox} role="alert">
                <span>⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              id="bootcamp-login-submit"
            >
              {loading ? (
                <span className={styles.spinner} aria-hidden="true" />
              ) : mode === 'login' ? (
                redirectPath === '/studio' ? 'Log In & Open AI Studio →' : 'Access Dashboard →'
              ) : (
                'Register & Unlock AI Studio →'
              )}
            </button>
          </form>
        )}

        {!registeredCode && (
          <p className={styles.footer}>
            {mode === 'login' ? (
              <>
                Not enrolled in Bootcamp yet?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('register')}
                  className={styles.footerLink}
                >
                  Register here (Free)
                </button>
              </>
            ) : (
              <>
                Already registered as a student?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('login')}
                  className={styles.footerLink}
                >
                  Log in with your code
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
