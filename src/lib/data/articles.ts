import type { Article } from "@/types/article";
import { BYD_INSIGHT_ARTICLES } from "@/lib/data/bydInsightsArticles";

export const ARTICLES: Article[] = [
  ...BYD_INSIGHT_ARTICLES,
  {
    id: "a-last-of-v10",
    slug: "the-last-of-the-v10",
    title: "The last of the V10",
    excerpt:
      "A quiet elegy to the naturally-aspirated engines that defined a generation — and the vehicles that still carry them.",
    category: "editorial",
    author: { name: "Sofia Marchetti", title: "Editor-at-Large" },
    publishedAt: "2025-03-14",
    readingTime: 8,
    cover: {
      src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=2000&q=80&auto=format&fit=crop",
      alt: "V10 engine bay",
    },
    featured: true,
    relatedVehicleSlugs: ["lamborghini-huracan-tecnica"],
  },
  {
    id: "a-buying-air-cooled",
    slug: "a-quiet-guide-to-buying-air-cooled",
    title: "A quiet guide to buying air-cooled",
    excerpt:
      "What to look for, what to walk away from, and how to read a service history that spans three decades.",
    category: "guides",
    author: { name: "James Ashford", title: "Heritage Correspondent" },
    publishedAt: "2025-02-28",
    readingTime: 12,
    cover: {
      src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=2000&q=80&auto=format&fit=crop",
      alt: "Air-cooled 911 rear",
    },
    featured: true,
    relatedVehicleSlugs: ["porsche-911-carrera-1989"],
  },
  {
    id: "a-electric-gt",
    slug: "the-electric-grand-tourer",
    title: "The electric grand tourer, reconsidered",
    excerpt:
      "The silent arrival of long-distance EV tourers and what they mean for the old rituals of the road trip.",
    category: "market",
    author: { name: "Mei Lin", title: "Market Desk" },
    publishedAt: "2025-02-10",
    readingTime: 6,
    cover: {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=2000&q=80&auto=format&fit=crop",
      alt: "Electric grand tourer in evening light",
    },
    relatedVehicleSlugs: ["porsche-taycan-turbo", "bmw-ix-m60"],
  },
  {
    id: "a-london-britishness",
    slug: "a-new-britishness",
    title: "A new Britishness",
    excerpt:
      "From Aston Martin to Bentley, how British coachwork is quietly rewriting itself in the electric age.",
    category: "design",
    author: { name: "Eliot Kerr", title: "Design Editor" },
    publishedAt: "2025-01-22",
    readingTime: 9,
    cover: {
      src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=2000&q=80&auto=format&fit=crop",
      alt: "British coachwork detail",
    },
    relatedVehicleSlugs: ["aston-martin-db11-v8", "bentley-continental-gt-speed"],
  },
  {
    id: "a-ownership-playbook",
    slug: "the-ownership-playbook",
    title: "The ownership playbook",
    excerpt:
      "A practical essay on what it actually costs to keep a premium car on the road — beyond the sticker.",
    category: "ownership",
    author: { name: "Priya Anand", title: "Ownership Desk" },
    publishedAt: "2025-01-08",
    readingTime: 10,
    cover: {
      src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=2000&q=80&auto=format&fit=crop",
      alt: "Workshop detail",
    },
  },
  {
    id: "a-monaco-atelier",
    slug: "an-atelier-in-monaco",
    title: "An atelier in Monaco",
    excerpt:
      "A morning inside Atelier Vittoria — where every restoration is documented, photographed, and paced like a gallery show.",
    category: "heritage",
    author: { name: "Nina Alvarez", title: "Features" },
    publishedAt: "2024-12-18",
    readingTime: 11,
    cover: {
      src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=2000&q=80&auto=format&fit=crop",
      alt: "Atelier workshop",
    },
    relatedVehicleSlugs: ["ferrari-roma"],
  },
];
