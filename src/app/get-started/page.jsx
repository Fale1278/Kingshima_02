'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { backendClient } from '@/lib/backendClient';
import styles from './page.module.css';

export default function GetStartedPage() {
  const router = useRouter();
  const [mode, setMode] = useState('register'); // 'login' | 'register'
  
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle OAuth / Demo Login
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError('');
      // Route directly to onboarding questionnaire for Node backend
      router.push('/onboarding');
    } catch (err) {
      console.error(err);
      setError('OAuth authentication failed.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { email, password, name } = form;

    try {
      if (mode === 'register') {
        if (!email || !password || !name) {
          throw new Error('Please fill out all fields.');
        }
        
        const username = name.trim().toLowerCase().replace(/\s+/g, '_');
        const data = await backendClient.register({
          email: email.trim(),
          username,
          password,
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('bootcamp_student', JSON.stringify(data.student));
          if (data.token) localStorage.setItem('bootcamp_token', data.token);
        }
        
        router.push('/onboarding');
        
      } else {
        if (!email || !password) {
          throw new Error('Please enter your email and password.');
        }

        const username = email.trim().split('@')[0];
        const data = await backendClient.login({
          email: email.trim(),
          username,
          password,
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('bootcamp_student', JSON.stringify(data.student));
          if (data.token) localStorage.setItem('bootcamp_token', data.token);
        }
        
        router.push('/bootcamp/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      
      {/* ── Left Branding Panel ── */}
      <div className={styles.brandingPanel}>
        <div className={styles.brandingBg} />
        
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✧</span>
          <span>Kingshima</span>
        </Link>
        
        <div className={styles.brandingContent}>
          <h1 className={styles.brandingTitle}>
            Your Journey to <span className={styles.brandingHighlight}>Mastery</span> Begins Here.
          </h1>
          <p className={styles.brandingDesc}>
            Join thousands of learners, leaders, and creators. Get access to personalized learning tracks, expert mentorship, and a thriving community.
          </p>
        </div>
        
        <div className={styles.testimonialBox}>
          <p className={styles.testimonialText}>
            "Kingshima completely changed the way I approach digital problem-solving. The personalized dashboard and curriculum are unmatched."
          </p>
          <span className={styles.testimonialAuthor}>— Sarah J., Fullstack Engineer</span>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          
          <Link href="/" className={styles.mobileLogo}>
            <span className={styles.logoIcon}>✧</span>
            <span>Kingshima</span>
          </Link>
          
          <div className={styles.header}>
            <h2 className={styles.title}>
              {mode === 'register' ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className={styles.subtitle}>
              {mode === 'register' 
                ? 'Sign up to start your personalized onboarding.' 
                : 'Log in to access your dashboard and courses.'}
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => { setMode('register'); setError(''); }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
            >
              Log In
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === 'register' && (
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}
            
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className={styles.input}
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {error && (
              <div className={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : (mode === 'register' ? 'Continue with Email →' : 'Log In →')}
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <button type="button" onClick={handleGoogleAuth} className={styles.oauthBtn} disabled={loading}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Continue with Google
          </button>

          <p className={styles.footerText}>
            By continuing, you agree to Kingshima's Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
}
