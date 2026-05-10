import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("bookingAvailability");
}

export default async function BookingCheckAvailabilityPage() {
  return <StubPage route="bookingAvailability" phase={4} />;
}
