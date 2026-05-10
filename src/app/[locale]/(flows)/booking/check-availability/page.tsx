import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Check availability",
  description: "Check availability for viewings and rentals on ABRIEV.",
};

export default function CheckAvailabilityPage() {
  return (
    <StubPage
      eyebrow="Booking"
      title="Check availability."
      description="Date selection, time slot, and location confirmation arrive in Phase 4."
      phase={4}
    />
  );
}
