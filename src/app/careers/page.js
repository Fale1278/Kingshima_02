'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Coffee, 
  BookOpen, 
  Heart 
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Careers.module.css';

const JobCard = ({ title, department, location, type, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <GlassCard className={styles.jobCard}>
      <div className={styles.jobMain}>
        <h3 className={styles.jobTitle}>{title}</h3>
        <div className={styles.jobMeta}>
          <span className={styles.metaItem}><MapPin size={14} /> {location}</span>
          <span className={styles.metaItem}><Clock size={14} /> {type}</span>
          <span className={styles.department}>{department}</span>
        </div>
      </div>
      <Link href="/contact" className={styles.applyBtn}>
        Apply Now <ArrowRight size={16} />
      </Link>
    </GlassCard>
  </motion.div>
);

const CareersPage = () => {
  const jobs = [
    { title: "Full-Stack Curriculum Instructor", department: "Academics", location: "Lagos / Hybrid", type: "Full-time" },
    { title: "Student Mentorship & Spiritual Life Lead", department: "Student Affairs", location: "Abuja / On-site", type: "Full-time" },
    { title: "UI/UX & Creative Media Mentor", department: "Creative Studio", location: "Remote / Nigeria", type: "Part-time" },
    { title: "Community & Fellowship Coordinator", department: "Operations", location: "Lagos / Hybrid", type: "Full-time" },
  ];

  const perks = [
    { icon: Heart, title: "Purpose-Driven Impact", desc: "Equip young African builders with skills and character that transform families and cities." },
    { icon: BookOpen, title: "Continuous Learning", desc: "Generous allowance for books, certifications, and technical tooling to keep your craft sharp." },
    { icon: Coffee, title: "Collaborative Fellowship", desc: "Work alongside humble, high-caliber educators in a spiritually uplifting team atmosphere." },
    { icon: Sparkles, title: "Holistic Well-being", desc: "Flexible hybrid schedules, health coverage, and team fellowship retreats." },
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
          <Briefcase size={16} /> Foundation Careers & Faculty
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.title}
        >
          Build Work That <span className={styles.highlight}>Lasts</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          Join a dedicated team of educators, mentors, and technologists equipping the next generation of African builders with world-class engineering and Godly values.
        </motion.p>
      </header>

      <Section id="perks" className={styles.perksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Life at Kingshima</h2>
        </div>
        <div className={styles.perksGrid}>
          {perks.map((perk, i) => (
            <div key={i} className={styles.perkItem}>
              <div className={styles.perkIcon}><perk.icon size={24} /></div>
              <h4>{perk.title}</h4>
              <p>{perk.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="open-positions">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <p className={styles.sectionSubtitle}>Join our faculty in Lagos, Abuja, or through our distributed remote team.</p>
        </div>
        <div className={styles.jobsList}>
          {jobs.map((job, i) => (
            <JobCard key={i} {...job} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="culture" className={styles.cultureSection}>
        <div className={`${styles.cultureBox} glass`}>
          <h2>Don't see an exact fit?</h2>
          <p>We are always eager to connect with seasoned mentors, guest lecturers, and Kingdom partners.</p>
          <Link href="/contact" className={styles.generalApplyBtn}>
            Send an Open Inquiry →
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default CareersPage;
