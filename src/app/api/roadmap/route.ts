import { NextRequest, NextResponse } from 'next/server';
import { roadmaps } from '@/data/roadmaps';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const careerId = searchParams.get('careerId');

  if (careerId) {
    const list = roadmaps.filter((r) => r.career_id === careerId);
    return NextResponse.json({ roadmaps: list });
  }

  return NextResponse.json({ roadmaps });
}
