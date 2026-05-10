import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** App Router server actions POST with header `next-action` (see `next/dist/client/components/app-router-headers`). */
function isNextServerActionPost(request: NextRequest): boolean {
  return request.method === "POST" && request.headers.has("next-action");
}

export default function middleware(request: NextRequest) {
  // Locale middleware rewrites redirects can interfere with the action POST; symptoms include
  // `TypeError: Failed to fetch` in the browser when submitting forms/useActionState.
  if (isNextServerActionPost(request)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
