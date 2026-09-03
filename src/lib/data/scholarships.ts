import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Scholarship } from '@/types';

export async function getScholarships(state?: string): Promise<Scholarship[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty scholarships array.');
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching scholarships from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    const list = (data || []) as Scholarship[];
    if (!state || state.toLowerCase() === 'all') {
      return list;
    }

    return list.filter(
      (s) => !s.states || s.states.length === 0 || s.states.some((st) => st.toLowerCase() === state.toLowerCase())
    );
  } catch (e) {
    console.error('Exception in getScholarships:', e);
    return [];
  }
}

export async function getScholarshipById(id: string): Promise<Scholarship | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching scholarship by id from Supabase:', error);
      return null;
    }

    return data as Scholarship | null;
  } catch (e) {
    console.error('Exception in getScholarshipById:', e);
    return null;
  }
}
