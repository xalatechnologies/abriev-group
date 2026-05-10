import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Your favorites",
  description: "Your saved vehicles on ABRIEV.",
};

export default function DashboardFavoritesPage() {
  return (
    <StubPage
      eyebrow="Dashboard"
      title="Your favorites."
      description="Saved vehicle grid with quick actions arrives in Phase 4."
      phase={4}
      backHref="/dashboard"
      backLabel="Dashboard"
    />
  );
}
