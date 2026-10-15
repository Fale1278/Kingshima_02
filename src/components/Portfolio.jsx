'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from './TiltCard';
import styles from './Portfolio.module.css';

const tracks = [
  {
    id: 'track-software',
    code: 'Track 01',
    title: 'Full-Stack Software Engineering',
    category: 'Engineering & Architecture',
    tagline: 'From foundational TypeScript to production-grade distributed architectures.',
    description:
      'Master modern full-stack web applications, REST & GraphQL APIs, Supabase/Postgres real-time engines, and Next.js 16 server-driven architectures built for high scalability.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
    tags: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    duration: '16 WEEKS',
    commitment: '12 hrs / week',
    level: 'Comprehensive',
    capstone: 'Deploy a multi-tenant SaaS application with real-time auth, payments, and CI/CD.',
    syllabus: [
      'Foundations of Modern JavaScript & TypeScript Typing',
      'React 19 Server Components & Next.js 16 App Router',
      'Relational Database Modeling with Supabase / PostgreSQL',
      'API Security, Auth Workflows & Production Deployment',
    ],
  },
  {
    id: 'track-ai',
    code: 'Track 02',
    title: 'AI, Machine Learning & Agentic Systems',
    category: 'Intelligent Systems',
    tagline: 'Practical neural network training, LLM orchestration, and intelligent automation.',
    description:
      'Move beyond simple prompt wrappers. Understand tensor mathematics, fine-tuning PyTorch models, building autonomous multi-agent systems, and ethical AI deployment.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80',
    tags: ['Python 3.12', 'PyTorch', 'LangChain', 'Vector DBs', 'FastAPI'],
    duration: '14 WEEKS',
    commitment: '14 hrs / week',
    level: 'Advanced',
    capstone: 'Build an autonomous multi-agent research and reasoning copilot with custom RAG.',
    syllabus: [
      'Python for Data Science & PyTorch Tensor Fundamentals',
      'Neural Architectures & Transformer Attention Mechanics',
      'Retrieval-Augmented Generation (RAG) & Vector Embeddings',
      'Building Autonomous Tool-Calling Agents & Governance',
    ],
  },
  {
    id: 'track-creative',
    code: 'Track 03',
    title: 'UI/UX Design Systems & Creative Direction',
    category: 'Visual Design & Motion',
    tagline: 'Crafting world-class design languages, 3D interaction, and visual storytelling.',
    description:
      'Bridge engineering and aesthetics. Build scalable tokenized design systems in Figma, master interactive motion typography, 3D WebGL scenes, and brand identity engineering.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80',
    tags: ['Figma Tokens', 'Three.js / WebGL', 'Motion & CSS', 'Brand Design'],
    duration: '12 WEEKS',
    commitment: '10 hrs / week',
    level: 'All Levels',
    capstone: 'Produce an end-to-end award-grade brand design system with an interactive 3D site.',
    syllabus: [
      'Design Tokens, Atomic Typography & Grid Math',
      'Human-Centered UX Research & Wireframe Prototyping',
      'Micro-Interactions, Spatial Motion & Three.js 3D',
      'Brand Narrative Engineering & Client Presentation',
    ],
  },
  {
    id: 'track-leadership',
    code: 'Track 04',
    title: 'Servant Leadership & Tech Strategy',
    category: 'Leadership & Kingdom Ethics',
    tagline: 'Empowering future CTOs, founders, and community champions with purpose.',
    description:
      'Technical capability without ethical grounding falters under pressure. Develop strategic product thinking, executive communication, Biblical stewardship, and team leadership.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
    tags: ['Kingdom Ethics', 'Product Strategy', 'Servant Leadership', 'Public Speaking'],
    duration: '10 WEEKS',
    commitment: '8 hrs / week',
    level: 'Foundational',
    capstone: 'Deliver a comprehensive venture pitch and community impact charter.',
    syllabus: [
      'Biblical Principles of Leadership and High Integrity',
      'Strategic Product Vision & Market Problem Solving',
      'Executive Presence, Storytelling & Pitch Mastery',
      'Cultivating High-Trust Engineering Cultures',
    ],
  },
];

