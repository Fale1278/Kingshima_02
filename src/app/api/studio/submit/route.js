import { NextResponse } from 'next/server';
import { gradeAssignmentSubmission } from '@/lib/aiGrader';
import { createSubmission, addStudentXp, touchStudentStreak, getStudentById } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, trackId, code, files, whiteboardSnapshotUrl, notes } = body;

    const courseId = trackId === 'ai-agents' ? 'ai-automations' : trackId === 'data-eng' ? 'data-analysis' : 'web-dev';
    const effectiveCode = code || (Array.isArray(files) ? files.map(f => f.content).join('\n') : 'Studio project submission');

    // Run AI Evaluation
    const gradeResult = gradeAssignmentSubmission(effectiveCode, courseId, `studio-${trackId}`);

    let student = null;
    let newXp = 0;
    let streak = 1;

    if (studentId) {
      // Record submission in SQLite
      createSubmission({
        student_id: studentId,
        lesson_id: `studio-${trackId || 'fullstack'}`,
        submission_link: whiteboardSnapshotUrl || null,
        uploaded_file: null,
        notes: notes || `Submitted from Kingshima AI Studio (${trackId})`,
        ai_score: gradeResult.score,
        ai_grade: gradeResult.grade,
        ai_feedback: JSON.stringify(gradeResult),
      });

      // Award XP & touch streak
      addStudentXp(studentId, 150);
      touchStudentStreak(studentId);
      student = getStudentById(studentId);
      newXp = student?.xp || 150;
      streak = student?.streak_days || 1;
    }

    return NextResponse.json({
      ok: true,
      grade: gradeResult,
      xpEarned: 150,
      totalXp: newXp,
      streak,
      student,
    });
  } catch (err) {
    console.error('POST /api/studio/submit error:', err);
    return NextResponse.json({ error: 'Failed to evaluate studio assignment' }, { status: 500 });
  }
}
