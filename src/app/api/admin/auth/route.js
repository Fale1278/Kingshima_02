import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code } = await req.json();
    const expected = process.env.ADMIN_CODE;

    if (!expected) {
      return NextResponse.json({ error: 'Admin access is not configured on the server yet.' }, { status: 500 });
    }
    if (!code || code !== expected) {
      return NextResponse.json({ error: 'Incorrect admin code.' }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
