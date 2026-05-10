import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Booking checkout",
  description: "Complete your ABRIEV booking.",
};

export default function BookingCheckoutPage() {
  return (
    <StubPage
      eyebrow="Booking"
      title="Review & confirm."
      description="Booking summary, trust messaging, and payment handoff arrive in Phase 4."
      phase={4}
      backHref="/booking/check-availability"
      backLabel="Back to availability"
    />
  );
}
