'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { COURSES } from '@/data/coursesData';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';

const ADMIN_SESSION_KEY = 'kingshima_admin_code';

// Flat list of every real lesson across every course, for the video/resource picker.
const ALL_LESSONS = COURSES.flatMap((course) =>
  course.curriculum.flatMap((week) =>
    week.lessons.map((lesson) => ({
      ...lesson,
      courseTitle: course.title,
      week: week.week,
    }))
  )
);

export default function AdminPage() {
  const toast = useToast();
  const [authed, setAuthed]         = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [verifying, setVerifying]   = useState(false);

  const [tab, setTab]           = useState('students'); // 'students' | 'lessons' | 'submissions'
  const [students, setStudents] = useState([]);
  const [lessons, setLessons]   = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]   = useState(false);

  const [newStudent, setNewStudent] = useState({ username: '', email: '', login_code: '' });
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [lessonForm, setLessonForm] = useState({ video_url: '', resources: '' });

  // ── Auth: re-use a saved code for this browser tab session ──
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.sessionStorage.getItem(ADMIN_SESSION_KEY) : null;
    if (saved) {
      verifyCode(saved, { silent: true });
    } else {
      setCheckingAuth(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adminFetch = useCallback(async (url, options = {}) => {
    const code = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-code': code || '',
        ...(options.headers || {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401) {
        // Session code no longer valid — bounce back to the gate.
        window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
        setAuthed(false);
      }
      throw new Error(data.error || 'Request failed.');
    }
    return data;
  }, []);

  const verifyCode = async (code, { silent = false } = {}) => {
    setVerifying(true);
    setAdminError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Incorrect admin code.');
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, code);
      setAuthed(true);
      if (!silent) toast.success('Welcome back.');
    } catch (err) {
      if (!silent) setAdminError(err.message);
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      setAuthed(false);
    } finally {
      setVerifying(false);
      setCheckingAuth(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminInput.trim()) return;
    verifyCode(adminInput.trim());
  };

  // ── Data fetching ──
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch('/api/admin/students');
      setStudents(data.students || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [adminFetch, toast]);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch('/api/admin/lessons');
      setLessons(data.lessons || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [adminFetch, toast]);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch('/api/admin/submissions');
      setSubmissions(data.submissions || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [adminFetch, toast]);

  useEffect(() => {
    if (!authed) return;
    if (tab === 'students') fetchStudents();
    if (tab === 'lessons') fetchLessons();
    if (tab === 'submissions') fetchSubmissions();
  }, [authed, tab, fetchStudents, fetchLessons, fetchSubmissions]);

  // ── Students ──
  const addStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.username || !newStudent.email) return;
    try {
      const data = await adminFetch('/api/admin/students', {
        method: 'POST',
        body: JSON.stringify(newStudent),
      });
      toast.success(`Student "${newStudent.username}" added — code: ${data.login_code}`);
      setNewStudent({ username: '', email: '', login_code: '' });
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteStudent = async (id, username) => {
    if (!confirm(`Delete ${username}? This can't be undone.`)) return;
    try {
      await adminFetch('/api/admin/students', { method: 'DELETE', body: JSON.stringify({ id }) });
      toast.success(`${username} deleted.`);
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const regenerateCode = async (id, username) => {
    try {
      const data = await adminFetch('/api/admin/students', {
        method: 'PATCH',
        body: JSON.stringify({ id, action: 'regenerate_code' }),
      });
      toast.success(`New code for ${username}: ${data.login_code}`);
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const togglePaid = async (student) => {
    const action = student.application_paid ? 'mark_unpaid' : 'mark_paid';
    try {
      await adminFetch('/api/admin/students', { method: 'PATCH', body: JSON.stringify({ id: student.id, action }) });
      toast.success(`${student.username} marked as ${student.application_paid ? 'unpaid' : 'paid'}.`);
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ── Lessons ──
  const handleSelectLesson = (id) => {
    setSelectedLessonId(id);
    const existing = lessons.find((l) => l.id === id);
    setLessonForm({
      video_url: existing?.video_url || '',
      resources: Array.isArray(existing?.resources) ? existing.resources.join('\n') : '',
    });
  };

  const saveLesson = async (e) => {
    e.preventDefault();
    if (!selectedLessonId) return;
    try {
      await adminFetch('/api/admin/lessons', {
        method: 'POST',
        body: JSON.stringify({ id: selectedLessonId, ...lessonForm }),
      });
      toast.success('Lesson saved.');
      fetchLessons();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const selectedLessonMeta = ALL_LESSONS.find((l) => l.id === selectedLessonId);

  // ── Auth gate ──
  if (checkingAuth) return null;

  if (!authed) {
    return (
      <div className={styles.gate}>
        <div className={styles.gateCard}>
          <Link href="/" className={styles.gateLogo}>
            <span style={{ color: 'var(--accent-primary)' }}>✧</span> Kingshima
          </Link>
          <h1 className={styles.gateTitle}>Admin Access</h1>
          <p className={styles.gateDesc}>Enter the admin code to continue.</p>
          <form onSubmit={handleAdminLogin} className={styles.gateForm}>
            <input
              type="password"
              className={styles.input}
              placeholder="Admin code"
              value={adminInput}
              onChange={(e) => { setAdminInput(e.target.value); setAdminError(''); }}
            />
            {adminError && <p className={styles.gateError}>{adminError}</p>}
            <button type="submit" className={styles.primaryBtn} disabled={verifying}>
              {verifying ? 'Checking…' : 'Enter →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ──
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.logo}>
            <span style={{ color: 'var(--accent-primary)' }}>✧</span> Kingshima
          </Link>
          <span className={styles.adminBadge}>Admin Panel</span>
        </div>
        <Link href="/bootcamp" className={styles.backLink}>← Back to Bootcamp</Link>
      </header>

      <div className={styles.shell}>
        
        {/* ── Metric Summary Analytics Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0d0f17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700 }}>Total Registered</span>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0.3rem 0 0 0' }}>{students.length} Students</h3>
          </div>
          <div style={{ background: '#0d0f17', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 12, padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 700 }}>Verified Payments</span>
            <h3 style={{ fontSize: '1.6rem', color: '#34d399', margin: '0.3rem 0 0 0' }}>
              {students.filter(s => s.application_paid).length} Paid
            </h3>
          </div>
          <div style={{ background: '#0d0f17', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#ef4444', textTransform: 'uppercase', fontWeight: 700 }}>Submissions</span>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0.3rem 0 0 0' }}>{submissions.length} Total</h3>
          </div>
          <div style={{ background: '#0d0f17', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 12, padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#eab308', textTransform: 'uppercase', fontWeight: 700 }}>Active Lessons</span>
            <h3 style={{ fontSize: '1.6rem', color: '#eab308', margin: '0.3rem 0 0 0' }}>{ALL_LESSONS.length} Lessons</h3>
          </div>
        </div>

        <nav className={styles.tabs}>
          {[
            { key: 'students',    label: '👥 Students' },
            { key: 'lessons',     label: '📹 Lesson Videos' },
            { key: 'submissions', label: '📥 Submissions' },
          ].map((t) => (
            <button
              key={t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* ── Students tab ─── */}
        {tab === 'students' && (
          <div className={styles.tabContent}>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Add New Student</h2>
              <form onSubmit={addStudent} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Username</label>
                    <input
                      className={styles.input}
                      placeholder="username"
                      value={newStudent.username}
                      onChange={(e) => setNewStudent((p) => ({ ...p, username: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="student@email.com"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <p className={styles.hint}>Login code is generated automatically — you'll see it in the confirmation.</p>
                <button type="submit" className={styles.primaryBtn}>Add Student</button>
              </form>
            </section>

            <section className={styles.card}>
              <h2 className={styles.cardTitle}>
                All Students <span className={styles.count}>{students.length}</span>
              </h2>
              {loading ? (
                <div className={styles.tableLoading}><span className={styles.spinner} /></div>
              ) : students.length === 0 ? (
                <p className={styles.empty}>No students yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Login Code</th>
                        <th>Acceptance Fee</th>
                        <th>Lessons Done</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.id}>
                          <td className={styles.bold}>{s.username}</td>
                          <td className={styles.muted}>{s.email}</td>
                          <td><span className={styles.codeBadge}>{s.login_code}</span></td>
                          <td>
                            <button
                              onClick={() => togglePaid(s)}
                              className={styles.ghostBtn}
                              style={{
                                color: s.application_paid ? '#34d399' : '#f87171',
                                borderColor: s.application_paid ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)',
                              }}
                              title="Click to toggle"
                            >
                              {s.application_paid ? '✓ Paid' : '✕ Unpaid'}
                            </button>
                          </td>
                          <td>
                            <span className={styles.progressPill}>
                              {Array.isArray(s.progress) ? s.progress.length : 0} lessons
                            </span>
                          </td>
                          <td className={styles.muted}>
                            {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button className={styles.ghostBtn} onClick={() => regenerateCode(s.id, s.username)} title="Regenerate code">↻</button>
                              <button className={styles.dangerBtn} onClick={() => deleteStudent(s.id, s.username)} title="Delete student">✕</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── Lesson videos tab ─── */}
        {tab === 'lessons' && (
          <div className={styles.tabContent}>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Add / Update Lesson Video</h2>
              <p className={styles.hint} style={{ marginBottom: '1rem' }}>
                Lesson titles and assignments come from the curriculum in code — this only sets the video and resource links for a lesson.
              </p>
              <form onSubmit={saveLesson} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Lesson</label>
                  <select
                    className={styles.input}
                    value={selectedLessonId}
                    onChange={(e) => handleSelectLesson(e.target.value)}
                    required
                  >
                    <option value="">Select a lesson…</option>
                    {COURSES.map((course) => (
                      <optgroup key={course.id} label={course.title}>
                        {course.curriculum.flatMap((week) =>
                          week.lessons.map((lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                              Week {week.week} — {lesson.title} ({lesson.id})
                            </option>
                          ))
                        )}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {selectedLessonMeta && (
                  <p className={styles.hint}>
                    {selectedLessonMeta.courseTitle} · Week {selectedLessonMeta.week} · {selectedLessonMeta.duration}
                  </p>
                )}

                <div className={styles.field}>
                  <label className={styles.label}>Video URL (YouTube embed)</label>
                  <input
                    type="url"
                    className={styles.input}
                    placeholder="https://www.youtube.com/embed/…"
                    value={lessonForm.video_url}
                    onChange={(e) => setLessonForm((p) => ({ ...p, video_url: e.target.value }))}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Extra resource links (one per line)</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    placeholder="Worksheet PDF&#10;Slide deck link"
                    value={lessonForm.resources}
                    onChange={(e) => setLessonForm((p) => ({ ...p, resources: e.target.value }))}
                  />
                </div>
                <button type="submit" className={styles.primaryBtn} disabled={!selectedLessonId}>
                  Save Lesson
                </button>
              </form>
            </section>

            <section className={styles.card}>
              <h2 className={styles.cardTitle}>
                Videos Added <span className={styles.count}>{lessons.filter((l) => l.video_url).length} / {ALL_LESSONS.length}</span>
              </h2>
              {loading ? (
                <div className={styles.tableLoading}><span className={styles.spinner} /></div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>ID</th><th>Lesson</th><th>Video</th></tr>
                    </thead>
                    <tbody>
                      {ALL_LESSONS.map((l) => {
                        const dbLesson = lessons.find((x) => x.id === l.id);
                        return (
                          <tr key={l.id}>
                            <td className={styles.codeBadge}>{l.id}</td>
                            <td>{l.courseTitle} — {l.title}</td>
                            <td>{dbLesson?.video_url ? <span className={styles.greenDot}>✓</span> : <span className={styles.redDot}>✕</span>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── Submissions tab ─── */}
        {tab === 'submissions' && (
          <div className={styles.tabContent}>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>
                Assignment Submissions <span className={styles.count}>{submissions.length}</span>
              </h2>
              {loading ? (
                <div className={styles.tableLoading}><span className={styles.spinner} /></div>
              ) : submissions.length === 0 ? (
                <p className={styles.empty}>No submissions yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Lesson</th>
                        <th>Notes / Link</th>
                        <th>File</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((s) => {
                        const lessonMeta = ALL_LESSONS.find((l) => l.id === s.lesson_id);
                        return (
                          <tr key={s.id}>
                            <td className={styles.bold}>{s.student?.username || 'Unknown'}</td>
                            <td className={styles.muted}>{lessonMeta ? lessonMeta.title : s.lesson_id}</td>
                            <td style={{ maxWidth: 260 }}>
                              {s.submission_link ? (
                                <a href={s.submission_link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)' }}>
                                  {s.submission_link}
                                </a>
                              ) : (
                                <span className={styles.muted}>{s.notes || '—'}</span>
                              )}
                            </td>
                            <td className={styles.muted}>{s.uploaded_file ? '📎 attached' : '—'}</td>
                            <td className={styles.muted}>
                              {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
