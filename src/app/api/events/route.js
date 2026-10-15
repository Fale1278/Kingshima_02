import { NextResponse } from 'next/server';
import { events } from '@/data/events';

export async function GET() {
  try {
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
