import crypto from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";

import { setOAuthStateCookie, setOAuthUiReturnCookie } from "@/lib/auth/oauth-cookies";
import { getGoogleOAuthConfig, oauthPublicOrigin } from "@/lib/auth/oauth-env";
import { validateOAuthUiReturnParam } from "@/lib/auth/oauth-return-path";

export async function GET(request: NextRequest) {
  const origin = oauthPublicOrigin(request.headers, request.nextUrl);
  const uiReturn = validateOAuthUiReturnParam(request.nextUrl.searchParams.get("returnTo"));
  await setOAuthUiReturnCookie(uiReturn);

  const cfg = getGoogleOAuthConfig();
  if (!cfg) {
    return NextResponse.redirect(new URL(`${uiReturn}?error=oauth_unconfigured`, origin));
  }

  const state = crypto.randomBytes(24).toString("hex");
  await setOAuthStateCookie("google", state);
  const redirectUri = `${origin}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
