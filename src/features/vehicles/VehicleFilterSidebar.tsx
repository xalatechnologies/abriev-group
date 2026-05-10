"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import type { VehicleFilters } from "./filters";

type Option<T extends string = string> = { value: T; label: string; count?: number };

type VehicleFilterSidebarProps = {
  filters: VehicleFilters;
  onChange: (next: VehicleFilters) => void;
  facets: {
    makes: Option[];
    bodyStyles: Option[];
    fuels: Option[];
    transmissions: Option[];
    drivetrains: Option[];
    locations: Option[];
  };
  priceRange: [number, number];
  yearRange: [number, number];
};

export function VehicleFilterSidebar({
  filters,
  onChange,
  facets,
  priceRange,
  yearRange,
}: VehicleFilterSidebarProps) {
  const t = useTranslations("Filters");

  return (
    <aside className="flex flex-col divide-y divide-outline-variant">
      <Section title={t("sectionBrand")} defaultOpen>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.makes}
          selected={filters.makes}
          onChange={(makes) => onChange({ ...filters, makes })}
        />
      </Section>

      <Section title={t("sectionBody")}>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.bodyStyles}
          selected={filters.bodyStyles}
          onChange={(bodyStyles) =>
            onChange({ ...filters, bodyStyles: bodyStyles as typeof filters.bodyStyles })
          }
        />
      </Section>

      <Section title={t("sectionPrice")}>
        <div className="flex items-center gap-3">
          <NumberField
            label={t("minimum")}
            value={filters.priceMin}
            placeholder={String(priceRange[0])}
            onChange={(v) => onChange({ ...filters, priceMin: v })}
          />
          <NumberField
            label={t("maximum")}
            value={filters.priceMax}
            placeholder={String(priceRange[1])}
            onChange={(v) => onChange({ ...filters, priceMax: v })}
          />
        </div>
      </Section>

      <Section title={t("sectionYear")}>
        <NumberField
          label={t("fromYear")}
          value={filters.yearMin}
          placeholder={String(yearRange[0])}
          onChange={(v) => onChange({ ...filters, yearMin: v })}
        />
      </Section>

      <Section title={t("sectionFuel")}>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.fuels}
          selected={filters.fuels}
          onChange={(fuels) =>
            onChange({ ...filters, fuels: fuels as typeof filters.fuels })
          }
        />
      </Section>

      <Section title={t("sectionTransmission")}>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.transmissions}
          selected={filters.transmissions}
          onChange={(transmissions) =>
            onChange({
              ...filters,
              transmissions: transmissions as typeof filters.transmissions,
            })
          }
        />
      </Section>

      <Section title={t("sectionDrivetrain")}>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.drivetrains}
          selected={filters.drivetrains}
          onChange={(drivetrains) =>
            onChange({
              ...filters,
              drivetrains: drivetrains as typeof filters.drivetrains,
            })
          }
        />
      </Section>

      <Section title={t("sectionCity")}>
        <CheckboxList
          emptyHint={t("noMatchingValues")}
          options={facets.locations}
          selected={filters.locations}
          onChange={(locations) => onChange({ ...filters, locations })}
        />
      </Section>
    </aside>
  );
}

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-lg py-2.5 text-left transition-colors hover:bg-surface-container-low/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
      >
        <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-on-background">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-on-surface-variant transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? <div className="pt-4">{children}</div> : null}
    </div>
  );
}

function CheckboxList({
  emptyHint,
  options,
  selected,
  onChange,
}: {
  emptyHint: string;
  options: Option[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  if (options.length === 0) {
    return (
      <p className="font-body-lg text-body-lg font-semibold leading-snug text-on-surface-variant">
        {emptyHint}
      </p>
    );
  }

  return (
    <ul role="list" className="m-0 flex list-none flex-col gap-2 p-0">
      {options.map((o) => {
        const checked = selected.includes(o.value);
        return (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-colors duration-200 hover:bg-surface-container-low">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    onChange(
                      e.target.checked
                        ? [...selected, o.value]
                        : selected.filter((x) => x !== o.value),
                    )
                  }
                  className="size-[1.125rem] appearance-none rounded-sm border border-outline bg-surface-container-lowest transition-colors duration-200 checked:border-tertiary checked:bg-tertiary checked:[background-image:linear-gradient(45deg,transparent_47%,var(--background)_47%_53%,transparent_53%),linear-gradient(-45deg,transparent_47%,var(--background)_47%_53%,transparent_53%)]"
                />
                <span className="font-body-lg text-body-lg font-semibold leading-snug text-on-surface">
                  {o.label}
                </span>
              </div>
              {o.count !== undefined ? (
                <span className="font-label-caps text-sm font-bold tabular-nums text-on-surface-variant">
                  {o.count}
                </span>
              ) : null}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function NumberField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: number;
  placeholder?: string;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="font-label-caps text-sm font-bold uppercase tracking-[0.08em] text-on-surface-variant">
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value === "" ? undefined : Number(e.target.value))
        }
        className="h-12 rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 font-body-lg text-body-lg font-semibold tabular-nums text-on-background placeholder:text-on-surface-variant/60 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/20"
      />
    </label>
  );
}
