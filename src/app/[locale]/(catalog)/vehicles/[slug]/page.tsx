import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import {
  VehicleMediaHero,
  VehicleTitleStrip,
  VehicleQuickSpecs,
  VehicleOverview,
  VehicleSpecsTable,
  VehicleFeaturesList,
  VehicleInquiryPanel,
  DealerProfileBlock,
  RelatedVehicles,
} from "@/components/vehicles";
import {
  getVehicleBySlug,
  getRelatedVehicles,
} from "@/server/queries/vehicles";
import { getDealerBySlug } from "@/server/queries/dealers";
import { DEALERS } from "@/lib/data/dealers";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: vehicle.title,
    description:
      vehicle.overview ??
      vehicle.subtitle ??
      `${vehicle.title} — available on ABRIEV.`,
    openGraph: {
      title: vehicle.title,
      description:
        vehicle.overview ?? vehicle.subtitle ?? `${vehicle.title} on ABRIEV`,
      images: [{ url: vehicle.heroImage.src, alt: vehicle.heroImage.alt }],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return notFound();

  const dealerRecord = DEALERS.find((d) => d.id === vehicle.dealerId) ?? null;
  const dealer = dealerRecord
    ? await getDealerBySlug(dealerRecord.slug)
    : null;
  const related = await getRelatedVehicles(slug, 6);

  return (
    <div className="pb-24 font-primary">
      <header>
        <Container>
          <div className="pt-10 md:pt-14">
            <VehicleTitleStrip vehicle={vehicle} />
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface"
        aria-label="Photos, 3D viewer, and purchase options"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
            <VehicleMediaHero vehicle={vehicle} />
            <div className="lg:sticky lg:top-[92px] lg:self-start">
              <VehicleInquiryPanel vehicle={vehicle} dealer={dealer} />
            </div>
          </div>
        </Container>
      </section>

      <VehicleQuickSpecs vehicle={vehicle} />

      <section className="section-y bg-surface" aria-label="Vehicle description and specifications">
        <Container>
          <div className="flex flex-col gap-16">
            <VehicleOverview vehicle={vehicle} />
            <VehicleSpecsTable vehicle={vehicle} />
            <VehicleFeaturesList vehicle={vehicle} />
            {dealer ? <DealerProfileBlock dealer={dealer} /> : null}
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section
          className="section-y border-t border-outline-variant bg-surface"
          aria-labelledby="related-vehicles-heading"
        >
          <Container>
            <RelatedVehicles vehicles={related} />
          </Container>
        </section>
      ) : null}
    </div>
  );
}
