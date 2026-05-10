import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "About",
  description:
    "ABRIEV is a curated automotive marketplace — built around trust, design, and clarity.",
};

export default function AboutPage() {
  return (
    <StubPage
      eyebrow="Company"
      title="A quieter way to buy, sell, and drive."
      description="ABRIEV was built for people who care about how a marketplace reads, not just what it lists. An editorial house for automotive commerce."
      phase={3}
    />
  );
}
