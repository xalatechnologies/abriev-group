import "server-only";

import { routing } from "@/i18n/routing";

/** Localized marketing auth screen path (`/auth/login`, `/auth/register`, or `/am/...`). */
export function buildAuthScreenPath(locale: string, slug: "login" | "register"): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}/auth/${slug}`;
}

function allowedOAuthUiReturnPaths(): Set<string> {
  const set = new Set<string>();
  for (const locale of routing.locales) {
    set.add(buildAuthScreenPath(locale, "login"));
    set.add(buildAuthScreenPath(locale, "register"));
  }
  return set;
}

/** Validates `returnTo` from `/api/auth/*` initiation; rejects open redirects. */
export function validateOAuthUiReturnParam(candidate: string | null, fallback = "/auth/login"): string {
  const allowed = allowedOAuthUiReturnPaths();
  if (!candidate) return fallback;
  const raw = decodeURIComponent(candidate);
  const pathOnly = raw.split("?")[0]?.split("#")[0]?.trim();
  const normalized = pathOnly?.startsWith("/") ? pathOnly : pathOnly ? `/${pathOnly}` : "";
  if (!normalized || !allowed.has(normalized)) return fallback;
  return normalized;
}
