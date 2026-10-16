// Native SQLite Database Engine for Kingshima Backend (Replacing Supabase with In-House Database)
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'kingshima.db');
const LEGACY_JSON_FILE = path.join(DATA_DIR, 'db.json');

// Singleton database instance
let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    dbInstance = new DatabaseSync(DB_FILE);
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    createTables(dbInstance);
    migrateFromLegacyJson(dbInstance);
  }
  return dbInstance;
}

function createTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      login_code TEXT,
      password_hash TEXT,
      xp INTEGER DEFAULT 100,
      streak_days INTEGER DEFAULT 1,
      last_active TEXT,
      application_paid INTEGER DEFAULT 0,
      application_fee_ref TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS student_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      UNIQUE(student_id, lesson_id),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS profiles (
      student_id TEXT PRIMARY KEY,
      role TEXT,
      goal TEXT,
      experience TEXT,
      onboarding_complete INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      course_id TEXT,
      title TEXT,
      video_url TEXT,
      resources TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      submission_link TEXT,
      uploaded_file TEXT,
      notes TEXT,
      ai_score INTEGER,
      ai_grade TEXT,
      ai_feedback TEXT,
      status TEXT DEFAULT 'submitted',
      created_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      course_name TEXT NOT NULL,
      issued_date TEXT NOT NULL,
      grade TEXT,
      score INTEGER,
      metadata TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS uploads (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT,
      size INTEGER,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS studio_projects (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      track_id TEXT NOT NULL,
      files TEXT NOT NULL,
      whiteboard_data TEXT,
      whiteboard_snapshot_url TEXT,
      completed_objectives TEXT,
      updated_at TEXT NOT NULL,
      UNIQUE(student_id, track_id),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
    CREATE INDEX IF NOT EXISTS idx_students_username ON students(username);
    CREATE INDEX IF NOT EXISTS idx_progress_student ON student_progress(student_id);
    CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
    CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON certificates(id);
    CREATE INDEX IF NOT EXISTS idx_studio_projects_lookup ON studio_projects(student_id, track_id);
  `);
}

function migrateFromLegacyJson(db) {
  if (!fs.existsSync(LEGACY_JSON_FILE)) return;

  try {
    const raw = fs.readFileSync(LEGACY_JSON_FILE, 'utf8');
    const legacy = JSON.parse(raw);

    // Check if students table is already populated
    const countRow = db.prepare('SELECT COUNT(*) as count FROM students').get();
    if (countRow && countRow.count > 0) {
      return; // Already populated
    }

    const insertStudent = db.prepare(`
      INSERT OR IGNORE INTO students (
        id, username, email, login_code, password_hash, xp, streak_days, last_active, application_paid, application_fee_ref, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertProgress = db.prepare(`
      INSERT OR IGNORE INTO student_progress (student_id, lesson_id, completed_at) VALUES (?, ?, ?)
    `);

    if (Array.isArray(legacy.students)) {
      for (const s of legacy.students) {
        insertStudent.run(
          s.id,
          s.username || '',
          s.email || '',
          s.login_code || '',
          s.password_hash || null,
          s.xp || 100,
          s.streak_days || 1,
          s.last_active || new Date().toISOString(),
          s.application_paid ? 1 : 0,
          s.application_fee_ref || null,
          s.created_at || new Date().toISOString(),
          s.updated_at || new Date().toISOString()
        );

        if (Array.isArray(s.progress)) {
          for (const lessonId of s.progress) {
            insertProgress.run(s.id, lessonId, new Date().toISOString());
          }
        }
      }
    }

    if (Array.isArray(legacy.profiles)) {
      const insertProfile = db.prepare(`
        INSERT OR REPLACE INTO profiles (student_id, role, goal, experience, onboarding_complete, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      for (const p of legacy.profiles) {
        insertProfile.run(
          p.student_id,
          p.role || '',
          p.goal || '',
          p.experience || '',
          p.onboarding_complete ? 1 : 0,
          p.updated_at || new Date().toISOString()
        );
      }
    }

    if (Array.isArray(legacy.lessons)) {
      const insertLesson = db.prepare(`
        INSERT OR REPLACE INTO lessons (id, course_id, title, video_url, resources, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const l of legacy.lessons) {
        insertLesson.run(
          l.id,
          l.course_id || '',
          l.title || '',
          l.video_url || '',
          JSON.stringify(l.resources || []),
          l.created_at || new Date().toISOString(),
          l.updated_at || new Date().toISOString()
        );
      }
    }

    if (Array.isArray(legacy.submissions)) {
      const insertSubmission = db.prepare(`
        INSERT OR REPLACE INTO submissions (
          id, student_id, lesson_id, submission_link, uploaded_file, notes, ai_score, ai_grade, ai_feedback, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const sub of legacy.submissions) {
        insertSubmission.run(
          sub.id,
          sub.student_id,
          sub.lesson_id,
          sub.submission_link || null,
          sub.uploaded_file || null,
          sub.notes || '',
          sub.ai_score || null,
          sub.ai_grade || null,
          sub.ai_feedback || null,
          sub.status || 'submitted',
          sub.created_at || new Date().toISOString()
        );
      }
    }

    if (Array.isArray(legacy.certificates)) {
      const insertCert = db.prepare(`
        INSERT OR REPLACE INTO certificates (
          id, student_id, course_id, student_name, course_name, issued_date, grade, score, metadata, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const c of legacy.certificates) {
        insertCert.run(
          c.id,
          c.student_id,
          c.course_id,
          c.student_name,
          c.course_name,
          c.issued_date,
          c.grade || null,
          c.score || null,
          JSON.stringify(c.metadata || {}),
          c.created_at || new Date().toISOString()
        );
      }
    }

    console.log('[Kingshima SQLite] Successfully migrated legacy JSON data to SQLite database.');
  } catch (err) {
    console.error('[Kingshima SQLite] Migration from legacy JSON failed:', err);
  }
}

// ── Helper to format student object with progress array ───────────────────────

function formatStudent(row, db) {
  if (!row) return null;
  const progressRows = db
    .prepare('SELECT lesson_id FROM student_progress WHERE student_id = ?')
    .all(row.id);
  const progress = progressRows.map((r) => r.lesson_id);

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    login_code: row.login_code,
    password_hash: row.password_hash,
    progress,
    xp: row.xp ?? 100,
    streak_days: row.streak_days ?? 1,
    last_active: row.last_active,
    application_paid: Boolean(row.application_paid),
    application_fee_ref: row.application_fee_ref,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// ── Students API ─────────────────────────────────────────────────────────────

export function getStudentByEmailOrUsername(email, username) {
  const db = getDb();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase();

  const row = db
    .prepare('SELECT * FROM students WHERE email = ? OR username = ?')
    .get(cleanEmail, cleanUsername);

  return formatStudent(row, db);
}

export function getStudentByLoginCode(email, username, loginCode) {
  const db = getDb();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanCode = (loginCode || '').trim();

  const row = db
    .prepare('SELECT * FROM students WHERE email = ? AND username = ? AND login_code = ?')
    .get(cleanEmail, cleanUsername, cleanCode);

  return formatStudent(row, db);
}

export function getStudentById(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  return formatStudent(row, db);
}

export function getAllStudents() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM students ORDER BY created_at DESC').all();
  return rows.map((r) => formatStudent(r, db));
}

export function createStudent({ username, email, login_code, password_hash }) {
  const db = getDb();
  const id = `stud_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanEmail = (email || '').trim().toLowerCase();

  db.prepare(`
    INSERT INTO students (
      id, username, email, login_code, password_hash, xp, streak_days, last_active, application_paid, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, 100, 1, ?, 0, ?, ?)
  `).run(id, cleanUsername, cleanEmail, login_code || '', password_hash || null, now, now, now);

  return getStudentById(id);
}

export function updateStudent(id, updates) {
  const db = getDb();
  const current = getStudentById(id);
  if (!current) return null;

  const now = new Date().toISOString();

  // Handle progress list update
  if (Array.isArray(updates.progress)) {
    db.prepare('DELETE FROM student_progress WHERE student_id = ?').run(id);
    const insertProg = db.prepare(
      'INSERT OR IGNORE INTO student_progress (student_id, lesson_id, completed_at) VALUES (?, ?, ?)'
    );
    for (const lessonId of updates.progress) {
      insertProg.run(id, lessonId, now);
    }
  }

  const fields = [];
  const values = [];

  if (updates.username !== undefined) {
    fields.push('username = ?');
    values.push(updates.username.trim().toLowerCase());
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email.trim().toLowerCase());
  }
  if (updates.login_code !== undefined) {
    fields.push('login_code = ?');
    values.push(updates.login_code);
  }
  if (updates.password_hash !== undefined) {
    fields.push('password_hash = ?');
    values.push(updates.password_hash);
  }
  if (updates.xp !== undefined) {
    fields.push('xp = ?');
    values.push(updates.xp);
  }
  if (updates.streak_days !== undefined) {
    fields.push('streak_days = ?');
    values.push(updates.streak_days);
  }
  if (updates.last_active !== undefined) {
    fields.push('last_active = ?');
    values.push(updates.last_active);
  }
  if (updates.application_paid !== undefined) {
    fields.push('application_paid = ?');
    values.push(updates.application_paid ? 1 : 0);
  }
  if (updates.application_fee_ref !== undefined) {
    fields.push('application_fee_ref = ?');
    values.push(updates.application_fee_ref);
  }

  fields.push('updated_at = ?');
  values.push(now);
  values.push(id);

  if (fields.length > 1) {
    db.prepare(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  }

  return getStudentById(id);
}

export function deleteStudent(id) {
  const db = getDb();
  const res = db.prepare('DELETE FROM students WHERE id = ?').run(id);
  return res.changes > 0;
}

// ── Gamification: XP & Streaks ───────────────────────────────────────────────

export function addStudentXp(studentId, pointsToAdd = 50) {
  const student = getStudentById(studentId);
  if (!student) return null;
  const newXp = (student.xp || 0) + pointsToAdd;
  return updateStudent(studentId, { xp: newXp });
}

export function touchStudentStreak(studentId) {
  const student = getStudentById(studentId);
  if (!student) return null;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const lastActiveStr = student.last_active ? student.last_active.split('T')[0] : null;

  let newStreak = student.streak_days || 1;

  if (lastActiveStr && lastActiveStr !== todayStr) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActiveStr === yesterdayStr) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  return updateStudent(studentId, {
    streak_days: newStreak,
    last_active: now.toISOString(),
  });
}

// ── Certificates API ────────────────────────────────────────────────────────

export function saveCertificate({
  id,
  student_id,
  course_id,
  student_name,
  course_name,
  grade,
  score,
  metadata = {},
}) {
  const db = getDb();
  const certId =
    id || `CERT-KGS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  const now = new Date().toISOString();
  const issuedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  db.prepare(`
    INSERT OR REPLACE INTO certificates (
      id, student_id, course_id, student_name, course_name, issued_date, grade, score, metadata, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    certId,
    student_id,
    course_id,
    student_name,
    course_name,
    issuedDate,
    grade || 'Distinction & Honors Capstone',
    score || 100,
    JSON.stringify(metadata),
    now
  );

  return getCertificateById(certId);
}

export function getCertificateById(certId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM certificates WHERE id = ?').get(certId);
  if (!row) return null;

  let parsedMeta = {};
  try {
    parsedMeta = JSON.parse(row.metadata || '{}');
  } catch {}

  return {
    ...row,
    metadata: parsedMeta,
  };
}

export function getCertificatesByStudentId(studentId) {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM certificates WHERE student_id = ? ORDER BY created_at DESC')
    .all(studentId);

  return rows.map((r) => {
    let parsedMeta = {};
    try {
      parsedMeta = JSON.parse(r.metadata || '{}');
    } catch {}
    return { ...r, metadata: parsedMeta };
  });
}

export function getAllCertificates() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM certificates ORDER BY created_at DESC').all();
  return rows.map((r) => {
    let parsedMeta = {};
    try {
      parsedMeta = JSON.parse(r.metadata || '{}');
    } catch {}
    return { ...r, metadata: parsedMeta };
  });
}

// ── Submissions API ─────────────────────────────────────────────────────────

export function createSubmission({
  student_id,
  lesson_id,
  submission_link,
  uploaded_file,
  notes,
  ai_score,
  ai_grade,
  ai_feedback,
}) {
  const db = getDb();
  const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO submissions (
      id, student_id, lesson_id, submission_link, uploaded_file, notes, ai_score, ai_grade, ai_feedback, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?)
  `).run(
    id,
    student_id,
    lesson_id,
    submission_link || null,
    uploaded_file || null,
    notes || '',
    ai_score || null,
    ai_grade || null,
    ai_feedback || null,
    now
  );

  return getSubmissionById(id);
}

export function getSubmissionById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM submissions WHERE id = ?').get(id) || null;
}

export function getSubmissionsByStudentId(studentId) {
  const db = getDb();
  return db
    .prepare('SELECT * FROM submissions WHERE student_id = ? ORDER BY created_at DESC')
    .all(studentId);
}

export function getAllSubmissions() {
  const db = getDb();
  return db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
}

// ── Lessons API ─────────────────────────────────────────────────────────────

export function getLessonById(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM lessons WHERE id = ?').get(id);
  if (!row) return null;

  let resources = [];
  try {
    resources = JSON.parse(row.resources || '[]');
  } catch {}

  return { ...row, resources };
}

export function getAllLessons() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM lessons ORDER BY created_at DESC').all();
  return rows.map((r) => {
    let resources = [];
    try {
      resources = JSON.parse(r.resources || '[]');
    } catch {}
    return { ...r, resources };
  });
}

export function upsertLesson({ id, course_id, title, video_url, resources }) {
  const db = getDb();
  const now = new Date().toISOString();
  const resStr = JSON.stringify(resources || []);

  db.prepare(`
    INSERT INTO lessons (id, course_id, title, video_url, resources, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      video_url = excluded.video_url,
      resources = excluded.resources,
      course_id = coalesce(excluded.course_id, lessons.course_id),
      title = coalesce(excluded.title, lessons.title),
      updated_at = excluded.updated_at
  `).run(id, course_id || null, title || null, video_url || '', resStr, now, now);

  return getLessonById(id);
}

// ── Profiles API ────────────────────────────────────────────────────────────

export function getProfileByStudentId(studentId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM profiles WHERE student_id = ?').get(studentId);
  if (!row) return null;
  return {
    ...row,
    onboarding_complete: Boolean(row.onboarding_complete),
  };
}

export function upsertProfile(studentId, data) {
  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO profiles (student_id, role, goal, experience, onboarding_complete, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(student_id) DO UPDATE SET
      role = coalesce(excluded.role, profiles.role),
      goal = coalesce(excluded.goal, profiles.goal),
      experience = coalesce(excluded.experience, profiles.experience),
      onboarding_complete = excluded.onboarding_complete,
      updated_at = excluded.updated_at
  `).run(
    studentId,
    data.role || null,
    data.goal || null,
    data.experience || null,
    data.onboarding_complete ? 1 : 0,
    now
  );

  return getProfileByStudentId(studentId);
}

// ── Uploads & Media Storage API ─────────────────────────────────────────────

export function recordUpload({ id, filename, original_name, mime_type, size, url }) {
  const db = getDb();
  const now = new Date().toISOString();
  const uploadId = id || `up_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  db.prepare(`
    INSERT INTO uploads (id, filename, original_name, mime_type, size, url, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(uploadId, filename, original_name, mime_type || null, size || 0, url, now);

  return db.prepare('SELECT * FROM uploads WHERE id = ?').get(uploadId);
}

export function getAllUploads() {
  const db = getDb();
  return db.prepare('SELECT * FROM uploads ORDER BY created_at DESC').all();
}

// ── Studio Projects API (Persistent AI Studio Workspaces) ─────────────────────

export function saveStudioProject({
  student_id,
  track_id,
  files,
  whiteboard_data,
  whiteboard_snapshot_url,
  completed_objectives,
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const id = `proj_${student_id}_${track_id}`;
  const filesStr = JSON.stringify(files || []);
  const wbStr = whiteboard_data ? JSON.stringify(whiteboard_data) : null;
  const objStr = JSON.stringify(completed_objectives || []);

  db.prepare(`
    INSERT INTO studio_projects (
      id, student_id, track_id, files, whiteboard_data, whiteboard_snapshot_url, completed_objectives, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(student_id, track_id) DO UPDATE SET
      files = excluded.files,
      whiteboard_data = coalesce(excluded.whiteboard_data, studio_projects.whiteboard_data),
      whiteboard_snapshot_url = coalesce(excluded.whiteboard_snapshot_url, studio_projects.whiteboard_snapshot_url),
      completed_objectives = excluded.completed_objectives,
      updated_at = excluded.updated_at
  `).run(id, student_id, track_id, filesStr, wbStr, whiteboard_snapshot_url || null, objStr, now);

  return getStudioProject(student_id, track_id);
}

export function getStudioProject(student_id, track_id) {
  const db = getDb();
  const row = db
    .prepare('SELECT * FROM studio_projects WHERE student_id = ? AND track_id = ?')
    .get(student_id, track_id);
  if (!row) return null;

  let files = [];
  let whiteboard_data = null;
  let completed_objectives = [];

  try {
    files = JSON.parse(row.files || '[]');
  } catch {}
  try {
    if (row.whiteboard_data) whiteboard_data = JSON.parse(row.whiteboard_data);
  } catch {}
  try {
    completed_objectives = JSON.parse(row.completed_objectives || '[]');
  } catch {}

  return {
    ...row,
    files,
    whiteboard_data,
    completed_objectives,
  };
}
