import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("bookingCheckout");
}

export default async function BookingCheckoutPage() {
  return (
    <StubPage
      route="bookingCheckout"
      phase={4}
      backHref="/booking/check-availability"
    />
  );
}
