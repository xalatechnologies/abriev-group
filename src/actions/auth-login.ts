"use server";

import { getTranslations } from "next-intl/server";

export type LoginCredState = { status: "error"; message: string } | null;

export async function submitLoginCredentials(
  _prev: LoginCredState,
  formData: FormData,
): Promise<LoginCredState> {
  const t = await getTranslations("LoginPage");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: t("credentialEmailInvalid") };
  }
  if (password.length < 8) {
    return { status: "error", message: t("credentialPasswordShort") };
  }

  return { status: "error", message: t("credentialBackendPending") };
}
