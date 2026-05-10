import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ABRIEV terms of service.",
};

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Terms of Service."
      description="The legal framework governing use of the ABRIEV marketplace. Full copy arrives in Phase 5."
      phase={5}
    />
  );
}
