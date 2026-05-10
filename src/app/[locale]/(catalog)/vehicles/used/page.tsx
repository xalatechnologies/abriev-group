import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VehicleListingHeader } from "@/components/vehicles/VehicleListingHeader";
import {
  VehicleCatalog,
  initialFiltersFromSearchParams,
} from "@/features/vehicles";
import { getVehicles } from "@/server/queries/vehicles";

export const metadata: Metadata = {
  title: "Pre-owned Vehicles",
  description:
    "Pre-owned and certified vehicles from ABRIEV's editorial catalog.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UsedVehiclesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const all = await getVehicles();
  const filtered = all.filter((v) => v.category === "used");
  const initialFilters = initialFiltersFromSearchParams(sp);
  return (
    <>
      <VehicleListingHeader active="used" counts={counts(all)} />
      <Container>
        <VehicleCatalog
          vehicles={filtered}
          category="used"
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
