import type { Metadata } from "next";
import {
  HomeMarketingHero,
  MostViewedVehicles,
  BrowseByType,
  HomeTestimonials,
  CarReviewsSection,
  UpcomingEvents,
} from "@/components/marketing";
import { getVehicles, getFeaturedVehicles } from "@/server/queries/vehicles";
import { getArticles } from "@/server/queries/articles";
import { getUpcomingEvents } from "@/server/queries/events";
import { buildMakeModelFacets } from "@/lib/utils/makeModelFacets";
import { homePageMeta } from "@/content/homePageReference";

export const metadata: Metadata = {
  title: homePageMeta.title,
};

export default async function HomePage() {
  const [featured, curated, articles, events, allForFacets] = await Promise.all([
    getFeaturedVehicles(8),
    getVehicles({ limit: 12 }),
    getArticles({ limit: 6 }),
    getUpcomingEvents(3),
    getVehicles(),
  ]);

  const pool = featured.length ? [...featured, ...curated] : curated;
  const seen = new Set<string>();
  const unique = pool.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
  const mostViewedList = unique.slice(0, 6);
  const facets = buildMakeModelFacets(allForFacets);

  return (
    <>
      <HomeMarketingHero facets={facets} />
      <MostViewedVehicles vehicles={mostViewedList} />
      <BrowseByType vehicles={allForFacets} />
      <HomeTestimonials />
      <CarReviewsSection articles={articles} />
      <UpcomingEvents events={events} />
    </>
  );
}
