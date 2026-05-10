"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BrowseTile = {
  key: string;
  label: string;
  href: string;
  cover: string;
  description: string;
  count: number;
};

type BrowseTypeCarouselProps = {
  tiles: BrowseTile[];
};

const GAP = 20;

export function BrowseTypeCarousel({ tiles }: BrowseTypeCarouselProps) {
  const tr = useTranslations("HomeBrowseByType");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 0;
    const stride = cardWidth + GAP;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
    if (stride > 0) {
      setActiveIndex(
        Math.min(tiles.length - 1, Math.max(0, Math.round(el.scrollLeft / stride))),
      );
    }
  }, [tiles.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 0;
    const stride = cardWidth + GAP;
    el.scrollTo({ left: i * stride, behavior: "smooth" });
  }, []);

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };
  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, tiles.length - 1));
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6"
      >
        {tiles.map((tile) => {
          const countLabel =
            tile.count > 0
              ? tile.count === 1
                ? tr("oneVehicle")
                : tr("vehiclesCount", { count: tile.count })
              : tr("moreArriving");
          return (
            <article
              key={tile.key}
              className="group relative aspect-[3/2] w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl border border-card-border bg-surface-container-highest sm:aspect-[4/3] sm:w-[64%] lg:w-[52%] xl:w-[48%]"
            >
              <Image
                src={tile.cover}
                alt={tr("categoryImageAlt", { label: tile.label })}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 64vw, 48vw"
                className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
              />

              {/* Top-left tagline pill */}
              <span className="absolute left-6 top-6 z-10 inline-flex items-center rounded-full bg-black/30 px-3 py-1.5 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {tile.description}
              </span>

              {/* Bottom gradient + content */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <h3 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.01em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-[40px] md:text-[44px]">
                  {tile.label}
                </h3>
                <p className="mt-1.5 font-body-md text-body-md font-semibold text-white/85">
                  {countLabel}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Link
                    href={tile.href}
                    className="inline-flex h-10 items-center rounded-md bg-brand-primary px-5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,143,76,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00a056] active:translate-y-0"
                  >
                    {tr("browseCta", { label: tile.label })}
                  </Link>
                  <Link
                    href="/vehicles"
                    className="inline-flex h-10 items-center rounded-md border border-white/40 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/20"
                  >
                    {tr("allVehicles")}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        aria-label={tr("prevCategory")}
        onClick={handlePrev}
        disabled={!canScrollLeft}
        className={cn(
          "absolute left-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-text-strong shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-outline-variant transition-all duration-200 hover:scale-105 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:flex",
          !canScrollLeft && "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeft className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
      <button
        type="button"
        aria-label={tr("nextCategory")}
        onClick={handleNext}
        disabled={!canScrollRight}
        className={cn(
          "absolute right-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-text-strong shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-outline-variant transition-all duration-200 hover:scale-105 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:flex",
          !canScrollRight && "pointer-events-none opacity-0",
        )}
      >
        <ChevronRight className="size-5" strokeWidth={2.5} aria-hidden />
      </button>

      <div
        className="mt-7 flex items-center justify-center gap-2"
        role="tablist"
        aria-label={tr("categoryPages")}
      >
        {tiles.map((navTile, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={navTile.key}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={tr("goToCategory", { label: navTile.label })}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                active
                  ? "w-8 bg-text-strong"
                  : "w-2 bg-text-muted/40 hover:bg-text-muted/70",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
