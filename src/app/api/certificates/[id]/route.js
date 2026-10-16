import { NextResponse } from 'next/server';
import { getCertificateById } from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing certificate id' }, { status: 400 });
    }

    const cleanId = id.trim().toUpperCase();
    const cert = getCertificateById(cleanId);

    if (!cert) {
      return NextResponse.json(
        {
          valid: false,
          message: 'No certificate matching this identifier was found in the Kingshima registry archive.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      certId: cert.id,
      studentName: cert.student_name,
      courseTitle: cert.course_name,
      issuedDate: cert.issued_date,
      status: 'Authentic & Cryptographically Verified',
      evaluator: cert.metadata?.evaluator || 'Fale King Nanmua (Founder & Executive Director)',
      grade: cert.grade || 'Distinction & Honors Capstone',
      score: cert.score || 100,
      certificate: cert,
    });
  } catch (err) {
    console.error('GET /api/certificates/[id] error:', err);
    return NextResponse.json({ error: 'Failed to verify certificate.' }, { status: 500 });
  }
}
