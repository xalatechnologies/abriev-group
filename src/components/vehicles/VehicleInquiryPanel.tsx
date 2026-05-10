import { Link } from "@/i18n/navigation";
import { Phone, Mail, CalendarCheck, ShieldCheck } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import type { Dealer } from "@/types/dealer";
import { formatPrice } from "@/lib/utils/format";

type VehicleInquiryPanelProps = {
  vehicle: Vehicle;
  dealer?: Dealer | null;
};

export function VehicleInquiryPanel({ vehicle, dealer }: VehicleInquiryPanelProps) {
  const isRental = vehicle.category === "for-rent";

  return (
    <aside className="flex flex-col gap-6 rounded-xl border border-card-border bg-surface-container-lowest p-7 editorial-shadow">
      <div className="flex flex-col gap-2">
        <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
          {priceLabel(vehicle)}
        </span>
        <p className="font-display-lg text-display-lg leading-none text-on-background">
          {formatPrice(vehicle.price)}
        </p>
        {!isRental ? (
          <p className="font-body-md text-body-md text-on-surface-variant">
            Excludes taxes, registration, and delivery. Finance options available.
          </p>
        ) : (
          <p className="font-body-md text-body-md text-on-surface-variant">
            Fuel included. 7-day and monthly rates available on request.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={
            isRental
              ? "/booking/check-availability"
              : `/booking/inquiry/${vehicle.slug}`
          }
          className="inline-flex h-14 items-center justify-center rounded-full bg-on-background font-label-caps text-label-caps uppercase text-background transition-colors duration-300 hover:bg-tertiary"
        >
          {isRental ? "Check availability" : "Send an inquiry"}
        </Link>
        <Link
          href="/booking/check-availability"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-outline-variant font-label-caps text-label-caps uppercase text-on-surface transition-colors duration-300 hover:border-on-background hover:bg-surface-container-low"
        >
          <CalendarCheck className="size-4" aria-hidden />
          {isRental ? "Book a test drive" : "Arrange a viewing"}
        </Link>
      </div>

      {dealer ? (
        <div className="flex flex-col gap-4 border-t border-card-divider pt-6">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
              Listed by
            </span>
            <Link
              href={`/dealers/${dealer.slug}`}
              className="font-headline-md text-headline-md leading-tight text-on-background transition-colors hover:text-tertiary"
            >
              {dealer.name}
            </Link>
            <span className="font-body-md text-body-md text-on-surface-variant">
              {dealer.city} · {dealer.country}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {dealer.contact.phone ? (
              <a
                href={`tel:${dealer.contact.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface transition-colors hover:text-tertiary"
              >
                <Phone className="size-4 text-on-surface-variant" aria-hidden />
                {dealer.contact.phone}
              </a>
            ) : null}
            <a
              href={`mailto:${dealer.contact.email}`}
              className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface transition-colors hover:text-tertiary"
            >
              <Mail className="size-4 text-on-surface-variant" aria-hidden />
              {dealer.contact.email}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex items-start gap-3 rounded-lg bg-tertiary-fixed p-4 font-body-md text-body-md text-on-surface-variant">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-tertiary" aria-hidden />
        <p className="leading-relaxed">
          Every listing on ABRIEV is reviewed by our editorial team.
          Condition, provenance, and documentation are verified before
          publication.
        </p>
      </div>
    </aside>
  );
}

function priceLabel(v: Vehicle) {
  if (v.category === "for-rent") return "From";
  if (v.condition === "new") return "Starting at";
  return "Asking";
}
