import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  return stubPageMeta("carInsuranceAssistance");
}

export default async function CarInsuranceAssistancePage() {
  return <StubPage route="carInsuranceAssistance" phase={5} />;
}
