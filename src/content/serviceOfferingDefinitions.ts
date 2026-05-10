/**
 * Shared structure for `/services` + home ServicesGrid: stable ids and imagery.
 * Localized copy lives in `messages/{locale}/services.json`.
 */
export const SERVICE_OFFERING_IDS = [
  "vehicle-sales",
  "finance-loans",
  "maintenance-repair",
  "import-export",
] as const;

export type ServiceOfferingId = (typeof SERVICE_OFFERING_IDS)[number];

export const SERVICE_OFFERING_MEDIA: Record<ServiceOfferingId, { imageSrc: string }> = {
  "vehicle-sales": {
    imageSrc:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=85&auto=format&fit=crop",
  },
  "finance-loans": {
    imageSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop",
  },
  "maintenance-repair": {
    imageSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format&fit=crop",
  },
  "import-export": {
    imageSrc: "/images/services/import-export.jpg",
  },
};
