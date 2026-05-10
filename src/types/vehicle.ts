export type VehicleCategory = "new" | "used" | "for-rent";
export type VehicleBodyStyle =
  | "sedan"
  | "coupe"
  | "convertible"
  | "suv"
  | "crossover"
  | "wagon"
  | "hatchback"
  | "pickup"
  | "van"
  | "grand-tourer";

export type VehicleFuel = "petrol" | "diesel" | "hybrid" | "plug-in-hybrid" | "electric";
export type VehicleTransmission = "automatic" | "manual" | "dct" | "cvt";
export type VehicleDrivetrain = "fwd" | "rwd" | "awd" | "4wd";
export type VehicleCondition = "new" | "pre-owned" | "certified";
export type VehicleStatus = "available" | "reserved" | "sold";

export type VehiclePriceCadence = "day" | "week" | "month";

export type VehiclePrice = {
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "AED";
  cadence?: VehiclePriceCadence;
};

export type VehicleMedia = {
  src: string;
  alt: string;
  type?: "image" | "video";
  width?: number;
  height?: number;
};

export type VehicleSpecs = {
  year: number;
  mileage?: number;
  horsepower?: number;
  torqueNm?: number;
  zeroToSixty?: number;
  topSpeedMph?: number;
  engine?: string;
  fuel: VehicleFuel;
  transmission: VehicleTransmission;
  drivetrain: VehicleDrivetrain;
  seats?: number;
  doors?: number;
  rangeMiles?: number;
  batteryKwh?: number;
};

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim?: string;
  title: string;
  subtitle?: string;
  category: VehicleCategory;
  bodyStyle: VehicleBodyStyle;
  condition: VehicleCondition;
  status: VehicleStatus;
  price: VehiclePrice;
  location: { city: string; region?: string; country: string };
  dealerId: string;
  featured?: boolean;
  editorsPick?: boolean;
  heroImage: VehicleMedia;
  gallery: VehicleMedia[];
  specs: VehicleSpecs;
  features: string[];
  overview?: string;
  colors?: { name: string; hex: string }[];
  createdAt: string;
  updatedAt: string;
};
