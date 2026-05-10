import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dashboardBookings");
}

export default async function DashboardBookingsPage() {
  return (
    <StubPage
      route="dashboardBookings"
      phase={4}
      backHref="/dashboard"
    />
  );
}
