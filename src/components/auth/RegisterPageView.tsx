import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Check, ChevronRight } from "lucide-react";

import { RegisterCredentialsPanel } from "@/components/auth/RegisterCredentialsPanel";
import { Container } from "@/components/ui/Container";
import { REGISTER_PAGE_VISUAL } from "@/content/authRegister";
import { SITE } from "@/lib/constants/site";
import { Link } from "@/i18n/navigation";

type RegisterPageViewProps = {
  bannerCode?: string;
  oauthReturnPath: string;
};

function resolveOAuthBannerMessage(
  t: (key: string) => string,
  bannerCode?: string,
): string | null {
  switch (bannerCode) {
    case "oauth_unconfigured":
      return t("oauthUnconfiguredBanner");
    case "oauth_failed":
      return t("oauthFailedBanner");
    case "oauth_denied":
      return t("oauthDeniedBanner");
    case "oauth_state":
      return t("oauthStateBanner");
    default:
      return null;
  }
}

export async function RegisterPageView({ bannerCode, oauthReturnPath }: RegisterPageViewProps) {
  const t = await getTranslations("RegisterPage");
  const bannerMessage = resolveOAuthBannerMessage(t, bannerCode);

  return (
    <section
      className="section-y bg-surface font-primary"
      aria-labelledby="register-headline"
      aria-describedby="register-intro"
    >
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-card-border lg:shadow-editorial">
        <div className="relative isolate min-h-[min(56vh,540px)] overflow-hidden lg:min-h-[min(88vh,880px)]">
          <Image
            src={REGISTER_PAGE_VISUAL.src}
            alt={REGISTER_PAGE_VISUAL.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[52%_42%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/50 to-black/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent"
          />

          <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm text-white/90 underline-offset-4 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {t("breadcrumbHome")}
                  </Link>
                </li>
                <li aria-hidden className="text-white/35">
                  <ChevronRight className="mx-0.5 inline size-3.5 -translate-y-px" aria-hidden />
                </li>
                <li className="text-white" aria-current="page">
                  {t("breadcrumbCurrent")}
                </li>
              </ol>
            </nav>

            <div className="mt-16 max-w-xl pb-8 lg:mt-auto lg:pb-0">
              <p className="font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
                {t("eyebrow")}
              </p>
              <h1
                id="register-headline"
                className="mt-3 font-display-lg text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]"
              >
                {t("editorialHeadline")}
              </h1>
              <p id="register-intro" className="mt-5 font-body-lg text-body-lg leading-relaxed text-white/85 text-pretty">
                {t("editorialLede")}
              </p>
              <p className="mt-5 font-body-md text-body-md text-white/72 text-pretty sm:max-w-md">
                {t("editorialBulletsIntro")}
              </p>
              <ul role="list" className="mt-8 space-y-3.5">
                {[t("bulletConcierge"), t("bulletShortlist"), t("bulletConsent")].map((line) => (
                  <li key={line} className="flex gap-3 font-body-md text-body-md text-white/88">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary shadow-[0_0_14px_-4px_rgba(0,143,76,0.85)]">
                      <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-label-caps text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                {SITE.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-surface-container-lowest px-4 py-10 sm:px-8 lg:px-10 xl:px-14">
          <RegisterCredentialsPanel
            bannerMessage={bannerMessage}
            oauthReturnPath={oauthReturnPath}
          />
        </div>
      </Container>
    </section>
  );
}
