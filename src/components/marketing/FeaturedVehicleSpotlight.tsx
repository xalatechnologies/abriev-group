import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils/format";

type FeaturedVehicleSpotlightProps = {
  vehicle: Vehicle;
};

export function FeaturedVehicleSpotlight({
  vehicle,
}: FeaturedVehicleSpotlightProps) {
  const gallery = [vehicle.heroImage, ...vehicle.gallery].slice(0, 3);
  return (
    <section className="section-y bg-surface-container-low font-primary">
      <Container>
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">
              The collection
            </span>
            <h2 className="mt-3 font-headline-lg text-headline-lg text-balance text-text-strong">
              Limited availability, exceptional provenance.
            </h2>
            <p className="mt-4 font-body-md text-body-md text-text-body">
              Handpicked machines from verified dealers, showcased with editorial clarity.
            </p>
          </div>
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase text-text-muted transition-colors hover:text-brand-primary"
          >
            View all inventory
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="scrollbar-none flex gap-8 overflow-x-auto pb-3">
          {gallery.map((image, idx) => (
            <Link
              key={`${vehicle.id}-${idx}`}
              href={`/vehicles/${vehicle.slug}`}
              className={idx === 1 ? "group min-w-[340px] flex-1 md:min-w-[460px] md:pt-16" : "group min-w-[340px] flex-1 md:min-w-[460px]"}
            >
              <div className="relative overflow-hidden rounded-xl bg-surface-container">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1000}
                  className="aspect-square w-full object-cover grayscale transition-all [transition-duration:1200ms] ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                {idx === 0 ? (
                  <span className="absolute left-5 top-5 rounded-full bg-surface px-3 py-1 font-label-caps text-label-caps uppercase text-text-strong">
                    Limited edition
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-start justify-between border-b border-card-divider pb-4 transition-colors duration-300 group-hover:border-card-divider-hover">
                <div>
                  <h3 className="font-headline-md text-headline-md leading-tight text-text-strong transition-colors group-hover:text-brand-primary">
                    {idx === 0
                      ? vehicle.model.toUpperCase()
                      : idx === 1
                        ? `${vehicle.make.toUpperCase()} GT`
                        : `${vehicle.specs.year} LEGACY`}
                  </h3>
                  <span className="font-label-caps text-label-caps uppercase text-text-muted">
                    {vehicle.specs.engine ?? "V12 PERFORMANCE"}{" "}
                    {vehicle.specs.horsepower ? `// ${vehicle.specs.horsepower} HP` : ""}
                  </span>
                </div>
                <span className="font-label-caps text-label-caps uppercase text-brand-primary">
                  {idx === 2 ? "POA" : formatPrice(vehicle.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
