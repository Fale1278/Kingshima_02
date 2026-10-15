'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

const cols = [
  {
    label: 'Foundation',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Programs', href: '/programs' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Learning',
    links: [
      { name: 'Bootcamp', href: '/bootcamp' },
      { name: 'Curriculum', href: '/curriculum' },
      { name: 'Explore Tracks', href: '/explore' },
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { name: 'Community', href: '/community' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy', href: '/privacy' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top CTA banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <div>
            <h2 className={styles.ctaHeading}>Ready to build<br /><em>something that lasts?</em></h2>
            <p className={styles.ctaSub}>Join the Kingshima community and start your journey today.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/bootcamp" className={styles.ctaPrimary}>Apply to Bootcamp</Link>
            <Link href="/contact" className={styles.ctaSecondary}>Get in Touch</Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* Brand column */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>✦</span>
              <span className={styles.logoName}>Kingshima</span>
            </div>
            <p className={styles.tagline}>
              Faith-driven, youth-focused, tech-forward. Building the next
              generation of digital leaders.
            </p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.social} aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.social} aria-label="Twitter / X">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.social} aria-label="LinkedIn">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.social} aria-label="GitHub">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className={styles.linkCols}>
            {cols.map((col) => (
              <div key={col.label} className={styles.col}>
                <h4 className={styles.colLabel}>{col.label}</h4>
                <ul className={styles.colList}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.colLink}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            &copy; {year} Kingshima Foundation — All Rights Reserved
          </p>
          <p className={styles.madeWith}>
            Crafted with purpose &amp; faith.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
