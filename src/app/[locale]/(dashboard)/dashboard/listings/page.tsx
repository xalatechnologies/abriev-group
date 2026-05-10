import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Your listings",
  description: "Manage your ABRIEV listings.",
};

export default function DashboardListingsPage() {
  return (
    <StubPage
      eyebrow="Dashboard"
      title="Your listings."
      description="Listings table, filtering, and edit flows arrive in Phase 4."
      phase={4}
      backHref="/dashboard"
      backLabel="Dashboard"
    />
  );
}
