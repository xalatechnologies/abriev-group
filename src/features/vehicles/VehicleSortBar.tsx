"use client";

import { useMemo } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { VehicleSort } from "./filters";
import { cn } from "@/lib/utils/cn";

type VehicleSortBarProps = {
  sort: VehicleSort;
  onSortChange: (s: VehicleSort) => void;
  total: number;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
};

export function VehicleSortBar({
  sort,
  onSortChange,
  total,
  onOpenFilters,
  activeFilterCount = 0,
}: VehicleSortBarProps) {
  const t = useTranslations("Sort");

  const options = useMemo(
    () =>
      [
        { value: "featured" as const, label: t("featured") },
        { value: "price-asc" as const, label: t("priceAsc") },
        { value: "price-desc" as const, label: t("priceDesc") },
        { value: "year-desc" as const, label: t("yearDesc") },
        { value: "mileage-asc" as const, label: t("mileageAsc") },
      ] as const,
    [t],
  );

  const currentLabel = options.find((o) => o.value === sort)?.label ?? t("sortLabel");

  return (
    <div className="flex flex-col gap-4 border-b border-outline-variant pb-6 pt-2 md:flex-row md:items-center md:justify-between md:pb-7 md:pt-1">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.14em] text-on-surface-variant">
          {t("showing")}
        </span>
        <span className="font-headline-md text-[26px] tabular-nums leading-none text-on-background md:text-[28px]">
          {total}
        </span>
        <span className="font-body-md text-body-md text-on-surface-variant">
          {total === 1 ? t("vehicle") : t("vehicles")}
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
        {onOpenFilters ? (
          <button
            type="button"
            onClick={onOpenFilters}
            className={cn(
              "inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 font-label-caps text-sm font-bold uppercase tracking-wide text-on-surface transition-colors duration-200 hover:border-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden",
            )}
          >
            <SlidersHorizontal className="size-5" aria-hidden />
            {t("filterInventory")}
            {activeFilterCount > 0 ? (
              <span className="ml-1 rounded-full bg-tertiary px-2.5 py-1 font-label-caps text-sm font-bold tabular-nums text-on-tertiary">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        ) : null}

        <label className="relative inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 transition-colors duration-200 hover:border-on-background focus-within:border-on-background focus-within:ring-2 focus-within:ring-tertiary/35 focus-within:ring-offset-2 focus-within:ring-offset-surface">
          <span className="font-label-caps text-label-caps uppercase tracking-wide text-on-surface-variant">
            {t("sortLabel")}
          </span>
          <span className="font-body-md text-body-md text-on-surface">{currentLabel}</span>
          <ChevronDown className="size-4 text-on-surface-variant" aria-hidden />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as VehicleSort)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={t("sortAria")}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
