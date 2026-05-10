import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { MakeModelFacets } from "@/lib/utils/makeModelFacets";
import { hero as heroMedia } from "@/content/homePageReference";
import { HomeHeroSearchBar } from "./HomeHeroSearchBar";

type HomeMarketingHeroProps = {
  facets: MakeModelFacets;
};

export async function HomeMarketingHero({ facets }: HomeMarketingHeroProps) {
  const t = await getTranslations("HomeMarketingHero");
  const checklist = t.raw("checklist") as readonly string[];

  return (
    <>
      <section className="relative isolate w-full overflow-hidden bg-neutral-950 font-primary">
        {/* Background photograph */}
        <Image
          src={heroMedia.backgroundSrc}
          alt={t("backgroundAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[60%_50%] lg:object-[58%_45%]"
          quality={100}
          unoptimized
        />

        {/* Scrims for text legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(96deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.55)_38%,rgba(0,0,0,0.30)_70%,rgba(0,0,0,0.20)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent md:h-40"
        />

        <div className="relative z-10 mx-auto flex w-full flex-col edge-x pb-40 pt-20 md:pb-44 md:pt-24 lg:min-h-[680px] lg:pb-48 lg:pt-24">
          <div className="max-w-5xl text-white lg:max-w-6xl">
            {/* Green eyebrow chip */}
            <span className="inline-flex items-center rounded-full bg-brand-primary px-4 py-2 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_22px_-10px_rgba(0,143,76,0.7)]">
              {t("eyebrow")}
            </span>

            <h1 className="mt-6 font-display-lg text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance] drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]">
              {t("line1")} {t("line2")}
            </h1>

            {/* Inline trust items — no pill chrome, just icon + text */}
            <ul role="list" className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              {checklist.map((line) => (
                <li
                  key={line}
                  className="inline-flex items-center gap-2 font-body-md text-body-md font-medium text-white/90"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,143,76,0.55)]">
                    <Check className="size-3 text-white" strokeWidth={3.25} aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={heroMedia.primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-primary px-7 font-body-md text-body-md font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,143,76,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,143,76,0.85)] active:translate-y-0"
              >
                {t("primaryCta")}
              </Link>
              <Link
                href={heroMedia.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.10] px-7 font-body-md text-body-md font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.16]"
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search card — sits across the seam between hero and the section below */}
      <div className="relative z-20 -mt-24 mb-4 md:-mt-28 md:mb-6 lg:-mt-32">
        <div className="mx-auto w-full edge-x">
          <HomeHeroSearchBar facets={facets} presentation="elevated" />
        </div>
      </div>
    </>
  );
}
