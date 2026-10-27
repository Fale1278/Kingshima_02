import { NextResponse } from 'next/server';
import { getStudentByEmailOrUsername } from '@/lib/db';
import { comparePassword, signJwt } from '@/lib/nodeAuth';

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const username = (body.username || '').trim().toLowerCase();
    const identifier = (body.identifier || '').trim().toLowerCase();
    const login_code = (body.login_code || '').trim();
    const password = body.password || '';

    // Allow user to provide identifier alone, or email and username
    const lookupEmail = email || identifier;
    const lookupUsername = username || identifier;

    if (!lookupEmail && !lookupUsername) {
      return NextResponse.json(
        { error: 'Please enter your email or username.' },
        { status: 400 }
      );
    }

    const student = getStudentByEmailOrUsername(lookupEmail, lookupUsername);
    if (!student) {
      return NextResponse.json(
        { error: 'No student found with those credentials. Please register first.' },
        { status: 401 }
      );
    }

    let isValid = false;
    if (login_code && student.login_code && student.login_code.toLowerCase() === login_code.toLowerCase()) {
      isValid = true;
    } else if (password && student.password_hash && comparePassword(password, student.password_hash)) {
      isValid = true;
    } else if (!student.password_hash && !student.login_code) {
      isValid = true;
    } else if (!login_code && !password && student.login_code) {
      // If student forgot their code, tell them to use their code
      return NextResponse.json(
        { error: 'Please enter your 8-character login code to sign in.' },
        { status: 401 }
      );
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid login code or password. Please verify and try again.' },
        { status: 401 }
      );
    }

    const token = signJwt({ sub: student.id, email: student.email });

    return NextResponse.json({
      ok: true,
      student: { ...student, progress: Array.isArray(student.progress) ? student.progress : [] },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error during login. Please try again.' }, { status: 500 });
  }
}
