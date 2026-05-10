"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Car,
  ChevronDown,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { MakeModelFacets } from "@/lib/utils/makeModelFacets";
import { homeHeroSearch } from "@/content/homePageReference";

type TabKey = "all" | "new" | "used";

type HomeHeroSearchBarProps = {
  facets: MakeModelFacets;
  className?: string;
  presentation?: "default" | "elevated";
};

export function HomeHeroSearchBar({
  facets,
  className,
  presentation = "default",
}: HomeHeroSearchBarProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [priceIndex, setPriceIndex] = useState(0);

  const tabs = [
    { key: "all" as const, ...homeHeroSearch.tabs.all },
    { key: "new" as const, ...homeHeroSearch.tabs.new },
    { key: "used" as const, ...homeHeroSearch.tabs.used },
  ];

  const knownMakesLower = useMemo(
    () => new Map(facets.makes.map((m) => [m.toLowerCase(), m] as const)),
    [facets.makes],
  );
  const knownModelsLower = useMemo(() => {
    const map = new Map<string, { make: string; model: string }>();
    for (const make of facets.makes) {
      for (const model of facets.modelsByMake[make] ?? []) {
        map.set(model.toLowerCase(), { make, model });
      }
    }
    return map;
  }, [facets.makes, facets.modelsByMake]);

  const popularMakes = useMemo(() => facets.makes.slice(0, 5), [facets.makes]);

  const isDirty =
    query.trim().length > 0 || Boolean(bodyStyle) || priceIndex !== 0;

  function reset() {
    setQuery("");
    setBodyStyle("");
    setPriceIndex(0);
  }

  function matchQueryToFilters(input: string) {
    const trimmed = input.trim();
    if (!trimmed) return {};
    const lower = trimmed.toLowerCase();

    if (knownMakesLower.has(lower)) {
      return { make: knownMakesLower.get(lower)! };
    }
    if (knownModelsLower.has(lower)) {
      const { make, model } = knownModelsLower.get(lower)!;
      return { make, model };
    }
    const [first, ...rest] = trimmed.split(/\s+/);
    if (first && knownMakesLower.has(first.toLowerCase())) {
      const make = knownMakesLower.get(first.toLowerCase())!;
      const remainder = rest.join(" ").trim();
      const models = facets.modelsByMake[make] ?? [];
      const exact = models.find((m) => m.toLowerCase() === remainder.toLowerCase());
      if (exact) return { make, model: exact };
      const startsWith = models.find((m) =>
        m.toLowerCase().startsWith(remainder.toLowerCase()),
      );
      if (startsWith) return { make, model: startsWith };
      return { make };
    }
    return { q: trimmed };
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const tabPath =
      tab === "new"
        ? homeHeroSearch.tabs.new.path
        : tab === "used"
          ? homeHeroSearch.tabs.used.path
          : homeHeroSearch.tabs.all.path;

    const matched = matchQueryToFilters(query);
    const params = new URLSearchParams();
    if (matched.make) params.append("make", matched.make);
    if (matched.model) params.append("model", matched.model);
    if (matched.q) params.append("q", matched.q);
    if (bodyStyle) params.append("body", bodyStyle);

    const price = homeHeroSearch.priceRanges[priceIndex];
    if (price?.min !== undefined) params.append("priceMin", String(price.min));
    if (price?.max !== undefined) params.append("priceMax", String(price.max));

    const qs = params.toString();
    router.push(qs ? `${tabPath}?${qs}` : tabPath);
  }

  const modern = presentation === "elevated";

  if (modern) {
    return (
      <div
        className={cn(
          "group/card relative w-full overflow-hidden rounded-3xl border border-card-border bg-surface p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-outline-variant transition-shadow duration-300 focus-within:shadow-[0_30px_90px_-25px_rgba(0,143,76,0.30)] sm:p-6 md:px-8 md:py-7",
          className,
        )}
      >
        {/* Subtle inner light strip at the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-outline to-transparent"
        />

        {/* Header row: animated tabs + helper note */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Listing type"
            className="relative flex items-center gap-1.5"
          >
            {tabs.map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(key)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                    active
                      ? "font-bold text-brand-primary"
                      : "font-semibold text-text-strong/80 hover:text-text-strong",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="hero-search-tab-bg"
                      className="absolute inset-0 rounded-full bg-brand-primary/10"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 480, damping: 38 }
                      }
                    />
                  ) : null}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-strong sm:text-right">
            <Sparkles
              className="size-3.5 text-brand-primary"
              strokeWidth={2.4}
              aria-hidden
            />
            {homeHeroSearch.helper}
          </span>
        </div>

        <form
          onSubmit={submit}
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end md:gap-3"
        >
          {/* Make / Model search input */}
          <FieldShell
            label={homeHeroSearch.makeModelLabel}
            className="md:col-span-4"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within/input:text-brand-primary"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={homeHeroSearch.makeModelPlaceholder}
                aria-label={homeHeroSearch.makeModelLabel}
                className={cn(
                  "peer h-[52px] w-full rounded-xl border bg-surface-container-high pl-11 pr-4 font-body-md text-body-md font-semibold text-text-strong placeholder:font-medium placeholder:text-text-muted outline-none transition-all duration-200 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(0,143,76,0.12)]",
                  query.trim()
                    ? "border-brand-primary/45"
                    : "border-outline-variant hover:border-outline",
                )}
                list="hero-make-model"
                autoComplete="off"
              />
              <datalist id="hero-make-model">
                {facets.makes.map((m) => (
                  <option key={`make-${m}`} value={m} />
                ))}
                {facets.makes.flatMap((make) =>
                  (facets.modelsByMake[make] ?? []).map((model) => (
                    <option
                      key={`mm-${make}-${model}`}
                      value={`${make} ${model}`}
                    />
                  )),
                )}
              </datalist>
            </div>
          </FieldShell>

          {/* Body Style */}
          <FieldShell
            label={homeHeroSearch.bodyStyleLabel}
            className="md:col-span-3"
          >
            <SelectControl
              ariaLabel={homeHeroSearch.bodyStyleLabel}
              value={bodyStyle}
              onChange={setBodyStyle}
              icon={<Car className="size-4" aria-hidden />}
              isDirty={Boolean(bodyStyle)}
            >
              {homeHeroSearch.bodyStyles.map((b) => (
                <option key={b.value || "any"} value={b.value}>
                  {b.label}
                </option>
              ))}
            </SelectControl>
          </FieldShell>

          {/* Price Range */}
          <FieldShell
            label={homeHeroSearch.priceRangeLabel}
            className="md:col-span-3"
          >
            <SelectControl
              ariaLabel={homeHeroSearch.priceRangeLabel}
              value={String(priceIndex)}
              onChange={(v) => setPriceIndex(Number(v))}
              icon={<BadgeDollarSign className="size-4" aria-hidden />}
              isDirty={priceIndex !== 0}
            >
              {homeHeroSearch.priceRanges.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </SelectControl>
          </FieldShell>

          {/* CTA */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="group/cta inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-primary to-[#007a40] px-6 text-sm font-bold tracking-[0.12em] text-white shadow-[0_10px_24px_-10px_rgba(0,143,76,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(0,143,76,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 active:translate-y-0"
            >
              <span>{homeHeroSearch.searchCta}</span>
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                aria-hidden
              />
            </button>
          </div>
        </form>

        {/* Footer: popular chips + reset */}
        {popularMakes.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-card-divider pt-4">
            <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong">
              Popular
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {popularMakes.map((m) => {
                const active = query.trim().toLowerCase() === m.toLowerCase();
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setQuery(active ? "" : m)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm font-bold transition-all duration-200",
                      active
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                        : "border-outline-variant bg-surface text-text-strong hover:border-outline hover:bg-surface-container-high",
                    )}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={!isDirty}
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 text-sm font-bold transition-colors",
                isDirty
                  ? "text-text-strong hover:text-brand-primary"
                  : "cursor-not-allowed text-text-disabled",
              )}
            >
              <RotateCcw className="size-3.5" aria-hidden strokeWidth={2.4} />
              Reset
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  // ---------------- default presentation (used elsewhere) ----------------
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-card-border bg-surface p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] sm:p-6 md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-5">
        <div
          role="group"
          aria-label="Listing type"
          className="inline-flex w-full rounded-full bg-surface-container-high p-1 ring-1 ring-outline-variant sm:w-auto"
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "min-h-[42px] flex-1 rounded-full px-6 py-2 text-center text-sm transition-[color,background,box-shadow] sm:py-2.5",
                tab === key
                  ? "bg-surface font-bold text-text-strong shadow-sm ring-1 ring-outline-variant"
                  : "font-semibold text-text-body hover:bg-surface/60 hover:text-text-strong",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end"
        >
          <FieldShell
            label={homeHeroSearch.makeModelLabel}
            className="md:col-span-5"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={homeHeroSearch.makeModelPlaceholder}
                aria-label={homeHeroSearch.makeModelLabel}
                className="h-[52px] w-full rounded-xl border border-outline-variant bg-surface-container-high pl-11 pr-4 font-body-md text-body-md font-semibold text-text-strong placeholder:font-medium placeholder:text-text-muted outline-none ring-1 ring-transparent transition-all focus:border-brand-primary focus:bg-surface focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </FieldShell>
          <FieldShell
            label={homeHeroSearch.bodyStyleLabel}
            className="md:col-span-3"
          >
            <SelectControl
              ariaLabel={homeHeroSearch.bodyStyleLabel}
              value={bodyStyle}
              onChange={setBodyStyle}
            >
              {homeHeroSearch.bodyStyles.map((b) => (
                <option key={b.value || "any"} value={b.value}>
                  {b.label}
                </option>
              ))}
            </SelectControl>
          </FieldShell>
          <FieldShell
            label={homeHeroSearch.priceRangeLabel}
            className="md:col-span-2"
          >
            <SelectControl
              ariaLabel={homeHeroSearch.priceRangeLabel}
              value={String(priceIndex)}
              onChange={(v) => setPriceIndex(Number(v))}
            >
              {homeHeroSearch.priceRanges.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </SelectControl>
          </FieldShell>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-bold tracking-[0.12em] text-white shadow-[0_10px_24px_-10px_rgba(0,143,76,0.65)] transition-all hover:-translate-y-0.5 hover:bg-[#00a056] active:translate-y-0"
            >
              {homeHeroSearch.searchCta}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldShell({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong">
        {label}
      </span>
      {children}
    </label>
  );
}

function SelectControl({
  ariaLabel,
  value,
  onChange,
  disabled,
  icon,
  isDirty,
  children,
}: {
  ariaLabel: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isDirty?: boolean;
  children: React.ReactNode;
}) {
  const hasIcon = Boolean(icon);
  return (
    <div className="relative">
      {hasIcon ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
            disabled
              ? "text-text-disabled"
              : isDirty
                ? "text-brand-primary"
                : "text-text-muted",
          )}
        >
          {icon}
        </span>
      ) : null}
      <select
        aria-label={ariaLabel}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-[52px] w-full appearance-none rounded-xl border bg-surface-container-high pr-11 font-body-md text-body-md font-semibold text-text-strong outline-none transition-all duration-200 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(0,143,76,0.12)]",
          hasIcon ? "pl-11" : "pl-4",
          isDirty
            ? "border-brand-primary/45"
            : "border-outline-variant hover:border-outline",
          "disabled:cursor-not-allowed disabled:bg-surface-container disabled:text-text-disabled disabled:opacity-90",
        )}
      >
        {children}
      </select>
      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 transition-colors",
          disabled
            ? "text-text-disabled"
            : isDirty
              ? "text-brand-primary"
              : "text-text-muted",
        )}
        aria-hidden
      />
    </div>
  );
}
