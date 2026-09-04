/**
 * Validates and returns a safe internal redirect URL.
 * Prevents open redirect vulnerabilities.
 */

const ALLOWED_PREFIXES = [
  '/dashboard',
  '/onboarding',
  '/profile',
  '/settings',
  '/reset-password',
  '/roadmap',
  '/scholarships',
  '/resources',
  '/compare',
  '/resume',
  '/opportunities',
  '/chat',
  '/auth/confirm',
];

const DEFAULT_REDIRECT = '/dashboard';

export function getSafeRedirectUrl(url: string | null | undefined): string {
  if (!url) return DEFAULT_REDIRECT;

  // Must start with a single forward slash (not // which is protocol-relative)
  if (!url.startsWith('/') || url.startsWith('//')) {
    return DEFAULT_REDIRECT;
  }

  // Block javascript: and other dangerous protocols
  if (url.toLowerCase().includes('javascript:')) {
    return DEFAULT_REDIRECT;
  }

  // Block data: URIs
  if (url.toLowerCase().includes('data:')) {
    return DEFAULT_REDIRECT;
  }

  // Check against allowed prefixes
  const isAllowed = ALLOWED_PREFIXES.some(
    (prefix) => url === prefix || url.startsWith(prefix + '/')|| url.startsWith(prefix + '?')
  );

  return isAllowed ? url : DEFAULT_REDIRECT;
}
