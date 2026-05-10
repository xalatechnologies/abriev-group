"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Vehicle, VehicleCategory } from "@/types/vehicle";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { cn } from "@/lib/utils/cn";
import { VehicleFilterSidebar } from "./VehicleFilterSidebar";
import { VehicleFilterDrawer } from "./VehicleFilterDrawer";
import { VehicleSortBar } from "./VehicleSortBar";
import { ActiveFilterChips } from "./ActiveFilterChips";
import {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  uniqueValues,
  type VehicleFilters,
  type VehicleSort,
} from "./filters";

const PAGE_SIZE = 9;

type VehicleCatalogProps = {
  vehicles: Vehicle[];
  category?: VehicleCategory;
  initialFilters?: Partial<VehicleFilters>;
};

export function VehicleCatalog(props: VehicleCatalogProps) {
  return (
    <Suspense fallback={<VehicleCatalogSuspenseFallback />}>
      <VehicleCatalogInner {...props} />
    </Suspense>
  );
}

function VehicleCatalogSuspenseFallback() {
  return (
    <section className="section-y-sm bg-surface font-primary" aria-busy="true">
      <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:gap-14">
        <div className="hidden min-h-[400px] rounded-xl border border-card-border bg-surface-container-lowest lg:block" />
        <div className="min-h-[480px] rounded-xl border border-card-border bg-surface-container-lowest" />
      </div>
    </section>
  );
}

function VehicleCatalogInner({
  vehicles,
  category,
  initialFilters,
}: VehicleCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipPaginationReset = useRef(true);

  const [filters, setFilters] = useState<VehicleFilters>({
    ...emptyFilters,
    ...initialFilters,
    category,
  });
  const [sort, setSort] = useState<VehicleSort>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const facets = useMemo(() => {
    const inCategory = category
      ? vehicles.filter((v) => v.category === category)
      : vehicles;
    return {
      makes: uniqueValues(inCategory.map((v) => v.make))
        .sort()
        .map((m) => ({
          value: m,
          label: m,
          count: inCategory.filter((v) => v.make === m).length,
        })),
      bodyStyles: uniqueValues(inCategory.map((v) => v.bodyStyle)).map((b) => ({
        value: b,
        label: prettify(b),
        count: inCategory.filter((v) => v.bodyStyle === b).length,
      })),
      fuels: uniqueValues(inCategory.map((v) => v.specs.fuel)).map((f) => ({
        value: f,
        label: prettify(f),
        count: inCategory.filter((v) => v.specs.fuel === f).length,
      })),
      transmissions: uniqueValues(inCategory.map((v) => v.specs.transmission)).map(
        (t) => ({
          value: t,
          label: prettify(t),
          count: inCategory.filter((v) => v.specs.transmission === t).length,
        }),
      ),
      drivetrains: uniqueValues(inCategory.map((v) => v.specs.drivetrain)).map(
        (d) => ({
          value: d,
          label: d.toUpperCase(),
          count: inCategory.filter((v) => v.specs.drivetrain === d).length,
        }),
      ),
      locations: uniqueValues(inCategory.map((v) => v.location.city))
        .sort()
        .map((l) => ({
          value: l,
          label: l,
          count: inCategory.filter((v) => v.location.city === l).length,
        })),
    };
  }, [vehicles, category]);

  const priceRange: [number, number] = useMemo(() => {
    const prices = vehicles.map((v) => v.price.amount);
    return prices.length
      ? [Math.min(...prices), Math.max(...prices)]
      : [0, 500000];
  }, [vehicles]);

  const yearRange: [number, number] = useMemo(() => {
    const years = vehicles.map((v) => v.specs.year);
    return years.length
      ? [Math.min(...years), Math.max(...years)]
      : [2000, 2025];
  }, [vehicles]);

  const results = useMemo(
    () => applyFilters(vehicles, filters, sort),
    [vehicles, filters, sort],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageFromUrl = Math.max(
    1,
    Math.min(Math.floor(Number(searchParams.get("page")) || 1), totalPages),
  );
  const currentPage = Number.isFinite(pageFromUrl) ? pageFromUrl : 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const pageResults = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [results, safePage]);

  const rangeStart = results.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd =
    results.length === 0
      ? 0
      : Math.min(safePage * PAGE_SIZE, results.length);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    if (skipPaginationReset.current) {
      skipPaginationReset.current = false;
      return;
    }
    const next = new URLSearchParams(searchParams.toString());
    if (!next.has("page")) return;
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // Intentionally omit searchParams: only reset when filters/sort change, not when ?page= updates from pagination links.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- same as above
  }, [filters, sort, pathname, router]);

  const activeCount = countActiveFilters(filters);

  return (
    <section className="section-y-sm bg-surface font-primary">
      <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:gap-14">
        <div className="hidden lg:block">
          <div className="sticky top-[calc(72px+10rem)] flex flex-col gap-3 lg:top-[calc(72px+5.5rem)]">
            <div className="flex items-center justify-between gap-4">
              <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-on-background">
                Filter inventory
              </span>
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setFilters({ ...emptyFilters, category: filters.category })
                  }
                  className="font-label-caps text-sm font-bold uppercase tracking-wide text-on-surface-variant underline-offset-4 transition-colors hover:text-on-background hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Reset all ({activeCount})
                </button>
              ) : null}
            </div>
            <div className="max-h-[calc(100dvh-14rem)] overflow-y-auto rounded-xl border border-card-border bg-surface-container-lowest px-5 py-3.5 shadow-none [-webkit-overflow-scrolling:touch]">
              <VehicleFilterSidebar
                filters={filters}
                onChange={setFilters}
                facets={facets}
                priceRange={priceRange}
                yearRange={yearRange}
              />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <VehicleSortBar
            sort={sort}
            onSortChange={setSort}
            total={results.length}
            onOpenFilters={() => setDrawerOpen(true)}
            activeFilterCount={activeCount}
          />
          <ActiveFilterChips filters={filters} onChange={setFilters} />
          <VehicleGrid
            vehicles={pageResults}
            columns={3}
            priorityCount={Math.min(3, pageResults.length)}
          />
          <CatalogPagination
            pathname={pathname}
            queryString={searchParamsString}
            currentPage={safePage}
            totalPages={totalPages}
            totalResults={results.length}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        </div>
      </div>

      <VehicleFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeCount={activeCount}
      >
        <VehicleFilterSidebar
          filters={filters}
          onChange={setFilters}
          facets={facets}
          priceRange={priceRange}
          yearRange={yearRange}
        />
      </VehicleFilterDrawer>
    </section>
  );
}

