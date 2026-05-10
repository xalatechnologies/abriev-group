import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { StubRouteKey } from "@/types/stubPage";

const ROUTES_WITH_OPTIONAL_BACK_LABEL = new Set<StubRouteKey>([
  "dealerDetail",
  "listPricing",
  "listSuccess",
  "bookingCheckout",
  "bookingConfirmation",
  "dashboardFavorites",
  "dashboardListings",
  "dashboardBookings",
  "dashboardProfile",
]);

type StubPageProps = {
  route: StubRouteKey;
  phase?: 2 | 3 | 4 | 5;
  backHref?: string;
  /** Override default title from messages (e.g. dealer slug). */
  title?: string;
};

function tk(route: StubRouteKey, key: string): string {
  return `${route}.${key}`;
}

/**
 * Phase-stub route shell — copy comes from `StubPage.{route}` in `stubPages.json`.
 */
export async function StubPage({ route, phase, backHref, title }: StubPageProps) {
  const t = await getTranslations("StubPage");
  const eyebrow = t(tk(route, "eyebrow"));
  const headline =
    title ??
    t(tk(route, "title"));
  const description = t(tk(route, "description"));
  const backLabel = ROUTES_WITH_OPTIONAL_BACK_LABEL.has(route)
    ? t(tk(route, "backLabel"))
    : undefined;

  return (
    <Container>
      <div className="flex flex-col gap-12 py-24 md:py-32">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase text-on-surface-variant transition-colors duration-200 hover:text-tertiary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel ?? t("shell.back")}
          </Link>
        ) : null}

        <div className="flex flex-col gap-5">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {eyebrow}
          </span>
          <EditorialHeading as="h1" variant="display">
            {headline}
          </EditorialHeading>
          {description ? (
            <p className="max-w-4xl font-body-lg text-body-lg text-on-surface-variant text-pretty">
              {description}
            </p>
          ) : null}
        </div>

        <SurfaceCard
          variant="lowest"
          radius="xl"
          bordered
          className="flex min-h-[320px] flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center"
        >
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps uppercase text-tertiary">
              {t("shell.inDevelopment")}
            </span>
            <p className="max-w-xl font-body-md text-body-md text-on-surface">
              {t("shell.phaseBlurb", { phase: phase ?? 2 })}
            </p>
          </div>
          <Link
            href="/"
            className="font-label-caps text-label-caps uppercase text-on-background underline-offset-4 hover:text-tertiary hover:underline"
          >
            {t("shell.returnHome")}
          </Link>
        </SurfaceCard>
      </div>
    </Container>
  );
}

export async function stubPageMeta(route: StubRouteKey) {
  const t = await getTranslations("StubPage");
  return {
    title: t(tk(route, "metaTitle")),
    description: t(tk(route, "metaDescription")),
  };
}
