import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { InsightArticleDetailView } from "@/components/marketing/InsightArticleDetailView";
import { pickArticleExcerpt, pickArticleTitle, pickCoverAlt } from "@/lib/i18n/articleLocale";
import { getArticleBySlug } from "@/server/queries/articles";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    const tSite = await getTranslations("Site");
    return { title: tSite("metaTitleDefault") };
  }
  const locale = await getLocale();
  const title = pickArticleTitle(article, locale) ?? article.title;
  const description = pickArticleExcerpt(article, locale) ?? article.excerpt;
  const coverAlt = pickCoverAlt(article, locale);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: article.cover.src, alt: coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.cover.src],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  return <InsightArticleDetailView article={article} />;
}
