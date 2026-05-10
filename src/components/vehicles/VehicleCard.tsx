"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatPrice, formatYear } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

type VehicleCardProps = {
  vehicle: Vehicle;
  priority?: boolean;
  tone?: "light" | "container";
  className?: string;
};

export function VehicleCard({
  vehicle,
  priority,
  tone = "light",
  className,
}: VehicleCardProps) {
  const t = useTranslations("VehicleCard");

  const milesDisplay =
    vehicle.specs.mileage !== undefined
      ? formatMileage(vehicle.specs.mileage) ?? "—"
      : t("deliveryMileage");

  const condition =
    vehicle.condition === "pre-owned"
      ? t("conditionPreOwned")
      : vehicle.condition === "certified"
        ? t("conditionCertified")
        : t("conditionNew");

  const fuel = {
    petrol: t("fuelPetrol"),
    diesel: t("fuelDiesel"),
    hybrid: t("fuelHybrid"),
    "plug-in-hybrid": t("fuelPlugIn"),
    electric: t("fuelElectric"),
  }[vehicle.specs.fuel];

  const transmission = {
    automatic: t("transAutomatic"),
    manual: t("transManual"),
    dct: t("transDct"),
    cvt: t("transCvt"),
  }[vehicle.specs.transmission];

  const priceHeading =
    vehicle.category === "for-rent"
      ? t("priceFrom")
      : vehicle.condition === "new"
        ? t("priceStarting")
        : t("priceAsking");

  const statusLabel =
    vehicle.status === "reserved"
      ? t("statusReserved")
      : vehicle.status === "sold"
        ? t("statusSold")
        : vehicle.status;

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-card-border-hover hover:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_28px_80px_-32px_rgba(0,0,0,0.55)]",
        tone === "light"
          ? "bg-surface-container-lowest"
          : "bg-surface-container-low",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high sm:aspect-[5/3]">
        <Image
          src={vehicle.heroImage.src}
          alt={vehicle.heroImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          {vehicle.editorsPick ? (
            <Badge
              variant="inverse"
              size="sm"
              className="border-0 bg-background/90 font-semibold shadow-sm backdrop-blur-sm dark:bg-black/70"
            >
              {t("editorsPick")}
            </Badge>
          ) : null}
          <Badge
            variant="outline"
            size="sm"
            className="border-white/20 bg-background/90 font-semibold shadow-sm backdrop-blur-sm dark:bg-black/60 dark:text-white"
          >
            {condition}
          </Badge>
          {vehicle.status !== "available" ? (
            <Badge
              variant={vehicle.status === "reserved" ? "success" : "error"}
              size="sm"
              className="shadow-sm"
            >
              {statusLabel}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
          {vehicle.make} · {formatYear(vehicle.specs.year)}
        </p>
        <h3 className="mt-2 text-balance text-[1.3125rem] font-semibold leading-[1.2] tracking-[-0.022em] text-text-strong sm:text-[1.5rem]">
          {vehicle.model}
          {vehicle.trim ? (
            <span className="font-medium text-text-body"> — {vehicle.trim}</span>
          ) : null}
        </h3>

        <dl className="mt-6 grid grid-cols-3 divide-x divide-outline-variant/50 border-t border-outline-variant pt-6 text-center">
          <div className="flex flex-col gap-1 px-1 first:pl-0">
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
              {t("statMiles")}
            </dt>
            <dd className="text-[13px] font-semibold tabular-nums text-text-strong sm:text-sm">
              {milesDisplay}
            </dd>
          </div>
          <div className="flex flex-col gap-1 px-1">
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
              {t("statFuel")}
            </dt>
            <dd className="text-[13px] font-semibold text-text-strong sm:text-sm">{fuel}</dd>
          </div>
          <div className="flex flex-col gap-1 px-1 last:pr-0">
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
              {t("statTransmission")}
            </dt>
            <dd className="text-[13px] font-semibold text-text-strong sm:text-sm">{transmission}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-1 flex-col justify-end border-t border-card-divider pt-6 transition-colors duration-300 group-hover:border-card-divider-hover sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
              {priceHeading}
            </span>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums leading-none tracking-[-0.02em] text-text-strong sm:text-[1.625rem]">
              {formatPrice(vehicle.price)}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-end">
            <span className="text-sm font-medium text-text-body sm:text-right">
              {vehicle.location.city}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-transform duration-300 group-hover:translate-x-0.5">
              {t("viewDetail")}
              <ArrowUpRight className="size-4 shrink-0" aria-hidden strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
