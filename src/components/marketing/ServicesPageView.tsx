import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  SERVICE_OFFERING_IDS,
  SERVICE_OFFERING_MEDIA,
} from "@/content/serviceOfferingDefinitions";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export async function ServicesPageView() {
  const t = await getTranslations("ServicesPage");
  const offerings = SERVICE_OFFERING_IDS.map((id) => {
    const paragraphsRaw = t.raw(`offerings.${id}.paragraphs`);
    const bulletsRaw = t.raw(`offerings.${id}.bullets`);
    return {
      anchorId: id,
      title: t(`offerings.${id}.title`),
      eyebrow: t(`offerings.${id}.eyebrow`),
      detail: {
        paragraphs: Array.isArray(paragraphsRaw) ? (paragraphsRaw as string[]) : [],
        bullets: Array.isArray(bulletsRaw) ? (bulletsRaw as string[]) : [],
      },
      image: {
        src: SERVICE_OFFERING_MEDIA[id].imageSrc,
        alt: t(`offerings.${id}.imageAlt`),
      },
    };
  });

  return (
    <div className="font-primary">
      <header className="bg-surface font-primary">
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex max-w-5xl flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {t("heroEyebrow")}
              </span>
              <h1 className="font-display-lg text-display-lg text-balance text-on-background">
                {t("heroTitle")}
              </h1>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface"
        aria-label={t("exploreSectionAria")}
      >
        <Container>
          <nav aria-label={t("jumpNavAria")}>
            <div className="rounded-xl border border-card-border bg-surface-container-lowest p-1.5 shadow-sm md:p-2">
              <div className="mb-2 flex flex-wrap items-center gap-2 px-0.5 md:mb-2.5 md:px-1">
                <span className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  {t("exploreLabel")}
                </span>
                <span aria-hidden className="hidden h-px w-12 bg-brand-primary/45 sm:inline" />
              </div>
              <ul role="list" className="m-0 grid list-none grid-cols-2 gap-1.5 p-0 sm:grid-cols-4 sm:gap-2">
                {offerings.map((s) => (
                  <li key={s.anchorId} className="min-w-0">
                    <a
                      href={`#${s.anchorId}`}
                      className={cn(
                        "group flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-card-border bg-surface px-2.5 py-2 transition-colors duration-200 ease-editorial md:min-h-[46px] md:gap-2 md:px-3 md:py-2.5",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest",
                        "text-text-body hover:border-card-border-hover hover:bg-surface hover:text-text-strong hover:shadow-sm",
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center self-center rounded-md border border-outline-variant bg-tertiary-fixed text-tertiary transition-colors duration-200 ease-editorial group-hover:border-transparent group-hover:bg-tertiary group-hover:text-on-tertiary">
                        <ChevronRight
                          className="size-4 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 items-center text-left text-[0.9375rem] font-bold leading-tight text-on-background text-pretty md:text-base">
                        {s.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </Container>
      </section>
      {offerings.map((service, index) => {
        const headingId = `${service.anchorId}-heading`;
        return (
          <section
            key={service.anchorId}
            id={service.anchorId}
            className={cn(
              "scroll-mt-[88px] section-y border-t border-outline-variant",
              index % 2 === 0 ? "bg-surface-container-low" : "bg-surface",
            )}
            aria-labelledby={headingId}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-surface-container-highest editorial-shadow-lg",
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-8",
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <span className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">
                      {service.eyebrow}
                    </span>
                    <h2
                      id={headingId}
                      className="text-balance font-headline-lg text-headline-lg text-on-background"
                    >
                      {service.title}
                    </h2>
                    <div className="flex flex-col gap-5">
                      {service.detail.paragraphs.map((paragraph, pi) => (
                        <p
                          key={pi}
                          className="font-body-lg text-body-lg text-on-surface-variant text-pretty"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-card-divider pt-8 transition-colors duration-300">
                    <p className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                      {t("highlightsLabel")}
                    </p>
                    <ul role="list" className="mt-5 flex flex-col gap-4">
                      {service.detail.bullets.map((item) => (
                        <li
                          key={item}
                          className="relative pl-8 font-body-md text-body-md text-on-surface text-pretty before:absolute before:left-1 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-brand-primary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <FinalCTA />
    </div>
  );
}
