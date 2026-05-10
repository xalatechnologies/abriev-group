import { type NextRequest, NextResponse } from "next/server";

import { decodeGoogleIdTokenClaims } from "@/lib/auth/jwt-id-token";
import {
  consumeOAuthStateCookie,
  setDemoOAuthSession,
  takeOAuthUiReturnPath,
} from "@/lib/auth/oauth-cookies";
import { getGoogleOAuthConfig, oauthPublicOrigin } from "@/lib/auth/oauth-env";

export async function GET(request: NextRequest) {
  const origin = oauthPublicOrigin(request.headers, request.nextUrl);

  async function oauthUiError(code: string) {
    const path = (await takeOAuthUiReturnPath()) ?? "/auth/login";
    return NextResponse.redirect(new URL(`${path}?error=${encodeURIComponent(code)}`, origin));
  }

  if (request.nextUrl.searchParams.get("error") === "access_denied") {
    return oauthUiError("oauth_denied");
  }

  const cfg = getGoogleOAuthConfig();
  if (!cfg) {
    return oauthUiError("oauth_unconfigured");
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!(await consumeOAuthStateCookie("google", state)) || !code) {
    return oauthUiError("oauth_state");
  }

  const redirectUri = `${origin}/api/auth/google/callback`;

  const body = new URLSearchParams({
    code,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  let tokenJson: Record<string, unknown>;
  try {
    const tokRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    tokenJson = (await tokRes.json()) as Record<string, unknown>;
    if (!tokRes.ok || typeof tokenJson.id_token !== "string") {
      return oauthUiError("oauth_failed");
    }
  } catch {
    return oauthUiError("oauth_failed");
  }

  const claims = decodeGoogleIdTokenClaims(tokenJson.id_token as string);

  await setDemoOAuthSession({
    provider: "google",
    email: typeof claims?.email === "string" ? claims.email : null,
    name: typeof claims?.name === "string" ? claims.name : null,
  });

  await takeOAuthUiReturnPath();
  return NextResponse.redirect(new URL(`/dashboard`, origin));
}
