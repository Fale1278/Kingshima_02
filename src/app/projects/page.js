'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import Section from '@/components/Section';
import styles from './Projects.module.css';

const ProjectCard = ({ project, delay }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay, duration: 0.4 }}
    className={styles.projectCard}
  >
    <div className={styles.imageWrapper}>
      <img src={project.image} alt={project.title} className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <div className={styles.category}>{project.category}</div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectSummary}>{project.summary}</p>
          <div className={styles.tags}>
            {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>
        </div>
      </div>
      <Link href="/bootcamp" className={styles.viewCaseStudy}>
        Explore Track <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      title: "AgriSense Delta",
      category: "AgriTech",
      image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80",
      summary: "AI crop disease diagnostic & telemetry system built for smallholder farmers across northern and central Nigeria.",
      tags: ["Computer Vision", "React", "Python"],
    },
    {
      title: "MediRoute Logistics",
      category: "HealthTech",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
      summary: "Cold-chain pharmaceutical delivery tracker ensuring rural clinics receive verified, temperature-regulated medicines.",
      tags: ["TypeScript", "Next.js", "PostgreSQL"],
    },
    {
      title: "EdenFaith Audio",
      category: "Faith & Media",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
      summary: "Multilingual Biblical audio stream, spiritual mentoring channel, and indigenous worship repository.",
      tags: ["Audio DSP", "React Native", "Cloudflare"],
    },
    {
      title: "CivicBridge Portal",
      category: "Civic & EdTech",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
      summary: "Youth civic engagement and verifiable vocational micro-certification system for underserved youth.",
      tags: ["Node.js", "Docker", "Tailored API"],
    },
    {
      title: "EduLift Micro-Class",
      category: "Civic & EdTech",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      summary: "Offline-first progressive learning interface delivering STEM curriculum to low-connectivity classrooms.",
      tags: ["PWA", "IndexedDB", "ServiceWorkers"],
    },
    {
      title: "ArtisanGrid",
      category: "Community",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
      summary: "Trust-anchored directory connecting vetted young technicians and artisans with verified local contracts.",
      tags: ["React", "Express", "GeoJSON"],
    },
  ];

  const categories = ['All', 'AgriTech', 'HealthTech', 'Faith & Media', 'Civic & EdTech', 'Community'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Fellowship <span className={styles.highlight}>Showcase</span></h1>
        <p className={styles.subtitle}>
          Real software, media platforms, and digital solutions conceived, built, and launched by Kingshima Foundation fellows across Nigeria.
        </p>
      </header>

      <nav className={styles.filterBar}>
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <Section id="projects-grid">
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 0.1} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section id="cta" className={styles.ctaSection}>
        <div className={`${styles.ctaBox} glass`}>
          <h2>Partner with Our Student Founders</h2>
          <p>Provide internship placements, sponsor capstone grants, or mentor our upcoming cohort fellows.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Partner with Kingshima →
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default ProjectsPage;
