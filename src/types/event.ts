export type EventCategory = "auction" | "reveal" | "drive" | "exhibition";

export type AutoEvent = {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  excerpt: string;
  /** Amharic override when locale is `am` */
  titleAm?: string;
  excerptAm?: string;
  /** Amharic override for the full “city, country” line */
  locationLineAm?: string;
  date: string;
  endDate?: string;
  location: { city: string; country: string };
  cover: { src: string; alt: string };
  host?: string;
};
