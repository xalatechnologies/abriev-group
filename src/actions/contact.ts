"use server";

import { z } from "zod";
import { getTranslations } from "next-intl/server";

export type ContactActionState =
  | null
  | { status: "success"; message: string }
  | {
      status: "error";
      errors: Partial<Record<"name" | "email" | "phone" | "message", string>>;
    };

/** Placeholder ingestion — swap for email provider / CRM webhook when wired. */
export async function submitContactForm(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const ta = await getTranslations("ContactAction");

  const botGuard = String(formData.get("botcheck") ?? "").trim();
  if (botGuard) {
    return { status: "success", message: ta("successBot") };
  }

  const contactSchema = z.object({
    name: z.string().trim().min(2, ta("nameError")).max(120),
    email: z.string().trim().email(ta("emailError")),
    phone: z.string().trim().max(48).optional(),
    message: z
      .string()
      .trim()
      .min(15, ta("messageShort"))
      .max(4000),
  });

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        ...(fieldErrors.name?.[0] ? { name: fieldErrors.name[0] } : {}),
        ...(fieldErrors.email?.[0] ? { email: fieldErrors.email[0] } : {}),
        ...(fieldErrors.phone?.[0] ? { phone: fieldErrors.phone[0] } : {}),
        ...(fieldErrors.message?.[0] ? { message: fieldErrors.message[0] } : {}),
      },
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    status: "success",
    message: ta("success"),
  };
}
