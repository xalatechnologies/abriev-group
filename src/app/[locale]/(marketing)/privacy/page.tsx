import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ABRIEV handles your data.",
};

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Privacy Policy."
      description="Transparent handling of personal data, cookies, and analytics. Full copy arrives in Phase 5."
      phase={5}
    />
  );
}
