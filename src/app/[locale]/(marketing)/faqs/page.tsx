import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about ABRIEV.",
};

export default function FaqsPage() {
  return (
    <StubPage
      eyebrow="Support"
      title="Frequently asked questions."
      description="Questions on buying, renting, listing, and dealer services — organized with editorial clarity in Phase 3."
      phase={3}
    />
  );
}
