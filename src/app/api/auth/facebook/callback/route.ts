import { type NextRequest, NextResponse } from "next/server";

import {
  consumeOAuthStateCookie,
  setDemoOAuthSession,
  takeOAuthUiReturnPath,
} from "@/lib/auth/oauth-cookies";
import { getFacebookOAuthConfig, oauthPublicOrigin } from "@/lib/auth/oauth-env";

const FB_GRAPH = "21.0";

export async function GET(request: NextRequest) {
  const origin = oauthPublicOrigin(request.headers, request.nextUrl);

  async function oauthUiError(code: string) {
    const path = (await takeOAuthUiReturnPath()) ?? "/auth/login";
    return NextResponse.redirect(new URL(`${path}?error=${encodeURIComponent(code)}`, origin));
  }

  if (request.nextUrl.searchParams.get("error") === "access_denied") {
    return oauthUiError("oauth_denied");
  }

  const cfg = getFacebookOAuthConfig();
  if (!cfg) {
    return oauthUiError("oauth_unconfigured");
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!(await consumeOAuthStateCookie("facebook", state)) || !code) {
    return oauthUiError("oauth_state");
  }

  const redirectUri = `${origin}/api/auth/facebook/callback`;

  let accessToken: string;
  try {
    const tokParams = new URLSearchParams({
      client_id: cfg.appId,
      redirect_uri: redirectUri,
      client_secret: cfg.appSecret,
      code,
    });
    const tokRes = await fetch(
      `https://graph.facebook.com/v${FB_GRAPH}/oauth/access_token?${tokParams.toString()}`,
    );
    const tokJson = (await tokRes.json()) as { access_token?: string };
    if (!tokRes.ok || typeof tokJson.access_token !== "string") {
      return oauthUiError("oauth_failed");
    }
    accessToken = tokJson.access_token;
  } catch {
    return oauthUiError("oauth_failed");
  }

  try {
    const meRes = await fetch(
      `https://graph.facebook.com/v${FB_GRAPH}/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`,
    );
    const me = (await meRes.json()) as { email?: string; name?: string; error?: unknown };
    if (!meRes.ok || me.error) {
      return oauthUiError("oauth_failed");
    }

    await setDemoOAuthSession({
      provider: "facebook",
      email: typeof me.email === "string" ? me.email : null,
      name: typeof me.name === "string" ? me.name : null,
    });
  } catch {
    return oauthUiError("oauth_failed");
  }

  await takeOAuthUiReturnPath();
  return NextResponse.redirect(new URL(`/dashboard`, origin));
}
