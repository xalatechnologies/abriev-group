/**
 * Verbatim homepage + marketing chrome copy from reference design.
 * Single source — do not duplicate strings in JSX.
 */

export const homePageMeta = {
  title: "ABRIEV — Premium automotive marketplace",
} as const;

export const hero = {
  backgroundSrc: "/hero/hero-bg-red.jpg",
  backgroundAlt:
    "Red coupe concept car shot from a rear three-quarter angle in a dark studio",
  eyebrow: "Find Your Perfect Car",
  line1: "Looking for a vehicle?",
  line2: "You're in the perfect spot.",
  checklist: [
    "High quality at low cost",
    "Premium services",
    "24/7 roadside support",
  ] as const,
  primaryCta: { label: "Find a Vehicle", href: "/vehicles" },
  secondaryCta: { label: "View Cars", href: "/vehicles?sort=featured" },
} as const;

/**
 * `/vehicles` and category routes — hero copy is identical on every tab; edit only here.
 */
export const vehicleListingHero = {
  eyebrow: "Curated stock",
  title: "Every listing earns its place.",
  description:
    "Verified dealers, vetted listings. Filter here or tab between new, pre-owned, and rentals—one flow.",
} as const;

export type HomeHeroBodyStyleOption = {
  label: string;
  /** body URL slug; empty string represents "any". */
  value: string;
};

export type HomeHeroPriceOption = {
  label: string;
  min?: number;
  max?: number;
};

export const homeHeroSearch = {
  tabs: {
    all: { label: "All Cars", path: "/vehicles" as const },
    new: { label: "New", path: "/vehicles/new" as const },
    used: { label: "Pre-owned", path: "/vehicles/used" as const },
  },
  helper: "Search from thousands of available vehicles",
  makeModelLabel: "Make / Model",
  makeModelPlaceholder: "Type make or model",
  bodyStyleLabel: "Body Style",
  priceRangeLabel: "Price Range",
  anyType: "All Types",
  anyPrice: "Any Price",
  searchCta: "Search Vehicles",
  bodyStyles: [
    { label: "All Types", value: "" },
    { label: "Sedan", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Coupe", value: "coupe" },
    { label: "Convertible", value: "convertible" },
    { label: "Hatchback", value: "hatchback" },
    { label: "Crossover", value: "crossover" },
    { label: "Pickup", value: "pickup" },
    { label: "Grand Tourer", value: "grand-tourer" },
  ] satisfies readonly HomeHeroBodyStyleOption[],
  priceRanges: [
    { label: "Any Price" },
    { label: "Under $25k", max: 25000 },
    { label: "$25k – $50k", min: 25000, max: 50000 },
    { label: "$50k – $100k", min: 50000, max: 100000 },
    { label: "$100k – $200k", min: 100000, max: 200000 },
    { label: "$200k+", min: 200000 },
  ] satisfies readonly HomeHeroPriceOption[],
} as const;

export const header = {
  signInProfileLabel: "Get Started",
  postCarLabel: "List a Car",
} as const;

export const mostViewed = {
  title: "Most View Vehicles",
  lede: "Choose the best car for you",
  viewAll: "View All",
  viewAllHref: "/vehicles",
} as const;

export const browseByType = {
  title: "Browse by Type",
  lede: "Find the perfect car for your lifestyle",
} as const;

/** Display order matching reference; URLs stay valid for catalog. */
export const browseTilesOrder = ["suv", "sedan", "hatchback", "coupe", "convertible", "grand-tourer"] as const;

export const testimonials = {
  title: "What they say about us?",
  lede:
    "Real feedback from buyers and sellers who used ABRIEV to move with confidence.",
  cards: [
    {
      quote:
        "From the first message to handing over the keys, everything felt intentional. Photos matched the car, pricing was transparent, and I never had to chase anyone for answers. This is how buying a car should feel.",
      authorName: "Dawit Mekonnen",
      role: "Verified buyer · Addis Ababa",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Dawit",
    },
    {
      quote:
        "I listed on a Tuesday and had serious buyers before the weekend. The listing flow was clear, and the messages I got were actually from people ready to move—not endless lowball noise. Sold faster than I expected.",
      authorName: "Tigist Bekele",
      role: "Private seller · Hawassa",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Tigist",
    },
    {
      quote:
        "We run a small fleet and timing matters. ABRIEV helped us compare options side by side, and support picked up when we needed a document clarification late at night. That reliability is worth a lot.",
      authorName: "Yared Tekle",
      role: "Fleet coordinator · Adama",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Yared",
    },
    {
      quote:
        "First time buying without walking a showroom floor—I was nervous. The verification details on the listing made the decision easy, and the handover was exactly what was promised. I'd do it again in a heartbeat.",
      authorName: "Liya Tadesse",
      role: "First-time buyer · Dire Dawa",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Liya",
    },
    {
      quote:
        "I'm picky about history, specs, and provenance. The listings here read complete—not marketing fluff—and when I asked technical questions, the answers came with substance. Found exactly what I was hunting for.",
      authorName: "Eskinder Wolde",
      role: "Enthusiast collector · Bahir Dar",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Eskinder",
    },
    {
      quote:
        "Trade-in numbers were explained line by line, financing options were easy to compare, and I never felt pushed. I drove away confident I made a fair deal—not just a fast one.",
      authorName: "Meklit Sisay",
      role: "Finance manager · Addis Ababa",
      rating: 5,
      avatarSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80&auto=format&fit=crop",
      avatarAlt: "Portrait of Meklit",
    },
  ] as const,
} as const;

export const carReviews = {
  title: "Car Reviews",
  lede:
    "Everything you need to know about cars, choose the perfect car",
  viewAll: "View All",
  viewAllHref: "/insights",
  /** Featured headline (verbatim overlay); links to real first article slug from page data when possible. */
  featuredVerbatimTitle:
    "What You Need to Know About Car Insurance Before Renting",
  sideStories: [
    {
      verbatimTitle: "The Ultimate Guide to Buying a Used Car",
      slugFallbackQuery: "?topic=used-car-guide",
    },
    {
      verbatimTitle: "How Self-Driving Cars Are Changing the…",
      slugFallbackQuery: "?topic=self-driving",
    },
    {
      verbatimTitle: "The Evolution of Electric Vehicles: A New Era",
      slugFallbackQuery: "?topic=electric-evolution",
    },
  ] as const,
} as const;

export const upcoming = {
  title: "Upcoming Cars & Events",
  lede:
    "Stay updated with the latest news and upcoming events",
  readMore: "Read more",
} as const;

export type FooterColumn = {
  title: string;
  items: readonly { label: string; href: string }[];
};

export const footerMainColumns = [
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press", href: "/about#press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Car Categories",
    items: [
      { label: "SUVs", href: "/vehicles?body=suv" },
      { label: "Sedans", href: "/vehicles?body=sedan" },
      { label: "Hatchbacks", href: "/vehicles?body=hatchback" },
      { label: "Browse all", href: "/vehicles" },
    ],
  },
  {
    title: "Customers",
    items: [
      { label: "Buyer guide", href: "/insights" },
      { label: "Sell your car", href: "/list-your-vehicle" },
      { label: "FAQs", href: "/faqs" },
      { label: "Support", href: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help center", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Sitemap", href: "/insights" },
    ],
  },
] as const satisfies readonly FooterColumn[];

export const footerTaglineFallback =
  "Premium automotive marketplace — curated vehicles and concierge support.";
