import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("listPricing");
}

export default async function ListYourVehiclePricingPage() {
  return (
    <StubPage
      route="listPricing"
      phase={4}
      backHref="/list-your-vehicle"
    />
  );
}
