export type DealerVerification = "verified" | "premier" | "unverified";

export type Dealer = {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  about?: string;
  region: string;
  city: string;
  country: string;
  logo?: string;
  cover?: string;
  verification: DealerVerification;
  yearsInBusiness?: number;
  inventoryCount: number;
  specialties: string[];
  contact: {
    email: string;
    phone?: string;
    website?: string;
  };
  rating?: {
    score: number;
    reviews: number;
  };
  establishedYear?: number;
};
