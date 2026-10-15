'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Lock, GraduationCap, LayoutDashboard,
  LogOut, Menu, PlayCircle, BookOpen, Clock, ChevronDown
} from 'lucide-react';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { COURSES, isLessonUnlocked } from '@/data/coursesData';
import { APPLICATION_FEE_NGN, APPLICATION_FEE_KOBO } from '@/data/accessConfig';
import { payApplicationFee } from '@/lib/paystack';
import { useToast } from '@/context/ToastContext';
import QuizModal from '@/components/QuizModal';
import CertificateGenerator from '@/components/CertificateGenerator';
import styles from './page.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function DashboardPage() {
  const { student, login, logout, loading } = useBootcampAuth();
  const toast = useToast();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);

  // Acceptance-fee payment state (single flat fee unlocks everything)
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  useEffect(() => {
    if (!loading && !student) {
      router.replace('/bootcamp/login');
    }
  }, [student, loading, router]);

  useEffect(() => {
    if (student) {
      const saved = localStorage.getItem('active_course_id');
      if (saved && COURSES.some((c) => c.id === saved)) {
        setActiveCourseId(saved);
      }
    }
  }, [student]);

  if (loading || !student) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingSpinner} />
      </div>
    );
  }

  const progress = student.progress || [];

  // Single global gate: one acceptance fee unlocks every course, not just one.
  const isPaidUp = student.application_paid === true;

  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || null;

  const getCourseStats = (course) => {
    if (!course) return { completedCount: 0, total: 0, pct: 0 };
    const allLessonIds = course.curriculum.flatMap((w) => w.lessons.map((l) => l.id));
    const completedList = allLessonIds.filter((id) => progress.includes(id));
    const completedCount = completedList.length;
    const total = allLessonIds.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { completedCount, total, pct };
  };

  const activeStats = activeCourse ? getCourseStats(activeCourse) : { completedCount: 0, total: 0, pct: 0 };

  const currentWeek = activeCourse && isPaidUp
    ? activeCourse.curriculum.find((w) =>
        w.lessons.some((l) => !progress.includes(l.id))
      ) || activeCourse.curriculum[activeCourse.curriculum.length - 1]
    : null;

  // Pay the one-time acceptance fee via Paystack, then verify server-side
  // before unlocking access to every course.
  const handleUnlockAccess = async () => {
    setPayError('');
    setPaying(true);

    try {
      const reference = `kingshima-${student.id || student.username}-${Date.now()}`;

      await payApplicationFee({
        email: student.email,
        amountKobo: APPLICATION_FEE_KOBO,
        reference,
        onClose: () => setPaying(false),
        onSuccess: async (ref) => {
          try {
            const res = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference: ref, studentId: student.id }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
              throw new Error(data.error || 'Verification failed.');
            }

            login({ ...student, application_paid: true });
            toast.success('Payment confirmed — every course is unlocked!');
          } catch (err) {
            console.error(err);
            setPayError(
              `Payment received but we couldn't confirm it automatically. Contact support with reference: ${ref}`
            );
            toast.error("Payment received but couldn't be confirmed automatically — see the note below.");
          } finally {
            setPaying(false);
          }
        },
      });
    } catch (err) {
      console.error(err);
      setPayError(err.message || 'Could not start payment. Please try again.');
      toast.error(err.message || 'Could not start payment. Please try again.');
      setPaying(false);
    }
  };

  const handleSelectCourse = (courseId) => {
    setActiveCourseId(courseId);
    if (courseId) {
      localStorage.setItem('active_course_id', courseId);
    } else {
      localStorage.removeItem('active_course_id');
    }
    setSidebarOpen(false);
  };

  return (
    <div className={styles.shell}>

      {/* ── Sidebar ───────────────────────────── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarLogo}>
            <LayoutDashboard className={styles.logoIcon} />
            <span className={styles.logoText}>Kingshima Hub</span>
          </div>

          <div className={styles.sidebarCourseSelector}>
            <span className={styles.courseSelectLabel}>My Learning Tracks</span>
            <div className={styles.customDropdownContainer}>
              <button 
                className={styles.customDropdownBtn} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={styles.customDropdownText}>
                  {activeCourse ? activeCourse.title : 'Course Catalog'}
                </span>
                <ChevronDown size={16} className={`${styles.dropdownIcon} ${dropdownOpen ? styles.dropdownIconOpen : ''}`} />
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className={styles.customDropdownMenu}
                  >
                    <button 
                      className={`${styles.dropdownItem} ${!activeCourseId ? styles.dropdownItemActive : ''}`}
                      onClick={() => { handleSelectCourse(null); setDropdownOpen(false); }}
                    >
                      <LayoutDashboard size={14} /> Course Catalog
                    </button>
                    {COURSES.map((c) => (
                      <button 
                        key={c.id} 
                        className={`${styles.dropdownItem} ${activeCourseId === c.id ? styles.dropdownItemActive : ''}`}
                        onClick={() => { handleSelectCourse(c.id); setDropdownOpen(false); }}
                      >
                        <BookOpen size={14} /> {c.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {activeCourse && isPaidUp ? (
              <>
                <p className={styles.navLabel}>Course Syllabus</p>
                {activeCourse.curriculum.map((week) => {
                  const weekDone = week.lessons.every((l) => progress.includes(l.id));
                  const weekActive = currentWeek && currentWeek.week === week.week;
                  return (
                    <div
                      key={week.week}
                      className={`${styles.weekNav} ${weekActive ? styles.weekNavActive : ''}`}
                    >
                      <div className={styles.weekNavHeader}>
                        <span
                          className={styles.weekDot}
                          style={{ background: weekDone ? '#34d399' : weekActive ? week.color : 'rgba(255,255,255,0.1)' }}
                        />
                        <span className={styles.weekNavTitle}>Week {week.week}</span>
                      </div>
                      <ul className={styles.lessonNav}>
                        {week.lessons.map((lesson) => {
                          const done = progress.includes(lesson.id);
                          const unlocked = done || isLessonUnlocked(activeCourse, lesson.id, progress);
                          if (!unlocked) {
                            return (
                              <li key={lesson.id}>
                                <span
                                  className={styles.lessonNavLink}
                                  style={{ opacity: 0.45, cursor: 'not-allowed' }}
                                  title="Complete the previous lesson to unlock"
                                >
                                  <Lock className={styles.lessonIcon} size={14} />
                                  {lesson.title}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={`/bootcamp/dashboard/lesson/${lesson.id}`}
                                className={`${styles.lessonNavLink} ${done ? styles.lessonDone : ''}`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                {done ? (
                                  <CheckCircle2 className={styles.lessonIcon} size={14} />
                                ) : (
                                  <PlayCircle className={styles.lessonIcon} size={14} />
                                )}
                                {lesson.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ padding: '0 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Select an unlocked course to view your syllabus outline.
              </div>
            )}
          </nav>

          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main Panel ────────────────────────── */}
      <div className={styles.main}>

        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <div className={styles.topbarRight}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.6rem', borderRadius: 20 }}>
                🔥 {student.streak_days || 1} Day Streak
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#eab308', background: 'rgba(234, 179, 8, 0.15)', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '0.2rem 0.6rem', borderRadius: 20 }}>
                ⭐ {student.xp || 100} XP
              </span>
              {activeStats.pct >= 100 && (
                <button 
                  onClick={() => setShowCert(true)}
                  style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', border: 'none', padding: '0.25rem 0.75rem', borderRadius: 20, cursor: 'pointer' }}
                >
                  📜 Claim Certificate
                </button>
              )}
            </div>

            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {student.username.charAt(0).toUpperCase()}
              </div>
              <span className={styles.topbarName}>{student.username}</span>
            </div>
          </div>
        </header>

        <main className={styles.content}>

          {activeCourseId === null ? (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.section variants={itemVariants} className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                  <h1 className={styles.welcomeTitle}>
                    Welcome back, <span className={styles.accent}>{student.username}</span>
                  </h1>
                  <p className={styles.welcomeDesc}>
                    Your learning hub. {isPaidUp
                      ? 'Pick a track below and continue your progress.'
                      : 'Registration is free — pay a one-time acceptance fee to unlock every track.'}
                  </p>
                </div>
              </motion.section>

              {!isPaidUp && (
                <motion.section variants={itemVariants} className={styles.lockedOverlay} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.lockIcon}><Lock size={28}/></div>
                  <h2 className={styles.lockTitle}>Unlock All Courses — ₦{APPLICATION_FEE_NGN.toLocaleString()}</h2>
                  <p className={styles.lockDesc}>
                    One small, one-time acceptance fee gives you full, lifetime access to every course on the platform — Web Development, Graphic Design, Data Analysis, and AI Automations.
                  </p>
                  {payError && (
                    <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem' }}>{payError}</p>
                  )}
                  <button
                    onClick={handleUnlockAccess}
                    disabled={paying}
                    className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                    style={{ fontSize: '1rem', padding: '0.8rem 2.5rem', marginTop: '1rem' }}
                  >
                    {paying ? 'Processing…' : `Pay ₦${APPLICATION_FEE_NGN.toLocaleString()} & Unlock`}
                  </button>
                </motion.section>
              )}

              <motion.section variants={itemVariants} className={styles.courseSection}>
                <div className={styles.courseCatalogGrid}>
                  {COURSES.map((course) => {
                    const stats = getCourseStats(course);

                    return (
                      <motion.div key={course.id} variants={itemVariants} className={styles.catalogCard}>
                        <div 
                          className={styles.catalogCardImage} 
                          style={{ backgroundImage: `url(${course.imageUrl})` }}
                        >
                          <div className={styles.catalogBadgeContainer}>
                            {isPaidUp ? (
                              <span className={`${styles.badge} ${styles.badgePaid}`}><CheckCircle2 size={12}/> Unlocked</span>
                            ) : (
                              <span className={`${styles.badge} ${styles.badgeUnenrolled}`}><Lock size={12}/> Locked</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.catalogCardContent}>
                          <h3 className={styles.catalogCardTitle}>{course.title}</h3>
                          <p className={styles.catalogCardDesc}>{course.description}</p>
                          {isPaidUp && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                                <span>Progress</span>
                                <span>{stats.pct}%</span>
                              </div>
                              <div className={styles.weekProgressBar}>
                                <div className={styles.weekProgressFill} style={{ width: `${stats.pct}%`, background: 'var(--accent-primary)' }} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={styles.catalogCardFooter}>
                          <span className={styles.catalogPrice}>{course.duration}</span>

                          {isPaidUp ? (
                            <button 
                              onClick={() => handleSelectCourse(course.id)}
                              className={`${styles.catalogActionBtn} ${styles.btnEnter}`}
                            >
                              Syllabus <PlayCircle size={16}/>
                            </button>
                          ) : (
                            <button 
                              onClick={handleUnlockAccess}
                              disabled={paying}
                              className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                            >
                              {paying ? 'Processing…' : 'Unlock Access'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.button 
                variants={itemVariants}
                onClick={() => handleSelectCourse(null)} 
                className={styles.backBtn}
              >
                ← Back to Hub
              </motion.button>

              <motion.section variants={itemVariants} className={styles.welcomeSection} style={{ marginBottom: '1rem' }}>
                <span className={`${styles.badge} ${styles.badgeCategory}`}>
                  {activeCourse.category}
                </span>
                <h1 className={styles.welcomeTitle}>{activeCourse.title}</h1>
                <p className={styles.welcomeDesc}>
                  Learn directly from <strong>{activeCourse.instructor}</strong> • Course duration: <strong>{activeCourse.duration}</strong>
                </p>
              </motion.section>

              {!isPaidUp ? (
                <motion.div variants={itemVariants} className={styles.lockedOverlay}>
                  <div className={styles.lockIcon}><Lock size={32}/></div>
                  <h2 className={styles.lockTitle}>Curriculum Locked</h2>
                  <p className={styles.lockDesc}>
                    Pay the one-time ₦{APPLICATION_FEE_NGN.toLocaleString()} acceptance fee to unlock this course and every other track on the platform.
                  </p>
                  {payError && (
                    <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.5rem' }}>{payError}</p>
                  )}
                  <button 
                    onClick={handleUnlockAccess}
                    disabled={paying}
                    className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                    style={{ fontSize: '1rem', padding: '0.8rem 2.5rem', marginTop: '1rem' }}
                  >
                    {paying ? 'Processing…' : `Unlock All Courses (₦${APPLICATION_FEE_NGN.toLocaleString()})`}
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className={styles.statsRow}>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.success}`}>
                        <CheckCircle2 size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Completed</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.warning}`}>
                        <BookOpen size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.total - activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Remaining</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.info}`}>
                        <GraduationCap size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.pct}%</span>
                      <span className={styles.statCaption}>Success Rate</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.primary}`}>
                        <Clock size={24}/>
                      </div>
                      <span className={styles.statNum} style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{activeCourse.duration}</span>
                      <span className={styles.statCaption}>Duration</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className={styles.progressCard}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Overall Mastery</span>
                      <span className={styles.progressPct}>{activeStats.pct}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${activeStats.pct}%` }}
                      />
                    </div>
                  </motion.div>

                  <motion.section variants={itemVariants} className={styles.courseSection}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.courseTitle}>Course Curriculum</h2>
                    </div>
                    <div className={styles.weekGrid}>
                      {activeCourse.curriculum.map((week) => {
                        const done = week.lessons.filter((l) => progress.includes(l.id)).length;
                        const total = week.lessons.length;
                        const pct = Math.round((done / total) * 100);
                        const isActive = currentWeek && currentWeek.week === week.week;
                        return (
                          <div
                            key={week.week}
                            className={`${styles.weekCard} ${isActive ? styles.weekCardActive : ''}`}
                            style={{ '--week-color': week.color }}
                          >
                            <div className={styles.weekCardTop}>
                              <span className={styles.weekCardBadge} style={{ color: week.color, background: week.color + '18' }}>
                                Week {week.week}
                              </span>
                            </div>
                            <div>
                              <h3 className={styles.weekCardTitle}>{week.title}</h3>
                              <p className={styles.weekCardTheme}>{week.theme}</p>
                            </div>
                            
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>{done}/{total} lessons</span>
                                <span>{pct}%</span>
                              </div>
                              <div className={styles.weekProgressBar}>
                                <div className={styles.weekProgressFill} style={{ width: `${pct}%`, background: week.color }} />
                              </div>
                            </div>

                            <ul className={styles.weekLessonList}>
                              {week.lessons.map((lesson) => {
                                const lessonDone = progress.includes(lesson.id);
                                const lessonUnlocked = lessonDone || isLessonUnlocked(activeCourse, lesson.id, progress);
                                if (!lessonUnlocked) {
                                  return (
                                    <li key={lesson.id}>
                                      <span
                                        className={styles.lessonLink}
                                        style={{ opacity: 0.45, cursor: 'not-allowed' }}
                                        title="Complete the previous lesson to unlock"
                                      >
                                        <Lock className={styles.lessonCheckIcon} />
                                        {lesson.title}
                                      </span>
                                    </li>
                                  );
                                }
                                return (
                                  <li key={lesson.id}>
                                    <Link
                                      href={`/bootcamp/dashboard/lesson/${lesson.id}`}
                                      className={`${styles.lessonLink} ${lessonDone ? styles.lessonLinkDone : ''}`}
                                    >
                                      {lessonDone ? <CheckCircle2 className={styles.lessonCheckIcon} /> : <PlayCircle className={styles.lessonCheckIcon} />}
                                      {lesson.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className={styles.weekAssignment}>
                              <BookOpen className={styles.assignIcon} size={16} />
                              <span>{week.assignment}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>
                </>
              )}
            </motion.div>
          )}

        </main>
      </div>

      {/* ── PAYMENT CONFIRMATION OVERLAY ─────────
          Paystack's own popup handles card entry. This just covers the
          short window while we verify the transaction server-side. ──── */}
      <AnimatePresence>
        {paying && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={styles.checkoutOverlay}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={styles.checkoutCard}
            >
              <div className={styles.checkoutBody}>
                <div className={styles.checkoutStatus}>
                  <span className={styles.loadingSpinner} />
                  <p style={{ fontWeight: 600 }}>Confirming your payment…</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Please don&apos;t close this page.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
