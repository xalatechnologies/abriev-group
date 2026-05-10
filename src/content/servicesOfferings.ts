/**
 * Copy and anchor ids for `/services`, including the listing-style hero; home ServicesGrid teasers.
 */
export const servicesPageHero = {
  eyebrow: "Services",
  title: "Buy, finance, care, and ship—with one standard.",
  description:
    "Explore below for vehicle sales, loans, maintenance, or cross-border moves. Each lane follows the same rigour—from enquiry to handover.",
} as const;

export type ServiceOfferingDetail = {
  paragraphs: readonly string[];
  bullets: readonly string[];
};

export type ServiceOffering = {
  anchorId: string;
  gridSummary: string;
  title: string;
  eyebrow: string;
  detail: ServiceOfferingDetail;
  image: { src: string; alt: string };
};

export const SERVICE_OFFERINGS: readonly ServiceOffering[] = [
  {
    anchorId: "vehicle-sales",
    title: "Vehicle sales & purchase",
    eyebrow: "Acquisition & divestment",
    gridSummary:
      "Curated stock, verified history, and a transparent path from enquiry to keys — buying or selling with equal care.",
    detail: {
      paragraphs: [
        "Whether you are stepping into something new or moving on from a cherished car, ABRIEV treats every transaction as a relationship, not a line item. We surface vehicles we would stand beside ourselves, with paperwork and condition checks articulated in plain language.",
        "Concierge sourcing is available when the right car is not already in our catalogue: we scout, negotiate, and coordinate inspection so time on your calendar stays protected.",
      ],
      bullets: [
        "Premium pre-owned selection with condition reporting you can rely on",
        "Private-sale and trade pathways with discreet, white-glove handover",
        "Cross-border paperwork guidance when duty and registration timelines matter",
      ],
    },
    image: {
      src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=85&auto=format&fit=crop",
      alt: "Two people shaking hands beside a premium vehicle at a dealership",
    },
  },
  {
    anchorId: "finance-loans",
    title: "Car finance & loans",
    eyebrow: "Capital on your terms",
    gridSummary:
      "Structured finance and lease-style options from partners who understand high-value vehicles — rates, terms, and documents without the noise.",
    detail: {
      paragraphs: [
        "High-value cars deserve financing that respects residual strength and how you actually use the vehicle. We work with specialist lenders who underwrite performance, luxury, and classic metal with nuance instead of generic retail assumptions.",
        "You receive a clear comparison of monthly structures, balloon options, and early-settlement terms before you commit. Nothing is presented as a single take-it-or-leave-it offer.",
      ],
      bullets: [
        "Brokerage-style introduction to vetted automotive finance partners",
        "Support for self-employed, international, and multi-vehicle portfolios",
        "Coordinated documentation so funding lines up with delivery dates",
      ],
    },
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop",
      alt: "Financial planning documents and calculator on a desk",
    },
  },
  {
    anchorId: "maintenance-repair",
    title: "Vehicle maintenance & repair",
    eyebrow: "Factory-correct care",
    gridSummary:
      "Manufacturer-aligned servicing, preventive maintenance, and rectification — booked through ABRIEV with trusted specialists and OEM-grade components.",
    detail: {
      paragraphs: [
        "Long-term satisfaction lives in predictable maintenance schedules and technicians who respect your car’s quirks. ABRIEV coordinates service with certified workshops that specialise in your marque — from interim inspections to major component work.",
        "We log every visit recommendation against your mileage and usage pattern so preventative work happens before roadside surprises. Loan vehicles and doorstep collection can be arranged in supported markets.",
      ],
      bullets: [
        "Scheduled servicing aligned to OEM intervals and documented history",
        "Diagnostics, tyre and brake programmes, and air-conditioning care",
        "Paintless dent removal, detailing, and pre-sale presentation packages",
      ],
    },
    image: {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format&fit=crop",
      alt: "Performance vehicle ready for maintenance in a clean studio setting",
    },
  },
  {
    anchorId: "import-export",
    title: "Import & export services",
    eyebrow: "Global logistics",
    gridSummary:
      "Door-to-port coordination, compliance, and transport for vehicles crossing borders — one accountable team from collection to release.",
    detail: {
      paragraphs: [
        "Moving a vehicle between jurisdictions is paperwork-heavy and emotionally charged. ABRIEV maps duties, emissions compliance, customs brokers, and marine or enclosed road transport against your timeline and risk tolerance.",
        "We consolidate status updates — inspections, bookings, milestones — into a single thread so legalisation and registration handoffs stay legible regardless of hemisphere.",
      ],
      bullets: [
        "Compliance checks against destination market homologation rules",
        "Enclosed carrier, RO-RO, and air-freight introductions as required",
        "Registration-ready delivery handover with dossier archiving",
      ],
    },
    image: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85&auto=format&fit=crop",
      alt: "Stacked shipping containers at a port at dusk",
    },
  },
] as const;
