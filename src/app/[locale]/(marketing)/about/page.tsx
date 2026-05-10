import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("about");
}

export default async function AboutPage() {
  return <StubPage route="about" phase={3} />;
}
