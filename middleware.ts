import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const LEGACY_PREFIX = "/arshi-essentials";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dev (no base path): fix links that still use /arshi-essentials/...
  if (!BASE && pathname.startsWith(LEGACY_PREFIX)) {
    const stripped = pathname.slice(LEGACY_PREFIX.length) || "/";
    return NextResponse.redirect(
      new URL(`${stripped}${request.nextUrl.search}`, request.url)
    );
  }

  // Production: send bare / to the project subpath
  if (BASE && (pathname === "/" || pathname === "")) {
    return NextResponse.redirect(new URL(`${BASE}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/arshi-essentials", "/arshi-essentials/:path*"],
};
