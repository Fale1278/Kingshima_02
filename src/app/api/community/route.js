import { NextResponse } from 'next/server';
import { posts } from '@/data/posts';

export async function GET() {
  try {
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newPost = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    // Note: This won't persist across server restarts in Next.js
    // but works for the current session/demo.
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
