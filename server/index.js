// Standalone Native Node.js HTTP Backend Server for Kingshima (Zero External Dependencies)
import http from 'node:http';
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
  getLessonById,
  upsertLesson,
  upsertProfile,
  getProfileByStudentId,
  saveCertificate,
  getCertificateById,
  getAllCertificates,
} from '../src/lib/db.js';
import {
  hashPassword,
  comparePassword,
  signJwt,
  verifyJwt,
  verifyAdminRequest,
} from '../src/lib/nodeAuth.js';

const PORT = process.env.PORT || 5000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-code',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-code',
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  try {
    // ── Auth Endpoints ────────────────────────────────────────────────────────
    if (pathname === '/api/auth/register' && method === 'POST') {
      const { email, username, password } = await parseBody(req);
      if (!email || !username) {
        return sendJson(res, 400, { error: 'Email and username are required.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanUsername = username.trim().toLowerCase();

      const existing = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
      if (existing) {
        return sendJson(res, 409, { error: 'A student with this email or username already exists.' });
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
      return sendJson(res, 200, { student, login_code: loginCode, token });
    }

    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, username, login_code, password } = await parseBody(req);
      if (!email || !username) {
        return sendJson(res, 400, { error: 'Email and username are required.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanUsername = username.trim().toLowerCase();

      const student = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
      if (!student) {
        return sendJson(res, 401, { error: 'Invalid credentials.' });
      }

      let isValid = false;
      if (login_code && student.login_code === login_code.trim()) {
        isValid = true;
      } else if (password && student.password_hash && comparePassword(password, student.password_hash)) {
        isValid = true;
      } else if (!student.password_hash && !login_code) {
        isValid = true;
      }

      if (!isValid) {
        return sendJson(res, 401, { error: 'Invalid login code or password.' });
      }

      const token = signJwt({ sub: student.id, email: student.email });
      return sendJson(res, 200, { student, token });
    }

    if (pathname === '/api/auth/me' && method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendJson(res, 401, { error: 'Unauthorized' });
      }

      const token = authHeader.split(' ')[1];
      const payload = verifyJwt(token);
      if (!payload || !payload.sub) {
        return sendJson(res, 401, { error: 'Invalid token' });
      }

      const student = getStudentById(payload.sub);
      if (!student) return sendJson(res, 404, { error: 'Student not found' });
      return sendJson(res, 200, { student });
    }

    // ── Progress & Onboarding ─────────────────────────────────────────────────
    if (pathname === '/api/progress' && method === 'POST') {
      const { studentId, progress } = await parseBody(req);
      if (!studentId || !Array.isArray(progress)) {
        return sendJson(res, 400, { error: 'Invalid studentId or progress.' });
      }
      const updated = updateStudent(studentId, { progress });
      if (!updated) return sendJson(res, 404, { error: 'Student not found.' });
      return sendJson(res, 200, { ok: true, student: updated });
    }

    if (pathname === '/api/onboarding' && method === 'POST') {
      const { studentId, role, goal, experience } = await parseBody(req);
      if (!studentId) return sendJson(res, 400, { error: 'Missing studentId.' });
      const profile = upsertProfile(studentId, {
        role,
        goal,
        experience,
        onboarding_complete: true,
      });
      return sendJson(res, 200, { ok: true, profile });
    }

    // ── Submissions ───────────────────────────────────────────────────────────
    if (pathname === '/api/submissions' && method === 'POST') {
      const body = await parseBody(req);
      const { student_id, lesson_id, submission_link, uploaded_file, notes } = body;
      if (!student_id || !lesson_id) {
        return sendJson(res, 400, { error: 'student_id and lesson_id are required.' });
      }
      const submission = createSubmission({
        student_id,
        lesson_id,
        submission_link,
        uploaded_file,
        notes,
      });
      return sendJson(res, 200, { ok: true, submission });
    }

    // ── Lessons ───────────────────────────────────────────────────────────────
    if (pathname === '/api/lessons' && method === 'GET') {
      const lessons = getAllLessons();
      return sendJson(res, 200, { ok: true, lessons });
    }

    // ── Certificates ──────────────────────────────────────────────────────────
    if (pathname === '/api/certificates' && method === 'GET') {
      const certs = getAllCertificates();
      return sendJson(res, 200, { ok: true, certificates: certs });
    }

    if (pathname.startsWith('/api/certificates/') && method === 'GET') {
      const certId = pathname.replace('/api/certificates/', '');
      const cert = getCertificateById(certId.toUpperCase());
      if (!cert) {
        return sendJson(res, 404, { valid: false, message: 'Certificate not found' });
      }
      return sendJson(res, 200, { valid: true, certificate: cert });
    }

    // ── Admin Endpoints ───────────────────────────────────────────────────────
    if (pathname === '/api/admin/students') {
      if (!verifyAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized' });

      if (method === 'GET') {
        return sendJson(res, 200, { students: getAllStudents() });
      }
      if (method === 'POST') {
        const { username, email } = await parseBody(req);
        if (!username || !email) return sendJson(res, 400, { error: 'Missing fields.' });
        const loginCode = Array.from({ length: 8 }, () =>
          'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 30)]
        ).join('');
        const student = createStudent({ username, email, login_code: loginCode });
        return sendJson(res, 200, { ok: true, student, login_code: loginCode });
      }
      if (method === 'PATCH') {
        const { id, action } = await parseBody(req);
        if (!id || !action) return sendJson(res, 400, { error: 'Missing id or action.' });
        let updates = {};
        if (action === 'regenerate_code') {
          const code = Array.from({ length: 8 }, () =>
            'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 30)]
          ).join('');
          updates = { login_code: code };
        } else if (action === 'mark_paid') {
          updates = { application_paid: true };
        } else if (action === 'mark_unpaid') {
          updates = { application_paid: false };
        }
        const updated = updateStudent(id, updates);
        return sendJson(res, 200, { ok: true, student: updated });
      }
      if (method === 'DELETE') {
        const { id } = await parseBody(req);
        if (!id) return sendJson(res, 400, { error: 'Missing id.' });
        deleteStudent(id);
        return sendJson(res, 200, { ok: true });
      }
    }

    return sendJson(res, 404, { error: 'Not Found' });
  } catch (err) {
    console.error('[Kingshima Standalone Backend] Error:', err);
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`[Kingshima Standalone Backend] SQLite server running on http://localhost:${PORT}`);
});
