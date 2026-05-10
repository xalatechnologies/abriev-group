import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description: "Your ABRIEV booking has been confirmed.",
};

export default function BookingConfirmationPage() {
  return (
    <StubPage
      eyebrow="Booking"
      title="You’re confirmed."
      description="Editorial confirmation with itinerary, policy, and dealer contact arrives in Phase 4."
      phase={4}
      backHref="/dashboard/bookings"
      backLabel="View bookings"
    />
  );
}
