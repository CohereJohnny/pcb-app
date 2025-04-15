import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Running for path: ${request.nextUrl.pathname}`);
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  let supabaseMiddlewareClient;
  try {
    console.log('[Middleware] Attempting to create Supabase client...');
    supabaseMiddlewareClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = request.cookies.get(name)?.value;
            // Optional detailed logging:
            // console.log(`[Middleware] Cookie GET: ${name} = ${cookie ? '[found]' : '[not found]'}`);
            return cookie;
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log(`[Middleware] Cookie SET: ${name}`);
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            console.log(`[Middleware] Cookie REMOVE: ${name}`);
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );
    console.log('[Middleware] Supabase client created successfully.');
  } catch (error) {
    console.error('[Middleware] Error creating Supabase client:', error);
    return response; // Return original response if client creation fails
  }

  try {
    // Refresh session if expired
    console.log('[Middleware] Attempting to get/refresh session...');
    const {
      data: { session },
      error: sessionError,
    } = await supabaseMiddlewareClient.auth.getSession();
    if (sessionError) {
      console.error('[Middleware] Error getting session:', sessionError);
    } else {
      console.log(
        `[Middleware] getSession completed. Session exists: ${!!session}`
      );
    }
  } catch (error) {
    console.error('[Middleware] Error calling getSession:', error);
  }

  console.log(`[Middleware] Finishing for path: ${request.nextUrl.pathname}`);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
