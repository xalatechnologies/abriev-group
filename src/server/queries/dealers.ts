import "server-only";
import { CONTACT_FEATURED_DEALER_SLUGS } from "@/content/contactPage";
import { DEALERS } from "@/lib/data/dealers";
import type { Dealer } from "@/types/dealer";

export async function getDealers(): Promise<Dealer[]> {
  return [...DEALERS];
}

export async function getContactFeaturedDealers(): Promise<Dealer[]> {
  const lookup = new Map(DEALERS.map((dealer) => [dealer.slug, dealer]));
  return CONTACT_FEATURED_DEALER_SLUGS.map((slug) => lookup.get(slug)).filter(
    (dealer): dealer is Dealer => Boolean(dealer),
  );
}

export async function getDealerBySlug(slug: string): Promise<Dealer | null> {
  return DEALERS.find((d) => d.slug === slug) ?? null;
}
