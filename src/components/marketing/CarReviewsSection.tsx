import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { carReviews } from "@/content/homePageReference";
import { articleCategoryLabel } from "@/lib/utils/articleCategoryLabel";
import { cn } from "@/lib/utils/cn";

type CarReviewsSectionProps = {
  articles: Article[];
};

export function CarReviewsSection({ articles }: CarReviewsSectionProps) {
  const featured = articles[0];
  const side = articles.slice(1, 4);

  const featuredTitle = featured?.title ?? carReviews.featuredVerbatimTitle;
  const featuredHref = featured ? `/insights/${featured.slug}` : "/insights";

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-3 text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg text-text-strong">
              {carReviews.title}
            </h2>
            <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-text-body md:mx-0">
              {carReviews.lede}
            </p>
          </div>
          <Link
            href={carReviews.viewAllHref}
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 self-start rounded-full bg-brand-primary px-10 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-strong lg:self-auto"
          >
            {carReviews.viewAll}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured */}
          <div className="lg:col-span-7">
            <Link
              href={featuredHref}
              className="group relative flex aspect-[4/3] min-h-[280px] overflow-hidden rounded-2xl border border-card-border bg-surface-container-high shadow-editorial transition-all duration-500 hover:border-card-border-hover hover:shadow-editorial-lg md:aspect-[16/11] md:min-h-[320px]"
            >
              <Image
                src={
                  featured?.cover.src ??
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop"
                }
                alt={featured?.cover.alt ?? "Desk with documents and a laptop, editorial planning"}
                fill
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10"
              />
              <div className="relative z-10 flex w-full flex-col justify-end p-6 md:p-8 lg:p-10">
                {featured ? (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {articleCategoryLabel(featured.category)}
                  </span>
                ) : (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    Featured
                  </span>
                )}
                <h3 className="text-balance font-headline-lg text-[clamp(1.375rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                  {featuredTitle}
                </h3>
                {featured?.excerpt ? (
                  <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] font-medium leading-relaxed text-white/85 md:text-base">
                    {featured.excerpt}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-white/90">
                  {featured ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4 shrink-0 opacity-90" aria-hidden strokeWidth={2.25} />
                      {featured.readingTime} min read
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 text-brand-primary transition-colors group-hover:text-white">
                    Read article
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Side list */}
          <ul role="list" className="flex flex-col gap-4 lg:col-span-5">
            {carReviews.sideStories.map((story, i) => {
              const art = side[i];
              const href = art
                ? `/insights/${art.slug}`
                : `/insights${story.slugFallbackQuery}`;
              const cover = art?.cover.src ?? carReviewsSideCover(i);
              const alt = art?.cover.alt ?? story.verbatimTitle;
              const title = art?.title ?? story.verbatimTitle;
              const excerpt = art?.excerpt;

              return (
                <li key={story.verbatimTitle}>
                  <Link
                    href={href}
                    className="group relative flex gap-4 overflow-hidden rounded-xl border border-card-border bg-surface-container-lowest p-3 transition-all duration-300 hover:border-card-border-hover hover:shadow-editorial"
                  >
                    <div className="relative h-28 w-[7.25rem] shrink-0 overflow-hidden rounded-lg border border-card-border bg-surface-container-highest sm:h-32 sm:w-[8.5rem]">
                      <Image
                        src={cover}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                        sizes="(max-width: 1024px) 120px, 140px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-0.5">
                      {art ? (
                        <span className="font-label-caps text-sm font-bold text-brand-primary">
                          {articleCategoryLabel(art.category)}
                        </span>
                      ) : null}
                      <h3
                        className={cn(
                          "font-semibold leading-snug text-text-strong transition-colors group-hover:text-brand-primary",
                          excerpt
                            ? "text-[15px] sm:text-base"
                            : "font-headline-md text-headline-md",
                        )}
                      >
                        {title}
                      </h3>
                      {excerpt ? (
                        <p className="line-clamp-2 font-body-md text-body-md leading-relaxed text-text-body">
                          {excerpt}
                        </p>
                      ) : null}
                      {art ? (
                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted">
                          <Clock className="size-3.5" aria-hidden strokeWidth={2.25} />
                          {art.readingTime} min read
                        </p>
                      ) : null}
                    </div>
                    <span
                      className="pointer-events-none absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-surface text-text-muted opacity-0 ring-1 ring-outline-variant transition-all duration-300 group-hover:opacity-100 group-hover:ring-brand-primary/30 md:opacity-100"
                      aria-hidden
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function carReviewsSideCover(index: number): string {
  const urls = [
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=85&auto=format&fit=crop",
  ];
  return urls[index % urls.length]!;
}
