import { NextRequest, NextResponse } from 'next/server';
import { getRoadmaps } from '@/lib/data/roadmaps';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const careerId = searchParams.get('careerId');

  const list = await getRoadmaps(careerId || undefined);

  return NextResponse.json({ roadmaps: list });
}
