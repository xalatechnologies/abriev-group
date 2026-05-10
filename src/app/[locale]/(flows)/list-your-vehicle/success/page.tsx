import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Listing submitted",
  description: "Your vehicle listing has been submitted to ABRIEV.",
};

export default function ListingSuccessPage() {
  return (
    <StubPage
      eyebrow="Flow"
      title="Your listing is in review."
      description="Editorial confirmation screen with next-steps guidance arrives in Phase 4."
      phase={4}
      backHref="/dashboard/listings"
      backLabel="Go to your listings"
    />
  );
}
