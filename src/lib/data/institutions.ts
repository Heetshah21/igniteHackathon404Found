import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Institution } from '@/types';
import { institutions as fallbackInstitutions } from '@/data/institutions';

export async function getInstitutions(): Promise<Institution[]> {
  if (!isSupabaseConfigured()) {
    return fallbackInstitutions;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('Supabase institutions query notice (using fallback):', error.message);
      }
      return fallbackInstitutions;
    }

    return (data || []) as Institution[];
  } catch (e) {
    console.warn('Exception in getInstitutions (using fallback):', e);
    return fallbackInstitutions;
  }
}

export async function getInstitutionBySlug(slug: string): Promise<Institution | null> {
  if (!slug) return null;

  if (!isSupabaseConfigured()) {
    return fallbackInstitutions.find((i) => i.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return fallbackInstitutions.find((i) => i.slug === slug) || null;
    }

    return data as Institution | null;
  } catch (e) {
    console.warn('Exception in getInstitutionBySlug:', e);
    return fallbackInstitutions.find((i) => i.slug === slug) || null;
  }
}
