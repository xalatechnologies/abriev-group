import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

type TestimonialCardData = {
  quote: string;
  authorName: string;
  role: string;
  rating: number;
  avatarSrc: string;
  avatarAlt: string;
};

function TestimonialCard({ card, starsLabel }: { card: TestimonialCardData; starsLabel: string }) {
  return (
    <article className="group/card flex h-full flex-col rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial transition-all duration-300 hover:border-card-border-hover hover:shadow-editorial-lg sm:p-7">
      <Quote
        className="mb-4 size-8 shrink-0 text-brand-primary/80"
        aria-hidden
        strokeWidth={1.75}
      />
      <blockquote className="flex-1 font-body-lg text-body-lg leading-relaxed text-text-body">
        &ldquo;{card.quote}&rdquo;
      </blockquote>
      <div
        className="mt-5 flex gap-0.5 border-t border-card-divider pt-5 transition-colors duration-300 group-hover/card:border-card-divider-hover"
        aria-label={starsLabel}
      >
        {Array.from({ length: card.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-amber-400 text-amber-400 sm:size-[18px]" aria-hidden />
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-outline-variant">
          <Image
            src={card.avatarSrc}
            alt={card.avatarAlt}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-text-strong">{card.authorName}</p>
          <p className="truncate font-body-md text-sm text-text-muted">{card.role}</p>
        </div>
      </div>
    </article>
  );
}

export async function HomeTestimonials() {
  const t = await getTranslations("HomeTestimonials");
  const cards = t.raw("cards") as TestimonialCardData[];
  const loop = [...cards, ...cards];

  return (
    <section className="group/testimonials section-y bg-surface font-primary">
      <Container>
        <div className="mb-12 flex flex-col gap-3 text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-text-strong">{t("title")}</h2>
          <p className="mx-auto max-w-4xl font-body-lg text-body-lg text-text-body md:mx-0">{t("lede")}</p>
        </div>
      </Container>

      <p id="testimonials-marquee-hint" className="sr-only">
        {t("marqueeHint")}
      </p>

      <Container className="hidden motion-reduce:block">
        <ul role="list" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <li key={card.authorName}>
              <TestimonialCard
                card={card}
                starsLabel={t("starsLabel", { rating: card.rating })}
              />
            </li>
          ))}
        </ul>
      </Container>

      <Container className="motion-reduce:hidden">
        <div
          aria-describedby="testimonials-marquee-hint"
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <ul
            role="list"
            className="flex w-max gap-5 pb-2 pt-0.5 animate-[marquee_60s_linear_infinite] motion-reduce:animate-none group-hover/testimonials:[animation-play-state:paused] md:gap-7"
          >
            {loop.map((card, i) => (
              <li
                key={`${card.authorName}-${i}`}
                className="w-[260px] shrink-0 sm:w-[300px] lg:w-[320px]"
              >
                <TestimonialCard
                  card={card}
                  starsLabel={t("starsLabel", { rating: card.rating })}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
