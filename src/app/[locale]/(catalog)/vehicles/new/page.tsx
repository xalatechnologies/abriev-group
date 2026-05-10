import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VehicleListingHeader } from "@/components/vehicles/VehicleListingHeader";
import {
  VehicleCatalog,
  initialFiltersFromSearchParams,
} from "@/features/vehicles";
import { getVehicles } from "@/server/queries/vehicles";

export const metadata: Metadata = {
  title: "New Vehicles",
  description: "New-delivery vehicles from ABRIEV's verified dealer network.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewVehiclesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const all = await getVehicles();
  const filtered = all.filter((v) => v.category === "new");
  const initialFilters = initialFiltersFromSearchParams(sp);
  return (
    <>
      <VehicleListingHeader active="new" counts={counts(all)} />
      <Container>
        <VehicleCatalog
          vehicles={filtered}
          category="new"
          initialFilters={initialFilters}
        />
      </Container>
    </>
  );
}

function counts(vs: Awaited<ReturnType<typeof getVehicles>>) {
  return {
    all: vs.length,
    new: vs.filter((v) => v.category === "new").length,
    used: vs.filter((v) => v.category === "used").length,
    "for-rent": vs.filter((v) => v.category === "for-rent").length,
  };
}
