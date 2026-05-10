import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { VehicleCategoryTabs } from "@/features/vehicles/VehicleCategoryTabs";

type VehicleListingHeaderProps = {
  active: "all" | "new" | "used" | "for-rent";
  counts: Record<"all" | "new" | "used" | "for-rent", number>;
};

export async function VehicleListingHeader({ active, counts }: VehicleListingHeaderProps) {
  const t = await getTranslations("VehicleListingHero");

  return (
    <>
      <header className="bg-surface font-primary">
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex max-w-5xl flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {t("eyebrow")}
              </span>
              <h1 className="font-display-lg text-display-lg text-balance text-on-background">
                {t("title")}
              </h1>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty">
                {t("description")}
              </p>
            </div>
          </div>
        </Container>
      </header>
      <div
        className="sticky top-[72px] z-40 border-b border-outline-variant bg-surface/95 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md dark:bg-surface/90 dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.35)]"
      >
        <Container className="py-2 md:py-2.5">
          <VehicleCategoryTabs active={active} counts={counts} />
        </Container>
      </div>
    </>
  );
}
