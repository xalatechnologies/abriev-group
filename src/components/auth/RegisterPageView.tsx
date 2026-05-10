import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { RegisterCredentialsPanel } from "@/components/auth/RegisterCredentialsPanel";
import { Container } from "@/components/ui/Container";
import { REGISTER_PAGE_VISUAL } from "@/content/authRegister";
import { SITE } from "@/lib/constants/site";

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
      aria-describedby="register-rail-body"
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

          <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 text-white sm:p-8 lg:p-10 xl:p-12">
            <div className="max-w-xl pb-2">
              <span className="sr-only">{t("eyebrow")}</span>
              <h1
                id="register-headline"
                className="font-display-lg text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]"
              >
                {t("editorialHeadline")}
              </h1>
              <p
                id="register-rail-body"
                className="mt-5 font-body-lg text-body-lg leading-relaxed text-white/85 text-pretty"
              >
                {t("editorialRailBody")}
              </p>
              <p className="mt-8 font-label-caps text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
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
