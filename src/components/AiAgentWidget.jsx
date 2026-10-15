'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COURSES } from '@/data/coursesData';
import styles from './AiAgentWidget.module.css';

const FAQS_LIST = [
  {
    q: 'What is the Kingshima Foundation?',
    a: 'The Kingshima Foundation is a faith-driven, youth-focused initiative founded by Fale King Nanmua. We equip young people with technical skills, creative tools, and Godly values across Nigeria and beyond.',
    link: '/about',
    linkText: 'Learn About Our Mission',
  },
  {
    q: 'What tracks are offered in the bootcamp?',
    a: 'We offer 16-week cohorts in Full-Stack Software Engineering (Next.js & Cloud), Applied AI & Machine Learning (Python & PyTorch), UI/UX Design Systems (Figma & 3D), and Servant Leadership.',
    link: '/bootcamp',
    linkText: 'Explore Bootcamp Tracks',
  },
  {
    q: 'Are scholarships or financial aid available?',
    a: 'Yes! We offer 100% need-based scholarships for deserving youth, as well as installment plans for standard fellowships. Sponsors can also fund individual students or pods.',
    link: '/pricing',
    linkText: 'View Tuition & Aid Options',
  },
  {
    q: 'How do I verify a graduate credential?',
    a: 'Every graduate diploma is cataloged in our public academic registry with a verifiable credential ID.',
    link: '/verify-certificate',
    linkText: 'Open Credential Verification Portal',
  },
];

