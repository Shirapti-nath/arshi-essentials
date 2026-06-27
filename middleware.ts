import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE = "/arshi-essentials";

/** Redirect bare localhost:3000/ to the app base path in dev */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL(`${BASE}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
