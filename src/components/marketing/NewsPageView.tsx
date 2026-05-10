import Image from "next/image";
import { ChevronRight, Clock, Eye, Search } from "lucide-react";

import type { Article } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { articleCategoryLabel } from "@/lib/utils/articleCategoryLabel";
import { formatApproxViews, formatDate } from "@/lib/utils/format";
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
  latest: Article[];
};

export function NewsPageView({
  categoryFilter,
  searchQuery,
  featured,
  trending,
  grid,
  latest,
}: NewsPageViewProps) {
  return (
    <div className="font-primary bg-surface">
      <section
        className="section-y border-b border-outline-variant bg-surface"
        aria-labelledby="news-hub-heading"
      >
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="mb-8 flex flex-wrap items-center justify-center gap-2 text-center md:justify-start">
              <li>
                <Link
                  href="/"
                  className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-text-muted underline-offset-4 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-text-muted">
                <ChevronRight className="size-4" aria-hidden />
              </li>
              <li
                aria-current="page"
                className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-text-strong"
              >
                News
              </li>
            </ol>
          </nav>

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
            <p className="mb-4 font-label-caps text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary md:text-xs">
              ABRI insights
            </p>
            <h1
              id="news-hub-heading"
              className="text-balance font-display-lg text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-[-0.02em] text-text-strong"
            >
              News
            </h1>
            <p className="mt-5 font-body-lg text-body-lg leading-relaxed text-text-body">
              Dedicated coverage on BYD U8 and Yangwang-era capability, compact
              Seagull commuters, Yuan Up Smart crossover packaging, Denza Teng I
              family choreography, and the wider electric ownership journey.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="border-b border-outline-variant bg-surface-container-low py-10"
        aria-labelledby="news-categories-heading"
      >
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6">
            <h2 id="news-categories-heading" className="sr-only">
              Categories
            </h2>
            <p className="shrink-0 font-label-caps text-xs font-bold uppercase tracking-[0.16em] text-text-strong">
              Category:
            </p>
            <div className="flex flex-wrap gap-2.5" role="presentation">
              {INSIGHT_HUB_CATEGORY_FILTERS.map((item) => {
                const active = categoryFilter === item.id;
                const href = insightsHubHref({
                  category: item.id,
                  q: searchQuery,
                });
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
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        className="section-y bg-surface"
        aria-labelledby="news-spotlight-heading"
      >
        <Container>
          <h2
            id="news-spotlight-heading"
            className="mb-8 font-headline-md text-headline-md text-text-strong lg:mb-10"
          >
            Inside & trending
          </h2>

          {!featured ? (
            <p className="rounded-xl border border-card-border bg-surface-container-lowest p-8 text-body-md leading-relaxed text-text-body shadow-editorial">
              No articles match{" "}
              {searchQuery ? "this search — try another keyword." : "this lens."}{" "}
              <Link
                href="/insights"
                className="font-semibold text-brand-primary underline underline-offset-4 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                Show everything
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <article className="lg:col-span-7">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group relative flex aspect-[4/3] min-h-[280px] flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-container-high shadow-editorial transition-colors duration-300 hover:border-card-border-hover hover:shadow-editorial-lg md:aspect-[16/11] md:min-h-[320px]"
                >
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/38 to-black/10"
                  />
                  <div className="relative z-10 flex flex-1 flex-col justify-end p-6 md:p-8 lg:p-10">
                    <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {articleCategoryLabel(featured.category)}
                    </span>
                    <h3 className="text-balance font-headline-lg text-[clamp(1.375rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                      {featured.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] font-medium leading-relaxed text-white/85 md:text-base">
                      {featured.excerpt}
                    </p>
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
                        {formatDate(featured.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white">
                        <Clock className="size-4 shrink-0" aria-hidden />
                        {featured.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              <ul
                role="list"
                className="flex flex-col gap-4 lg:col-span-5"
                aria-label="Trending headlines"
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
                            alt={art.cover.alt}
                            fill
                            className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                            sizes="140px"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-1">
                          <h3 className="text-balance font-headline-md text-headline-md text-text-strong transition-colors group-hover:text-brand-primary">
                            {art.title}
                          </h3>
                          <time
                            dateTime={art.publishedAt}
                            className="text-sm font-semibold text-text-muted"
                          >
                            {formatDate(art.publishedAt)}
                          </time>
                          <p className="line-clamp-2 pt-1 text-sm leading-relaxed text-text-body">
                            {art.excerpt}
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
            All reporting
          </h2>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              {grid.length ? (
                <ul
                  role="list"
                  className="grid gap-8 md:grid-cols-2 md:gap-7"
                >
                  {grid.map((art) => (
                    <li key={art.slug}>
                      <ArticleCardCard art={art} />
                    </li>
                  ))}
                </ul>
              ) : featured ? (
                <p className="rounded-xl border border-dashed border-card-border bg-surface-container-lowest px-6 py-10 text-body-md leading-relaxed text-text-body shadow-editorial">
                  You’re seeing everything for this lens in the spotlight
                  above — browse another category pill to uncover more grids.
                </p>
              ) : null}

              {(searchQuery.trim() !== "" || categoryFilter !== "all") && (
                <div className="mt-14 flex justify-center lg:justify-start">
                  <Link
                    href={insightsHubHref({ category: "all", q: "" })}
                    prefetch={false}
                    className="inline-flex items-center rounded-full border border-card-border px-7 py-3 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    Reset filters & search
                  </Link>
                </div>
              )}
            </div>

            <aside
              aria-label="Search and highlights"
              className="flex flex-col gap-10 lg:col-span-4"
            >
              <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial md:p-7">
                <h3 className="font-headline-md text-headline-md text-text-strong">
                  Search
                </h3>
                <form method="GET" action="/insights" className="mt-5 space-y-3">
                  {categoryFilter !== "all" ? (
                    <input type="hidden" name="category" value={categoryFilter} />
                  ) : null}
                  <label className="sr-only" htmlFor="insights-search-query">
                    Search articles
                  </label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-muted"
                      aria-hidden
                    />
                    <input
                      id="insights-search-query"
                      type="search"
                      name="q"
                      placeholder="Keyword or model name…"
                      defaultValue={searchQuery}
                      enterKeyHint="search"
                      className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-12 pr-3 text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary/50 focus-visible:ring-2 focus-visible:ring-brand-primary/35"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full min-h-[48px] items-center justify-center rounded-full bg-brand-primary font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-white shadow-editorial transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial md:p-7">
                <h3 className="font-headline-md text-headline-md text-text-strong">
                  Latest posts
                </h3>
                <ul className="mt-6 flex flex-col gap-5 border-t border-card-divider pt-6" role="list">
                  {latest.length ? (
                    latest.map((art) => (
                      <li key={art.slug}>
                        <NewsSidebarRow art={art} />
                      </li>
                    ))
                  ) : (
                    <li className="text-body-md leading-relaxed text-text-body">
                      No posts yet — adjust filters above.
                    </li>
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ArticleCardCard({ art }: { art: Article }) {
  return (
    <article>
      <Link
        href={`/insights/${art.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-container-lowest shadow-editorial transition-colors duration-300 hover:border-card-border-hover hover:shadow-editorial-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
      >
        <div className="relative mx-3 mt-3 aspect-[16/11] overflow-hidden rounded-xl bg-surface-container-highest md:aspect-[16/10] lg:aspect-[16/11] lg:rounded-[11px]">
          <Image
            src={art.cover.src}
            alt={art.cover.alt}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,40vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end px-4 pb-3">
            <span className="inline-flex rounded-full border border-black/35 bg-black/52 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm md:text-[11px] md:tracking-[0.18em]">
              {articleCategoryLabel(art.category)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-text-muted">
            <time
              dateTime={art.publishedAt}
              className="tabular-nums text-text-strong"
            >
              {formatDate(art.publishedAt)}
            </time>
            <span aria-hidden className="font-bold leading-none">
              •
            </span>
            <span className="inline-flex items-center gap-1 text-text-strong">
              <Clock className="size-4 shrink-0" aria-hidden />
              <span>{art.readingTime} min read</span>
            </span>
            {typeof art.views === "number" ? (
              <>
                <span aria-hidden className="font-bold leading-none">
                  •
                </span>
                <span className="inline-flex items-center gap-1 text-text-strong">
                  <Eye className="size-4 shrink-0 opacity-95" aria-hidden />
                  <span className="tabular-nums">
                    {formatApproxViews(art.views)}
                  </span>
                </span>
              </>
            ) : null}
          </div>

          <h3 className="text-balance font-headline-md text-headline-md text-text-strong transition-colors group-hover:text-brand-primary">
            {art.title}
          </h3>

          <div className="mt-auto flex flex-col gap-4 border-t border-card-divider pt-4 transition-colors duration-300 group-hover:border-card-divider-hover">
            <span className="inline-flex items-center gap-3 text-sm font-semibold text-text-body">
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
              {art.author.name}
            </span>
            <span className="inline-flex w-fit min-h-[48px] items-center justify-center self-start rounded-full border border-card-border px-6 py-2.5 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover">
              Keep reading
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function NewsSidebarRow({ art }: { art: Article }) {
  return (
    <Link
      href={`/insights/${art.slug}`}
      prefetch={false}
      className="group flex gap-3 overflow-hidden rounded-lg transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
    >
      <div className="relative mt-1 h-16 w-20 shrink-0 overflow-hidden rounded-md border border-card-border bg-surface-container-highest">
        <Image
          src={art.cover.src}
          alt={art.cover.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="80px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold leading-snug text-text-strong decoration-brand-primary underline-offset-[3px] group-hover:underline">
          {art.title}
        </h4>
        <time
          dateTime={art.publishedAt}
          className="mt-1 block text-xs font-semibold text-text-muted"
        >
          {formatDate(art.publishedAt)}
        </time>
      </div>
    </Link>
  );
}
