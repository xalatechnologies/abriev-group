"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("Site");

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-on-background focus:px-4 focus:py-2 focus:text-background"
    >
      {t("skipToContent")}
    </a>
  );
}
