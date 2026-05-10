import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowDown } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { Container } from "@/components/ui/Container";

type CuratedInventoryGridProps = {
  vehicles: Vehicle[];
};

export function CuratedInventoryGrid({ vehicles }: CuratedInventoryGridProps) {
  const cards = vehicles.slice(0, 4);
  return (
    <section className="section-y-sm bg-surface font-primary">
      <Container>
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="font-headline-lg text-headline-lg text-text-strong">
            Curation
          </h2>
          <div className="flex items-center gap-3 text-text-muted">
            <span className="font-label-caps text-label-caps uppercase">
              Scroll to discover
            </span>
            <ArrowDown className="size-4 animate-bounce text-brand-primary" aria-hidden />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((vehicle, idx) => (
            <Link
              key={vehicle.id}
              href={`/vehicles/${vehicle.slug}`}
              className={idx % 2 === 1 ? "group relative block overflow-hidden rounded-xl md:translate-y-10" : "group relative block overflow-hidden rounded-xl"}
            >
              <div className="relative aspect-[3/4] bg-surface-container-high">
                <Image
                  src={vehicle.heroImage.src}
                  alt={vehicle.heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform [transition-duration:1200ms] ease-editorial group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/65 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-inverse-on-surface">
                  <div className="font-label-caps text-label-caps uppercase opacity-80">
                    Category 0{idx + 1}
                  </div>
                  <h3 className="mt-2 font-headline-md text-headline-md leading-tight">
                    {vehicle.bodyStyle.replace("-", " ").toUpperCase()}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
