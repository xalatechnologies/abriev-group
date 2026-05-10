import type { ArticleCategory } from "@/types/article";

/** URL `?category=` values for the News / Insights hub (excluding `all`). */
export type InsightHubCategoryId =
  | "byd-u8"
  | "byd-seagull"
  | "byd-e2"
  | "yuan-up-smart"
  | "teng-i"
  | "electric-vehicles"
  | "luxury-cars"
  | "car-maintenance"
  | "new-cars"
  | "car-rentals"
  | "road-trips";

export type InsightHubFilterId = "all" | InsightHubCategoryId;

export const INSIGHT_HUB_CATEGORY_FILTERS: {
  id: InsightHubFilterId;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "byd-u8", label: "BYD U8" },
  { id: "byd-seagull", label: "BYD Seagull" },
  { id: "byd-e2", label: "BYD E2" },
  { id: "yuan-up-smart", label: "Yuan Up Smart" },
  { id: "teng-i", label: "Teng I" },
  { id: "electric-vehicles", label: "Electric vehicles" },
  { id: "luxury-cars", label: "Luxury cars" },
  { id: "car-maintenance", label: "Car maintenance" },
  { id: "new-cars", label: "New cars" },
  { id: "car-rentals", label: "Car rentals" },
  { id: "road-trips", label: "Road trips" },
] as const;

const HUB_IDS = new Set<string>(
  INSIGHT_HUB_CATEGORY_FILTERS.map((f) => f.id),
);

export function parseInsightHubCategory(
  raw: string | undefined,
): InsightHubFilterId {
  if (!raw || raw === "all") return "all";
  if (HUB_IDS.has(raw) && raw !== "all") {
    return raw as InsightHubCategoryId;
  }
  return "all";
}

export function isInsightHubCategoryId(id: string): id is InsightHubCategoryId {
  return id !== "all" && HUB_IDS.has(id);
}

/** Every hub filter maps to an `Article.category` literal. */
export const HUB_CATEGORY_TO_ARTICLE: Record<
  InsightHubCategoryId,
  ArticleCategory
> = {
  "byd-u8": "byd-u8",
  "byd-seagull": "byd-seagull",
  "byd-e2": "byd-e2",
  "yuan-up-smart": "yuan-up-smart",
  "teng-i": "teng-i",
  "electric-vehicles": "electric-vehicles",
  "luxury-cars": "luxury-cars",
  "car-maintenance": "car-maintenance",
  "new-cars": "new-cars",
  "car-rentals": "car-rentals",
  "road-trips": "road-trips",
};

export function insightsHubHref(filters: {
  category?: InsightHubFilterId;
  q?: string;
}): string {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }
  const qTrim = filters.q?.trim();
  if (qTrim) params.set("q", qTrim);
  const qs = params.toString();
  return qs ? `/insights?${qs}` : "/insights";
}
