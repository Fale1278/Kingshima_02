'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COURSES } from '@/data/coursesData';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { WHAT_YOU_LEARN, FAQ_ITEMS } from '@/data/bootcampData';
import styles from './page.module.css';

export default function BootcampPage() {
  const { student } = useBootcampAuth();
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className={styles.page}>
      
      {/* ── HERO ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>✦ Kingshima Learning Platform</span>
          <h1 className={styles.heroTitle}>
            Master Skills.<br />
            <span className={styles.heroAccent}>Build Faster.</span><br />
            Work Smarter.
          </h1>
          <p className={styles.heroSubtitle}>
            Access our student dashboard, select courses to learn, complete payments, see curriculums in detail, and track your progress in real-time.
          </p>
          <div className={styles.heroActions}>
            {student ? (
              <Link href="/bootcamp/dashboard" className={styles.btnPrimary}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/bootcamp/login?mode=register" className={styles.btnPrimary}>
                  Get Started / Register →
                </Link>
                <Link href="/bootcamp/login?mode=login" className={styles.btnOutline}>
                  Student Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── COURSES CATALOG ──────────────────────── */}
      <section className={styles.section} id="courses">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Courses Catalog</span>
            <h2 className={styles.sectionTitle}>Explore Our Learning Tracks</h2>
            <p className={styles.sectionDesc}>
              Click on any course card below to view its full week-by-week curriculum, objectives, and assignments.
            </p>
          </div>

          <div className={styles.courseCardGrid}>
            {COURSES.map((course) => (
              <div 
                key={course.id} 
                className={styles.courseCard} 
                onClick={() => handleOpenModal(course)}
              >
                <div 
                  className={styles.courseCardImage} 
                  style={{ backgroundImage: `url(${course.imageUrl})` }}
                >
                  <span className={styles.courseCategoryBadge}>{course.category}</span>
                </div>
                <div className={styles.courseCardContent}>
                  <h3 className={styles.courseCardTitle}>{course.title}</h3>
                  <p className={styles.courseCardDesc}>{course.description}</p>
                </div>
                <div className={styles.courseCardFooter}>
                  <span>Duration: <strong>{course.duration}</strong></span>
                  <span className={styles.coursePrice}>${course.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY KINGSHIMA ────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Methodology</span>
            <h2 className={styles.sectionTitle}>Built for Practical Mastery</h2>
            <p className={styles.sectionDesc}>
              Our courses combine video instruction, real projects, and progress tracking systems.
            </p>
          </div>
          <div className={styles.learnGrid}>
            {WHAT_YOU_LEARN.map((item) => (
              <div key={item.title} className={styles.learnCard}>
                <span className={styles.learnIcon}>{item.icon}</span>
                <h3 className={styles.learnTitle}>{item.title}</h3>
                <p className={styles.learnDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────── */}
      <section className={styles.footerCta}>
        <div className={styles.container}>
          <p className={styles.footerCtaText}>
            Questions? Reach us at{' '}
            <a href="mailto:kingshima001@gmail.com" className={styles.footerCtaLink}>
              kingshima001@gmail.com
            </a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {student ? (
              <Link href="/bootcamp/dashboard" className={styles.btnPrimary}>
                Student Dashboard
              </Link>
            ) : (
              <>
                <Link href="/bootcamp/login?mode=register" className={styles.btnPrimary} style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                  Register
                </Link>
                <Link href="/bootcamp/login?mode=login" className={styles.btnOutline} style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                  Student Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM POPUP MODAL ───────────────── */}
      {selectedCourse && (
        <div className={styles.modalOverlay} onClick={handleCloseModal} aria-modal="true" role="dialog">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <header className={styles.modalHeader}>
              <button className={styles.modalCloseBtn} onClick={handleCloseModal} aria-label="Close modal">×</button>
              <span className={styles.pill}>{selectedCourse.category}</span>
              <h2 className={styles.title} style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                {selectedCourse.title}
              </h2>
              <div className={styles.modalMeta}>
                <span>Instructor: <strong>{selectedCourse.instructor}</strong></span>
                <span>Duration: <strong>{selectedCourse.duration}</strong></span>
                <span className={styles.coursePrice}>Price: ${selectedCourse.price}</span>
              </div>
            </header>

            <main className={styles.modalBody}>
              <h3 className={styles.modalSectionTitle}>Course Syllabus</h3>
              
              {selectedCourse.curriculum.map((week) => (
                <div key={week.week} className={styles.modalWeekBlock}>
                  <div className={styles.modalWeekHeader}>
                    <div>
                      <span className={styles.modalWeekTitle}>Week {week.week}: {week.title}</span>
                      <p className={styles.modalWeekTheme}>{week.theme}</p>
                    </div>
                    <span 
                      className={styles.modalWeekBadge}
                      style={{ background: `${week.color}22`, color: week.color, border: `1px solid ${week.color}44` }}
                    >
                      Module {week.week}
                    </span>
                  </div>

                  <div className={styles.modalLessons}>
                    {week.lessons.map((lesson) => (
                      <div key={lesson.id} className={styles.modalLessonItem}>
                        <span className={styles.modalLessonTitle}>{lesson.title} ({lesson.duration})</span>
                        <p className={styles.modalLessonDesc}>{lesson.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.modalAssignment}>
                    <strong>📋 Week Assignment:</strong> {week.assignment}
                  </div>
                </div>
              ))}
            </main>

            <footer className={styles.modalFooter}>
              {student ? (
                <Link href="/bootcamp/dashboard" className={styles.btnPrimary} onClick={handleCloseModal}>
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link 
                    href={`/bootcamp/login?mode=register&courseId=${selectedCourse.id}`} 
                    className={styles.btnPrimary}
                    onClick={handleCloseModal}
                  >
                    Enroll & Register Now →
                  </Link>
                  <button 
                    onClick={() => {
                      handleCloseModal();
                      router.push(`/bootcamp/login?mode=login`);
                    }}
                    className={styles.btnOutline}
                  >
                    Log In
                  </button>
                </>
              )}
            </footer>

          </div>
        </div>
      )}

    </div>
  );
}
