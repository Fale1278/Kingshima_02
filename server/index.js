// Standalone Express Node.js Backend Server for Kingshima
import express from 'express';
import cors from 'cors';
import {
  getStudentByEmailOrUsername,
  getStudentByLoginCode,
  getStudentById,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  createSubmission,
  getAllSubmissions,
  getAllLessons,
  upsertLesson,
  upsertProfile,
  getProfileByStudentId,
} from '../src/lib/db.js';
import {
  hashPassword,
  comparePassword,
  signJwt,
  verifyJwt,
  verifyAdminRequest,
} from '../src/lib/nodeAuth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── Auth Endpoints ───────────────────────────────────────────────────────────

app.post('/api/auth/register', (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    const existing = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
    if (existing) {
      return res
        .status(409)
        .json({ error: 'A student with this email or username already exists.' });
    }

    const loginCode = Array.from({ length: 8 }, () =>
      'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 30)]
    ).join('');
    const passwordHash = password ? hashPassword(password) : null;

    const student = createStudent({
      username: cleanUsername,
      email: cleanEmail,
      login_code: loginCode,
      password_hash: passwordHash,
    });

    const token = signJwt({ sub: student.id, email: student.email });

    return res.json({ student, login_code: loginCode, token });
  } catch (err) {
    console.error('[Backend] Register error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, username, login_code, password } = req.body;
    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    let student = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    let isValid = false;
    if (login_code && student.login_code === login_code.trim()) {
      isValid = true;
    } else if (password && student.password_hash && comparePassword(password, student.password_hash)) {
      isValid = true;
    } else if (!student.password_hash && !login_code) {
      // Auto allow first setup if code matches
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid login code or password.' });
    }

    const token = signJwt({ sub: student.id, email: student.email });
    return res.json({ student, token });
  } catch (err) {
    console.error('[Backend] Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJwt(token);
  if (!payload || !payload.sub) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const student = getStudentById(payload.sub);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  return res.json({ student });
});

// ── Progress & Onboarding Endpoints ──────────────────────────────────────────

app.post('/api/progress', (req, res) => {
  try {
    const { studentId, progress } = req.body;
    if (!studentId || !Array.isArray(progress)) {
      return res.status(400).json({ error: 'Invalid studentId or progress.' });
    }

    const updated = updateStudent(studentId, { progress });
    if (!updated) return res.status(404).json({ error: 'Student not found.' });
    return res.json({ ok: true, student: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update progress.' });
  }
});

app.post('/api/onboarding', (req, res) => {
  try {
    const { studentId, role, goal, experience } = req.body;
    if (!studentId) return res.status(400).json({ error: 'Missing studentId.' });

    const profile = upsertProfile(studentId, {
      role,
      goal,
      experience,
      onboarding_complete: true,
    });
    return res.json({ ok: true, profile });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save onboarding profile.' });
  }
});

// ── Submissions Endpoints ───────────────────────────────────────────────────

app.post('/api/submissions', (req, res) => {
  try {
    const { student_id, lesson_id, submission_link, uploaded_file, notes } = req.body;
    if (!student_id || !lesson_id) {
      return res.status(400).json({ error: 'student_id and lesson_id are required.' });
    }

    const submission = createSubmission({
      student_id,
      lesson_id,
      submission_link,
      uploaded_file,
      notes,
    });
    return res.json({ ok: true, submission });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save submission.' });
  }
});

// ── Admin Endpoints ──────────────────────────────────────────────────────────

app.get('/api/admin/students', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const students = getAllStudents();
  return res.json({ students });
});

app.post('/api/admin/students', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { username, email } = req.body;
  if (!username || !email) return res.status(400).json({ error: 'Missing fields.' });

  const loginCode = Array.from({ length: 8 }, () =>
    'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 30)]
  ).join('');

  const student = createStudent({
    username,
    email,
    login_code: loginCode,
  });
  return res.json({ ok: true, student, login_code: loginCode });
});

app.patch('/api/admin/students', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id, action } = req.body;
  if (!id || !action) return res.status(400).json({ error: 'Missing id or action.' });

  let updates = {};
  let extra = {};

  if (action === 'regenerate_code') {
    const code = Array.from({ length: 8 }, () =>
      'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 30)]
    ).join('');
    updates = { login_code: code };
    extra = { login_code: code };
  } else if (action === 'mark_paid') {
    updates = { application_paid: true };
  } else if (action === 'mark_unpaid') {
    updates = { application_paid: false };
  }

  const updated = updateStudent(id, updates);
  return res.json({ ok: true, ...extra, student: updated });
});

app.delete('/api/admin/students', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing id.' });

  deleteStudent(id);
  return res.json({ ok: true });
});

app.get('/api/admin/submissions', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const submissions = getAllSubmissions();
  return res.json({ submissions });
});

app.get('/api/admin/lessons', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const lessons = getAllLessons();
  return res.json({ lessons });
});

app.post('/api/admin/lessons', (req, res) => {
  if (!verifyAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id, video_url, resources } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing id.' });

  const lesson = upsertLesson({ id, video_url, resources });
  return res.json({ ok: true, lesson });
});

// Start Node.js backend server
app.listen(PORT, () => {
  console.log(`[Kingshima Node Backend] Server running on http://localhost:${PORT}`);
});
