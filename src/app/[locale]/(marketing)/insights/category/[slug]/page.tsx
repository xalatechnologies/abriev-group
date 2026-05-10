import type { Metadata } from "next";
import { insightsHubHref, parseInsightHubCategory } from "@/content/newsPage";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

type Params = { slug: string };

export const metadata: Metadata = {
  title: "Insights category",
};

export default async function InsightCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = parseInsightHubCategory(slug?.toLowerCase());
  const locale = await getLocale();
  redirect({
    href: insightsHubHref({ category, q: undefined }),
    locale,
  });
}
