import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "List your vehicle",
  description: "List your vehicle on ABRIEV.",
};

export default function ListYourVehiclePage() {
  return (
    <StubPage
      eyebrow="Flow"
      title="List your vehicle."
      description="Step-based listing flow — photos, details, pricing, review — arrives in Phase 4."
      phase={4}
    />
  );
}
