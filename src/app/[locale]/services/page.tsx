import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesPageView } from "@/components/marketing/ServicesPageView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageMeta");
  return {
    title: t("services.title"),
    description: t("services.description"),
  };
}

export default function ServicesPage() {
  return <ServicesPageView />;
}
