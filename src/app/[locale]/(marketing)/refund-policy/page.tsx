import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "ABRIEV refund policy.",
};

export default function RefundPolicyPage() {
  return (
    <StubPage
      eyebrow="Legal"
      title="Refund Policy."
      description="Refund terms for bookings, reservations, and marketplace services. Full copy arrives in Phase 5."
      phase={5}
    />
  );
}
