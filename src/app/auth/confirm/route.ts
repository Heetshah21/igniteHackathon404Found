import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { EmailOtpType } from '@supabase/supabase-js';

/**
 * Server-side Email Confirmation Route Handler
 * Verifies token_hash with Supabase Auth server-side and sets SSR session cookies.
 * Expected query parameters: ?token_hash=...&type=email
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const code = searchParams.get('code');

  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocalEnv = process.env.NODE_ENV === 'development';
  const baseUrl = !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  // 1. Primary Flow: token_hash + type verification (Modern Supabase SSR flow)
  if (token_hash && type) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (!error) {
        // Verification succeeded and session cookies are established
        return NextResponse.redirect(`${baseUrl}/auth/confirm/success`);
      }

      console.error('Supabase OTP verification failed:', error.message);
      return NextResponse.redirect(`${baseUrl}/auth/confirm/success?error=verification_failed`);
    } catch (err) {
      console.error('Exception during OTP verification:', err);
      return NextResponse.redirect(`${baseUrl}/auth/confirm/success?error=server_error`);
    }
  }

  // 2. Secondary Flow: PKCE auth code exchange (fallback if PKCE URL was used)
  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${baseUrl}/auth/confirm/success`);
      }

      console.error('Supabase code exchange failed in confirm route:', error.message);
      return NextResponse.redirect(`${baseUrl}/auth/confirm/success?error=verification_failed`);
    } catch (err) {
      console.error('Exception during code exchange in confirm route:', err);
      return NextResponse.redirect(`${baseUrl}/auth/confirm/success?error=server_error`);
    }
  }

  // 3. No token_hash or code provided
  return NextResponse.redirect(`${baseUrl}/auth/confirm/success?error=missing_token`);
}
