'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Palette, Users, Lightbulb, BookMarked } from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Curriculum.module.css';

const curriculums = [
  {
    title: "Tech & Digital Skills",
    icon: Code2,
    modules: [
      {
        name: "Fullstack Web Development",
        topics: ["HTML, CSS & JavaScript", "React & Modern UI", "Node.js & Express APIs", "Database Design (MongoDB)"]
      },
      {
        name: "Cloud Computing & DevOps",
        topics: ["Cloud Fundamentals", "Docker & Containers", "CI/CD Pipelines", "Deployment Strategies"]
      }
    ]
  },
  {
    title: "Creative & Media Skills",
    icon: Palette,
    modules: [
      {
        name: "Digital Arts & Design",
        topics: ["UI/UX Principles", "Figma Prototyping", "Brand Identity", "Visual Storytelling"]
      },
      {
        name: "Video Production",
        topics: ["Scripting & Storyboarding", "Cinematography Basics", "Video Editing (Premiere/DaVinci)", "Audio Mixing"]
      }
    ]
  },
  {
    title: "Leadership & Soft Skills",
    icon: Users,
    modules: [
      {
        name: "Biblical Leadership",
        topics: ["Servant Leadership", "Ethics & Integrity", "Finding Purpose", "Mentorship"]
      },
      {
        name: "Communication Mastery",
        topics: ["Public Speaking", "Effective Collaboration", "Conflict Resolution", "Emotional Intelligence"]
      }
    ]
  },
  {
    title: "Innovation & Entrepreneurship",
    icon: Lightbulb,
    modules: [
      {
        name: "Startup Fundamentals",
        topics: ["Ideation to MVP", "Business Models", "Pitching & Fundraising", "Market Research"]
      },
      {
        name: "Digital Marketing",
        topics: ["SEO & Content Strategy", "Social Media Campaigns", "Analytics & Growth", "Community Building"]
      }
    ]
  }
];

const CurriculumPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.heroBadge}
        >
          <BookMarked size={16} /> Curriculum Overview
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className={styles.title}>
            Detailed <span className={styles.highlight}>Curriculum</span>
          </h1>
          <p className={styles.subtitle}>
            Dive deep into the structured learning paths designed for each program. 
            Our curriculums are carefully curated to ensure you build both practical 
            capabilities and strong conceptual understanding.
          </p>
          
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/bootcamp/login" className={styles.btnPrimary}>
              Access Student Dashboard
            </Link>
            <Link href="/bootcamp#register" className={styles.btnOutline}>
              Enroll & Register
            </Link>
          </motion.div>
        </motion.div>
      </header>

      <Section id="curriculums">
        <div className={styles.curriculumList}>
          {curriculums.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <GlassCard className={styles.courseBlock}>
                <div className={styles.courseHeader}>
                  <div className={styles.iconWrapper}>
                    <course.icon size={26} />
                  </div>
                  <h2 className={styles.courseTitle}>{course.title}</h2>
                </div>
                
                <div className={styles.modulesGrid}>
                  {course.modules.map((mod, midx) => (
                    <div key={midx} className={styles.moduleItem}>
                      <h3 className={styles.moduleTitle}>{mod.name}</h3>
                      <ul className={styles.moduleList}>
                        {mod.topics.map((topic, tidx) => (
                          <li key={tidx}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="curriculum-cta" className={styles.ctaSection}>
        <motion.div 
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.ctaTitle}>Ready to start your learning journey?</h2>
          <p className={styles.ctaSubtitle}>
            Gain access to interactive lessons, track your progress, submit assignments, and get 24/7 AI tutoring through our student dashboard.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/bootcamp/login" className={styles.btnPrimary}>
              Access Student Dashboard
            </Link>
            <Link href="/bootcamp#register" className={styles.btnOutline}>
              Register for Next Cohort
            </Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default CurriculumPage;
