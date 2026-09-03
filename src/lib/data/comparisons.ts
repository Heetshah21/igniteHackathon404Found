import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ComparisonData } from '@/types';
import { comparisons as fallbackComparisons } from '@/data/comparisons';

export async function getComparisons(): Promise<ComparisonData[]> {
  if (!isSupabaseConfigured()) {
    return fallbackComparisons;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase comparisons query notice (using fallback):', error.message);
      return fallbackComparisons;
    }

    if (!data || data.length === 0) {
      return fallbackComparisons;
    }

    return (data || []) as ComparisonData[];
  } catch (e) {
    console.warn('Exception in getComparisons (using fallback):', e);
    return fallbackComparisons;
  }
}

export async function getComparisonBySlug(slug: string): Promise<ComparisonData | null> {
  if (!slug) return null;

  if (!isSupabaseConfigured()) {
    return fallbackComparisons.find((c) => c.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return fallbackComparisons.find((c) => c.slug === slug) || null;
    }

    return data as ComparisonData | null;
  } catch (e) {
    console.warn('Exception in getComparisonBySlug:', e);
    return fallbackComparisons.find((c) => c.slug === slug) || null;
  }
}

export async function getComparisonById(id: string): Promise<ComparisonData | null> {
  if (!id) return null;

  if (!isSupabaseConfigured()) {
    return fallbackComparisons.find((c) => c.id === id) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return fallbackComparisons.find((c) => c.id === id) || null;
    }

    return data as ComparisonData | null;
  } catch (e) {
    console.warn('Exception in getComparisonById:', e);
    return fallbackComparisons.find((c) => c.id === id) || null;
  }
}
