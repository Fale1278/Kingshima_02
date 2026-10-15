import { NextResponse } from 'next/server';
import { getAllSubmissions } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/nodeAuth';

export async function GET(req) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const submissions = getAllSubmissions();
  return NextResponse.json({ submissions });
}
