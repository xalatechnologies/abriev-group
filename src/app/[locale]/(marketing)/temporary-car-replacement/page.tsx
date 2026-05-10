import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Temporary Car Replacement",
  description:
    "Temporary replacement vehicle options through ABRIEV partners. Expanded coverage arrives in Phase 5.",
};

export default function TemporaryCarReplacementPage() {
  return (
    <StubPage
      eyebrow="Mobility"
      title="Temporary car replacement."
      description="Courtesy wheels and bridging coverage during repairs or claims—coordinated here with partners. Scheduling and eligibility go live in Phase 5."
      phase={5}
    />
  );
}
