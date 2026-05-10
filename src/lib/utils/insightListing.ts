import type { Article } from "@/types/article";

export type InsightsListingPartition = {
  featured: Article | null;
  trending: Article[];
  grid: Article[];
  /** Sidebar “latest” — top of full filtered list */
  latest: Article[];
};

export function partitionInsightsListing(
  sortedList: Article[],
): InsightsListingPartition {
  if (!sortedList.length) {
    return { featured: null, trending: [], grid: [], latest: [] };
  }

  const featured =
    sortedList.find((a) => a.featured) ?? sortedList[0] ?? null;
  if (!featured) {
    return { featured: null, trending: [], grid: [], latest: [] };
  }

  const withoutFeatured = sortedList.filter((a) => a.slug !== featured.slug);
  const trending = withoutFeatured.slice(0, 3);
  const trendingSlugs = new Set(trending.map((a) => a.slug));
  const grid = withoutFeatured.filter((a) => !trendingSlugs.has(a.slug));
  const latest = sortedList.slice(0, 6);

  return { featured, trending, grid, latest };
}
