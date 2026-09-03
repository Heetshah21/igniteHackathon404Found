import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { roadmaps as staticRoadmaps } from '@/data/roadmaps';
import { Roadmap } from '@/types';

export async function getRoadmaps(careerId?: string): Promise<Roadmap[]> {
  if (!isSupabaseConfigured()) {
    return careerId ? staticRoadmaps.filter(r => r.career_id === careerId) : staticRoadmaps;
  }

  try {
    const supabase = createClient();
    let query = supabase.from('roadmaps').select('*');
    if (careerId) {
      query = query.eq('career_id', careerId);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return careerId ? staticRoadmaps.filter(r => r.career_id === careerId) : staticRoadmaps;
    }
    return data as Roadmap[];
  } catch (e) {
    console.error('Error fetching roadmaps from Supabase:', e);
    return careerId ? staticRoadmaps.filter(r => r.career_id === careerId) : staticRoadmaps;
  }
}
