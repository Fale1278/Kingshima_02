'use client';

import React, { useState } from 'react';
import TiltCard from './TiltCard';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 'david',
    name: 'David Adeleke',
    role: 'Senior Software Engineer',
    org: 'Global FinTech Infrastructure',
    track: 'Full-Stack Architecture Track',
    cohort: 'Cohort 2025',
    headline: 'From syntax confusion to deploying scalable distributed microservices.',
    text: "The mentorship at Kingshima was a profound turning point in my trajectory. I didn't just learn modern Next.js and Postgres — I learned how to think like a systems architect and lead with Kingdom humility. The combination of high engineering rigor and spiritual intentionality is completely unmatched.",
    deliverable: 'Shipped Multi-Tenant SaaS with 10k monthly active requests',
    avatarLetter: 'D',
    accent: 'var(--accent-primary)',
  },
  {
    id: 'sarah',
    name: 'Sarah Oladipo',
    role: 'Lead UI/UX Systems Designer',
    org: 'Digital Venture Studio',
    track: 'Creative Arts & Design Systems',
    cohort: 'Cohort 2025',
    headline: 'Crafting tokenized design systems that international engineering teams love.',
    text: "Before Kingshima, design felt like subjective decoration. The instructors taught me how to engineer tokenized Figma systems that seamlessly bind with production React components. My portfolio capstone earned me a design lead offer within weeks of graduation.",
    deliverable: 'Engineered 40-Component Design Language with Dark/Light Tokens',
    avatarLetter: 'S',
    accent: '#38bdf8',
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    role: 'Technical Founder & CEO',
    org: 'Community Partner & Recruiter',
    track: 'Industry Partner Perspective',
    cohort: 'Partner Network',
    headline: 'Kingshima graduates possess what 95% of candidates lack: character and rigor.',
    text: "We hired two Kingshima alumni for our backend engineering team. Their ability to handle complex concurrency and database indexing was exceptional, but even more striking was their servant mindset and radical accountability under tight deadlines.",
    deliverable: 'Zero-downtime database migration & real-time webhook engine',
    avatarLetter: 'M',
    accent: '#3ecf8e',
  },
  {
    id: 'grace',
    name: 'Grace Nwosu',
    role: 'AI & Data Analyst',
    org: 'Healthcare Innovation Lab',
    track: 'AI & Agentic Systems',
    cohort: 'Cohort 2025',
    headline: 'I had zero technical background. Today, I build autonomous reasoning agents.',
    text: "Kingshima eliminated all the intimidating gatekeeping around artificial intelligence. They broke down PyTorch tensors, transformer architecture, and vector databases into crystal-clear mental models. More than code, they gave me unshakable confidence in my calling.",
    deliverable: 'Built Automated Clinical Triage RAG Assistant with PyTorch',
    avatarLetter: 'G',
    accent: '#d4a96a',
  },
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = testimonials[activeIdx];

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            <span className={styles.kickerText}>Voices of the Movement</span>
          </div>
          <h2 className={styles.heading}>
            Stories of<br />
            <em>transformation.</em>
          </h2>
          <p className={styles.subheading}>
            Real experiences from graduates, founders, and community partners whose lives,
            careers, and spiritual outlook were reshaped through the Kingshima mandate.
          </p>
        </header>

        {/* Main Testimonial Stage */}
        <div className={styles.stageGrid}>
          
          {/* Left: Interactive Quote Showcase */}
          <div className={styles.quoteCol}>
            <TiltCard maxTilt={5} scale={1.01} className={styles.quoteTilt}>
              <div className={styles.quoteCard} key={current.id}>
                {/* Top Info Bar */}
                <div className={styles.cardTop}>
                  <div className={styles.trackInfo}>
                    <span className={styles.trackName}>{current.track}</span>
                    <span className={styles.cohortTag}>{current.cohort}</span>
                  </div>
                  <div className={styles.verifiedBadge}>
                    <span className={styles.badgePip} />
                    <span>Verified Alumni</span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className={styles.quoteHeadline}>
                  &ldquo;{current.headline}&rdquo;
                </h3>

                {/* Body Text */}
                <p className={styles.quoteBody}>
                  {current.text}
                </p>

                {/* Deliverable Callout */}
                <div className={styles.deliverableRow}>
                  <span className={styles.deliverableLabel}>Demonstrated Outcome:</span>
                  <span className={styles.deliverableText}>{current.deliverable}</span>
                </div>

                {/* Author Credentials */}
                <div className={styles.authorRow}>
                  <div
                    className={styles.avatar}
                    style={{ background: `${current.accent}18`, borderColor: current.accent }}
                  >
                    <span style={{ color: current.accent }}>{current.avatarLetter}</span>
                  </div>
                  <div>
                    <h4 className={styles.authorName}>{current.name}</h4>
                    <p className={styles.authorRole}>{current.role} &mdash; <span className={styles.authorOrg}>{current.org}</span></p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Student Navigation Selector Deck */}
          <div className={styles.selectorDeck}>
            <span className={styles.deckLabel}>Select an Alumni Profile:</span>
            {testimonials.map((item, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={item.id}
                  className={`${styles.selectorCard} ${isSelected ? styles.selectorActive : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  style={{ '--student-accent': item.accent }}
                >
                  <div className={styles.selectorLeft}>
                    <div
                      className={styles.selectorAvatar}
                      style={{
                        background: isSelected ? item.accent : 'var(--surface-inner)',
                        color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      }}
                    >
                      {item.avatarLetter}
                    </div>
                    <div className={styles.selectorMeta}>
                      <h4 className={styles.selectorName}>{item.name}</h4>
                      <p className={styles.selectorTrack}>{item.role}</p>
                    </div>
                  </div>
                  <span className={styles.selectorArrow}>❯</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
