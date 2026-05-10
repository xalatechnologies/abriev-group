import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ListYourVehiclePage } from "@/features/list-your-vehicle/ListYourVehiclePage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageMeta");
  return {
    title: t("listYourVehicle.title"),
    description: t("listYourVehicle.description"),
  };
}

export default function ListYourVehicleRoutePage() {
  return <ListYourVehiclePage />;
}
