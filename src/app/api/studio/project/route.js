import { NextResponse } from 'next/server';
import { getStudioProject, saveStudioProject } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const trackId = searchParams.get('trackId') || 'fullstack';

    if (!studentId) {
      return NextResponse.json({ ok: true, project: null });
    }

    const project = getStudioProject(studentId, trackId);
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error('GET /api/studio/project error:', err);
    return NextResponse.json({ error: 'Failed to retrieve studio project' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { student_id, track_id, files, whiteboard_data, whiteboard_snapshot_url, completed_objectives } = body;

    if (!student_id || !track_id) {
      return NextResponse.json({ error: 'Missing student_id or track_id' }, { status: 400 });
    }

    const project = saveStudioProject({
      student_id,
      track_id,
      files,
      whiteboard_data,
      whiteboard_snapshot_url,
      completed_objectives,
    });

    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error('POST /api/studio/project error:', err);
    return NextResponse.json({ error: 'Failed to save studio project' }, { status: 500 });
  }
}
