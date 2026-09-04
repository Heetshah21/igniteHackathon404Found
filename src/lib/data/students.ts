import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { StudentProfile } from '@/types';

/**
 * Fetch a student profile strictly matching the authenticated user's ID.
 * Never returns another user's profile, the first row, or a static demo fallback.
 */
export async function getStudentProfileByUserId(userId: string): Promise<StudentProfile | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const supabase = createClient();

    // Verify session user matches requested userId
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      console.warn('Security check: requested userId does not match authenticated session.');
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile from Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    return data as StudentProfile | null;
  } catch (e) {
    console.error('Error fetching profile from Supabase:', e);
    return null;
  }
}

/**
 * Update the active student profile strictly for the authenticated user's ID.
 * Enforces ownership by tying user_id directly to the session's auth.uid().
 */
export async function updateStudentProfile(userId: string, updates: Partial<StudentProfile>): Promise<StudentProfile | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const supabase = createClient();

    // Derive identity strictly from authenticated Supabase session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      console.error('Security violation: Cannot modify profile belonging to another user ID.');
      return null;
    }

    // Build payload ensuring user_id is ALWAYS the authenticated user's ID
    const payload: Record<string, any> = {
      ...updates,
      user_id: user.id, // Strictly overwrite user_id with auth user.id
      email: user.email || updates.email || '',
      name: updates.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
      updated_at: new Date().toISOString(),
    };

    // Remove primary key 'id' to let DB handle it or preserve existing
    delete payload.id;

    // Clean undefined keys
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });

    // Attempt UPDATE first for existing row
    const { data: updateData, error: updateError } = await supabase
      .from('profiles')
      .update(payload)
      .eq('user_id', user.id)
      .select()
      .maybeSingle();

    if (!updateError && updateData) {
      return updateData as StudentProfile;
    }

    // If update returned no row (e.g. initial profile creation before trigger), perform upsert
    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'user_id' })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error upserting profile in Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    return data as StudentProfile;
  } catch (e) {
    console.error('Error updating profile:', e);
    return null;
  }
}
