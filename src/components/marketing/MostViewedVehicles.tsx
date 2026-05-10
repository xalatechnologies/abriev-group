import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Vehicle } from "@/types/vehicle";
import { Container } from "@/components/ui/Container";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mostViewed } from "@/content/homePageReference";

type MostViewedVehiclesProps = {
  vehicles: Vehicle[];
};

export async function MostViewedVehicles({ vehicles }: MostViewedVehiclesProps) {
  if (vehicles.length === 0) return null;

  const t = await getTranslations("HomeMostViewed");

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="mb-12 flex flex-col gap-3 text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-text-strong">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-4xl font-body-lg text-body-lg text-text-body md:mx-0">
            {t("lede")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {vehicles.map((v, i) => (
            <div key={v.id}>
              <VehicleCard vehicle={v} priority={i < 3} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={mostViewed.viewAllHref}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand-primary px-12 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-strong"
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
