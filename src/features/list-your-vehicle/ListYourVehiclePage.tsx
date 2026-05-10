"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ListYourVehicleWizard } from "@/features/list-your-vehicle/ListYourVehicleWizard";

/**
 * Listing flow uses the default Container (full site width + `edge-x` gutters, no inner max).
 * `#listing-flow-shell` + globals.css reinforce full width against stale bundles.
 */
export function ListYourVehiclePage() {
  const t = useTranslations("ListYourVehicle");

  return (
    <div className="font-primary">
      <header className="bg-surface font-primary">
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex w-full flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {t("heroEyebrow")}
              </span>
              <h1 className="font-display-lg text-display-lg text-balance text-on-background md:text-[clamp(2.25rem,4vw,3.25rem)]">
                {t("heroTitle")}
              </h1>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty md:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface"
        aria-label={t("flowBodyLabel")}
      >
        <Container id="listing-flow-shell">
          <ListYourVehicleWizard />
        </Container>
      </section>
    </div>
  );
}
