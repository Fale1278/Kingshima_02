import { NextResponse } from 'next/server';
import { saveCertificate, getAllCertificates, getCertificatesByStudentId } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    if (studentId) {
      const certificates = getCertificatesByStudentId(studentId);
      return NextResponse.json({ ok: true, certificates });
    }

    const certificates = getAllCertificates();
    return NextResponse.json({ ok: true, certificates });
  } catch (err) {
    console.error('GET /api/certificates error:', err);
    return NextResponse.json({ error: 'Failed to fetch certificates.' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { student_id, course_id, student_name, course_name, grade, score, metadata } = body;

    if (!student_id || !course_id || !student_name || !course_name) {
      return NextResponse.json(
        { error: 'student_id, course_id, student_name, and course_name are required.' },
        { status: 400 }
      );
    }

    const certificate = saveCertificate({
      student_id,
      course_id,
      student_name,
      course_name,
      grade,
      score,
      metadata,
    });

    return NextResponse.json({ ok: true, certificate });
  } catch (err) {
    console.error('POST /api/certificates error:', err);
    return NextResponse.json({ error: 'Failed to issue certificate.' }, { status: 500 });
  }
}
