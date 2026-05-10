import type { Metadata } from "next";

import { LegalPolicyPageView, legalPolicyPageMeta } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return legalPolicyPageMeta("privacy");
}

export default function PrivacyPage() {
  return <LegalPolicyPageView pageKey="privacy" />;
}
