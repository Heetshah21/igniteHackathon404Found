import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ComparisonData } from '@/types';

export async function getComparisons(): Promise<ComparisonData[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty comparisons array.');
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching comparisons from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return [];
    }

    return (data || []) as ComparisonData[];
  } catch (e) {
    console.error('Exception in getComparisons:', e);
    return [];
  }
}

export async function getComparisonBySlug(slug: string): Promise<ComparisonData | null> {
  if (!isSupabaseConfigured() || !slug) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching comparison by slug from Supabase:', error);
      return null;
    }

    return data as ComparisonData | null;
  } catch (e) {
    console.error('Exception in getComparisonBySlug:', e);
    return null;
  }
}

export async function getComparisonById(id: string): Promise<ComparisonData | null> {
  if (!isSupabaseConfigured() || !id) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching comparison by id from Supabase:', error);
      return null;
    }

    return data as ComparisonData | null;
  } catch (e) {
    console.error('Exception in getComparisonById:', e);
    return null;
  }
}
