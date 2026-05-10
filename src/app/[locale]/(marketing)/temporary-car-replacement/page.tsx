import type { Metadata } from "next";

import { LegalPolicyPageView, legalPolicyPageMeta } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return legalPolicyPageMeta("temporaryCarReplacement");
}

export default function TemporaryCarReplacementPage() {
  return <LegalPolicyPageView pageKey="temporaryCarReplacement" />;
}
