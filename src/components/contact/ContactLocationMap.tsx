import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ContactLocationMap() {
  const t = await getTranslations("ContactPage");

  return (
    <aside
      className="rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial md:p-8"
      aria-labelledby="contact-map-heading"
    >
      <div className="flex flex-col gap-2 pb-6">
        <h3 id="contact-map-heading" className="font-headline-lg text-headline-lg text-text-strong">
          {t("locationTitle")}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-pretty">{t("locationLede")}</p>
      </div>

      <address className="flex gap-3 not-italic">
        <MapPin className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden strokeWidth={2} />
        <div>
          <p className="font-body-md font-semibold text-text-strong">{t("locationAddressLine1")}</p>
          <p className="mt-1 font-body-md text-on-surface-variant">{t("locationAddressLine2")}</p>
        </div>
      </address>

      <div className="mt-6 overflow-hidden rounded-xl border border-card-divider bg-surface">
        <div className="relative aspect-[16/10] w-full">
          <iframe
            src={t("mapEmbedSrc")}
            title={t("mapIframeTitle")}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <a
        href={t("mapsOpenHref")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-max items-center gap-2 font-body-md text-[15px] font-semibold text-brand-primary underline-offset-4 transition-colors hover:text-text-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
      >
        {t("mapsOpenLabel")}
      </a>
    </aside>
  );
}
