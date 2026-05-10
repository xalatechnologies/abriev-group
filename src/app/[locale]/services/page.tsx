import type { Metadata } from "next";
import { ServicesPageView } from "@/components/marketing/ServicesPageView";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vehicle sales & purchase, car finance, maintenance & repair, and import & export coordination — concierge automotive services from ABRIEV.",
};

export default function ServicesPage() {
  return <ServicesPageView />;
}
