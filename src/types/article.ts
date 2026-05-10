export type ArticleCategory =
  | "editorial"
  | "market"
  | "design"
  | "ownership"
  | "guides"
  | "heritage"
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

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Amharic override when locale is `am` */
  titleAm?: string;
  excerptAm?: string;
  category: ArticleCategory;
  author: { name: string; title?: string; avatar?: string };
  publishedAt: string;
  readingTime: number;
  cover: { src: string; alt: string; altAm?: string };
  featured?: boolean;
  /** Estimated article views — display only */
  views?: number;
  relatedVehicleSlugs?: string[];
  content?: string;
};
