import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your ABRIEV dashboard.",
};

export default function DashboardHomePage() {
  return (
    <StubPage
      eyebrow="Dashboard"
      title="Your workspace."
      description="Restrained dashboard shell with listings, bookings, favorites, and profile sections. Arrives in Phase 4."
      phase={4}
    />
  );
}
