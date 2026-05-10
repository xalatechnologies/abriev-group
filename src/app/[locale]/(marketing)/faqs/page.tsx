import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("faqs");
}

export default async function FaqsPage() {
  return <StubPage route="faqs" phase={3} />;
}
