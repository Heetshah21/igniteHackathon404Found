import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { resources as staticResources } from '@/data/resources';
import { Resource } from '@/types';

export async function getResources(): Promise<Resource[]> {
  if (!isSupabaseConfigured()) {
    return staticResources;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('resources').select('*');
    if (error || !data || data.length === 0) {
      return staticResources;
    }
    return data as Resource[];
  } catch (e) {
    console.error('Error fetching resources from Supabase:', e);
    return staticResources;
  }
}
