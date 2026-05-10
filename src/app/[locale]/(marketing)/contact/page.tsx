import type { Metadata } from "next";
import { ContactPageView } from "@/components/marketing/ContactPageView";
import { getContactFeaturedDealers } from "@/server/queries/dealers";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Speak with ${SITE.name} concierge sales (${SITE.contact.email}) — or connect with verified partner dealers.`,
};

export default async function ContactPage() {
  const dealers = await getContactFeaturedDealers();

  return <ContactPageView dealers={dealers} />;
}
