import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dashboardProfile");
}

export default async function DashboardProfilePage() {
  return (
    <StubPage
      route="dashboardProfile"
      phase={4}
      backHref="/dashboard"
    />
  );
}
