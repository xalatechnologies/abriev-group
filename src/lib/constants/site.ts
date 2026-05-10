export const SITE = {
  name: "ABRIEV",
  tagline: "A curated automotive marketplace",
  description:
    "ABRIEV is a curated automotive marketplace for discerning buyers. Discover new, pre-owned, and rental vehicles from verified dealers — presented with editorial care.",
  url: "https://abriev.com",
  locale: "en-US",
  keywords: [
    "luxury vehicles",
    "curated automotive marketplace",
    "premium cars for sale",
    "dealer directory",
    "car rental",
    "editorial automotive",
  ],
  ogImage: "/og-default.jpg",
  twitter: "@abriev",
  /** Public sales contact — shown in footer. */
  contact: {
    email: "sales@abrievgroup.org",
    phones: ["+251905311308", "+251904209768", "+251965464349"] as const,
  },
} as const;