const Portfolio = () => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [activeModalTrack, setActiveModalTrack] = useState(null);

  return (
    <section id="training" className={styles.section}>
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.sectionHead}>
          <div className={styles.headLeft}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} />
              <span className={styles.kickerText}>Curriculum & Training Disciplines</span>
            </div>
            <h2 className={styles.heading}>
              What we<br />
              <em>train.</em>
            </h2>
          </div>
          <div className={styles.headRight}>
            <p className={styles.headDesc}>
              Industry-calibrated curriculum tracks engineered to take aspiring builders
              from fundamental mental models to production-grade architecture and Godly leadership.
            </p>
            <div className={styles.headActions}>
              <Link href="/bootcamp" className={styles.applyBtn}>
                Apply to Next Cohort →
              </Link>
              <Link href="/programs" className={styles.viewAll}>
                Explore Full Syllabus
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Track Grid */}
        <div className={styles.grid}>
          {tracks.map((track) => {
            const isSelected = selectedTrack.id === track.id;
            return (
              <TiltCard
                key={track.id}
                className={styles.cardTilt}
                maxTilt={6}
                scale={1.012}
              >
                <article
                  className={`${styles.card} ${isSelected ? styles.cardActive : ''}`}
                  onClick={() => setSelectedTrack(track)}
                >
                  {/* Card Corner Tech Marks */}
                  <div className={styles.cornerTL} />
                  <div className={styles.cornerBR} />

                  {/* Top Badge Row */}
                  <div className={styles.cardTopBadge}>
                    <div className={styles.codeGroup}>
                      <span className={styles.trackCode}>{track.code}</span>
                      <span className={styles.categoryBadge}>{track.category}</span>
                    </div>
                    <span className={styles.durationBadge}>{track.duration}</span>
                  </div>

                  {/* Visual Image Header */}
                  <div className={styles.imageBox}>
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                    <div className={styles.imageFade} />
                    <div className={styles.commitmentTag}>
                      <span>⏱ {track.commitment}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{track.title}</h3>
                    <p className={styles.cardTagline}>{track.tagline}</p>
                    <p className={styles.cardDesc}>{track.description}</p>

                    {/* Capstone Deliverable Callout */}
                    <div className={styles.capstoneBox}>
                      <span className={styles.capstoneLabel}>Capstone Project:</span>
                      <p className={styles.capstoneText}>{track.capstone}</p>
                    </div>

                    {/* Tech & Skills Tags */}
                    <div className={styles.tags}>
                      {track.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          <span className={styles.tagPip} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Syllabus Trigger */}
                    <div className={styles.cardFooter}>
                      <button
                        type="button"
                        className={styles.syllabusBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalTrack(track);
                        }}
                      >
                        <span>Inspect Syllabus Modules</span>
                        <span>❯</span>
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>

        {/* Syllabus Inspector Modal */}
        {activeModalTrack && (
          <div className={styles.modalBackdrop} onClick={() => setActiveModalTrack(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.modalTrackCode}>{activeModalTrack.code}</span>
                  <h3 className={styles.modalTitle}>{activeModalTrack.title}</h3>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={() => setActiveModalTrack(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <p className={styles.modalDesc}>{activeModalTrack.description}</p>

                <h4 className={styles.syllabusHeading}>Core Curriculum Modules (Weeks 1 – {activeModalTrack.duration.split(' ')[0]})</h4>
                <div className={styles.moduleList}>
                  {activeModalTrack.syllabus.map((mod, idx) => (
                    <div key={idx} className={styles.moduleItem}>
                      <span className={styles.moduleNumber}>0{idx + 1}</span>
                      <span className={styles.moduleTitle}>{mod}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.modalCapstone}>
                  <strong>Final Cohort Capstone:</strong>
                  <p>{activeModalTrack.capstone}</p>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <Link href="/bootcamp" className={styles.modalEnrollBtn}>
                  Enroll in {activeModalTrack.title} →
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
