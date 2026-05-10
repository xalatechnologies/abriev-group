export type EventCategory = "auction" | "reveal" | "drive" | "exhibition";

export type AutoEvent = {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  excerpt: string;
  date: string;
  endDate?: string;
  location: { city: string; country: string };
  cover: { src: string; alt: string };
  host?: string;
};
