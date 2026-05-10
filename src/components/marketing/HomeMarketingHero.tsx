import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import type { MakeModelFacets } from "@/lib/utils/makeModelFacets";
import { hero as heroCopy } from "@/content/homePageReference";
import { HomeHeroSearchBar } from "./HomeHeroSearchBar";

type HomeMarketingHeroProps = {
  facets: MakeModelFacets;
};

export function HomeMarketingHero({ facets }: HomeMarketingHeroProps) {
  return (
    <>
      <section className="relative isolate w-full overflow-hidden bg-neutral-950 font-primary">
        {/* Background photograph */}
        <Image
          src={heroCopy.backgroundSrc}
          alt={heroCopy.backgroundAlt}
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

        <div className="relative z-10 mx-auto flex w-full max-w-container-max flex-col px-6 pb-40 pt-20 md:px-margin-edge md:pb-44 md:pt-24 lg:min-h-[680px] lg:pb-48 lg:pt-24">
          <div className="max-w-2xl text-white lg:max-w-[44rem]">
            {/* Green eyebrow chip */}
            <span className="inline-flex items-center rounded-full bg-brand-primary px-4 py-2 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_22px_-10px_rgba(0,143,76,0.7)]">
              {heroCopy.eyebrow}
            </span>

            <h1 className="mt-6 max-w-[20ch] font-display-lg text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance] drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)] sm:max-w-none">
              {heroCopy.line1} {heroCopy.line2}
            </h1>

            {/* Inline trust items — no pill chrome, just icon + text */}
            <ul role="list" className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              {heroCopy.checklist.map((line) => (
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
                href={heroCopy.primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-primary px-7 font-body-md text-body-md font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,143,76,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,143,76,0.85)] active:translate-y-0"
              >
                {heroCopy.primaryCta.label}
              </Link>
              <Link
                href={heroCopy.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.10] px-7 font-body-md text-body-md font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.16]"
              >
                {heroCopy.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search card — sits across the seam between hero and the section below */}
      <div className="relative z-20 -mt-24 mb-4 md:-mt-28 md:mb-6 lg:-mt-32">
        <div className="mx-auto w-full max-w-container-max px-6 md:px-margin-edge">
          <HomeHeroSearchBar facets={facets} presentation="elevated" />
        </div>
      </div>
    </>
  );
}
