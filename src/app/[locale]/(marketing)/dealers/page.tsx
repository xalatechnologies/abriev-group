import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Dealers",
  description: "A directory of verified premier dealers on ABRIEV.",
};

export default function DealersPage() {
  return (
    <StubPage
      eyebrow="Directory"
      title="A network of verified dealers."
      description="Every dealer on ABRIEV is vetted for inventory quality, service integrity, and editorial fit. Browse by region and specialty in Phase 3."
      phase={3}
    />
  );
}
