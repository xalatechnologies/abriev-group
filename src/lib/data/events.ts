import type { AutoEvent } from "@/types/event";

export const EVENTS: AutoEvent[] = [
  {
    id: "e-monaco-summer-auction",
    slug: "monaco-summer-auction-2026",
    title: "The Monaco Summer Auction",
    category: "auction",
    excerpt:
      "A two-evening, invitation-only sale of twenty-six lots from Atelier Vittoria — including an unrepeated 1970s GT collection.",
    date: "2026-06-14",
    endDate: "2026-06-15",
    location: { city: "Monaco", country: "Monaco" },
    cover: {
      src: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=2000&q=80&auto=format&fit=crop",
      alt: "Monaco harbor at dusk",
    },
    host: "Atelier Vittoria",
  },
  {
    id: "e-goodwood-private-drive",
    slug: "goodwood-private-drive-2026",
    title: "Goodwood Private Drive",
    category: "drive",
    excerpt:
      "A sunrise-to-lunch touring day through the South Downs, reserved for clients of Harbour Row and invited members.",
    date: "2026-05-09",
    location: { city: "West Sussex", country: "United Kingdom" },
    cover: {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2000&q=80&auto=format&fit=crop",
      alt: "British countryside touring",
    },
    host: "Harbour Row Automobiles",
  },
  {
    id: "e-sf-911-reveal",
    slug: "san-francisco-911-reveal",
    title: "An Evening with the 911",
    category: "reveal",
    excerpt:
      "A private reveal and tasting at Pacific Motor House — pairing the new 911 GT3 Touring with a curated local wine service.",
    date: "2026-05-22",
    location: { city: "San Francisco", country: "United States" },
    cover: {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=80&auto=format&fit=crop",
      alt: "Porsche 911 at a private reveal",
    },
    host: "Pacific Motor House",
  },
];
