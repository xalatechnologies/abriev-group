import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("copyright");
}

export default async function CopyrightPage() {
  return <StubPage route="copyright" phase={5} />;
}
