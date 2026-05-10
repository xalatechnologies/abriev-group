import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageView } from "@/components/marketing/ContactPageView";
import { SITE } from "@/lib/constants/site";
import { getContactFeaturedDealers } from "@/server/queries/dealers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageMeta");
  return {
    title: t("contact.title"),
    description: t("contact.description", {
      brand: SITE.name,
      email: SITE.contact.email,
    }),
  };
}

export default async function ContactPage() {
  const dealers = await getContactFeaturedDealers();

  return <ContactPageView dealers={dealers} />;
}
