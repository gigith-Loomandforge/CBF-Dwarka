import { NextRequest, NextResponse } from "next/server";

const APEX_HOST = "cbfdwarka.org";
const CANONICAL_HOST = "www.cbfdwarka.org";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.hostname = CANONICAL_HOST;
  canonicalUrl.protocol = "https:";

  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
