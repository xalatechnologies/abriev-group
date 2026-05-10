import "server-only";

export function decodeGoogleIdTokenClaims(idToken: string): {
  email?: string;
  name?: string;
} | null {
  try {
    const parts = idToken.split(".");
    if (parts.length < 2) return null;
    const raw = parts[1]?.replace(/-/g, "+").replace(/_/g, "/") ?? "";
    const padded = raw + "=".repeat((4 - (raw.length % 4)) % 4);
    const json = Buffer.from(padded, "base64").toString("utf8");
    const data = JSON.parse(json) as { email?: string; name?: string };
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}
