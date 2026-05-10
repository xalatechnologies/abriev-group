"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";

import type { ContactActionState } from "@/actions/contact";
import { submitContactForm } from "@/actions/contact";

const initialState: ContactActionState = null;

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state?.status !== "success") return;
    const form = document.getElementById("contact-main-form") as HTMLFormElement | null;
    form?.reset();
  }, [state]);

  const errors =
    state && "errors" in state && state.errors
      ? (state.errors ?? {})
      : {};

  const successCopy = state?.status === "success" ? state.message : null;

  return (
    <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial md:p-8">
      <div className="flex flex-col gap-2 pb-8">
        <h3 className="font-headline-lg text-headline-lg text-text-strong">{t("formTitle")}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-pretty">{t("formLede")}</p>
      </div>

      {successCopy ? (
        <p
          className="mb-8 rounded-xl border border-card-border-hover bg-brand-primary/10 px-4 py-3 font-body-md text-body-md text-text-strong"
          role="status"
        >
          {successCopy}
        </p>
      ) : null}

      <form id="contact-main-form" action={formAction} className="relative flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="font-label-caps text-label-caps uppercase text-on-surface-variant">
              {t("fieldFullName")}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              {...(errors.name ? { "aria-invalid": true as const } : {})}
              aria-describedby={errors.name ? "contact-name-err" : undefined}
              className="rounded-xl border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
              placeholder={t("fieldFullNamePlaceholder")}
            />
            {errors.name ? (
              <p id="contact-name-err" className="font-body-md text-[13px] text-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="font-label-caps text-label-caps uppercase text-on-surface-variant">
              {t("fieldEmail")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              {...(errors.email ? { "aria-invalid": true as const } : {})}
              aria-describedby={errors.email ? "contact-email-err" : undefined}
              className="rounded-xl border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
              placeholder={t("fieldEmailPlaceholder")}
            />
            {errors.email ? (
              <p id="contact-email-err" className="font-body-md text-[13px] text-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {t("fieldPhone")}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            {...(errors.phone ? { "aria-invalid": true as const } : {})}
            aria-describedby={errors.phone ? "contact-phone-err" : undefined}
            inputMode="tel"
            className="rounded-xl border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
            placeholder={t("fieldPhonePlaceholder")}
          />
          {errors.phone ? (
            <p id="contact-phone-err" className="font-body-md text-[13px] text-error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {t("fieldMessage")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            {...(errors.message ? { "aria-invalid": true as const } : {})}
            aria-describedby={errors.message ? "contact-message-err" : undefined}
            className="resize-y rounded-xl border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
            placeholder={t("fieldMessagePlaceholder")}
          />
          {errors.message ? (
            <p id="contact-message-err" className="font-body-md text-[13px] text-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-card-divider pt-6 transition-colors duration-300">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-brand-primary px-8 py-3 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-text-strong disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            {pending ? t("submitSending") : t("submitSend")}
          </button>
          <span className="max-w-[16rem] font-body-md text-xs text-text-muted">{t("spamNotice")}</span>
        </div>

        {/* Honeypot — leave empty */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="nickname">Nickname</label>
          <input id="nickname" name="botcheck" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      </form>
    </div>
  );
}
