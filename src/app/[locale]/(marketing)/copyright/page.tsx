import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Copyright",
  description: "ABRIEV copyright policy.",
};

export default function CopyrightPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Copyright."
      description="DMCA, takedown procedures, and intellectual property notice. Full copy arrives in Phase 5."
      phase={5}
    />
  );
}
