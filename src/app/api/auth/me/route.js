import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/nodeAuth';
import { getStudentById } from '@/lib/db';

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyJwt(token);

    if (!payload || !payload.sub) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const student = getStudentById(payload.sub);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, student });
  } catch (err) {
    console.error('GET /api/auth/me error:', err);
    return NextResponse.json({ error: 'Failed to verify session' }, { status: 500 });
  }
}
