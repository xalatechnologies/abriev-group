import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import type { AutoEvent } from "@/types/event";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

type UpcomingEventsProps = {
  events: AutoEvent[];
};

function formatRange(ev: AutoEvent, dateLocale: string) {
  const start = new Date(ev.date);
  const end = ev.endDate ? new Date(ev.endDate) : null;
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const year = start.getFullYear();
  if (end) {
    return `${start.toLocaleDateString(dateLocale, opts)} – ${end.toLocaleDateString(dateLocale, opts)}, ${year}`;
  }
  return `${start.toLocaleDateString(dateLocale, { ...opts, year: "numeric" })}`;
}

function formatDayBadge(iso: string, dateLocale: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString(dateLocale, { day: "2-digit" }),
    month: d.toLocaleDateString(dateLocale, { month: "short" }).toUpperCase(),
  };
}

export async function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (events.length === 0) return null;

  const t = await getTranslations("HomeUpcomingEvents");
  const locale = await getLocale();
  const dateLocale = locale === "am" ? "am-ET" : "en-US";

  const categoryLabel = (c: AutoEvent["category"]) =>
    (
      {
        auction: t("categories.auction"),
        reveal: t("categories.reveal"),
        drive: t("categories.drive"),
        exhibition: t("categories.exhibition"),
      } as const
    )[c];

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

        <div className="grid gap-6 overflow-visible px-0.5 py-2 sm:px-1 md:grid-cols-3 md:gap-8">
          {events.map((ev) => {
            const day = formatDayBadge(ev.date, dateLocale);
            const displayTitle =
              locale === "am" && ev.titleAm ? ev.titleAm : ev.title;
            const displayExcerpt =
              locale === "am" && ev.excerptAm ? ev.excerptAm : ev.excerpt;
            const locationLine =
              locale === "am" && ev.locationLineAm
                ? ev.locationLineAm
                : `${ev.location.city}, ${ev.location.country}`;
            return (
              <Link
                key={ev.id}
                href={`/events/${ev.slug}`}
                className="group relative z-0 flex flex-col overflow-hidden rounded-xl border border-card-border bg-surface-container-low shadow-editorial outline-none transition-all duration-500 ease-editorial hover:z-20 hover:-translate-y-2 hover:scale-[1.045] hover:border-card-border-hover hover:shadow-editorial-lg focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:scale-[1.045] focus-visible:border-card-border-hover focus-visible:shadow-editorial-lg focus-visible:ring-2 focus-visible:ring-brand-primary/35 motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:scale-100 motion-reduce:focus-visible:translate-y-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-high">
                  <Image
                    src={ev.cover.src}
                    alt={ev.cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.1] motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-3">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-surface/95 text-center text-text-strong shadow-editorial backdrop-blur">
                      <span className="font-headline-md text-headline-md leading-none">
                        {day.day}
                      </span>
                      <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-muted">
                        {day.month}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4">
                    <Badge
                      variant="outline"
                      className="border-inverse-on-surface/50 bg-inverse-surface/60 text-inverse-on-surface backdrop-blur"
                    >
                      {categoryLabel(ev.category)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-headline-md text-headline-md leading-tight text-text-strong transition-colors duration-300 group-hover:text-brand-primary">
                      {displayTitle}
                    </h3>
                    <p className="line-clamp-3 font-body-md text-body-md text-text-body">
                      {displayExcerpt}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-card-divider pt-4 transition-colors duration-300 group-hover:border-card-divider-hover">
                    <div className="flex items-center justify-between text-text-muted">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" aria-hidden />
                        <span className="font-body-md text-body-md">
                          {locationLine}
                        </span>
                      </div>
                      <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-muted">
                        {formatRange(ev, dateLocale)}
                      </span>
                    </div>
                    <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-brand-primary">
                      {t("readMore")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
