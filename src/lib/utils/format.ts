import type { VehiclePrice } from "@/types/vehicle";

const currencyLocales: Record<VehiclePrice["currency"], string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "en-AE",
};

export function formatPrice(price: VehiclePrice): string {
  const formatter = new Intl.NumberFormat(currencyLocales[price.currency], {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  });
  const value = formatter.format(price.amount);
  if (price.cadence) return `${value} / ${price.cadence}`;
  return value;
}

export function formatMileage(miles?: number): string | null {
  if (!miles && miles !== 0) return null;
  return `${miles.toLocaleString("en-US")} mi`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/** Readable view counts for article cards */
export function formatApproxViews(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 100_000)
    return `${Math.round(n / 1000).toLocaleString("en-US")}K views`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K views`;
  return `${n.toLocaleString("en-US")} views`;
}

export function formatYear(year: number): string {
  return String(year);
}

export function formatDate(iso: string, localeTag?: string | null): string {
  const tag = localeTag === "am" ? "am-ET" : "en-US";
  return new Date(iso).toLocaleDateString(tag, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** View counts on article cards; pass `templates.translate` from `InsightsHub` messages. */
export function formatApproxViewsI18n(
  n: number,
  translate: (
    key: "viewsM" | "viewsK" | "viewsApprox",
    values: { count: string },
  ) => string,
): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n >= 1_000_000) {
    return translate("viewsM", { count: (n / 1_000_000).toFixed(1) });
  }
  if (n >= 100_000) {
    return translate("viewsK", {
      count: Math.round(n / 1000).toLocaleString("en-US"),
    });
  }
  if (n >= 1000) {
    return translate("viewsK", { count: (n / 1000).toFixed(1) });
  }
  return translate("viewsApprox", {
    count: n.toLocaleString("en-US"),
  });
}
