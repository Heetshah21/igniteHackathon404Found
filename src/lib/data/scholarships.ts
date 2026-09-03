import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { scholarships as staticScholarships } from '@/data/scholarships';
import { Scholarship } from '@/types';

export async function getScholarships(state?: string): Promise<Scholarship[]> {
  if (!isSupabaseConfigured()) {
    if (!state || state === 'all') return staticScholarships;
    return staticScholarships.filter(s => !s.states || s.states.length === 0 || s.states.includes(state));
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('scholarships').select('*');
    if (error || !data || data.length === 0) {
      if (!state || state === 'all') return staticScholarships;
      return staticScholarships.filter(s => !s.states || s.states.length === 0 || s.states.includes(state));
    }
    const list = data as Scholarship[];
    if (!state || state === 'all') return list;
    return list.filter(s => !s.states || s.states.length === 0 || s.states.includes(state));
  } catch (e) {
    console.error('Error fetching scholarships from Supabase:', e);
    return staticScholarships;
  }
}
