'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Rocket,
  Target,
  Heart,
  GraduationCap,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Services.module.css';

const ProgramCategory = ({ title, description, skills, icon: Icon, delay }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <GlassCard className={styles.serviceCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <Icon size={22} />
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.skillTags}>
          {skills.map((skill, i) => (
            <span key={i} className={styles.skillTag}>
              <Zap size={10} /> {skill}
            </span>
          ))}
        </div>
        <button className={styles.learnMore} onClick={() => router.push('/curriculum')}>
          View Curriculum <ArrowRight size={14} />
        </button>
      </GlassCard>
    </motion.div>
  );
};

const MethodItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className={styles.methItem}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className={styles.methIcon}><Icon size={22} /></div>
    <h4>{title}</h4>
    <p>{description}</p>
  </motion.div>
);

const ProgramsClient = () => {
  const categories = [
    {
      title: "Tech & Digital Skills",
      description: "Master the tools of the modern age. From software development to cloud infrastructure and AI-driven solutions.",
      skills: ["Fullstack Development", "Cloud Computing", "AI & Data Science"],
      icon: Code2
    },
    {
      title: "Creative & Media Skills",
      description: "Harness the power of digital storytelling, cinematography, and futuristic design to shape culture.",
      skills: ["Digital Arts", "Video Production", "Brand Identity"],
      icon: Palette
    },
    {
      title: "Leadership & Soft Skills",
      description: "Leadership rooted in faith. Developing character, emotional intelligence, and purpose-driven communication.",
      skills: ["Public Speaking", "Biblical Leadership", "Social Ethics"],
      icon: Users
    },
    {
      title: "Innovation & Entrepreneurship",
      description: "Building sustainable solutions and Kingdom-minded enterprises engineered for global impact.",
      skills: ["Startup Fundamentals", "Digital Marketing", "Social Innovation"],
      icon: Lightbulb
    }
  ];

  const methodology = [
    {
      icon: BookOpen,
      title: "Holistic Learning",
      description: "We combine technical rigor with spiritual depth to create well-rounded, purpose-driven innovators."
    },
    {
      icon: Rocket,
      title: "Direct Mentorship",
      description: "Every student is paired with an industry leader who guides their journey from concept to execution."
    },
    {
      icon: Target,
      title: "Project-Based Training",
      description: "Real-world briefs and live builds ensure you graduate with a portfolio, not just a certificate."
    },
    {
      icon: Heart,
      title: "Community First",
      description: "A covenant community of builders, creators, and leaders who sharpen one another through collaboration."
    }
  ];

  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.heroBadge}
        >
          <GraduationCap size={16} /> Training Programs
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.pageTitle}
        >
          Training the <span className={styles.highlight}>Future</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.heroSubtitle}
        >
          Building world-class skills for a digital world — anchored in spiritual purpose and relentless excellence.
        </motion.p>
      </header>

      <Section id="categories">
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <ProgramCategory key={i} {...cat} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="impact" className={styles.methodology}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.methContent}
        >
          <div className={styles.methHeader}>
            <h2 className={styles.methTitle}>The <span className={styles.highlight}>Kingshima</span> Way</h2>
            <p className={styles.methSubtitle}>
              Our pedagogy goes beyond skills. We build people who can transform industries.
            </p>
          </div>
          <div className={styles.methGrid}>
            {methodology.map((item, i) => (
              <MethodItem key={i} {...item} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </Section>

      <Section id="enroll" className={styles.ctaSection}>
        <div className={`${styles.ctaBox} glass`}>
          <Globe size={48} className={styles.ctaIcon} />
          <h2>Ready to Begin Your Journey?</h2>
          <p>Join a generation of purpose-driven technologists and creatives building a better world.</p>
          <button className={styles.ctaBtn} onClick={() => router.push('/contact')}>
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </Section>
    </div>
  );
};

export default ProgramsClient;
