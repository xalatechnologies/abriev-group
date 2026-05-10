import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dashboardListings");
}

export default async function DashboardListingsPage() {
  return (
    <StubPage
      route="dashboardListings"
      phase={4}
      backHref="/dashboard"
    />
  );
}
