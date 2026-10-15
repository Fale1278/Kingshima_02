'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Palette, 
  Users2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Services.module.css';

const ServiceDetail = ({ icon: Icon, title, description, features, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.serviceCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}><Icon size={24} /></div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <ul className={styles.featureList}>
        {features.map((f, i) => (
          <li key={i}><Zap size={14} className={styles.zap} /> {f}</li>
        ))}
      </ul>
      <Link href={link || '/bootcamp'} className={styles.learnMore}>
        <span>Explore Program Details</span> <ArrowRight size={16} />
      </Link>
    </GlassCard>
  </motion.div>
);

const ServicesPage = () => {
  const serviceList = [
    {
      icon: Code2,
      title: "Technical Bootcamps & Code Labs",
      description: "Hands-on, immersive cohorts in modern full-stack web engineering, API design, and cloud deployments.",
      features: ["Next.js 16 & React 19 Architecture", "Relational Database Modeling (PostgreSQL)", "Production Cloud & Containerization"],
      link: "/bootcamp",
    },
    {
      icon: Cpu,
      title: "Applied AI & Intelligent Systems",
      description: "Practical deep learning, fine-tuning neural models, and building autonomous agentic tools with ethical oversight.",
      features: ["Python 3.12 & PyTorch Pipelines", "Retrieval-Augmented Generation (RAG)", "Ethical AI Governance & Safeguards"],
      link: "/bootcamp",
    },
    {
      icon: Palette,
      title: "Creative Arts & Design Studio",
      description: "Master tokenized Figma systems, interactive 3D WebGL motion, and digital cinematography to tell impactful stories.",
      features: ["Tokenized Figma Design Systems", "Interactive Motion & 3D WebGL", "Brand Identity & Visual Storytelling"],
      link: "/programs",
    },
    {
      icon: Users2,
      title: "Youth Leadership & Mentorship Fellowship",
      description: "Cultivating purpose-driven young leaders grounded in Biblical character, servant leadership, and clear communication.",
      features: ["1-on-1 Executive Mentorship Circles", "Public Speaking & Venture Pitching", "Lifetime Alumni Guild Fellowship"],
      link: "/community",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem'
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} /> Foundation Initiatives & Programs
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.pageTitle}
        >
          Equipping Through <span className={styles.highlight}>Excellence</span>
        </motion.h1>
        <p className={styles.heroSubtitle}>
          From production engineering cohorts to creative direction studios, our programs bridge world-class digital capability with Biblical purpose.
        </p>
      </header>

      <Section id="detailed-services">
        <div className={styles.grid}>
          {serviceList.map((service, i) => (
            <ServiceDetail key={i} {...service} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="methodology" className={styles.methodology}>
        <div className={styles.methContent}>
          <h2 className={styles.methTitle}>The Kingshima Pedagogy</h2>
          <div className={styles.methGrid}>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><ShieldCheck /></div>
              <h4>Character-First Foundation</h4>
              <p>We believe engineering capability without moral grounding creates fragile leaders. Integrity is our operating system.</p>
            </div>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><HeartHandshake /></div>
              <h4>Direct Mentorship</h4>
              <p>Every cohort student is guided by seasoned industry leaders dedicated to their technical and spiritual growth.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="cta" className={styles.ctaSection}>
        <div className={`${styles.ctaBox} glass`}>
          <h2>Ready to Begin Your Journey?</h2>
          <p>Whether applying to an upcoming cohort, partnering as an organization, or serving as a mentor — our doors are open.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/bootcamp" className={styles.ctaBtn} style={{ background: 'var(--accent-primary)', color: '#fff' }}>
              Apply to Bootcamp
            </Link>
            <Link href="/contact" className={styles.ctaBtn} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              Partner With Us
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ServicesPage;
