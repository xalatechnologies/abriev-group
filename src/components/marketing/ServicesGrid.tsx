import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, CarFront, Landmark, Ship, Wrench } from "lucide-react";
import { SERVICE_OFFERING_IDS } from "@/content/serviceOfferingDefinitions";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

const GRID_ICONS = [CarFront, Landmark, Wrench, Ship] as const;

export async function ServicesGrid() {
  const tGrid = await getTranslations("ServicesGrid");
  const tPage = await getTranslations("ServicesPage");

  return (
    <section className="section-y bg-surface-container-low">
      <Container>
        <SectionIntro
          eyebrow={tGrid("eyebrow")}
          title={tGrid("title")}
          lede={tGrid("lede")}
          className="mb-16 max-w-5xl"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_OFFERING_IDS.map((id, i) => {
            const Icon = GRID_ICONS[i];
            return (
              <Link
                key={id}
                href={`/services#${id}`}
                className="group flex h-full flex-col gap-6 rounded-xl border border-card-border bg-surface-container-lowest p-8 transition-all duration-500 ease-editorial hover:-translate-y-0.5 hover:border-card-border-hover hover:shadow-editorial"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-lg border border-outline-variant bg-tertiary-fixed text-tertiary transition-colors duration-300 group-hover:bg-tertiary group-hover:text-on-tertiary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="size-4 text-on-surface-variant transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tertiary"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col gap-3 border-t border-card-divider pt-6 transition-colors duration-300 group-hover:border-card-divider-hover">
                  <h3 className="font-headline-md text-headline-md text-on-background">
                    {tPage(`offerings.${id}.title`)}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                    {tPage(`offerings.${id}.gridSummary`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
