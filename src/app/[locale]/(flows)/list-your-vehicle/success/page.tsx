import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ListYourVehicleSuccessView } from "@/features/list-your-vehicle/ListYourVehicleSuccessView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageMeta");
  return {
    title: t("listingSubmitted.title"),
    description: t("listingSubmitted.description"),
  };
}

export default function ListYourVehicleSuccessRoutePage() {
  return <ListYourVehicleSuccessView />;
}
