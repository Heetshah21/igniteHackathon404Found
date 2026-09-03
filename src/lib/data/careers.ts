import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Career } from '@/types';

export async function getCareers(): Promise<Career[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty careers array.');
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching careers from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    return (data || []) as Career[];
  } catch (e) {
    console.error('Exception in getCareers:', e);
    return [];
  }
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
  if (!isSupabaseConfigured() || !slug) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching career by slug from Supabase:', error);
      return null;
    }

    return data as Career | null;
  } catch (e) {
    console.error('Exception in getCareerBySlug:', e);
    return null;
  }
}

export async function getCareerById(id: string): Promise<Career | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching career by id from Supabase:', error);
      return null;
    }

    return data as Career | null;
  } catch (e) {
    console.error('Exception in getCareerById:', e);
    return null;
  }
}

export async function getCareersByBranch(branch: string): Promise<Career[]> {
  const allCareers = await getCareers();
  if (!branch) return allCareers;
  return allCareers.filter((c) => c.branch && c.branch.includes(branch.toLowerCase()));
}
