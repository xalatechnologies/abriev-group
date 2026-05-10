"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { VehicleFilters } from "./filters";
import { countActiveFilters, emptyFilters } from "./filters";

type ActiveFilterChipsProps = {
  filters: VehicleFilters;
  onChange: (next: VehicleFilters) => void;
};

type Chip = { id: string; label: string; onRemove: () => void };

export function ActiveFilterChips({ filters, onChange }: ActiveFilterChipsProps) {
  const t = useTranslations("Filters");
  const chips: Chip[] = [];

  filters.makes.forEach((m) =>
    chips.push({
      id: `make-${m}`,
      label: m,
      onRemove: () =>
        onChange({ ...filters, makes: filters.makes.filter((x) => x !== m) }),
    }),
  );
  filters.models.forEach((m) =>
    chips.push({
      id: `model-${m}`,
      label: m,
      onRemove: () =>
        onChange({ ...filters, models: filters.models.filter((x) => x !== m) }),
    }),
  );
  filters.bodyStyles.forEach((b) =>
    chips.push({
      id: `body-${b}`,
      label: prettify(b),
      onRemove: () =>
        onChange({
          ...filters,
          bodyStyles: filters.bodyStyles.filter((x) => x !== b),
        }),
    }),
  );
  filters.fuels.forEach((f) =>
    chips.push({
      id: `fuel-${f}`,
      label: prettify(f),
      onRemove: () =>
        onChange({ ...filters, fuels: filters.fuels.filter((x) => x !== f) }),
    }),
  );
  filters.transmissions.forEach((tr) =>
    chips.push({
      id: `trans-${tr}`,
      label: prettify(tr),
      onRemove: () =>
        onChange({
          ...filters,
          transmissions: filters.transmissions.filter((x) => x !== tr),
        }),
    }),
  );
  filters.drivetrains.forEach((d) =>
    chips.push({
      id: `drive-${d}`,
      label: d.toUpperCase(),
      onRemove: () =>
        onChange({
          ...filters,
          drivetrains: filters.drivetrains.filter((x) => x !== d),
        }),
    }),
  );
  filters.locations.forEach((l) =>
    chips.push({
      id: `loc-${l}`,
      label: l,
      onRemove: () =>
        onChange({
          ...filters,
          locations: filters.locations.filter((x) => x !== l),
        }),
    }),
  );
  if (filters.priceMin !== undefined)
    chips.push({
      id: "price-min",
      label: t("minPriceChip", { amount: `$${filters.priceMin.toLocaleString()}` }),
      onRemove: () => onChange({ ...filters, priceMin: undefined }),
    });
  if (filters.priceMax !== undefined)
    chips.push({
      id: "price-max",
      label: t("maxPriceChip", { amount: `$${filters.priceMax.toLocaleString()}` }),
      onRemove: () => onChange({ ...filters, priceMax: undefined }),
    });
  if (filters.yearMin !== undefined)
    chips.push({
      id: "year-min",
      label: `${filters.yearMin}+`,
      onRemove: () => onChange({ ...filters, yearMin: undefined }),
    });

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={c.onRemove}
          className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2 font-body-lg text-body-lg font-medium text-on-surface transition-colors duration-200 hover:border-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <span>{c.label}</span>
          <X className="size-3.5 shrink-0 text-on-surface-variant group-hover:text-on-background" aria-hidden />
        </button>
      ))}
      {countActiveFilters(filters) > 0 ? (
        <button
          type="button"
          onClick={() => onChange({ ...emptyFilters, category: filters.category })}
          className="inline-flex min-h-[40px] items-center px-2 py-1.5 font-label-caps text-sm font-bold uppercase tracking-wide text-on-background underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {t("resetAllChips")}
        </button>
      ) : null}
    </div>
  );
}

function prettify(s: string): string {
  return s
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
