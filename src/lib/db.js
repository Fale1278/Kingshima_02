// Node.js Persistent JSON Database Store for Kingshima Backend (Enhanced with Gamification & Certificates)
import fs from 'node:fs';
import path from 'node:path';

const DB_DIR = path.join(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_DATA = {
  students: [],
  submissions: [],
  lessons: [],
  profiles: [],
  certificates: [],
};

function initDb() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('[NodeDB] Failed to initialize DB file:', err);
  }
}

initDb();

function readDb() {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.certificates) parsed.certificates = [];
    return parsed;
  } catch (err) {
    console.error('[NodeDB] Read error:', err);
    return INITIAL_DATA;
  }
}

function writeDb(data) {
  try {
    initDb();
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('[NodeDB] Write error:', err);
  }
}

// ── Students API ─────────────────────────────────────────────────────────────

export function getStudentByEmailOrUsername(email, username) {
  const db = readDb();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase();
  return db.students.find(
    (s) => s.email === cleanEmail || s.username === cleanUsername
  ) || null;
}

export function getStudentByLoginCode(email, username, loginCode) {
  const db = readDb();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanCode = (loginCode || '').trim();
  return db.students.find(
    (s) =>
      s.email === cleanEmail &&
      s.username === cleanUsername &&
      s.login_code === cleanCode
  ) || null;
}

export function getStudentById(id) {
  const db = readDb();
  return db.students.find((s) => s.id === id) || null;
}

export function getAllStudents() {
  const db = readDb();
  return db.students.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
}

export function createStudent({ username, email, login_code, password_hash }) {
  const db = readDb();
  const newStudent = {
    id: `stud_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    username: (username || '').trim().toLowerCase(),
    email: (email || '').trim().toLowerCase(),
    login_code: login_code || '',
    password_hash: password_hash || null,
    progress: [],
    xp: 100, // Welcome XP bonus
    streak_days: 1,
    last_active: new Date().toISOString(),
    application_paid: false,
    application_fee_ref: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.students.push(newStudent);
  writeDb(db);
  return newStudent;
}

export function updateStudent(id, updates) {
  const db = readDb();
  const index = db.students.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.students[index] = {
    ...db.students[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  writeDb(db);
  return db.students[index];
}

export function addStudentXp(id, amount = 50) {
  const student = getStudentById(id);
  if (!student) return null;
  const newXp = (student.xp || 0) + amount;
  return updateStudent(id, { xp: newXp });
}

export function updateStudentStreak(id) {
  const student = getStudentById(id);
  if (!student) return null;

  const now = new Date();
  const last = student.last_active ? new Date(student.last_active) : new Date(0);
  const diffHours = (now - last) / (1000 * 60 * 60);

  let streak = student.streak_days || 1;
  if (diffHours >= 24 && diffHours < 48) {
    streak += 1;
  } else if (diffHours >= 48) {
    streak = 1;
  }

  return updateStudent(id, { streak_days: streak, last_active: now.toISOString() });
}

export function deleteStudent(id) {
  const db = readDb();
  const index = db.students.findIndex((s) => s.id === id);
  if (index === -1) return false;

  db.students.splice(index, 1);
  writeDb(db);
  return true;
}

// ── Submissions API ──────────────────────────────────────────────────────────

export function createSubmission({ student_id, lesson_id, submission_link, uploaded_file, notes, grade }) {
  const db = readDb();
  const newSub = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    student_id,
    lesson_id,
    submission_link: submission_link || null,
    uploaded_file: uploaded_file || null,
    notes: notes || null,
    grade: grade || null,
    created_at: new Date().toISOString(),
  };

  db.submissions.push(newSub);
  writeDb(db);

  // Award XP for submitting assignment
  addStudentXp(student_id, 100);
  updateStudentStreak(student_id);

  return newSub;
}

export function getAllSubmissions() {
  const db = readDb();
  const studentMap = Object.fromEntries(db.students.map((s) => [s.id, s]));

  return db.submissions
    .map((sub) => ({
      ...sub,
      student: studentMap[sub.student_id]
        ? {
            id: studentMap[sub.student_id].id,
            username: studentMap[sub.student_id].username,
            email: studentMap[sub.student_id].email,
          }
        : null,
    }))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// ── Lessons API ──────────────────────────────────────────────────────────────

export function getLessonById(id) {
  const db = readDb();
  return db.lessons.find((l) => l.id === id) || null;
}

export function getAllLessons() {
  const db = readDb();
  return db.lessons;
}

export function upsertLesson({ id, video_url, resources }) {
  const db = readDb();
  const index = db.lessons.findIndex((l) => l.id === id);
  const updated = {
    id,
    video_url: video_url || '',
    resources: Array.isArray(resources)
      ? resources
      : typeof resources === 'string'
      ? resources.split('\n').map((r) => r.trim()).filter(Boolean)
      : [],
    updated_at: new Date().toISOString(),
  };

  if (index >= 0) {
    db.lessons[index] = { ...db.lessons[index], ...updated };
  } else {
    db.lessons.push(updated);
  }

  writeDb(db);
  return updated;
}

// ── Certificates API ─────────────────────────────────────────────────────────

export function issueCertificate({ studentId, studentName, courseId, courseTitle }) {
  const db = readDb();
  const certId = `CERT-KGS-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const cert = {
    id: certId,
    student_id: studentId,
    student_name: studentName,
    course_id: courseId,
    course_title: courseTitle,
    issued_at: new Date().toISOString(),
  };

  db.certificates.push(cert);
  writeDb(db);

  // Bonus XP for course completion
  addStudentXp(studentId, 500);

  return cert;
}

export function getCertificateById(certId) {
  const db = readDb();
  return db.certificates.find((c) => c.id.toLowerCase() === certId.toLowerCase()) || null;
}

export function getStudentCertificates(studentId) {
  const db = readDb();
  return db.certificates.filter((c) => c.student_id === studentId);
}

// ── Profiles API ─────────────────────────────────────────────────────────────

export function getProfileByStudentId(studentId) {
  const db = readDb();
  return db.profiles.find((p) => p.id === studentId) || null;
}

export function upsertProfile(studentId, profileData) {
  const db = readDb();
  const index = db.profiles.findIndex((p) => p.id === studentId);
  const updated = {
    id: studentId,
    ...profileData,
    updated_at: new Date().toISOString(),
  };

  if (index >= 0) {
    db.profiles[index] = { ...db.profiles[index], ...updated };
  } else {
    db.profiles.push(updated);
  }

  writeDb(db);
  return updated;
}
