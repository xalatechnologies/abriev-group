/**
 * Featured dealers shown on `/contact`. Slugs match `CONTACT_PAGE_DEALERS` in `src/lib/data/dealers.ts`.
 */
export const CONTACT_FEATURED_DEALER_SLUGS = [
  "robel-yohannes-kidane",
  "amanuel-gebru-motors",
  "genet-mekonnen-auto",
  "surafel-tadesse-cars",
] as const;

export const CONTACT_PAGE_HERO = {
  src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=2400&q=85&auto=format&fit=crop",
  alt: "Close-up front view of a modern electric vehicle grille and headlights in studio lighting",
} as const;

export const CONTACT_PAGE_COPY = {
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
