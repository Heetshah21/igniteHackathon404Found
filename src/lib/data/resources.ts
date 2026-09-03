import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Resource } from '@/types';

export async function getResources(): Promise<Resource[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty resources array.');
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching resources from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    return (data || []) as Resource[];
  } catch (e) {
    console.error('Exception in getResources:', e);
    return [];
  }
}

export async function getResourceById(id: string): Promise<Resource | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching resource by id from Supabase:', error);
      return null;
    }

    return data as Resource | null;
  } catch (e) {
    console.error('Exception in getResourceById:', e);
    return null;
  }
}
