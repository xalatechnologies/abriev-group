import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Listing pricing",
  description: "Pricing plans for listing a vehicle on ABRIEV.",
};

export default function ListingPricingPage() {
  return (
    <StubPage
      eyebrow="Flow"
      title="Listing pricing."
      description="Plan comparison and upgrade path arrive in Phase 4."
      phase={4}
      backHref="/list-your-vehicle"
      backLabel="Back to listing"
    />
  );
}
