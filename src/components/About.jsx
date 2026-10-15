'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TiltCard from './TiltCard';
import styles from './About.module.css';

const storyTabs = [
  {
    id: 'mandate',
    label: 'The Mandate',
    title: 'Bridging high-level code with transcendent purpose.',
    body: 'Kingshima was born out of a profound conviction: technical fluency without moral grounding creates fragile architects. We intentionally fuse world-class engineering standards with unshakeable Kingdom values, ensuring the next generation builds with purpose, reverence, and enduring excellence.',
    highlight: '500+ lives transformed across 4 flagship technical cohorts.',
  },
  {
    id: 'pedagogy',
    label: 'Our Pedagogy',
    title: 'Immersion over lecture. Systems over syntax.',
    body: 'We reject passive tutorial loops. Every student operates within live production simulators, deploying distributed cloud systems, training neural pipelines, and engineering design tokens under the direct supervision of veteran engineering leaders.',
    highlight: '100% project-based capstone evaluation model.',
  },
  {
    id: 'covenant',
    label: 'The Covenant',
    title: 'Character as our non-negotiable operating system.',
    body: 'Competence earns attention; character earns trust. We instill radical integrity, servant leadership, and collaborative empathy into every module. When a Kingshima graduate enters an engineering team, they bring light, clarity, and unyielding dependability.',
    highlight: 'Lifetime alumni fellowship & peer mentorship circles.',
  },
];

const pillars = [
  {
    icon: '✦',
    badge: 'Pillar 01',
    label: 'Faith-Grounded Foundation',
    text: 'Every architectural decision is anchored in purpose, humility, and Biblical integrity. We build software that serves humanity.',
  },
  {
    icon: '◈',
    badge: 'Pillar 02',
    label: 'Production-Grade Rigor',
    text: 'Equipping youth with actual production workflows — TypeScript, Next.js, PyTorch, CI/CD, and scalable cloud architectures.',
  },
  {
    icon: '◎',
    badge: 'Pillar 03',
    label: 'Generational Mentorship',
    text: 'A self-sustaining ecosystem where seasoned faculty and former graduates pour back into incoming cohorts.',
  },
];

const stats = [
  { num: '500+', label: 'Youth Empowered', note: 'Active cohorts & alumni' },
  { num: '15+', label: 'Faculty & Mentors', note: 'Global industry leaders' },
  { num: '2025', label: 'Inception Year', note: 'Faith + Tech Movement' },
  { num: '94%', label: 'Placement & Impact', note: 'Building active products' },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('mandate');
  const currentTab = storyTabs.find((t) => t.id === activeTab) || storyTabs[0];

  return (
    <section id="about" className={styles.about}>
      {/* Background radial accent */}
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.container}>
        {/* Left Column: Editorial & Story Arc */}
        <div className={styles.textCol}>
          <div className={styles.kicker}>
            <span className={styles.kickerLine} />
            <span className={styles.kickerTag}>About the Foundation</span>
          </div>

          <h2 className={styles.heading}>
            Defying the<br />
            <em>ordinary.</em>
          </h2>

          <p className={styles.leadParagraph}>
            Kingshima was never conceived in a corporate boardroom — it emerged from a relentless
            passion to prove that <strong>deep faith and cutting-edge digital craftsmanship</strong>{' '}
            are not in opposition, but are powerful catalysts for one another.
          </p>

          {/* Interactive Story Tabs */}
          <div className={styles.tabContainer}>
            <div className={styles.tabHeader} role="tablist">
              {storyTabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={styles.tabPip} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.tabPanel}>
              <h3 className={styles.tabTitle}>{currentTab.title}</h3>
              <p className={styles.tabBody}>{currentTab.body}</p>
              <div className={styles.tabHighlightRow}>
                <span className={styles.highlightBadge}>KEY OUTCOME</span>
                <span className={styles.highlightText}>{currentTab.highlight}</span>
              </div>
            </div>
          </div>

          {/* Core Ethos Pillars */}
          <div className={styles.pillarsGrid}>
            {pillars.map((p) => (
              <div key={p.label} className={styles.pillarCard}>
                <div className={styles.pillarTop}>
                  <span className={styles.pillarIcon}>{p.icon}</span>
                  <span className={styles.pillarBadge}>{p.badge}</span>
                </div>
                <h4 className={styles.pillarLabel}>{p.label}</h4>
                <p className={styles.pillarText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Founder Profile & Live Impact Overview */}
        <aside className={styles.sidebarCol}>
          {/* Tactile Impact Metrics Card */}
          <TiltCard maxTilt={5} scale={1.01} className={styles.statsTilt}>
            <div className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <div className={styles.statsHeaderLeft}>
                  <span className={styles.livePulse} />
                  <span className={styles.statsHeaderTitle}>Foundation Impact Overview</span>
                </div>
                <span className={styles.statsRegistry}>Lagos &bull; Abuja</span>
              </div>

              <div className={styles.statsGrid}>
                {stats.map((item, idx) => (
                  <div key={idx} className={styles.statCell}>
                    <span className={styles.statNum}>{item.num}</span>
                    <span className={styles.statLabel}>{item.label}</span>
                    <span className={styles.statNote}>{item.note}</span>
                  </div>
                ))}
              </div>

              <div className={styles.statsFooter}>
                <span className={styles.footerSeal}>✦ Faith + Tech Movement</span>
                <Link href="/programs" className={styles.viewProgramsLink}>
                  <span>Explore Programs</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </TiltCard>

          {/* Founder & Vision Covenant Card */}
          <div className={styles.founderCard}>
            <div className={styles.founderQuoteGlyph}>“</div>
            <p className={styles.founderQuote}>
              To raise a generation of Godly youths who are technically empowered, purpose-driven,
              and who — through authentic innovation — become transformative leaders in their communities.
            </p>
            <div className={styles.founderMeta}>
              <div className={styles.founderAvatarBox}>
                <span className={styles.founderAvatarInitial}>F</span>
                <div className={styles.founderGoldBorder} />
              </div>
              <div>
                <h4 className={styles.founderName}>Fale King Nanmua</h4>
                <p className={styles.founderRole}>Visionary Founder & CEO</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
