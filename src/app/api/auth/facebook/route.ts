import crypto from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";

import { setOAuthStateCookie, setOAuthUiReturnCookie } from "@/lib/auth/oauth-cookies";
import { getFacebookOAuthConfig, oauthPublicOrigin } from "@/lib/auth/oauth-env";
import { validateOAuthUiReturnParam } from "@/lib/auth/oauth-return-path";

const FB_GRAPH = "21.0";

export async function GET(request: NextRequest) {
  const origin = oauthPublicOrigin(request.headers, request.nextUrl);
  const uiReturn = validateOAuthUiReturnParam(request.nextUrl.searchParams.get("returnTo"));
  await setOAuthUiReturnCookie(uiReturn);

  const cfg = getFacebookOAuthConfig();
  if (!cfg) {
    return NextResponse.redirect(new URL(`${uiReturn}?error=oauth_unconfigured`, origin));
  }

  const state = crypto.randomBytes(24).toString("hex");
  await setOAuthStateCookie("facebook", state);
  const redirectUri = `${origin}/api/auth/facebook/callback`;

  const params = new URLSearchParams({
    client_id: cfg.appId,
    redirect_uri: redirectUri,
    state,
    response_type: "code",
    scope: "email,public_profile",
  });

  return NextResponse.redirect(
    `https://www.facebook.com/v${FB_GRAPH}/dialog/oauth?${params.toString()}`,
  );
}
