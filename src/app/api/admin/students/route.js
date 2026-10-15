import { NextResponse } from 'next/server';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/nodeAuth';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateCode(length = 8) {
  return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
}

export async function GET(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const students = getAllStudents();
  return NextResponse.json({ students });
}

export async function POST(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { username, email, login_code } = await req.json();
    if (!username || !email) {
      return NextResponse.json({ error: 'Username and email are required.' }, { status: 400 });
    }
    const code = login_code?.trim() || generateCode();

    const student = createStudent({
      username,
      email,
      login_code: code,
    });

    return NextResponse.json({ ok: true, student, login_code: code });
  } catch (err) {
    console.error('admin POST student error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function PATCH(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, action } = await req.json();
    if (!id || !action) {
      return NextResponse.json({ error: 'Missing id or action.' }, { status: 400 });
    }

    let updates = {};
    let responseExtra = {};

    if (action === 'regenerate_code') {
      const code = generateCode();
      updates = { login_code: code };
      responseExtra = { login_code: code };
    } else if (action === 'mark_paid') {
      updates = { application_paid: true };
    } else if (action === 'mark_unpaid') {
      updates = { application_paid: false };
    } else {
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
    }

    const updated = updateStudent(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, ...responseExtra, student: updated });
  } catch (err) {
    console.error('admin PATCH student error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });

    const success = deleteStudent(id);
    if (!success) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin DELETE student error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
