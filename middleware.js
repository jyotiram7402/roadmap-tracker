import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const PUBLIC_PREFIXES = ["/login", "/signup", "/auth", "/forgot-password"];
const isPublicPath = (p) => p === "/" || PUBLIC_PREFIXES.some((x) => p.startsWith(x));

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Public pages (and missing config) never need an auth lookup. Let them through
  // immediately so a slow/paused Supabase can't 504 the whole site. Each page also
  // has a client-side auth guard, and RLS protects all data, so this is safe.
  if (!supabaseUrl || !supabaseKey || isPublicPath(path)) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  try {
    // Cap the auth call so it can never hang the request (prevents 504s when
    // Supabase is slow/unreachable). On timeout, fail open — the page's own
    // client-side guard still redirects truly-unauthenticated users to /login.
    const timed = new Promise((resolve) => setTimeout(() => resolve({ __timedOut: true }), 2500));
    const result = await Promise.race([supabase.auth.getUser(), timed]);
    if (result && result.__timedOut) return response;

    const user = result?.data?.user;
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } catch {
    return response; // fail open on any auth error rather than 500/504
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
