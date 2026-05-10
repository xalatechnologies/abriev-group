import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { insightsHubHref, parseInsightHubCategory } from "@/content/newsPage";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

type Params = { slug: string };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("InsightsHub");
  return {
    title: t("breadcrumbNews"),
    description: t("lede"),
  };
}

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
