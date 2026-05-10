import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("temporaryReplacement");
}

export default async function TemporaryCarReplacementPage() {
  return <StubPage route="temporaryReplacement" phase={5} />;
}
