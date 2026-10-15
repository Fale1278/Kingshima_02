'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroTechConsole from './HeroTechConsole';
import styles from './Hero.module.css';

// Floating particles that drift slowly
function FloatingParticles({ count = 18 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.35 + 0.05,
      }))
    );
  }, [count]);

  return (
    <div className={styles.particleField} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Ambient background elements */}
      <div className={styles.ambientOrb1} aria-hidden />
      <div className={styles.ambientOrb2} aria-hidden />
      <div className={styles.gridPattern} aria-hidden />
      {mounted && <FloatingParticles />}

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: Editorial & Vision */}
          <div className={styles.leftCol}>
            {/* Live Telemetry Eyebrow */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span className={styles.eyebrowText}>Faith-Driven Technology Education</span>
              <span className={styles.eyebrowYear}>Est. 2025</span>
            </div>

            {/* Main headline */}
            <h1 className={styles.title}>
              <span className={styles.titleLine1}>Where Faith</span>
              <span className={styles.titleLine2}>
                meets <em className={styles.accent}>Tech</em>
              </span>
              <span className={styles.titleLine3}>Innovation.</span>
            </h1>

            {/* Descriptive paragraph */}
            <p className={styles.description}>
              The Kingshima Foundation equips the next generation with technical skills,
              creative tools, and Godly values — building leaders who are both digitally
              fluent and spiritually grounded.
            </p>

            {/* CTA row */}
            <div className={styles.ctas}>
              <Link href="/explore" className={styles.ctaPrimary}>
                <span>Explore Our Mission</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/bootcamp" className={styles.ctaSecondary}>
                <span>Apply to Bootcamp</span>
                <span className={styles.cohortTag}>Cohort 2025</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>500+</span>
                <span className={styles.trustLabel}>Youth reached</span>
              </div>
              <div className={styles.trustDivider} aria-hidden />
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>15</span>
                <span className={styles.trustLabel}>Expert mentors</span>
              </div>
              <div className={styles.trustDivider} aria-hidden />
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>5</span>
                <span className={styles.trustLabel}>Tech disciplines</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Console */}
          <div className={styles.rightCol}>
            <HeroTechConsole />
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
