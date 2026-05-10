import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowDown,
  BadgeCheck,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Verified quality",
    detail: "Every listing audited end-to-end.",
  },
  {
    icon: Sparkles,
    title: "Premium services",
    detail: "Concierge buying, selling, ownership.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 support",
    detail: "Roadside assistance, anywhere.",
  },
] as const;

const STATS = [
  { label: "Vehicles in stock", value: "2,400+" },
  { label: "Verified dealers", value: "180" },
  { label: "Countries served", value: "32" },
] as const;

const SPEC_STRIP = [
  { label: "Range", value: "650 km" },
  { label: "0–100", value: "3.8 s" },
  { label: "Top speed", value: "265 km/h" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-72px)] flex-col overflow-hidden bg-white font-primary">
      {/* Soft studio glow tinted with brand-primary */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 72% 42%, rgba(168, 237, 206, 0.55) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
      />

      {/* Editorial side rail */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex md:left-8">
        <span className="font-label-caps text-label-caps uppercase text-text-muted [writing-mode:vertical-rl]">
          Edition · 2026
        </span>
        <span className="h-24 w-px bg-outline-variant" />
        <span className="font-label-caps text-label-caps uppercase text-text-muted">
          01
        </span>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-container-max flex-1 grid-cols-1 items-center gap-12 px-6 pb-12 pt-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] md:gap-20 md:px-margin-edge md:pb-16 md:pt-16 lg:pl-[120px]">
        {/* Copy column */}
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Live status pill */}
          <span className="inline-flex w-max items-center gap-2 rounded-full border border-outline-variant bg-white/70 px-4 py-1.5 font-label-caps text-label-caps uppercase text-text-strong shadow-editorial backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-primary" />
            </span>
            Live inventory · updated daily
          </span>

          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-3 font-label-caps text-label-caps uppercase text-text-muted">
              <span className="h-px w-8 bg-text-disabled" />
              Premium automotive marketplace
            </span>

            <h1 className="text-balance font-display-lg text-text-strong text-[56px] leading-[1.02] tracking-[-0.02em] md:text-[88px] lg:text-[104px]">
              Find your
              <br />
              <span className="italic text-brand-primary">perfect</span> car
            </h1>

            <p className="max-w-md font-body-lg text-body-lg text-text-body">
              Curated inventory, transparent pricing, and concierge-level
              service from first click to delivery — wherever you are.
            </p>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vehicles"
              className="group inline-flex items-center gap-3 rounded-full bg-text-strong px-7 py-4 font-label-caps text-label-caps uppercase text-white transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-brand-primary hover:shadow-editorial"
            >
              Browse inventory
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/list-your-vehicle"
              className="inline-flex items-center gap-2 rounded-full border border-text-disabled px-7 py-4 font-label-caps text-label-caps uppercase text-text-strong transition-colors duration-300 ease-editorial hover:border-text-strong hover:bg-surface-container-high"
            >
              Sell your car
            </Link>
          </div>

          {/* Inline stats row */}
          <dl className="grid grid-cols-3 gap-6 border-t border-card-divider pt-6 md:max-w-md">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <dt className="font-label-caps text-label-caps uppercase text-text-muted">
                  {s.label}
                </dt>
                <dd className="font-headline-md text-headline-md leading-none text-text-strong">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Car column */}
        <div className="relative h-[420px] w-full md:h-[calc(100dvh-72px-180px)] md:min-h-[600px] md:[perspective:1600px]">
          {/* Studio floor ellipse */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[10%] mx-auto h-[40%] w-[90%]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 60%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            }}
          />

          {/* Ground shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[12%] left-1/2 h-12 w-[78%] -translate-x-1/2 rounded-[50%] bg-inverse-surface/45 blur-[32px] md:h-16"
          />

          {/* Car (tilted for 3D perspective) */}
          <div className="animate-hero-float absolute inset-0 flex items-center justify-center md:[transform-style:preserve-3d] md:[transform:rotateX(4deg)_rotateY(-8deg)_scale(1.35)] md:-translate-x-[3%] md:translate-y-[2%]">
            <div className="relative h-full w-full">
              <Image
                src="/images/hero-car.png"
                alt="Premium electric sedan"
                fill
                priority
                sizes="(max-width: 768px) 120vw, 80vw"
                className="object-contain mix-blend-multiply drop-shadow-[0_50px_70px_rgba(0,0,0,0.35)] md:drop-shadow-[0_80px_100px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          {/* Featured glass info card (top-right) */}
          <div className="pointer-events-none absolute right-2 top-4 hidden w-[260px] flex-col gap-3 rounded-2xl border border-card-border bg-white/80 p-5 shadow-editorial backdrop-blur-xl md:flex">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-text-muted">
                Featured
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-0.5 font-label-caps text-[10px] uppercase tracking-[0.18em] text-brand-primary">
                <ShieldCheck className="size-3" aria-hidden />
                Verified
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps uppercase text-text-muted">
                  BYD
                </span>
                <span className="font-headline-md text-headline-md leading-tight text-text-strong">
                  Seal Performance
                </span>
              </div>
              <span className="font-headline-md text-headline-md leading-none text-brand-primary">
                $44.9k
              </span>
            </div>
          </div>

          {/* Spec strip (bottom-center, glass) */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 hidden w-[min(560px,90%)] -translate-x-1/2 grid-cols-3 divide-x divide-card-divider rounded-2xl border border-card-border bg-white/80 px-2 py-4 text-center shadow-editorial backdrop-blur-xl md:grid">
            {SPEC_STRIP.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-4">
                <span className="font-label-caps text-label-caps uppercase text-text-muted">
                  {s.label}
                </span>
                <span className="font-headline-md text-headline-md leading-none text-text-strong">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom feature rail */}
      <div className="relative z-10 border-t border-outline-variant bg-white/70 backdrop-blur-sm">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-6 px-6 py-7 md:grid-cols-[1fr_1fr_1fr_auto] md:gap-10 md:px-margin-edge md:py-8">
          {BENEFITS.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-white">
                <Icon className="size-4 text-brand-primary" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-label-caps text-label-caps uppercase text-text-strong">
                  {title}
                </span>
                <span className="font-body-md text-body-md leading-snug text-text-body">
                  {detail}
                </span>
              </div>
            </div>
          ))}
          <div className="hidden items-center gap-3 md:flex">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">
              Scroll
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-text-disabled text-text-strong">
              <ArrowDown
                className="size-4 animate-bounce text-brand-primary"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
