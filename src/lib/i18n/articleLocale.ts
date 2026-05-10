import type { Article } from "@/types/article";

export function pickArticleTitle(
  article: Article | null | undefined,
  locale: string,
): string | undefined {
  if (!article) return undefined;
  if (locale === "am" && article.titleAm) return article.titleAm;
  return article.title;
}

export function pickArticleExcerpt(
  article: Article | null | undefined,
  locale: string,
): string | undefined {
  if (!article) return undefined;
  if (locale === "am" && article.excerptAm) return article.excerptAm;
  return article.excerpt;
}

export function pickCoverAlt(article: Article | null | undefined, locale: string): string {
  if (!article) return "";
  if (locale === "am" && article.cover.altAm) return article.cover.altAm;
  return article.cover.alt;
}
