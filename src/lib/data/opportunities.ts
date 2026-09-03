import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Opportunity } from '@/types';

export async function getOpportunities(type?: string): Promise<Opportunity[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty opportunities array.');
    return [];
  }

  try {
    const supabase = createClient();
    let query = supabase.from('opportunities').select('*').order('title', { ascending: true });
    if (type && type.toLowerCase() !== 'all') {
      query = query.eq('type', type.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching opportunities from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    return (data || []) as Opportunity[];
  } catch (e) {
    console.error('Exception in getOpportunities:', e);
    return [];
  }
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching opportunity by id from Supabase:', error);
      return null;
    }

    return data as Opportunity | null;
  } catch (e) {
    console.error('Exception in getOpportunityById:', e);
    return null;
  }
}
