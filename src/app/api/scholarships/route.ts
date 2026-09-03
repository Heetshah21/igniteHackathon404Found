import { NextRequest, NextResponse } from 'next/server';
import { scholarships } from '@/data/scholarships';
import { evaluateEligibility } from '@/lib/eligibility/engine';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get('state');

  if (state && state !== 'all') {
    const filtered = scholarships.filter(
      (s) => !s.states || s.states.length === 0 || s.states.includes(state)
    );
    return NextResponse.json({ scholarships: filtered });
  }

  return NextResponse.json({ scholarships });
}
