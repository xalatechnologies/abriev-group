import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VehicleListingHeader } from "@/components/vehicles/VehicleListingHeader";
import {
  VehicleCatalog,
  initialFiltersFromSearchParams,
} from "@/features/vehicles";
import { getVehicles } from "@/server/queries/vehicles";

export const metadata: Metadata = {
  title: "Browse Vehicles",
  description:
    "Discover curated new, pre-owned, and rental vehicles on ABRIEV.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VehiclesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const all = await getVehicles();
  const counts = computeCounts(all);
  const initialFilters = initialFiltersFromSearchParams(sp);
  return (
    <>
      <VehicleListingHeader active="all" counts={counts} />
      <Container>
        <VehicleCatalog vehicles={all} initialFilters={initialFilters} />
      </Container>
    </>
  );
}

function computeCounts(vs: Awaited<ReturnType<typeof getVehicles>>) {
  return {
    all: vs.length,
    new: vs.filter((v) => v.category === "new").length,
    used: vs.filter((v) => v.category === "used").length,
    "for-rent": vs.filter((v) => v.category === "for-rent").length,
  };
}
