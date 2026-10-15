import { NextResponse } from 'next/server';
import { getStudentByEmailOrUsername } from '@/lib/db';
import { comparePassword, signJwt } from '@/lib/nodeAuth';

export async function POST(req) {
  try {
    const { email, username, login_code, password } = await req.json();
    if (!email || !username) {
      return NextResponse.json({ error: 'Please fill in both email and username.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    const student = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
    if (!student) {
      return NextResponse.json(
        { error: 'Invalid credentials. Student record not found.' },
        { status: 401 }
      );
    }

    let isValid = false;
    if (login_code && student.login_code === login_code.trim()) {
      isValid = true;
    } else if (password && student.password_hash && comparePassword(password, student.password_hash)) {
      isValid = true;
    } else if (!student.password_hash && !login_code) {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your email, username, and login code.' },
        { status: 401 }
      );
    }

    const token = signJwt({ sub: student.id, email: student.email });

    return NextResponse.json({
      student: { ...student, progress: Array.isArray(student.progress) ? student.progress : [] },
      token,
    });
  } catch (err) {
    console.error('login error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
