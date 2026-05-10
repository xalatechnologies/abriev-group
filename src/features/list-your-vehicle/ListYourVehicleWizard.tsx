"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type {
  VehicleBodyStyle,
  VehicleCondition,
  VehicleFuel,
  VehicleTransmission,
} from "@/types/vehicle";

const BODY_STYLES: VehicleBodyStyle[] = [
  "sedan",
  "coupe",
  "convertible",
  "suv",
  "crossover",
  "wagon",
  "hatchback",
  "pickup",
  "van",
  "grand-tourer",
];

const FUELS: VehicleFuel[] = ["petrol", "diesel", "hybrid", "plug-in-hybrid", "electric"];

const TRANSMISSIONS: VehicleTransmission[] = ["automatic", "manual", "dct", "cvt"];

const CONDITIONS: VehicleCondition[] = ["new", "pre-owned", "certified"];

const CURRENCIES = ["USD", "EUR", "GBP", "AED"] as const;

const MAX_PHOTOS = 12;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const inputClass =
  "rounded-xl border border-outline-variant bg-surface px-4 py-3.5 md:px-5 md:py-4 font-body-md md:text-[15px] text-body-md text-text-strong outline-none transition-colors placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30";

const selectClass = cn(inputClass, "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10");

type Step = 0 | 1 | 2 | 3;

type ListingForm = {
  files: File[];
  make: string;
  model: string;
  year: string;
  bodyStyle: VehicleBodyStyle | "";
  mileage: string;
  fuel: VehicleFuel | "";
  transmission: VehicleTransmission | "";
  condition: VehicleCondition | "";
  city: string;
  country: string;
  description: string;
  price: string;
  currency: (typeof CURRENCIES)[number];
  confirmAccuracy: boolean;
  confirmContact: boolean;
};

const initialForm: ListingForm = {
  files: [],
  make: "",
  model: "",
  year: "",
  bodyStyle: "",
  mileage: "",
  fuel: "",
  transmission: "",
  condition: "",
  city: "",
  country: "",
  description: "",
  price: "",
  currency: "USD",
  confirmAccuracy: false,
  confirmContact: false,
};

