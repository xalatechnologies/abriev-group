import type { Metadata } from "next";

import { LegalPolicyPageView, legalPolicyPageMeta } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return legalPolicyPageMeta("refundPolicy");
}

export default function RefundPolicyPage() {
  return <LegalPolicyPageView pageKey="refundPolicy" />;
}
