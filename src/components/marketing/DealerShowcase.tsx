import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Dot } from "lucide-react";
import type { Dealer } from "@/types/dealer";
import { Container } from "@/components/ui/Container";

type DealerShowcaseProps = {
  dealers: Dealer[];
};

export function DealerShowcase({ dealers }: DealerShowcaseProps) {
  const leadDealer = dealers[0];
  if (!leadDealer) return null;

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <h2 className="font-headline-lg text-headline-lg leading-tight text-text-strong">
              Global network
            </h2>
            <ul className="mt-8 space-y-4">
              {dealers.slice(0, 4).map((dealer, idx) => (
                <li
                  key={dealer.id}
                  className={
                    idx < 3
                      ? "flex items-center justify-between border-b border-card-divider pb-3"
                      : "flex items-center justify-between border-b border-card-divider pb-3 opacity-70"
                  }
                >
                  <span className="font-label-caps text-label-caps uppercase text-text-strong">
                    {dealer.city.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-caps text-label-caps uppercase text-brand-primary">
                    <Dot className="size-4" />
                    {idx < 3 ? "Operational" : "Opening soon"}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/dealers"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-text-strong px-6 py-3 font-label-caps text-label-caps uppercase text-white transition-colors hover:bg-brand-primary"
            >
              Logistics & delivery
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>

          <Link
            href={`/dealers/${leadDealer.slug}`}
            className="group relative h-[420px] overflow-hidden rounded-xl bg-surface-container md:h-[520px] md:w-2/3"
          >
            <Image
              src={
                leadDealer.cover ??
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBKFLACIHjK1s61hAYRpgFNuSGX14PbD1mu5Nwa2vLUOusEhbW32FW8L_zA3zjcGgi0mG9L_zVjW7G7SLAXCLBg3LZ_UDb_GdFYeIpDZ-ZcLpLFg4IwrPCBQFmvPfH5AQZEQEmeuDkh2IttV0HERhDCpLiXWito5JYBeiGNMBdx1JsPc_e-7chXZL_DfM5cYPAVhCGt1nxyR4sHE4vxXNp6mH251m8GS0M_xsaGC9gQbwY248sJUgDxJ3i981c5DCLMXPxF_YPMDnI"
              }
              alt={`${leadDealer.name} network`}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover opacity-80 mix-blend-multiply transition-transform duration-[8000ms] ease-linear group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-transparent" />
            <span className="absolute left-[30%] top-[32%] size-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(0,143,76,0.55)]" />
            <span className="absolute left-[62%] top-[55%] size-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(0,143,76,0.55)]" />
            <span className="absolute bottom-[25%] right-[24%] size-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(0,143,76,0.55)]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
