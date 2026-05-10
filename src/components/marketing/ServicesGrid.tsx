import { Link } from "@/i18n/navigation";
import { ArrowUpRight, CarFront, Landmark, Ship, Wrench } from "lucide-react";
import { SERVICE_OFFERINGS } from "@/content/servicesOfferings";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

const GRID_ICONS = [CarFront, Landmark, Wrench, Ship] as const;

export function ServicesGrid() {
  return (
    <section className="section-y bg-surface-container-low">
      <Container>
        <SectionIntro
          eyebrow="Services"
          title="A quiet ecosystem, built around the vehicle."
          lede="Beyond commerce, ABRIEV offers concierge-grade pillars for buying, financing, upkeep, and global logistics — each with the same editorial calm as the marketplace."
          className="mb-16 max-w-3xl"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_OFFERINGS.map((s, i) => {
            const Icon = GRID_ICONS[i];
            return (
              <Link
                key={s.anchorId}
                href={`/services#${s.anchorId}`}
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
                  <h3 className="font-headline-md text-headline-md text-on-background">{s.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                    {s.gridSummary}
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
