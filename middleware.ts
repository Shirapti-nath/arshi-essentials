import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Redirect bare / to base path when running a GitHub Pages-style build locally */
export function middleware(request: NextRequest) {
  if (!BASE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL(`${BASE}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
