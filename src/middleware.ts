import { NextResponse, type NextRequest } from "next/server";

/**
 * English lives at the root ("/moto") and Bulgarian under "/bg" ("/bg/moto").
 * Both are served by the [lang] route, so English paths are rewritten to "/en/...".
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/bg" || pathname.startsWith("/bg/")) return NextResponse.next();

  // One URL per page: "/en/moto" goes to "/moto"
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, static files, and the metadata and share-image routes
  matcher: ["/((?!_next|images|og|api|icon|apple-icon|sitemap|robots|manifest|.*\\.).*)"],
};
