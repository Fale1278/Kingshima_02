import { NextResponse } from 'next/server';
import { getStudentByEmailOrUsername, createStudent } from '@/lib/db';
import { hashPassword, signJwt } from '@/lib/nodeAuth';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateCode(length = 8) {
  return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
}

export async function POST(req) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username) {
      return NextResponse.json({ error: 'Please fill in both email and username.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    const existing = getStudentByEmailOrUsername(cleanEmail, cleanUsername);
    if (existing) {
      return NextResponse.json(
        { error: 'A student with this email or username is already registered.' },
        { status: 409 }
      );
    }

    const code = generateCode();
    const passwordHash = password ? hashPassword(password) : null;

    const newStudent = createStudent({
      username: cleanUsername,
      email: cleanEmail,
      login_code: code,
      password_hash: passwordHash,
    });

    const token = signJwt({ sub: newStudent.id, email: newStudent.email });

    return NextResponse.json({ ok: true, student: newStudent, login_code: code, token });
  } catch (err) {
    console.error('register error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