export function ListYourVehicleWizard() {
  const t = useTranslations("ListYourVehicle");
  const router = useRouter();
  const formId = useId();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<ListingForm>(initialForm);
  const [stepError, setStepError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = form.files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [form.files]);

  const yearNow = new Date().getFullYear();
  const yearMin = 1990;
  const yearMax = yearNow + 1;

  const stepLabels = useMemo(
    () => [t("stepPhotos"), t("stepDetails"), t("stepPricing"), t("stepReview")],
    [t],
  );

  const validateStep = useCallback(
    (s: Step): string | null => {
      if (s === 0) {
        if (form.files.length < 1) return t("photosErrorMin");
        if (form.files.length > MAX_PHOTOS) return t("photosErrorLimit");
        for (const f of form.files) {
          if (f.size > MAX_FILE_BYTES) return t("photosErrorSize");
        }
        return null;
      }
      if (s === 1) {
        if (!form.make.trim()) return t("detailsErrorMake");
        if (!form.model.trim()) return t("detailsErrorModel");
        const y = Number(form.year);
        if (!form.year || !Number.isFinite(y) || y < yearMin || y > yearMax) {
          return t("detailsErrorYear");
        }
        if (!form.fuel) return t("detailsErrorFuel");
        if (!form.transmission) return t("detailsErrorTransmission");
        if (!form.condition) return t("detailsErrorCondition");
        if (!form.city.trim()) return t("detailsErrorCity");
        return null;
      }
      if (s === 2) {
        const p = Number(form.price.replace(/,/g, ""));
        if (!form.price.trim() || !Number.isFinite(p) || p <= 0) return t("pricingErrorPrice");
        return null;
      }
      if (s === 3) {
        if (!form.confirmAccuracy || !form.confirmContact) return t("reviewErrorTerms");
        return null;
      }
      return null;
    },
    [form, t, yearMax, yearMin],
  );

  const goNext = () => {
    setStepError(null);
    const err = validateStep(step);
    if (err) {
      setStepError(err);
      return;
    }
    if (step === 3) {
      router.push("/list-your-vehicle/success");
      return;
    }
    setStep((x) => (x + 1) as Step);
  };

  const goBack = () => {
    setStepError(null);
    setStep((x) => (x > 0 ? ((x - 1) as Step) : x));
  };

  const onFilesPicked = (list: FileList | null) => {
    if (!list?.length) return;
    const next = [...form.files];
    for (let i = 0; i < list.length; i++) {
      if (next.length >= MAX_PHOTOS) break;
      next.push(list[i]);
    }
    setForm((f) => ({ ...f, files: next }));
  };

  const removeFile = (index: number) => {
    setForm((f) => ({ ...f, files: f.files.filter((_, i) => i !== index) }));
  };

  const priceDisplay = Number(form.price.replace(/,/g, "")) || 0;

  return (
    <div
      id="listing-wizard-root"
      data-listing-wizard="v2"
      className="min-w-0 !mx-0 !w-full !max-w-none"
    >
      <nav aria-label={t("stepProgressAria")} className="mb-12 lg:mb-14">
        <ol
          role="list"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5"
        >
          {stepLabels.map((label, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={label} className="min-w-0">
                <div
                  className={cn(
                    "flex min-h-[4rem] flex-col justify-center rounded-xl border px-4 py-3 text-center transition-colors duration-200 md:min-h-[4.25rem] md:px-5 md:py-3.5 lg:min-h-[4.5rem]",
                    active
                      ? "border-card-border-hover bg-brand-primary/10"
                      : done
                        ? "border-card-border bg-surface-container-low"
                        : "border-card-border bg-surface-container-lowest",
                  )}
                >
                  <span
                    className={cn(
                      "font-label-caps text-[11px] font-bold uppercase tracking-[0.14em] md:text-xs",
                      active ? "text-brand-primary" : "text-text-muted",
                    )}
                  >
                    {i + 1} / {stepLabels.length}
                  </span>
                  <span
                    className={cn(
                      "mt-1 truncate font-body-md text-[0.9375rem] font-semibold md:text-base",
                      active ? "text-text-strong" : "text-text-body",
                    )}
                    aria-current={active ? "step" : undefined}
                  >
                    {label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        className="rounded-2xl border border-card-border bg-surface-container-lowest p-7 shadow-editorial sm:p-9 md:p-10 lg:rounded-3xl lg:p-12 xl:p-14"
        role="region"
        aria-labelledby={`${formId}-step-heading`}
      >
        <h2 id={`${formId}-step-heading`} className="sr-only">
          {stepLabels[step]}
        </h2>

        {stepError ? (
          <p
            className="mb-6 rounded-xl border border-error/40 bg-error/10 px-4 py-3 font-body-md text-sm text-error"
            role="alert"
          >
            {stepError}
          </p>
        ) : null}

        {step === 0 ? (
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="mb-6 max-w-4xl font-body-lg text-body-lg text-on-surface-variant text-pretty lg:max-w-5xl">
              {t("photosIntro")}
            </legend>
            <div className="flex flex-col gap-6">
              <label className="inline-flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-outline-variant bg-surface px-8 py-14 transition-colors hover:border-brand-primary/50 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/25 md:py-16 lg:rounded-2xl lg:py-18">
                <ImagePlus className="size-12 text-text-muted md:size-14" aria-hidden />
                <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong md:text-[0.9375rem]">
                  {t("photosAdd")}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    onFilesPicked(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
              <p className="font-body-md text-sm text-text-muted md:text-[15px]">{t("photosHint")}</p>
              {previewUrls.length > 0 ? (
                <ul role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {previewUrls.map((src, i) => (
                    <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-card-border bg-surface-container-high">
                      {/* eslint-disable-next-line @next/next/no-img-element -- blob previews */}
                      <img
                        src={src}
                        alt=""
                        className="size-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full border border-card-border bg-surface-container-lowest/95 text-text-strong shadow-sm transition-colors hover:border-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                        aria-label={t("photosRemoveAria")}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="min-w-0 space-y-8 border-0 p-0 lg:space-y-10">
            <legend className="mb-4 max-w-4xl font-body-lg text-body-lg text-on-surface-variant text-pretty lg:max-w-5xl">
              {t("detailsIntro")}
            </legend>
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:gap-10">
              <div className="flex flex-col gap-2 sm:col-span-1">
                <label htmlFor={`${formId}-make`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelMake")}
                </label>
                <input
                  id={`${formId}-make`}
                  type="text"
                  autoComplete="organization"
                  value={form.make}
                  onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))}
                  placeholder={t("placeholderMake")}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-model`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelModel")}
                </label>
                <input
                  id={`${formId}-model`}
                  type="text"
                  value={form.model}
                  onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                  placeholder={t("placeholderModel")}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-year`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelYear")}
                </label>
                <input
                  id={`${formId}-year`}
                  type="number"
                  inputMode="numeric"
                  min={yearMin}
                  max={yearMax}
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-body`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelBodyStyle")}
                </label>
                <select
                  id={`${formId}-body`}
                  value={form.bodyStyle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bodyStyle: e.target.value as VehicleBodyStyle | "" }))
                  }
                  className={selectClass}
                >
                  <option value="">{t("reviewSpecsEmpty")}</option>
                  {BODY_STYLES.map((b) => (
                    <option key={b} value={b}>
                      {t(`bodyStyles.${b}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor={`${formId}-mileage`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelMileage")}
                </label>
                <input
                  id={`${formId}-mileage`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.mileage}
                  onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                  placeholder={t("placeholderMileage")}
                  className={inputClass}
                />
                <p className="font-body-md text-xs text-text-muted">{t("labelMileageHint")}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-fuel`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelFuel")}
                </label>
                <select
                  id={`${formId}-fuel`}
                  value={form.fuel}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fuel: e.target.value as VehicleFuel | "" }))
                  }
                  className={selectClass}
                  required
                >
                  <option value="">{t("reviewSpecsEmpty")}</option>
                  {FUELS.map((fuelType) => (
                    <option key={fuelType} value={fuelType}>
                      {t(`fuels.${fuelType}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-trans`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelTransmission")}
                </label>
                <select
                  id={`${formId}-trans`}
                  value={form.transmission}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      transmission: e.target.value as VehicleTransmission | "",
                    }))
                  }
                  className={selectClass}
                  required
                >
                  <option value="">{t("reviewSpecsEmpty")}</option>
                  {TRANSMISSIONS.map((tr) => (
                    <option key={tr} value={tr}>
                      {t(`transmissions.${tr}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-cond`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelCondition")}
                </label>
                <select
                  id={`${formId}-cond`}
                  value={form.condition}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      condition: e.target.value as VehicleCondition | "",
                    }))
                  }
                  className={selectClass}
                  required
                >
                  <option value="">{t("reviewSpecsEmpty")}</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {t(`conditions.${c}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-city`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelCity")}
                </label>
                <input
                  id={`${formId}-city`}
                  type="text"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder={t("placeholderCity")}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-country`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelCountry")}
                </label>
                <input
                  id={`${formId}-country`}
                  type="text"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder={t("placeholderCountry")}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor={`${formId}-desc`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelDescription")}
                </label>
                <textarea
                  id={`${formId}-desc`}
                  rows={7}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder={t("placeholderDescription")}
                  className={cn(inputClass, "resize-y")}
                />
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className="min-w-0 space-y-8 border-0 p-0 lg:space-y-10">
            <legend className="mb-4 max-w-4xl font-body-lg text-body-lg text-on-surface-variant text-pretty lg:max-w-5xl">
              {t("pricingIntro")}
            </legend>
            <p className="font-body-md text-base md:text-[15px]">
              <Link
                href="/list-your-vehicle/pricing"
                className="font-semibold text-brand-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
              >
                {t("linkPricingPlans")}
              </Link>
            </p>
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:gap-10">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-price`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelPrice")}
                </label>
                <input
                  id={`${formId}-price`}
                  type="number"
                  inputMode="decimal"
                  min={1}
                  step="1"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder={t("placeholderPrice")}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${formId}-cur`} className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t("labelCurrency")}
                </label>
                <select
                  id={`${formId}-cur`}
                  value={form.currency}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      currency: e.target.value as (typeof CURRENCIES)[number],
                    }))
                  }
                  className={selectClass}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {t(`currencies.${c}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <div className="space-y-10 lg:space-y-12">
            <p className="max-w-5xl font-body-lg text-body-lg text-on-surface-variant text-pretty xl:max-w-6xl">
              {t("reviewIntro")}
            </p>
            <dl className="grid gap-5 border-t border-card-divider pt-8 md:gap-6 lg:gap-8 lg:pt-10 sm:grid-cols-2">
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("stepPhotos")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {t("reviewPhotos", { count: form.files.length })}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelMake")} / {t("labelModel")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {form.make} {form.model}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelYear")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">{form.year || t("reviewSpecsEmpty")}</dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelBodyStyle")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {form.bodyStyle ? t(`bodyStyles.${form.bodyStyle}`) : t("reviewSpecsEmpty")}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelMileage")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong tabular-nums md:text-[17px]">
                  {form.mileage.trim() ? form.mileage : t("reviewSpecsEmpty")}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelCondition")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {form.condition ? t(`conditions.${form.condition}`) : t("reviewSpecsEmpty")}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelFuel")} · {t("labelTransmission")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {form.fuel ? t(`fuels.${form.fuel}`) : t("reviewSpecsEmpty")} ·{" "}
                  {form.transmission ? t(`transmissions.${form.transmission}`) : t("reviewSpecsEmpty")}
                </dd>
              </div>
              <div>
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelCity")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong md:text-[17px]">
                  {form.city}
                  {form.country ? `, ${form.country}` : ""}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                  {t("labelPrice")}
                </dt>
                <dd className="mt-2 font-body-md text-base text-text-strong tabular-nums md:text-[17px]">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: form.currency,
                    maximumFractionDigits: 0,
                  }).format(priceDisplay)}
                </dd>
              </div>
              {form.description.trim() ? (
                <div className="sm:col-span-2">
                  <dt className="font-label-caps text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                    {t("labelDescription")}
                  </dt>
                  <dd className="mt-2 whitespace-pre-wrap font-body-md text-base text-text-strong md:text-[17px]">
                    {form.description}
                  </dd>
                </div>
              ) : null}
            </dl>

            <fieldset className="space-y-5 border-t border-card-divider pt-8 md:space-y-6 md:pt-10">
              <legend className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                {t("reviewTermsLegend")}
              </legend>
              <label className="flex cursor-pointer items-start gap-4 font-body-md text-[15px] text-text-body md:text-base">
                <input
                  type="checkbox"
                  checked={form.confirmAccuracy}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, confirmAccuracy: e.target.checked }))
                  }
                  className="mt-1 size-5 shrink-0 rounded border-outline-variant text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                />
                <span>{t("reviewAccuracy")}</span>
              </label>
              <label className="flex cursor-pointer items-start gap-4 font-body-md text-[15px] text-text-body md:text-base">
                <input
                  type="checkbox"
                  checked={form.confirmContact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, confirmContact: e.target.checked }))
                  }
                  className="mt-1 size-5 shrink-0 rounded border-outline-variant text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                />
                <span>{t("reviewConsent")}</span>
              </label>
            </fieldset>
          </div>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-card-divider pt-10 lg:mt-14 lg:pt-12">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex min-h-12 min-w-[7.5rem] items-center justify-center rounded-full border border-card-border bg-surface-container-lowest px-8 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong transition-colors hover:border-card-border-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            {t("back")}
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-10 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 md:text-[0.9375rem]"
          >
            {step === 3 ? t("submit") : t("continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
