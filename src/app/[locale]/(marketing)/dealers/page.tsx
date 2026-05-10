import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dealers");
}

export default async function DealersPage() {
  return <StubPage route="dealers" phase={3} />;
}
