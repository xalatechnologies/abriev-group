"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("VehicleCategories");
  const tabs: Tab[] = [
    { href: "/vehicles", label: t("all"), count: counts.all },
    { href: "/vehicles/new", label: t("new"), count: counts.new },
    { href: "/vehicles/used", label: t("used"), count: counts.used },
    { href: "/vehicles/for-rent", label: t("forRent"), count: counts["for-rent"] },
  ];
  const keyOf = (t: Tab) =>
    t.href === "/vehicles"
      ? "all"
      : (t.href.split("/").pop() as "new" | "used" | "for-rent");

  return (
    <nav aria-label={t("ariaLabel")} className="w-full">
      <div className="rounded-xl border border-card-border bg-surface-container-lowest p-1.5 shadow-sm md:p-2">
        <ul
          role="list"
          className="m-0 grid list-none grid-cols-2 gap-1.5 p-0 sm:grid-cols-4 sm:gap-2"
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
                    "relative flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-center font-bold transition-all duration-200 md:min-h-[46px] md:gap-2 md:px-3 md:py-2.5",
                    "text-[0.9375rem] leading-tight md:text-base",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest",
                    isActive
                      ? "bg-brand-primary text-white shadow-[0_8px_20px_-8px_rgba(0,143,76,0.55)]"
                      : "text-text-body hover:bg-surface hover:text-text-strong",
                  )}
                >
                  <span className="truncate">{t.label}</span>
                  <span
                    className={cn(
                      "inline-flex min-h-[22px] min-w-[1.875rem] shrink-0 items-center justify-center rounded-full px-2 text-xs font-bold tabular-nums tracking-tight md:min-h-6 md:text-[0.8125rem]",
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
