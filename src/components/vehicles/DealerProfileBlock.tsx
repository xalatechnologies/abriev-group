import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Dealer } from "@/types/dealer";
import { Badge } from "@/components/ui/Badge";

type DealerProfileBlockProps = {
  dealer: Dealer;
};

export function DealerProfileBlock({ dealer }: DealerProfileBlockProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="serif-headline-lg">About the dealer</h2>
      <Link
        href={`/dealers/${dealer.slug}`}
        className="group grid gap-0 overflow-hidden rounded-xl border border-card-border bg-surface-container-lowest transition-colors duration-300 hover:border-card-border-hover md:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-high md:aspect-auto">
          {dealer.cover ? (
            <Image
              src={dealer.cover}
              alt={`${dealer.name} showroom`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform [transition-duration:1400ms] ease-editorial group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-5 p-7 md:p-8">
          <div className="flex items-center justify-between">
            <Badge
              variant={dealer.verification === "premier" ? "inverse" : "outline"}
              size="sm"
            >
              {dealer.verification === "premier" ? "Premier dealer" : "Verified"}
            </Badge>
            <ArrowUpRight
              className="size-4 text-on-surface-variant transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-on-background"
              aria-hidden
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-[26px] font-semibold leading-tight text-on-background">
              {dealer.name}
            </h3>
            <p className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
              <MapPin className="size-4" aria-hidden />
              {dealer.city} · {dealer.country}
            </p>
            <p className="line-clamp-3 max-w-prose text-body-md text-on-surface-variant text-pretty">
              {dealer.about ?? dealer.tagline}
            </p>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-card-divider pt-5">
            <Stat label="Inventory" value={`${dealer.inventoryCount} cars`} />
            {dealer.yearsInBusiness ? (
              <Stat label="Years" value={`${dealer.yearsInBusiness}+`} />
            ) : null}
            {dealer.rating ? (
              <Stat label="Rating" value={dealer.rating.score.toFixed(2)} />
            ) : null}
          </dl>
        </div>
      </Link>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="label-caps text-on-surface-variant">{label}</dt>
      <dd className="font-sans text-[18px] font-semibold leading-none text-on-background">
        {value}
      </dd>
    </div>
  );
}
