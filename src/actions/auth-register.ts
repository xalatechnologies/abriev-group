"use server";

import { getTranslations } from "next-intl/server";

export type RegisterCredState = { status: "error"; message: string } | null;

export async function submitRegistration(
  _prev: RegisterCredState,
  formData: FormData,
): Promise<RegisterCredState> {
  const t = await getTranslations("RegisterPage");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  const lettersOnly = fullName.replace(/[^\p{L}\s'-]/gu, "").replace(/\s+/g, " ");
  if (lettersOnly.length < 2) {
    return { status: "error", message: t("credentialNameShort") };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: t("credentialEmailInvalid") };
  }
  if (password.length < 8) {
    return { status: "error", message: t("credentialPasswordShort") };
  }
  if (password !== confirm) {
    return { status: "error", message: t("credentialPasswordMismatch") };
  }

  return { status: "error", message: t("credentialBackendPending") };
}
