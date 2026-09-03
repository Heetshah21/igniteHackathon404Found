import { NextRequest, NextResponse } from 'next/server';
import { careers } from '@/data/careers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const branch = searchParams.get('branch');

  if (branch) {
    const filtered = careers.filter((c) => c.branch.includes(branch.toLowerCase()));
    return NextResponse.json({ careers: filtered });
  }

  return NextResponse.json({ careers });
}
