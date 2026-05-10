/** Server-only OAuth helpers; values come from AUTH_* env vars. */

import "server-only";

export type GoogleOAuthConfig = {
  clientId: string;
  clientSecret: string;
};

export type FacebookOAuthConfig = {
  appId: string;
  appSecret: string;
};

export function getGoogleOAuthConfig(): GoogleOAuthConfig | null {
  const clientId = process.env.AUTH_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function getFacebookOAuthConfig(): FacebookOAuthConfig | null {
  const appId = process.env.AUTH_FACEBOOK_APP_ID;
  const appSecret = process.env.AUTH_FACEBOOK_APP_SECRET;
  if (!appId || !appSecret) return null;
  return { appId, appSecret };
}

export function oauthPublicOrigin(headers: Headers, url: URL): string {
  const forwardedHost = headers.get("x-forwarded-host");
  const forwardedProto = headers.get("x-forwarded-proto");
  if (forwardedHost && forwardedProto) {
    const host = forwardedHost.split(",")[0]?.trim();
    const proto = forwardedProto.split(",")[0]?.trim();
    if (host && proto) return `${proto}://${host}`;
  }
  const fromEnv = process.env.AUTH_PUBLIC_ORIGIN?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return url.origin;
}
