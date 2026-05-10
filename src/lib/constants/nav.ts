/** Primary navigation routes — labels come from messages (`Navigation.{key}`). */
export const PRIMARY_NAV_ROUTES = [
  { key: "home", href: "/" },
  { key: "vehicles", href: "/vehicles" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

export type PrimaryNavKey = (typeof PRIMARY_NAV_ROUTES)[number]["key"];

export const FOOTER_NAV = {
  company: {
    title: "Company",
    items: [
      { label: "About ABRIEV", href: "/about" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  services: {
    title: "Services",
    items: [
      { label: "Buy a Vehicle", href: "/vehicles" },
      { label: "Rent a Vehicle", href: "/vehicles/for-rent" },
      { label: "List Your Vehicle", href: "/list-your-vehicle" },
      { label: "Book a Viewing", href: "/booking/check-availability" },
      { label: "Finance & loans", href: "/services#finance-loans" },
      { label: "Maintenance & repair", href: "/services#maintenance-repair" },
    ],
  },
  partners: {
    title: "Dealers & Partners",
    items: [
      { label: "Dealer Directory", href: "/dealers" },
      { label: "Become a Dealer", href: "/dealers#apply" },
      { label: "Import & export", href: "/services#import-export" },
    ],
  },
  support: {
    title: "Support",
    items: [
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Selling & listing guidance", href: "/services#vehicle-sales" },
    ],
  },
  legal: {
    title: "Legal",
    items: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Copyright", href: "/copyright" },
    ],
  },
  contact: {
    title: "Contact",
    items: [
      { label: "concierge@abriev.com", href: "mailto:concierge@abriev.com" },
      { label: "+1 (415) 555 0198", href: "tel:+14155550198" },
      { label: "One Pacific Promenade", href: "/contact" },
      { label: "San Francisco, CA", href: "/contact" },
    ],
  },
} as const;
