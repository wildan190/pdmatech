
import { NextResponse, type NextRequest } from 'next/server';
import { i18n } from './i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales.map(String);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    const newHost = hostname.replace('www.', '');
    const newUrl = new URL(`https://${newHost}${pathname}${search}`);
    return NextResponse.redirect(newUrl, 301);
  }
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);


  // Check if the request is for a static file in the `public` directory
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/svg/') ||
    [
      '/sitemap.xml',
      '/robots.txt',
      '/favicon.ico',
      '/logo.png',
    ].includes(pathname)
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Preserve search parameters during redirect
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(newUrl);
  }
  
  // If we have a locale, just continue
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)'],
};
