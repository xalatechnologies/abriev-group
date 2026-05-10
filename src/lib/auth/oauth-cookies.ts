import "server-only";

import { cookies } from "next/headers";

import { validateOAuthUiReturnParam } from "@/lib/auth/oauth-return-path";

const PREFIX = "abri_oauth_";

const UI_RETURN = `${PREFIX}ui_return`;

export async function setOAuthUiReturnCookie(path: string) {
  const jar = await cookies();
  jar.set(UI_RETURN, validateOAuthUiReturnParam(path), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
}

/** Returns stored path and clears the cookie (consume once). */
export async function takeOAuthUiReturnPath(): Promise<string | null> {
  const jar = await cookies();
  const raw = jar.get(UI_RETURN)?.value ?? null;
  jar.delete(UI_RETURN);
  return raw;
}

export async function setOAuthStateCookie(provider: "google" | "facebook", state: string) {
  const jar = await cookies();
  jar.set(`${PREFIX}${provider}_state`, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
}

export async function consumeOAuthStateCookie(
  provider: "google" | "facebook",
  queryState: string | null,
): Promise<boolean> {
  if (!queryState) return false;
  const jar = await cookies();
  const name = `${PREFIX}${provider}_state`;
  const stored = jar.get(name)?.value;
  jar.delete(name);
  return !!stored && stored === queryState;
}

const SESSION = "abri_demo_session";

export type DemoOAuthSessionPayload = {
  provider: "google" | "facebook";
  email: string | null;
  name?: string | null;
};

export async function setDemoOAuthSession(payload: DemoOAuthSessionPayload) {
  const jar = await cookies();
  jar.set(SESSION, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