type CatalogPaginationProps = {
  pathname: string;
  queryString: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  rangeStart: number;
  rangeEnd: number;
};

function CatalogPagination({
  pathname,
  queryString,
  currentPage,
  totalPages,
  totalResults,
  rangeStart,
  rangeEnd,
}: CatalogPaginationProps) {
  if (totalResults === 0) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams(queryString);
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const linkBase =
    "inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-full border border-card-border bg-surface-container-lowest px-5 font-label-caps text-[12px] font-bold uppercase tracking-[0.12em] text-text-strong transition-colors hover:border-card-border-hover hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40";

  return (
    <nav
      aria-label="Results pagination"
      className="mt-10 flex flex-col items-stretch gap-4 border-t border-outline-variant pt-10 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-center font-body-md text-sm text-text-muted sm:text-left">
        {totalPages > 1 ? (
          <>
            Showing{" "}
            <span className="font-semibold tabular-nums text-text-strong">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            of <span className="font-semibold tabular-nums text-text-strong">{totalResults}</span>
            <span className="text-text-muted"> · </span>
            Page {currentPage} of {totalPages}
          </>
        ) : (
          <>
            <span className="font-semibold tabular-nums text-text-strong">{totalResults}</span>{" "}
            {totalResults === 1 ? "vehicle" : "vehicles"}
          </>
        )}
      </p>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3 sm:justify-end">
          {currentPage > 1 ? (
            <Link href={buildHref(currentPage - 1)} className={linkBase} scroll>
              Previous
            </Link>
          ) : (
            <span
              className={cn(
                linkBase,
                "pointer-events-none cursor-not-allowed border-outline-variant opacity-40",
              )}
              aria-disabled="true"
            >
              Previous
            </span>
          )}
          {currentPage < totalPages ? (
            <Link href={buildHref(currentPage + 1)} className={linkBase} scroll>
              Next
            </Link>
          ) : (
            <span
              className={cn(
                linkBase,
                "pointer-events-none cursor-not-allowed border-outline-variant opacity-40",
              )}
              aria-disabled="true"
            >
              Next
            </span>
          )}
        </div>
      ) : null}
    </nav>
  );
}

function prettify(s: string): string {
  return s
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
