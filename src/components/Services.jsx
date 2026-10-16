'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TiltCard from './TiltCard';
import styles from './Services.module.css';

const pillars = [
  {
    id: '01',
    title: 'Faith & Godly Values',
    short: 'Character before code.',
    description:
      'We weave Biblical principles and moral integrity into every technical track. Character, ethics, and service define every Kingshima graduate, ensuring our builders lead with humility and enduring light.',
    focusArea: 'Spiritual & Ethical Foundations',
    trackName: 'Core Character Curriculum',
    tags: ['Biblical Principles', 'Moral Compass', 'Servant Leadership', 'Ethical Innovation'],
    accent: 'var(--accent-primary)',
    deliverable: 'Personal Ethics & Servant Leadership Portfolio',
    highlights: [
      { label: 'Guiding Ethos', value: 'Integrity & Stewardship' },
      { label: 'Practical Focus', value: 'Ethical Tech Governance' },
      { label: 'Community Mandate', value: '120+ Service Hours' },
    ],
  },
  {
    id: '02',
    title: 'Technology & Innovation',
    short: 'Real skills. Production rigor.',
    description:
      'From full-stack web architectures to machine learning pipelines, our training tracks mirror modern industry production standards. Students graduate with deployed, high-impact applications, not just certificates.',
    focusArea: 'Modern Software & Applied AI',
    trackName: 'Production Engineering Track',
    tags: ['Next.js 16', 'Python & PyTorch', 'PostgreSQL & Cloud', 'DevOps & CI/CD'],
    accent: '#4f9cf9',
    deliverable: 'Live Production SaaS Deployment',
    highlights: [
      { label: 'Learning Model', value: 'Hands-on Production Sprints' },
      { label: 'Core Stack', value: 'Next.js, Python, SQLite/Postgres' },
      { label: 'Evaluation', value: 'Working Live Capstone' },
    ],
  },
  {
    id: '03',
    title: 'Youth Empowerment',
    short: 'Unlocking potential by design.',
    description:
      'We intentionally rebuild how young people perceive their God-given potential. Through rigorous mentorship, critical thinking exercises, and executive pitch training, we build decisive leadership capacity.',
    focusArea: 'Human Agency & Executive Presence',
    trackName: 'Leadership & Founder Track',
    tags: ['Critical Thinking', 'Self-Worth', 'Executive Presence', 'Public Speaking'],
    accent: '#d4a96a',
    deliverable: 'Leadership Capstone & Venture Pitch',
    highlights: [
      { label: 'Mentorship', value: 'Dedicated 1-on-1 Guidance' },
      { label: 'Communication', value: 'Pitch Deck & Speech Labs' },
      { label: 'Growth Model', value: 'Continuous Career Coaching' },
    ],
  },
  {
    id: '04',
    title: 'Creativity & Expression',
    short: 'Crafting beauty with purpose.',
    description:
      'Design systems, visual storytelling, cinematography, and interactive media. We champion creative mastery as the bridge between raw technical capability and profound human resonance.',
    focusArea: 'Design Systems & Digital Media',
    trackName: 'Creative Direction Studio',
    tags: ['Figma Design Systems', 'Spatial Motion', 'Cinematography', 'Brand Narrative'],
    accent: '#9b6dff',
    deliverable: 'Comprehensive Brand Design System',
    highlights: [
      { label: 'Design Tokens', value: 'Production Design Systems' },
      { label: 'Storytelling', value: 'Cinematic Visual Media' },
      { label: 'Studio Critique', value: 'Bi-Weekly Faculty Reviews' },
    ],
  },
  {
    id: '05',
    title: 'Community & Collaboration',
    short: 'You won’t build alone.',
    description:
      'Our worldwide alumni fellowship, peer hackathons, and high-trust mentorship circles ensure no builder works in isolation. Kingshima is a lifelong brotherhood and sisterhood of purpose-driven innovators.',
    focusArea: 'Lifelong Fellowship & Guilds',
    trackName: 'Global Alumni Ecosystem',
    tags: ['Global Alumni', 'Peer Hackathons', 'Mentor Circles', 'Guild Collaboration'],
    accent: '#3ecf8e',
    deliverable: 'Lifetime Alumni Fellowship & Guild Access',
    highlights: [
      { label: 'Alumni Network', value: '500+ Active Graduates' },
      { label: 'Collaboration', value: 'Quarterly Hackathons' },
      { label: 'Mentorship', value: 'Lagos • Abuja • Global' },
    ],
  },
];

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentPillar = pillars[activeIdx];

  return (
    <section id="pillars" className={styles.section}>
      <div className={styles.ambientGlow} style={{ '--pillar-accent': currentPillar.accent }} aria-hidden />

      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.headerRow}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} />
            <span className={styles.kickerText}>Foundation Ethos & Focus Areas</span>
          </div>
          <h2 className={styles.heading}>
            Our five<br />
            <em>core pillars.</em>
          </h2>
          <p className={styles.subheading}>
            Not an arbitrary checklist of courses — five guiding pillars that unite spiritual conviction,
            engineering rigor, and generational leadership.
          </p>
        </div>

        {/* Interactive Pillar Showcase */}
        <div className={styles.deckGrid}>
          {/* Left Pillar Selector List */}
          <div className={styles.pillarList}>
            {pillars.map((pillar, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={pillar.id}
                  className={`${styles.pillarTab} ${isSelected ? styles.pillarTabActive : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  style={{ '--pillar-color': pillar.accent }}
                >
                  <div className={styles.tabIndicator} />
                  <div className={styles.tabMeta}>
                    <div className={styles.tabTop}>
                      <span className={styles.tabCode}>{pillar.focusArea}</span>
                      <span className={styles.tabNum}>0{idx + 1}</span>
                    </div>
                    <h3 className={styles.tabTitle}>{pillar.title}</h3>
                    <p className={styles.tabShort}>{pillar.short}</p>
                  </div>
                  <span className={styles.tabArrow}>❯</span>
                </button>
              );
            })}
          </div>

          {/* Right: Focused Pillar Detail Card */}
          <div className={styles.blueprintCol}>
            <TiltCard
              className={styles.blueprintTilt}
              maxTilt={6}
              scale={1.012}
              perspective={1100}
            >
              <div
                className={styles.blueprintCard}
                style={{ '--accent-color': currentPillar.accent }}
              >
                {/* Header Bar */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.cardCategory}>{currentPillar.focusArea}</span>
                    <span className={styles.cardDivider}>•</span>
                    <span className={styles.cardTrackName}>{currentPillar.trackName}</span>
                  </div>
                  <div className={styles.cardStatusBadge}>
                    <span className={styles.statusDot} />
                    <span>Pillar {currentPillar.id} of 05</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className={styles.cardBody}>
                  <div className={styles.titleBlock}>
                    <h3 className={styles.cardTitle}>{currentPillar.title}</h3>
                  </div>

                  <p className={styles.cardDesc}>{currentPillar.description}</p>

                  {/* Program Highlights Grid */}
                  <div className={styles.specsGrid}>
                    {currentPillar.highlights.map((item, i) => (
                      <div key={i} className={styles.specItem}>
                        <span className={styles.specLabel}>{item.label}</span>
                        <span className={styles.specValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Deliverable Callout */}
                  <div className={styles.deliverableRow}>
                    <span className={styles.deliverableLabel}>Primary Cohort Deliverable:</span>
                    <span className={styles.deliverableValue}>{currentPillar.deliverable}</span>
                  </div>

                  {/* Tags */}
                  <div className={styles.tagsRow}>
                    {currentPillar.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        <span className={styles.tagDot} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className={styles.cardFooter}>
                  <span className={styles.footerNote}>
                    Integrated across all Kingshima cohorts & mentorship tracks.
                  </span>

                  <Link href="/programs" className={styles.exploreLink}>
                    <span>Explore Full Programs</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
