/**
 * Featured dealers shown on `/contact`. Slugs match `CONTACT_PAGE_DEALERS` in `src/lib/data/dealers.ts`.
 */
export const CONTACT_FEATURED_DEALER_SLUGS = [
  "robel-yohannes-kidane",
  "amanuel-gebru-motors",
  "genet-mekonnen-auto",
  "surafel-tadesse-cars",
] as const;

export const CONTACT_PAGE_COPY = {
  /** Hero — matches `/vehicles` listing header pattern (eyebrow + display title + lede). */
  heroEyebrow: "Contact",
  /** Hero — editorial h1; page `<title>` still labels the route “Contact”. */
  heroTitle: "Clear routing from the first hello.",
  heroLede:
    "Buyers, verified dealers, and fleet support—concierge follow-through, typically within one business day.",
  eyebrowConcierge: "Concierge desk",
  contactTitle: "Reach our team anytime.",
  contactLede:
    "Sales enquiries, dealership partnerships, fleet support — one consistent team will route your note to the right specialist within one business day.",
  conciergeEmailLabel: "Primary sales inbox",
  phoneLabelDirect: "Sales & support desk",
  hoursTitle: "Response hours",
  hoursBody: "Monday–Saturday, 8:30 — 18:30 EAT. After-hours voicemail is monitored for urgent roadside and delivery coordination.",
  formTitle: "Send a concise note",
  formLede: "Include your timeline, preferred contact channel, and the region you are browsing from.",
  locationTitle: "Our location",
  locationLede: "Concierge routing and partner meetings are coordinated from our Addis Ababa base.",
  locationAddressLine1: "Addis Ababa",
  locationAddressLine2: "Ethiopia",
  mapsOpenLabel: "Open in Google Maps",
  mapIframeTitle: "Map of Addis Ababa, Ethiopia — ABRIEV contact area",
  /** Approx. city-center pin; swap for a verified street address when available. */
  mapEmbedSrc:
    "https://maps.google.com/maps?q=9.032%2C38.7469&hl=en&z=14&output=embed",
  mapsOpenHref:
    "https://www.google.com/maps/search/?api=1&query=9.032,38.7469",
  dealersEyebrow: "Trusted dealers",
  dealersTitle: "Our trusted car dealers",
  dealersLede:
    "Work directly with verified partners who list inventory on ABRIEV — screened for transparent pricing and customer care.",
  viewAllDealers: "View all dealers",
  viewAllAria: "Browse the full verified dealer directory",
  faqEyebrow: "FAQ",
  faqTitle: "Quick answers before you write in.",
  faqLede:
    "These cover common questions about reaching us and working with ABRIEV. Use the concierge desk above if yours is more specific.",
  faqBrowseAllHref: "/faqs",
  faqBrowseAllLabel: "Open the full FAQs page",
  faqBrowseAllAria: "Open the FAQs page — more topics coming soon",
} as const;

export const CONTACT_PAGE_FAQ_ITEMS = [
  {
    question: "How quickly will ABRIEV respond?",
    answer:
      "Routine concierge notes are routed to the right specialist within one business day, often sooner during listed response hours.",
  },
  {
    question: "What should I include in my first message?",
    answer:
      "Your timeline, time zone or city, preferred contact channel, and whether you are buying, selling, partnering, or arranging logistics speeds up routing.",
  },
  {
    question: "How do verified dealers work with ABRIEV?",
    answer:
      "Listed partners undergo screening around pricing disclosure and buyer care expectations. Listing teams coordinate with concierge so customer threads stay coherent.",
  },
  {
    question: "Does ABRIEV support cross‑border paperwork or freight?",
    answer:
      "Yes—import and export milestones are stewarded alongside compliance and customs steps. Mention origin, destination, and target delivery window.",
  },
] as const;
