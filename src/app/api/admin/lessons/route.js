import { NextResponse } from 'next/server';
import { getAllLessons, upsertLesson } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/nodeAuth';

export async function GET(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const lessons = getAllLessons();
  return NextResponse.json({ lessons });
}

export async function POST(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, video_url, resources } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing lesson id.' }, { status: 400 });
    }

    const lesson = upsertLesson({ id: id.trim(), video_url, resources });
    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    console.error('admin POST lesson error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
