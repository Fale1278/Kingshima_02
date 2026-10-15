import { NextResponse } from 'next/server';
import { upsertProfile } from '@/lib/db';

export async function POST(req) {
  try {
    const { studentId, role, goal, experience } = await req.json();
    if (!studentId) {
      return NextResponse.json({ error: 'Missing studentId.' }, { status: 400 });
    }

    const profile = upsertProfile(studentId, {
      role,
      goal,
      experience,
      onboarding_complete: true,
    });

    return NextResponse.json({ ok: true, profile });
  } catch (err) {
    console.error('onboarding error:', err);
    return NextResponse.json({ error: 'Failed to save onboarding data.' }, { status: 500 });
  }
}
