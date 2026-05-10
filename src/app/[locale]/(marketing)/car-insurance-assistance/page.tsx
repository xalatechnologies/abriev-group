import type { Metadata } from "next";

import { LegalPolicyPageView, legalPolicyPageMeta } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return legalPolicyPageMeta("carInsuranceAssistance");
}

export default function CarInsuranceAssistancePage() {
  return <LegalPolicyPageView pageKey="carInsuranceAssistance" />;
}
