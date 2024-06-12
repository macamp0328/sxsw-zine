import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path matches the expected pattern for picture slugs
  const pictureSlugPattern = /^\/[a-z0-9-]+$/;
  if (pictureSlugPattern.test(pathname)) {
    // Return a response without reloading the page
    return NextResponse.rewrite(request.nextUrl);
  }

  // Continue with normal handling for other paths
  return NextResponse.next();
}

// Specify the paths to be handled by this middleware
export const config = {
  matcher: ['/((?!_next|static|api).*)'],
};
