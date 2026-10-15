'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Zap, Globe, Rocket, Sparkles } from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Explore.module.css';

const MissionPoint = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.missionCard}>
      <div className={styles.iconWrapper}>
        <Icon size={32} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </GlassCard>
  </motion.div>
);

const ExploreClient = () => {
  const router = useRouter();

  const missionPoints = [
    {
      icon: Heart,
      title: "Faith-Driven Leadership",
      description: "We believe in grounding technical skills with deep spiritual values. Our goal is to raise leaders who build with integrity, empathy, and purpose."
    },
    {
      icon: Zap,
      title: "Technical Excellence",
      description: "Empowering the next generation with cutting-edge skills in software, design, and media to solve real-world problems and drive innovation."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We don't just build careers; we build communities. Our youths are equipped to make a lasting difference locally and globally."
    },
    {
      icon: Rocket,
      title: "Innovation mindset",
      description: "Encouraging a culture of curiosity and problem-solving, where young minds are challenged to invent the future."
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
          <Sparkles size={16} /> Our Mission
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className={styles.title}>
            Our <span className={styles.highlight}>Mission</span>
          </h1>
          <p className={styles.subtitle}>
            Discover why we exist and the vision that drives the Kingshima Foundation.
            We are dedicated to fusing technology with faith to create sustainable futures.
          </p>
        </motion.div>
      </header>

      <Section id="mission-points">
        <div className={styles.missionGrid}>
          {missionPoints.map((point, idx) => (
            <MissionPoint key={idx} {...point} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="join-us">
        <motion.div 
          className={`${styles.callToAction} glass`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.ctaTitle}>Ready to Make an Impact?</h2>
          <p className={styles.ctaText}>
            Join a community of forward-thinking youths who are building the future together.
          </p>
          <button className={styles.joinBtn} onClick={() => router.push('/community')}>
            Join The Community
          </button>
        </motion.div>
      </Section>
    </div>
  );
};

export default ExploreClient;
