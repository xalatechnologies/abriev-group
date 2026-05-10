"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Search, ChevronDown } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils/cn";

type HeroSearchBarProps = {
  className?: string;
};

const categories = [
  { value: "", label: "All vehicles" },
  { value: "new", label: "New" },
  { value: "used", label: "Pre-owned" },
  { value: "for-rent", label: "For rent" },
] as const;

const tiers = [
  "Obsidian Elite",
  "Heritage Collector",
  "Platinum Member",
] as const;

export function HeroSearchBar({ className }: HeroSearchBarProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [tier, setTier] = useState<string>(tiers[0]);

  function submit() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (tier) params.set("tier", tier);
    const base = category ? `/vehicles/${category}` : "/vehicles";
    const qs = params.toString();
    router.push(qs ? `${base}?${qs}` : base);
  }

  return (
    <GlassPanel
      intensity="strong"
      radius="xl"
      className={cn(
        "editorial-shadow-lg w-full max-w-6xl border border-card-border p-5 sm:p-8",
        className,
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col items-stretch gap-5 font-primary md:flex-row md:items-end"
      >
        <label className="flex min-w-0 flex-1 flex-col gap-3">
          <span className="font-label-caps text-label-caps uppercase text-text-muted">
            Find your masterpiece
          </span>
          <div className="flex items-center gap-2 border-b border-outline pb-2 transition-colors focus-within:border-brand-primary">
            <Search className="size-4 text-text-muted" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="MODEL, YEAR, OR CATEGORY"
              className="w-full border-none bg-transparent p-0 font-headline-md text-headline-md leading-tight text-text-strong placeholder:text-text-disabled focus:outline-none focus:ring-0"
            />
          </div>
        </label>
        <SelectField
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories.map((c) => ({ value: c.value, label: c.label }))}
          className="w-full md:w-56"
        />
        <SelectField
          label="Tier"
          value={tier}
          onChange={setTier}
          options={tiers.map((t) => ({ value: t, label: t }))}
          className="w-full md:w-64"
        />
        <button
          type="submit"
          className="inline-flex h-[60px] items-center justify-center gap-2 rounded-full bg-brand-primary px-8 font-label-caps text-label-caps uppercase text-white transition-colors duration-300 ease-editorial hover:bg-text-strong"
        >
          <span>Search</span>
        </button>
      </form>
    </GlassPanel>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group relative flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-card-border bg-surface px-4 py-3 text-left transition-colors duration-200 hover:border-card-border-hover hover:bg-surface-container-high",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-label-caps text-label-caps uppercase text-text-muted">
          {label}
        </span>
        <span className="truncate font-body-md text-body-md font-semibold text-text-strong">
          {options.find((o) => o.value === value)?.label ?? value}
        </span>
      </div>
      <ChevronDown className="size-4 text-text-muted" aria-hidden />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value || "__empty"} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
