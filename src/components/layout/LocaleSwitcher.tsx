"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Link, usePathname } from "@/i18n/navigation";

type LocaleSwitcherProps = {
  className?: string;
  /** Narrow labels (EN / AM) and tighter chrome for toolbar placement. */
  compact?: boolean;
};

export function LocaleSwitcher({ className, compact }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-bold uppercase text-text-strong",
        compact
          ? "gap-0.5 border-outline-variant/60 bg-transparent px-1 py-0.5 text-[10px] tracking-[0.14em] backdrop-blur-sm"
          : "gap-2 border-outline-variant bg-surface-container-low px-2 py-1 text-xs tracking-wide",
        className,
      )}
      role="group"
      aria-label={t("hint")}
    >
      <Link
        href={pathname}
        locale="en"
        title={t("english")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          compact ? "min-w-[1.875rem] text-center px-1.5 py-0.5" : null,
          locale === "en"
            ? "bg-on-background text-background"
            : "text-text-muted hover:text-text-strong",
        )}
      >
        {compact ? "EN" : t("english")}
      </Link>
      <Link
        href={pathname}
        locale="am"
        title={t("amharic")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          compact ? "min-w-[1.875rem] text-center px-1.5 py-0.5" : null,
          locale === "am"
            ? "bg-on-background text-background"
            : "text-text-muted hover:text-text-strong",
        )}
      >
        {compact ? "አም" : t("amharic")}
      </Link>
    </div>
  );
}
