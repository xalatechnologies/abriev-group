"use client";

import { useEffect } from "react";

/**
 * Syncs `<html lang>` with the active `[locale]` segment. The root layout keeps
 * a sensible default for first paint; this updates after hydration for non-default locales.
 */
export function DocumentLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
