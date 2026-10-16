import { NextResponse } from 'next/server';
import { getAllLessons, upsertLesson } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/nodeAuth';

export async function GET() {
  try {
    const lessons = getAllLessons();
    return NextResponse.json({ ok: true, lessons });
  } catch (err) {
    console.error('GET /api/lessons error:', err);
    return NextResponse.json({ error: 'Failed to fetch lessons.' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, course_id, title, video_url, resources } = body;
    if (!id) {
      return NextResponse.json({ error: 'Lesson id is required.' }, { status: 400 });
    }

    const lesson = upsertLesson({ id, course_id, title, video_url, resources });
    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    console.error('POST /api/lessons error:', err);
    return NextResponse.json({ error: 'Failed to save lesson.' }, { status: 500 });
  }
}
