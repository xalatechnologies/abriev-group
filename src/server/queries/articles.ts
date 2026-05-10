import "server-only";
import { ARTICLES } from "@/lib/data/articles";
import type { Article, ArticleCategory } from "@/types/article";
import {
  type InsightHubFilterId,
  HUB_CATEGORY_TO_ARTICLE,
} from "@/content/newsPage";

function sortArticlesListing(items: Article[]): Article[] {
  return [...items].sort((a, b) => {
    const feat = Number(!!b.featured) - Number(!!a.featured);
    if (feat !== 0) return feat;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
}

export async function getArticles(params: {
  category?: ArticleCategory;
  featured?: boolean;
  limit?: number;
} = {}): Promise<Article[]> {
  let items = [...ARTICLES];
  if (params.category) {
    items = items.filter((a) => a.category === params.category);
  }
  if (params.featured) items = items.filter((a) => a.featured);
  items = sortArticlesListing(items);
  if (params.limit) items = items.slice(0, params.limit);
  return items;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function getInsightsHubListing(params: {
  category: InsightHubFilterId;
  query?: string | null;
}): Promise<Article[]> {
  let items = [...ARTICLES];

  if (params.category !== "all") {
    const cat = params.category;
    items = items.filter((a) => a.category === HUB_CATEGORY_TO_ARTICLE[cat]);
  }

  const q = params.query?.trim().toLowerCase();
  if (q) {
    items = items.filter((a) => {
      const body = (a.content ?? "").toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        body.includes(q)
      );
    });
  }

  return sortArticlesListing(items);
}
