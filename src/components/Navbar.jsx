'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Bootcamp', path: '/bootcamp' },
  { name: 'AI Studio', path: '/studio' },
  { name: 'Community', path: '/community' },
  { name: 'Blog', path: '/blog' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            <span className={styles.logoName}>Kingshima</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${styles.link} ${pathname === link.path ? styles.linkActive : ''}`}
                >
                  {link.name}
                  {pathname === link.path && <span className={styles.activePip} />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className={styles.actions}>
            {/* Quick Assistant Trigger */}
            <button
              className={styles.assistantShortcut}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
                }
              }}
              title="Open Admissions & Curriculum Assistant (Cmd+K / Ctrl+K)"
              aria-label="Open Admissions Assistant"
            >
              <span className={styles.assistantIcon}>✦</span>
              <span className={styles.assistantKbd}>⌘K</span>
            </button>

            {/* Theme toggle */}
            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* CTA */}
            <Link href="/contact" className={styles.ctaBtn}>
              Get Involved
            </Link>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={toggleMobile}
        aria-hidden
      />
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logo} onClick={toggleMobile}>
            <span className={styles.logoMark}>✦</span>
            <span className={styles.logoName}>Kingshima</span>
          </Link>
          <button className={styles.closeBtn} onClick={toggleMobile} aria-label="Close menu">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className={styles.drawerNav}>
          <Link href="/" className={styles.drawerLink} onClick={toggleMobile}>Home</Link>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.drawerLink} ${pathname === link.path ? styles.drawerLinkActive : ''}`}
              onClick={toggleMobile}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <Link href="/contact" className={styles.drawerCta} onClick={toggleMobile}>
            Get Involved →
          </Link>
          <p className={styles.drawerTagline}>Faith + Tech Innovation</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
