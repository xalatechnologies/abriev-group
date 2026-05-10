import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Your bookings",
  description: "View and manage your bookings on ABRIEV.",
};

export default function DashboardBookingsPage() {
  return (
    <StubPage
      eyebrow="Dashboard"
      title="Your bookings."
      description="Bookings timeline and status tracking arrive in Phase 4."
      phase={4}
      backHref="/dashboard"
      backLabel="Dashboard"
    />
  );
}
