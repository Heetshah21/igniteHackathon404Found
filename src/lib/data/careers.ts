import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { careers as staticCareers } from '@/data/careers';
import { Career } from '@/types';

export async function getCareers(): Promise<Career[]> {
  if (!isSupabaseConfigured()) {
    return staticCareers;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('careers').select('*');

    if (error) {
      console.warn('Supabase careers fetch query error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return staticCareers;
    }

    if (!data || data.length === 0) {
      console.info('Supabase careers table is currently empty (0 rows), using static catalog fallback.');
      return staticCareers;
    }

    return data as Career[];
  } catch (e) {
    console.error('Error fetching careers from Supabase:', e);
    return staticCareers;
  }
}

export async function getCareersByBranch(branch: string): Promise<Career[]> {
  const allCareers = await getCareers();
  if (!branch) return allCareers;
  return allCareers.filter((c) => c.branch && c.branch.includes(branch.toLowerCase()));
}
