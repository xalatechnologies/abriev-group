import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("dashboard");
}

export default async function DashboardHomePage() {
  return <StubPage route="dashboard" phase={4} />;
}
