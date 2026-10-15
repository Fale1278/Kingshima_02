import { NextResponse } from 'next/server';
import { updateStudent } from '@/lib/db';

export async function POST(req) {
  try {
    const { studentId, progress } = await req.json();
    if (!studentId || !Array.isArray(progress)) {
      return NextResponse.json({ error: 'Missing studentId or progress.' }, { status: 400 });
    }

    const updated = updateStudent(studentId, { progress });
    if (!updated) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, student: updated });
  } catch (err) {
    console.error('progress update error:', err);
    return NextResponse.json({ error: 'Could not save progress.' }, { status: 500 });
  }
}
