import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Car Insurance Assistance",
  description:
    "ABRIEV connects you with car insurance guidance and partners. Full flows arrive in Phase 5.",
};

export default function CarInsuranceAssistancePage() {
  return (
    <StubPage
      eyebrow="Support"
      title="Car insurance assistance."
      description="Partnership-linked guidance, paperwork checklists, and claims coaching so insurance never feels opaque. Detailed flows land in Phase 5."
      phase={5}
    />
  );
}
