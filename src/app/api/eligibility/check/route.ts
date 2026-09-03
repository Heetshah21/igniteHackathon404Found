import { NextRequest, NextResponse } from 'next/server';
import { evaluateEligibility } from '@/lib/eligibility/engine';
import { getScholarships } from '@/lib/data/scholarships';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scholarshipId, profile } = body;

    const scholarships = await getScholarships();
    const sch = scholarships.find((s) => s.id === scholarshipId);
    if (!sch) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 });
    }

    const result = evaluateEligibility(sch.eligibility, profile || {});
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to evaluate eligibility' }, { status: 500 });
  }
}
