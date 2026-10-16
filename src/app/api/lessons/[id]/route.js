import { NextResponse } from 'next/server';
import { getLessonById, upsertLesson } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/nodeAuth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing lesson id' }, { status: 400 });
    }

    const lesson = getLessonById(id);
    if (!lesson) {
      return NextResponse.json({ ok: true, lesson: null });
    }

    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    console.error('GET /api/lessons/[id] error:', err);
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const lesson = upsertLesson({ id, ...body });
    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    console.error('PATCH /api/lessons/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}
