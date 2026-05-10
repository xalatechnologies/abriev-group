import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VehicleListingHeader } from "@/components/vehicles/VehicleListingHeader";
import { VehicleCatalog } from "@/features/vehicles/VehicleCatalog";
import { getVehicles } from "@/server/queries/vehicles";

export const metadata: Metadata = {
  title: "Vehicles for Rent",
  description:
    "Private, chauffeured, and self-drive rentals from ABRIEV's global fleet.",
};

export default async function ForRentVehiclesPage() {
  const all = await getVehicles();
  const filtered = all.filter((v) => v.category === "for-rent");
  return (
    <>
      <VehicleListingHeader active="for-rent" counts={counts(all)} />
      <Container>
        <VehicleCatalog vehicles={filtered} category="for-rent" />
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
