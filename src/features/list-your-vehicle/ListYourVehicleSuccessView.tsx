import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export async function ListYourVehicleSuccessView() {
  const t = await getTranslations("ListYourVehicle");

  return (
    <Container>
      <div className="flex flex-col gap-10 py-24 md:py-32">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
            {t("Success.eyebrow")}
          </span>
          <h1 className="font-display-lg text-display-lg text-balance text-on-background">
            {t("Success.title")}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant text-pretty">
            {t("Success.description")}
          </p>
        </div>

        <SurfaceCard variant="lowest" radius="xl" bordered className="p-8 md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/dashboard/listings"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-8 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              {t("Success.backToListings")}
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-card-border bg-surface-container-lowest px-8 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong transition-colors duration-300 hover:border-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              {t("Success.home")}
            </Link>
          </div>
        </SurfaceCard>
      </div>
    </Container>
  );
}
