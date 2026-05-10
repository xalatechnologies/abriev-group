import type { ArticleCategory } from "@/types/article";

const LABELS: Partial<Record<ArticleCategory, string>> = {
  editorial: "Editorial",
  market: "Market",
  design: "Design",
  ownership: "Ownership",
  guides: "Guide",
  heritage: "Heritage",
  "byd-u8": "BYD U8",
  "byd-seagull": "BYD Seagull",
  "byd-e2": "BYD E2",
  "yuan-up-smart": "Yuan Up Smart",
  "teng-i": "Teng I",
  "electric-vehicles": "Electric vehicles",
  "luxury-cars": "Luxury cars",
  "car-maintenance": "Car maintenance",
  "new-cars": "New cars",
  "car-rentals": "Car rentals",
  "road-trips": "Road trips",
};

export function articleCategoryLabel(category: ArticleCategory): string {
  if (LABELS[category]) return LABELS[category]!;
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
