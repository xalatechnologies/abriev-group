"use client";

import { useActionState, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Facebook } from "lucide-react";

import { submitLoginCredentials, type LoginCredState } from "@/actions/auth-login";
import { Link } from "@/i18n/navigation";
import { GoogleGlyph } from "@/components/auth/GoogleGlyph";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type LoginCredentialsPanelProps = {
  bannerMessage: string | null;
  oauthReturnPath: string;
};

const initialState: LoginCredState = null;

export function LoginCredentialsPanel({ bannerMessage, oauthReturnPath }: LoginCredentialsPanelProps) {
  const t = useTranslations("LoginPage");
  const googleHref = `/api/auth/google?returnTo=${encodeURIComponent(oauthReturnPath)}`;
  const facebookHref = `/api/auth/facebook?returnTo=${encodeURIComponent(oauthReturnPath)}`;
  const [state, formAction, pending] = useActionState(submitLoginCredentials, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const passwordHintId = useId();

  return (
    <SurfaceCard
      variant="lowest"
      bordered
      shadow="editorial"
      className="p-6 md:p-8 lg:p-10"
    >
      {bannerMessage ? (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-card-border bg-brand-primary/10 px-4 py-3 font-body-md text-body-md text-text-strong"
        >
          {bannerMessage}
        </p>
      ) : null}

      {state?.status === "error" ? (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-outline-variant bg-surface-container-high px-4 py-3 font-body-md text-[13px] text-error"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 pb-8">
        <h2 id="sign-in-panel-heading" className="font-headline-lg text-headline-lg text-text-strong">
          {t("panelTitle")}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant text-pretty">{t("panelSubtitle")}</p>
      </div>

      <form action={formAction} className="flex flex-col gap-6" aria-labelledby="sign-in-panel-heading">
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {t("emailLabel")}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t("emailPlaceholder")}
            className="rounded-xl border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor={passwordId}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant"
            >
              {t("passwordLabel")}
            </label>
            <Link
              href="/contact"
              className="whitespace-nowrap font-label-caps text-[11px] font-bold uppercase tracking-[0.12em] text-brand-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <p id={passwordHintId} className="font-body-md text-[13px] text-text-muted">
            {t("forgotHint")}
          </p>
          <div className="relative">
            <input
              id={passwordId}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              minLength={8}
              placeholder={t("passwordPlaceholder")}
              aria-describedby={passwordHintId}
              className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-4 pr-12 font-body-md text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-container-high hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              aria-label={showPassword ? t("passwordToggleHide") : t("passwordToggleShow")}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full bg-on-background font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-background transition-colors hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          {t("submitEmail")}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-outline-variant" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface-container-lowest px-4 font-label-caps text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
            {t("divider")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        {/* Full document navigation — `next/link` to `/api/*` can trigger App Router fetch and "Failed to fetch". */}
        <a
          href={googleHref}
          className="inline-flex h-12 min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-primary/35 dark:border-brand-primary/45 bg-surface px-4 font-label-caps text-[11px] font-bold uppercase tracking-[0.12em] text-text-strong transition-colors duration-300 hover:border-brand-primary hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          <GoogleGlyph className="shrink-0" />
          <span>{t("continueGoogle")}</span>
        </a>
        <a
          href={facebookHref}
          className="inline-flex h-12 min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-primary/35 dark:border-brand-primary/45 bg-surface px-4 font-label-caps text-[11px] font-bold uppercase tracking-[0.12em] text-text-strong transition-colors duration-300 hover:border-brand-primary hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          <Facebook className="size-5 shrink-0 text-[#0866FF]" aria-hidden />
          <span>{t("continueFacebook")}</span>
        </a>
      </div>

      <p className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-body-md text-body-md text-on-surface-variant">
        <span>
          <span>{t("registerPrompt")} </span>
          <Link
            href="/auth/register"
            className="font-semibold text-brand-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            {t("registerLink")}
          </Link>
        </span>
        <Link
          href="/"
          className="font-semibold uppercase tracking-[0.1em] text-text-strong underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          {t("returnHome")}
        </Link>
      </p>
    </SurfaceCard>
  );
}
