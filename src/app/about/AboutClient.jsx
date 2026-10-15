'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Lightbulb,
  Compass,
  Users2,
  Globe2,
  ShieldCheck,
  Info
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './About.module.css';

const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.valueCard}>
      <div className={styles.valueIcon}><Icon size={24} /></div>
      <h3 className={styles.valueTitle}>{title}</h3>
      <p className={styles.valueText}>{description}</p>
    </GlassCard>
  </motion.div>
);

export default function AboutClient() {
  const pillars = [
    {
      title: "Faith & Godly Values",
      description: "Guiding every youth with Biblical principles that shape character and purpose.",
      icon: ShieldCheck
    },
    {
      title: "Technology & Innovation",
      description: "Equipping youths with in-demand tech skills for the digital world.",
      icon: Lightbulb
    },
    {
      title: "Youth Empowerment",
      description: "Building confidence, leadership, and self-worth in every young person.",
      icon: Users2
    },
    {
      title: "Creativity & Expression",
      description: "Encouraging self-discovery and creative problem-solving through design, content, and storytelling.",
      icon: Target
    },
    {
      title: "Community & Collaboration",
      description: "Fostering teamwork, mentorship, and shared growth within a supportive environment.",
      icon: Globe2
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.heroBadge}
        >
          <Info size={16} /> About Us
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Who <span className={styles.highlight}>We Are</span></h1>
          <p className={styles.subtitle}>
            We are a growing community of visionaries, learners, and change-makers committed
            to raising a new generation of leaders — young people who are spiritually rooted,
            purpose-driven, and empowered to use innovation to impact lives and shape the
            future.
          </p>
        </motion.div>
      </header>

      <Section id="mission-vision" className={styles.visionSection}>
        <div className={styles.visionGrid}>
          <div className={styles.visionText}>
            <h2 className={styles.sectionTitle}>Mission & Vision</h2>
            <div className={styles.statement}>
              <h3>Our Mission</h3>
              <p>To empower young people with technical skills, creative confidence, and Godly
                values, equipping them to discover purpose, lead with integrity, and drive innovation
                that transforms lives and communities.
                We are committed to creating an environment that supports learning, growth, and
                leadership — helping youths rise spiritually, intellectually, and socially.</p>
            </div>
            <div className={styles.statement} style={{ marginTop: '2rem' }}>
              <h3>Our Vision</h3>
              <p>To raise a generation of Godly youths who are technically empowered, purpose-
                driven, and who — through innovation — become agents of positive change in their
                communities and beyond.
              </p>
            </div>
          </div>
          <div className={styles.visionStat}>
            <div className={`${styles.statBox} glass`}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Lives Transformed</span>
            </div>
          </div>
        </div>
      </Section>

      <Section id="pillars">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Core Pillars</h2>
          <p className={styles.sectionSubtitle}>The foundations upon which we build the future of our community.</p>
        </div>
        <div className={styles.valuesGrid}>
          {pillars.map((p, i) => (
            <ValueCard key={i} {...p} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="management" className={styles.teamVibe}>
        <div className={`${styles.vibeCard} glass`}>
          <h2 className={styles.vibeTitle}>A Message from Leadership</h2>
          <p className={styles.vibeText}>
            "Our commitment is to ensure that no dream is too big and no background is too small. We are here to provide the platform, the tools, and the spiritual guidance to help you reach your full potential in Christ."
          </p>
          <div className={styles.signatureSection}>
            <div className={styles.signature}>
              <span className={styles.sigText}>Management</span>
            </div>
            <p className={styles.sigTitle}>The Kingshima Foundation Board</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
