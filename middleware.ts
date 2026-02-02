import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  console.log('🚀 [Middleware] EJECUTÁNDOSE - Path:', request.nextUrl.pathname);

  const { supabase, response } = createClient(request);

  // Obtener el usuario usando el cliente de middleware
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // DEBUG: Ver qué está pasando
  console.log('🔍 [Middleware]', {
    path: request.nextUrl.pathname,
    hasUser: !!user,
    userId: user?.id,
  });

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register');
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/orders') ||
    request.nextUrl.pathname.startsWith('/checkout');

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    console.log('🚫 [Middleware] Bloqueando acceso a ruta protegida sin auth');
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to home if accessing auth routes while authenticated
  if (isAuthRoute && user) {
    console.log('🔄 [Middleware] Usuario autenticado, redirigiendo desde auth route');
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
