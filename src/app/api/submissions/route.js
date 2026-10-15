import { NextResponse } from 'next/server';
import { createSubmission } from '@/lib/db';

export async function POST(req) {
  try {
    const { student_id, lesson_id, submission_link, uploaded_file, notes } = await req.json();

    if (!student_id || !lesson_id) {
      return NextResponse.json({ error: 'Missing student_id or lesson_id.' }, { status: 400 });
    }

    const submission = createSubmission({
      student_id,
      lesson_id,
      submission_link,
      uploaded_file,
      notes,
    });

    return NextResponse.json({ ok: true, submission });
  } catch (err) {
    console.error('submissions error:', err);
    return NextResponse.json({ error: 'Failed to create submission.' }, { status: 500 });
  }
}
