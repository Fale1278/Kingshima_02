import { NextResponse } from 'next/server';
import { programs } from '@/data/programs';

export async function GET() {
  try {
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
