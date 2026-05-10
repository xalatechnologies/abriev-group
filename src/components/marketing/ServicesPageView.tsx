import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SERVICE_OFFERINGS, SERVICES_HERO_IMAGE } from "@/content/servicesOfferings";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/utils/cn";

export function ServicesPageView() {
  return (
    <div className="font-primary">
      <header className="relative isolate min-h-[min(520px,calc(100dvh-72px))] overflow-hidden">
        <Image
          src={SERVICES_HERO_IMAGE.src}
          alt={SERVICES_HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_24%,rgba(0,0,0,0.48)_50%,rgba(0,0,0,0.18)_82%,rgba(0,0,0,0.06)_100%)]"
        />
        <Container className="absolute inset-x-0 bottom-24 z-10 w-full pb-12 pt-[5.75rem] md:bottom-36 md:pb-14 md:pt-28 lg:bottom-44">
          <div className="flex max-w-3xl flex-col gap-7">
            <h1 className="text-balance font-display-lg font-semibold text-5xl tracking-[-0.02em] text-white md:text-6xl lg:text-[4.25rem]">
              Services
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg leading-snug text-white text-pretty md:leading-relaxed">
              From acquisition and finance through workshop care and global logistics — one
              consistent standard of clarity and discretion.
            </p>
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface"
        aria-label="Introduction"
      >
        <Container className="flex flex-col gap-14">
          <SectionIntro
            eyebrow="Our approach"
            title="Four focused teams—with one playbook from enquiry to closure."
            headingAs="h2"
            titleClassName="text-balance"
            className="max-w-3xl"
          />

          <nav aria-label="Jump to services">
            <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-5 md:p-6">
              <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
                <span className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  Explore
                </span>
                <span aria-hidden className="hidden h-px w-12 bg-brand-primary/45 sm:inline" />
              </div>
              <ul role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICE_OFFERINGS.map((s) => (
                  <li key={s.anchorId}>
                    <a
                      href={`#${s.anchorId}`}
                      className="group flex gap-4 rounded-xl border border-card-border bg-surface p-4 transition-colors duration-300 ease-editorial hover:-translate-y-0.5 hover:border-card-border-hover hover:shadow-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 md:p-[18px]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center self-center rounded-lg border border-outline-variant bg-tertiary-fixed text-tertiary transition-colors duration-300 ease-editorial group-hover:border-transparent group-hover:bg-tertiary group-hover:text-on-tertiary">
                        <ChevronRight
                          className="size-[18px] transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                      <span className="flex min-h-10 flex-1 items-center font-body-md text-body-md font-semibold leading-snug text-on-background text-pretty">
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

      {SERVICE_OFFERINGS.map((service, index) => {
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
                      Highlights
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
