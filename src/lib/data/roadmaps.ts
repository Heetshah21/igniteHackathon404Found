import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Roadmap } from '@/types';

export async function getRoadmaps(careerId?: string): Promise<Roadmap[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty roadmaps array.');
    return [];
  }

  try {
    const supabase = createClient();
    let query = supabase.from('roadmaps').select('*');
    if (careerId) {
      query = query.eq('career_id', careerId);
    }
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching roadmaps from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    return (data || []) as Roadmap[];
  } catch (e) {
    console.error('Exception in getRoadmaps:', e);
    return [];
  }
}

export async function getRoadmapById(id: string): Promise<Roadmap | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching roadmap by id from Supabase:', error);
      return null;
    }

    return data as Roadmap | null;
  } catch (e) {
    console.error('Exception in getRoadmapById:', e);
    return null;
  }
}

export async function getRoadmapsByCareer(careerId: string): Promise<Roadmap[]> {
  return getRoadmaps(careerId);
}
