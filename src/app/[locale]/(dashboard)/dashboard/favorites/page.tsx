import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dashboardFavorites");
}

export default async function DashboardFavoritesPage() {
  return (
    <StubPage
      route="dashboardFavorites"
      phase={4}
      backHref="/dashboard"
    />
  );
}
