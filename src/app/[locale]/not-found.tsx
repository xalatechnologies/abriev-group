import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container>
      <div className="flex min-h-[70dvh] flex-col items-start justify-center gap-8 py-24">
        <span className="label-caps text-on-surface-variant">{t("eyebrow")}</span>
        <EditorialHeading as="h1" variant="display">
          {t("title")}
        </EditorialHeading>
        <p className="max-w-xl text-body-lg text-on-surface-variant text-pretty">{t("description")}</p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-on-background px-5 text-sm font-medium text-background transition-colors hover:bg-inverse-surface"
          >
            {t("returnHome")}
          </Link>
          <Link
            href="/vehicles"
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-outline-variant px-5 text-sm font-medium text-on-background transition-colors hover:border-on-background"
          >
            {t("browseVehicles")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
