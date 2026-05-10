import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock, Eye, Search } from "lucide-react";

import type { Article, ArticleCategory } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { pickArticleExcerpt, pickArticleTitle, pickCoverAlt } from "@/lib/i18n/articleLocale";
import { formatApproxViewsI18n, formatDate } from "@/lib/utils/format";
import {
  INSIGHT_HUB_CATEGORY_FILTERS,
  insightsHubHref,
  type InsightHubFilterId,
} from "@/content/newsPage";

const AVATAR_TONES = [
  "bg-emerald-700",
  "bg-sky-600",
  "bg-cyan-600",
  "bg-lime-600",
  "bg-violet-600",
  "bg-amber-600",
] as const;

function authorInitial(fullName: string) {
  return fullName.trim().charAt(0)?.toUpperCase() ?? "?";
}

export type NewsPageViewProps = {
  categoryFilter: InsightHubFilterId;
  searchQuery: string;
  featured: Article | null;
  trending: Article[];
  grid: Article[];
};

export async function NewsPageView({
  categoryFilter,
  searchQuery,
  featured,
  trending,
  grid,
}: NewsPageViewProps) {
  const locale = await getLocale();
  const t = await getTranslations("InsightsHub");
  const tc = await getTranslations("ArticleCategories");
  const hubFilters = t.raw("hubFilters") as Record<string, string>;

  const categoryLabel = (c: ArticleCategory) => tc(c);
  const formatDateIso = (iso: string) => formatDate(iso, locale);
  const minRead = (minutes: number) => t("minRead", { minutes });
  const viewsLine = (n: number) =>
    formatApproxViewsI18n(n, (key, values) => t(key, values));

  const featuredTitle = featured ? pickArticleTitle(featured, locale) : undefined;
  const featuredExcerpt = featured ? pickArticleExcerpt(featured, locale) : undefined;

  return (
    <div className="font-primary">
      <header
        className="bg-surface font-primary"
        aria-labelledby="news-hub-heading"
      >
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex max-w-5xl flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {t("eyebrow")}
              </span>
              <h1
                id="news-hub-heading"
                className="font-display-lg text-display-lg text-balance text-on-background md:text-[clamp(2.25rem,4vw,3.25rem)]"
              >
                {t("title")}
              </h1>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty md:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                {t("lede")}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface"
        aria-labelledby="news-spotlight-heading"
      >
        <Container>
          <div className="mb-8 flex min-w-0 flex-col gap-6 lg:mb-10 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
            <nav
              aria-labelledby="news-categories-heading"
              className="min-w-0 flex-1"
            >
              <h2 id="news-categories-heading" className="sr-only">
                {t("categoriesSrOnly")}
              </h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3">
                <p className="shrink-0 font-label-caps text-xs font-bold uppercase tracking-[0.16em] text-text-strong">
                  {t("categoryLabel")}
                </p>
                <div className="flex flex-wrap gap-2.5" role="presentation">
                  {INSIGHT_HUB_CATEGORY_FILTERS.map((item) => {
                    const active = categoryFilter === item.id;
                    const href = insightsHubHref({
                      category: item.id,
                      q: searchQuery,
                    });
                    const pillLabel = hubFilters[item.id] ?? item.label;
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        prefetch={false}
                        className={cn(
                          "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-5 font-label-caps text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                          active
                            ? "border-brand-primary bg-brand-primary text-white"
                            : "border-card-border bg-surface-container-lowest text-text-strong hover:border-card-border-hover",
                        )}
                      >
                        {pillLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            <InsightsHubSearchAside
              categoryFilter={categoryFilter}
              searchQuery={searchQuery}
              className="w-full shrink-0 xl:w-auto xl:min-w-[min(100%,22rem)] xl:max-w-xl 2xl:max-w-2xl"
            />
          </div>
          <h2
            id="news-spotlight-heading"
            className="mb-8 font-headline-md text-headline-md text-text-strong lg:mb-10"
          >
            {t("spotlightTitle")}
          </h2>

          {!featured ? (
            <p className="rounded-xl border border-card-border bg-surface-container-lowest p-8 text-body-md leading-relaxed text-text-body shadow-editorial">
              {searchQuery.trim()
                ? t("emptyFeaturedSearch")
                : t("emptyFeaturedLens")}{" "}
              <Link
                href="/insights"
                className="font-semibold text-brand-primary underline underline-offset-4 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                {t("showEverything")}
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <article className="lg:col-span-7">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group relative isolate flex aspect-[4/3] min-h-[280px] flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-container-high shadow-editorial transition-colors duration-300 hover:border-card-border-hover hover:shadow-editorial-lg md:aspect-[16/11] md:min-h-[320px]"
                >
                  <Image
                    src={featured.cover.src}
                    alt={pickCoverAlt(featured, locale)}
                    fill
                    className="z-0 object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/95 via-black/55 from-15% via-50% to-black/20"
                  />
                  <div className="relative z-[2] flex flex-1 flex-col justify-end p-6 text-white md:p-8 lg:p-10">
                    <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {categoryLabel(featured.category)}
                    </span>
                    <h3 className="text-balance font-headline-lg text-[clamp(1.375rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                      {featuredTitle}
                    </h3>
                    {featuredExcerpt ? (
                      <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] font-medium leading-relaxed text-white/85 md:text-base">
                        {featuredExcerpt}
                      </p>
                    ) : null}
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-semibold text-white/92">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white",
                            AVATAR_TONES[
                              featured.author.name.charCodeAt(0) %
                                AVATAR_TONES.length
                            ],
                          )}
                          aria-hidden
                        >
                          {authorInitial(featured.author.name)}
                        </span>
                        {featured.author.name}
                      </span>
                      <span className="text-white/80">
                        {formatDateIso(featured.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white">
                        <Clock className="size-4 shrink-0" aria-hidden />
                        {minRead(featured.readingTime)}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              <ul
                role="list"
                className="flex flex-col gap-4 lg:col-span-5"
                aria-label={t("trendingAria")}
              >
                {trending.map((art) => (
                  <li key={art.slug}>
                    <article>
                      <Link
                        href={`/insights/${art.slug}`}
                        className="group relative flex gap-4 overflow-hidden rounded-xl border border-card-border bg-surface-container-lowest p-3 shadow-editorial transition-colors duration-300 hover:border-card-border-hover"
                      >
                        <div className="relative h-28 w-[7.25rem] shrink-0 overflow-hidden rounded-lg border border-card-border bg-surface-container-highest sm:h-32 sm:w-[8.5rem]">
                          <Image
                            src={art.cover.src}
                            alt={pickCoverAlt(art, locale)}
                            fill
                            className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                            sizes="140px"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-1">
                          <h3 className="text-balance font-headline-md text-headline-md text-text-strong transition-colors group-hover:text-brand-primary">
                            {pickArticleTitle(art, locale)}
                          </h3>
                          <time
                            dateTime={art.publishedAt}
                            className="text-sm font-semibold text-text-muted"
                          >
                            {formatDateIso(art.publishedAt)}
                          </time>
                          <p className="line-clamp-2 pt-1 text-sm leading-relaxed text-text-body">
                            {pickArticleExcerpt(art, locale)}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <section
        className="section-y border-t border-outline-variant bg-surface-container-low text-text-strong"
        aria-labelledby="news-grid-heading"
      >
        <Container>
          <h2 id="news-grid-heading" className="sr-only">
            {t("gridSrOnly")}
          </h2>
          <div className="min-w-0">
            {grid.length ? (
              <ul
                role="list"
                className="grid gap-8 md:grid-cols-2 md:gap-7"
              >
                {grid.map((art) => (
                  <li key={art.slug}>
                    <ArticleCardCard
                      art={art}
                      categoryLabel={categoryLabel}
                      formatDateIso={formatDateIso}
                      minRead={minRead}
                      viewsLine={viewsLine}
                      locale={locale}
                      keepReading={t("keepReading")}
                    />
                  </li>
                ))}
              </ul>
            ) : featured ? (
              <p className="rounded-xl border border-dashed border-card-border bg-surface-container-lowest px-6 py-10 text-body-md leading-relaxed text-text-body shadow-editorial">
                {t("gridPartialNote")}
              </p>
            ) : null}

            {(searchQuery.trim() !== "" || categoryFilter !== "all") && (
              <div className="mt-14 flex justify-center md:justify-start">
                <Link
                  href={insightsHubHref({ category: "all", q: "" })}
                  prefetch={false}
                  className="inline-flex items-center rounded-full border border-card-border px-7 py-3 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                >
                  {t("resetFilters")}
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

async function InsightsHubSearchAside({
  categoryFilter,
  searchQuery,
  className,
}: {
  categoryFilter: InsightHubFilterId;
  searchQuery: string;
  className?: string;
}) {
  const t = await getTranslations("InsightsHub");

  return (
    <aside
      aria-label={t("asideAria")}
      className={cn("min-w-0 w-full", className)}
    >
      <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-4 shadow-editorial sm:p-5">
        <form
          method="GET"
          action="/insights"
          className="flex min-w-0 flex-row flex-nowrap items-center gap-3 sm:gap-4"
        >
          {categoryFilter !== "all" ? (
            <input type="hidden" name="category" value={categoryFilter} />
          ) : null}
          <label
            htmlFor="insights-search-query"
            className="shrink-0 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-text-strong sm:text-xs"
          >
            {t("searchHeading")}
          </label>
          <div className="relative min-h-12 min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-muted"
              aria-hidden
            />
            <input
              id="insights-search-query"
              type="search"
              name="q"
              aria-describedby="insights-search-hint"
              placeholder={t("searchPlaceholder")}
              defaultValue={searchQuery}
              enterKeyHint="search"
              className="min-h-12 w-full rounded-xl border border-outline-variant bg-surface py-3 pl-12 pr-3 text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary/50 focus-visible:ring-2 focus-visible:ring-brand-primary/35"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <span id="insights-search-hint" className="sr-only">
            {t("searchFieldLabel")}
          </span>
          <button
            type="submit"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-brand-primary px-5 font-label-caps text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-editorial transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 sm:px-8 sm:text-xs"
          >
            {t("searchSubmit")}
          </button>
        </form>
      </div>
    </aside>
  );
}

function ArticleCardCard({
  art,
  categoryLabel,
  formatDateIso,
  minRead,
  viewsLine,
  locale,
  keepReading,
}: {
  art: Article;
  categoryLabel: (c: ArticleCategory) => string;
  formatDateIso: (iso: string) => string;
  minRead: (minutes: number) => string;
  viewsLine: (n: number) => string;
  locale: string;
  keepReading: string;
}) {
  return (
    <article>
      <Link
        href={`/insights/${art.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-container-lowest shadow-editorial transition-colors duration-300 hover:border-card-border-hover hover:shadow-editorial-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
      >
        <div className="relative mx-3 mt-3 aspect-[16/11] overflow-hidden rounded-xl bg-surface-container-highest md:aspect-[16/10] lg:aspect-[16/11] lg:rounded-[11px]">
          <Image
            src={art.cover.src}
            alt={pickCoverAlt(art, locale)}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,40vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end px-4 pb-3">
            <span className="inline-flex rounded-full border border-black/35 bg-black/52 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm md:text-[11px] md:tracking-[0.18em]">
              {categoryLabel(art.category)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-text-muted">
            <time
              dateTime={art.publishedAt}
              className="tabular-nums text-text-strong"
            >
              {formatDateIso(art.publishedAt)}
            </time>
            <span aria-hidden className="font-bold leading-none">
              •
            </span>
            <span className="inline-flex items-center gap-1 text-text-strong">
              <Clock className="size-4 shrink-0" aria-hidden />
              <span>{minRead(art.readingTime)}</span>
            </span>
            {typeof art.views === "number" ? (
              <>
                <span aria-hidden className="font-bold leading-none">
                  •
                </span>
                <span className="inline-flex items-center gap-1 text-text-strong">
                  <Eye className="size-4 shrink-0 opacity-95" aria-hidden />
                  <span className="tabular-nums">{viewsLine(art.views)}</span>
                </span>
              </>
            ) : null}
          </div>

          <h3 className="text-balance font-headline-md text-headline-md text-text-strong transition-colors group-hover:text-brand-primary">
            {pickArticleTitle(art, locale)}
          </h3>

          <div className="mt-auto flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-card-divider pt-4 transition-colors duration-300 group-hover:border-card-divider-hover">
            <span className="inline-flex min-w-0 flex-1 items-center gap-3 text-sm font-semibold text-text-body">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                  AVATAR_TONES[
                    art.author.name.charCodeAt(0) % AVATAR_TONES.length
                  ],
                )}
                aria-hidden
              >
                {authorInitial(art.author.name)}
              </span>
              <span className="truncate">{art.author.name}</span>
            </span>
            <span className="inline-flex shrink-0 min-h-[44px] items-center justify-center rounded-full border border-card-border px-5 py-2 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover sm:min-h-[48px] sm:px-6 sm:py-2.5">
              {keepReading}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
