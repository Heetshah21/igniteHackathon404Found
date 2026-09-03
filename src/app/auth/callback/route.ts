import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSafeRedirectUrl } from '@/lib/auth/safe-redirect';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const safeDestination = getSafeRedirectUrl(next);
        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${safeDestination}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${safeDestination}`);
        } else {
          return NextResponse.redirect(`${origin}${safeDestination}`);
        }
      } else {
        console.error('Auth code exchange error:', error.message);
      }
    } catch (e) {
      console.error('Callback error:', e);
    }
  }

  // If error or missing code, safely redirect to login with error parameter
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
