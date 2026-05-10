import type { Metadata } from "next";

import { LegalPolicyPageView, legalPolicyPageMeta } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return legalPolicyPageMeta("terms");
}

export default function TermsPage() {
  return <LegalPolicyPageView pageKey="terms" />;
}
