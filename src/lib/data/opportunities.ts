import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { opportunities as staticOpportunities } from '@/data/opportunities';
import { Opportunity } from '@/types';

export async function getOpportunities(): Promise<Opportunity[]> {
  if (!isSupabaseConfigured()) {
    return staticOpportunities;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('opportunities').select('*');
    if (error || !data || data.length === 0) {
      return staticOpportunities;
    }
    return data as Opportunity[];
  } catch (e) {
    console.error('Error fetching opportunities from Supabase:', e);
    return staticOpportunities;
  }
}
