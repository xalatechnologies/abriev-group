import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Manage your ABRIEV profile and preferences.",
};

export default function DashboardProfilePage() {
  return (
    <StubPage
      eyebrow="Dashboard"
      title="Your profile."
      description="Profile form, preferences, and account controls arrive in Phase 4."
      phase={4}
      backHref="/dashboard"
      backLabel="Dashboard"
    />
  );
}
