import type { Metadata } from "next";
import { NewsPageView } from "@/components/marketing/NewsPageView";
import { parseInsightHubCategory } from "@/content/newsPage";
import { partitionInsightsListing } from "@/lib/utils/insightListing";
import { getInsightsHubListing } from "@/server/queries/articles";

export const metadata: Metadata = {
  title: "News",
  description:
    "Model-led reporting on BYD U8 capability, compact Seagull commuters, Yuan Up Smart, Denza Teng I—and the electrified ownership journey from ABRIEV.",
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolved = await searchParams;
  const categoryKey = resolved.category?.toLowerCase()?.trim();
  const category = parseInsightHubCategory(categoryKey);
  const rawQ = resolved.q ?? "";
  const listing = await getInsightsHubListing({ category, query: rawQ });
  const partitioned = partitionInsightsListing(listing);

  return (
    <NewsPageView
      categoryFilter={category}
      searchQuery={rawQ}
      featured={partitioned.featured}
      trending={partitioned.trending}
      grid={partitioned.grid}
      latest={partitioned.latest}
    />
  );
}