export default function AiAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('assistant'); // assistant | tracks | aid
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  // Keyboard shortcut Ctrl+K / Cmd+K to toggle Assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Process Assistant query
  const handleAssistantSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const text = query.toLowerCase();

    // 1. Bootcamp & Course questions
    if (text.includes('bootcamp') || text.includes('course') || text.includes('curriculum') || text.includes('track') || text.includes('learn')) {
      const matchedCourse = COURSES.find(c => 
        text.includes(c.title.toLowerCase()) || 
        text.includes(c.id.toLowerCase()) || 
        text.includes(c.category.toLowerCase())
      );

      if (matchedCourse) {
        setResponse({
          title: `Learning Track: ${matchedCourse.title}`,
          content: `${matchedCourse.title} (${matchedCourse.duration}) — ${matchedCourse.description}`,
          courseLink: `/bootcamp?course=${matchedCourse.id}`,
          meta: `Instructor: ${matchedCourse.instructor} | Discipline: ${matchedCourse.category}`,
          suggestedPills: ['Apply to Bootcamp', 'Tuition & Scholarships', 'Other Tracks'],
        });
      } else {
        setResponse({
          title: 'Kingshima Learning Platform & Disciplines',
          content: 'Kingshima offers structured engineering cohorts in Full-Stack Web Development, Python & Machine Learning, UI/UX Design Systems, and Servant Leadership.',
          courseLink: '/bootcamp',
          suggestedPills: ['Full-Stack Web', 'Python & AI', 'UI/UX Design', 'Tuition & Aid'],
        });
      }
      return;
    }

    // 2. Scholarships & Tuition
    if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('scholarship') || text.includes('aid') || text.includes('sponsor')) {
      setResponse({
        title: 'Tuition, Scholarships & Aid',
        content: 'We provide 100% need-based scholarships for qualified applicants from underserved communities, flexible cohort installments, and donor-sponsored fellowships.',
        courseLink: '/pricing',
        suggestedPills: ['Apply for Aid', 'Cohort Fellowship ($150)', 'Sponsor a Student'],
      });
      return;
    }

    // 3. Founder, Mission & Location
    if (text.includes('founder') || text.includes('who') || text.includes('fale') || text.includes('mission') || text.includes('faith') || text.includes('location') || text.includes('where')) {
      setResponse({
        title: 'The Kingshima Foundation Mission',
        content: 'Founded by Fale King Nanmua, Kingshima is a faith-driven movement equipping young people with technical competence, creative tools, and Godly values. Based in Lagos and Abuja, Nigeria, with an active global online fellowship.',
        courseLink: '/about',
        suggestedPills: ['About Founder', 'Core Pillars', 'Our Faculty'],
      });
      return;
    }

    // General fallback
    setResponse({
      title: 'Admissions & Inquiries Concierge',
      content: `Here are details regarding "${query}". You can explore curriculum tracks, apply for the upcoming cohort, or contact our admissions team.`,
      courseLink: '/bootcamp',
      suggestedPills: ['Explore Tracks', 'Tuition & Financial Aid', 'Contact Admissions'],
    });
  };

  const handlePillClick = (promptText) => {
    setQuery(promptText);
    const text = promptText.toLowerCase();

    if (text.includes('aid') || text.includes('scholarship')) {
      setResponse({
        title: 'Need-Based Scholarships',
        content: 'Every deserving applicant can apply for full tuition aid through our admissions desk. Submit a short statement of intent and our leadership team will review your application within 48 hours.',
        courseLink: '/pricing',
        suggestedPills: ['Apply for Aid', 'Explore Courses'],
      });
      return;
    }

    if (text.includes('web') || text.includes('python') || text.includes('design')) {
      const c = COURSES.find(course => course.title.toLowerCase().includes(text));
      if (c) {
        setResponse({
          title: `Discipline Track: ${c.title}`,
          content: c.description,
          courseLink: '/bootcamp',
          meta: `Duration: ${c.duration} | Syllabus: ${c.curriculum.length} Core Modules`,
          suggestedPills: ['Register for Cohort', 'View Full Syllabus'],
        });
        return;
      }
    }

    handleAssistantSubmit();
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <button 
        className={styles.floatingTrigger}
        onClick={() => setIsOpen(true)}
        aria-label="Open Kingshima Admissions Guide"
        title="Open Admissions & Learning Guide (Ctrl+K / Cmd+K)"
      >
        <span className={styles.aiBadgePulse} />
        <span>Ask Kingshima</span>
      </button>

      {/* ── Assistant Modal Window ── */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <header className={styles.modalHeader}>
              <div className={styles.headerTitleGroup}>
                <div className={styles.headerLogo}>✦</div>
                <div>
                  <h3 className={styles.headerTitle}>Kingshima Concierge</h3>
                  <p className={styles.headerSubtitle}>Admissions · Curriculum Tracks · Tuition & Aid</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close assistant">×</button>
            </header>

            {/* Tabs */}
            <div className={styles.tabsRow}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'assistant' ? styles.tabBtnActive : ''}`}
                onClick={() => { setActiveTab('assistant'); setResponse(null); }}
              >
                Inquiries & Search
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'tracks' ? styles.tabBtnActive : ''}`}
                onClick={() => { setActiveTab('tracks'); setResponse(null); }}
              >
                Cohort Tracks
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'faqs' ? styles.tabBtnActive : ''}`}
                onClick={() => { setActiveTab('faqs'); setResponse(null); }}
              >
                Foundation FAQs
              </button>
            </div>

            {/* Body Content */}
            <main className={styles.modalBody}>
              
              {/* Tab 1: Assistant & Search */}
              {activeTab === 'assistant' && (
                <div>
                  <form onSubmit={handleAssistantSubmit} className={styles.searchBox}>
                    <input 
                      type="text"
                      className={styles.inputField}
                      placeholder="Ask about admissions, tracks, scholarships, or mission..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.submitBtn}>Ask</button>
                  </form>

                  {response ? (
                    <div className={styles.responseBox}>
                      <div className={styles.responseHeader}>✦ Inquiry Response</div>
                      <h4 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{response.title}</h4>
                      <p className={styles.responseText}>{response.content}</p>

                      {response.meta && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary-light)', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
                          {response.meta}
                        </p>
                      )}

                      {response.courseLink && (
                        <Link 
                          href={response.courseLink} 
                          className={styles.submitBtn} 
                          style={{ display: 'inline-block', textDecoration: 'none', marginTop: '0.6rem', fontSize: '0.8rem' }}
                          onClick={() => setIsOpen(false)}
                        >
                          View Details & Apply →
                        </Link>
                      )}

                      {response.suggestedPills && (
                        <div className={styles.quickPills}>
                          {response.suggestedPills.map((pill) => (
                            <button key={pill} className={styles.pillBtn} onClick={() => handlePillClick(pill)}>
                              {pill}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Frequently Asked Questions:
                      </p>
                      <div className={styles.quickPills}>
                        <button className={styles.pillBtn} onClick={() => handlePillClick('What courses are available in the bootcamp?')}>
                          What courses are in the bootcamp?
                        </button>
                        <button className={styles.pillBtn} onClick={() => handlePillClick('How do need-based scholarships work?')}>
                          How do need-based scholarships work?
                        </button>
                        <button className={styles.pillBtn} onClick={() => handlePillClick('Who founded Kingshima Foundation?')}>
                          Who founded Kingshima Foundation?
                        </button>
                        <button className={styles.pillBtn} onClick={() => handlePillClick('How do I apply for the next cohort?')}>
                          How do I apply for next cohort?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Cohort Tracks */}
              {activeTab === 'tracks' && (
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginTop: 0, fontSize: '0.95rem' }}>Select a Discipline Track</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Click any track below to review objectives and enrollment options:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    {COURSES.map((course) => (
                      <div 
                        key={course.id} 
                        className={styles.responseBox}
                        style={{ cursor: 'pointer', margin: 0, padding: '0.75rem' }}
                        onClick={() => {
                          setResponse({
                            title: course.title,
                            content: course.description,
                            courseLink: `/bootcamp`,
                            meta: `Discipline: ${course.category} | Duration: ${course.duration} | Tuition: $${course.price}`,
                          });
                          setActiveTab('assistant');
                        }}
                      >
                        <h4 style={{ color: 'var(--accent-primary)', margin: '0 0 0.35rem 0', fontSize: '0.85rem' }}>{course.title}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{course.category} &bull; {course.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Foundation FAQs */}
              {activeTab === 'faqs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {FAQS_LIST.map((faq, i) => (
                    <div key={i} className={styles.responseBox} style={{ margin: 0, padding: '0.85rem' }}>
                      <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontSize: '0.88rem' }}>{faq.q}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>{faq.a}</p>
                      <Link 
                        href={faq.link} 
                        style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {faq.linkText} →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

            </main>

            {/* Footer */}
            <footer className={styles.modalFooter}>
              <div>
                <span>Press </span>
                <kbd style={{ background: 'var(--surface-inner)', padding: '0.15rem 0.35rem', borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text-primary)' }}>Ctrl + K</kbd>
                <span> to toggle anywhere</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Kingshima Foundation &bull; Lagos &bull; Abuja
              </span>
            </footer>

          </div>
        </div>
      )}
    </>
  );
}
