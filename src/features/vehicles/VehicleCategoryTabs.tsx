"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Tab = {
  href: string;
  label: string;
  count?: number;
};

type VehicleCategoryTabsProps = {
  active: "all" | "new" | "used" | "for-rent";
  counts: Record<"all" | "new" | "used" | "for-rent", number>;
};

export function VehicleCategoryTabs({ active, counts }: VehicleCategoryTabsProps) {
  const tabs: Tab[] = [
    { href: "/vehicles", label: "All", count: counts.all },
    { href: "/vehicles/new", label: "New", count: counts.new },
    { href: "/vehicles/used", label: "Pre-owned", count: counts.used },
    { href: "/vehicles/for-rent", label: "For rent", count: counts["for-rent"] },
  ];
  const keyOf = (t: Tab) =>
    t.href === "/vehicles"
      ? "all"
      : (t.href.split("/").pop() as "new" | "used" | "for-rent");

  return (
    <nav aria-label="Vehicle categories" className="w-full">
      <div className="rounded-2xl border border-card-border bg-surface-container-lowest p-2.5 shadow-sm md:p-3">
        <ul
          role="list"
          className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4 sm:gap-2.5"
        >
          {tabs.map((t) => {
            const key = keyOf(t);
            const isActive = active === key;
            return (
              <li key={t.href} className="min-w-0">
                <Link
                  href={t.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl px-3.5 py-3.5 text-center font-bold transition-all duration-200 md:min-h-[60px] md:gap-3 md:px-4 md:py-4",
                    "text-base leading-tight md:text-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest",
                    isActive
                      ? "bg-brand-primary text-white shadow-[0_10px_28px_-10px_rgba(0,143,76,0.6)]"
                      : "text-text-body hover:bg-surface hover:text-text-strong",
                  )}
                >
                  <span className="truncate">{t.label}</span>
                  <span
                    className={cn(
                      "inline-flex min-h-[28px] min-w-[2.25rem] shrink-0 items-center justify-center rounded-full px-3 text-sm font-bold tabular-nums tracking-tight md:min-h-[30px] md:text-[15px]",
                      isActive
                        ? "bg-white/25 text-white"
                        : "border border-outline-variant bg-surface-container-high text-text-strong",
                    )}
                  >
                    {t.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
