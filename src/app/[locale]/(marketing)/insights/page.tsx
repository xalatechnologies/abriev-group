import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsPageView } from "@/components/marketing/NewsPageView";
import { parseInsightHubCategory } from "@/content/newsPage";
import { partitionInsightsListing } from "@/lib/utils/insightListing";
import { getInsightsHubListing } from "@/server/queries/articles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("InsightsHub");
  return {
    title: t("breadcrumbNews"),
    description: t("lede"),
  };
}

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
    />
  );
}
