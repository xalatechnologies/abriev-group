import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("bookingConfirmation");
}

export default async function BookingConfirmationPage() {
  return (
    <StubPage
      route="bookingConfirmation"
      phase={4}
      backHref="/dashboard/bookings"
    />
  );
}
