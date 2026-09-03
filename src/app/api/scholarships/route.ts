import { NextRequest, NextResponse } from 'next/server';
import { getScholarships } from '@/lib/data/scholarships';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get('state');

  const filtered = await getScholarships(state || undefined);

  return NextResponse.json({ scholarships: filtered });
}
