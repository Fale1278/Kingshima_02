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
  const [form, setForm] = useState({ email: '', username: '', login_code: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [registeredCode, setRegisteredCode] = useState('');
  const [registeredId, setRegisteredId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mode');
      if (m === 'register' || m === 'login') {
        setMode(m);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const { email, username, login_code } = form;

    if (mode === 'login') {
      if (!email || !username || !login_code) {
        setError('Please fill in all fields.');
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

        if (!res.ok) {
          setError(data.error || 'Invalid credentials. Please check your email, username, and login code.');
          return;
        }

        login(data.student);
        toast.success(`Welcome back, ${data.student.username}!`);
        router.push('/bootcamp/dashboard');
      } catch (err) {
        console.error(err);
        setError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Registration Mode
      if (!email || !username) {
        setError('Please fill in both email and username.');
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

        if (!res.ok) {
          setError(data.error || 'Something went wrong. Please try again.');
          return;
        }

        setRegisteredCode(data.login_code);
        setRegisteredId(data.student.id);
        setSuccessMsg('Registration successful! Save the code below to log in later.');
        
        // Auto update the login form's login_code so they can log in easily
        setForm((prev) => ({ ...prev, login_code: data.login_code }));
      } catch (err) {
        console.error(err);
        setError('Failed to register. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAutoLogin = () => {
    if (!registeredCode) return;
    const student = {
      id: registeredId,
      username: form.username.trim().toLowerCase(),
      email: form.email.trim().toLowerCase(),
      login_code: registeredCode,
      progress: [],
      application_paid: false,
    };
    login(student);
    router.push('/bootcamp/dashboard');
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
              ? 'Registration Complete' 
              : mode === 'login' 
              ? 'Student Login' 
              : 'Student Registration'
            }
          </h1>
          <p className={styles.subtitle}>
            {registeredCode 
              ? 'Your account has been created. Save your login code below to log in.'
              : mode === 'login'
              ? 'Enter your credentials to access your student dashboard.'
              : 'Sign up to start taking courses and tracking your progress.'
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
              ⚠️ Make sure to copy this code. It is required to log in to your dashboard in the future.
            </p>
            <p className={styles.hint} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Registration is free. A small one-time acceptance fee unlocks full access to every course — you&apos;ll be prompted for it on your dashboard.
            </p>
            <button
              type="button"
              onClick={handleAutoLogin}
              className={styles.submitBtn}
            >
              Enter Dashboard →
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode('login')}
              className={styles.footerLink}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto' }}
            >
              Back to Login Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email address</label>
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
                placeholder="your_username"
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
                  placeholder="Enter your login code"
                  value={form.login_code}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                />
                <span className={styles.hint}>
                  Your unique login code is provided after registration.
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
                'Access Dashboard →'
              ) : (
                'Register & Get Code →'
              )}
            </button>
          </form>
        )}

        {!registeredCode && (
          <p className={styles.footer}>
            {mode === 'login' ? (
              <>
                Not enrolled yet?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('register')}
                  className={styles.footerLink}
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('login')}
                  className={styles.footerLink}
                >
                  Log in here
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
