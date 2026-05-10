import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "ABRIEV found us a 964 in a week that would have taken us a season. The entire process felt less like a transaction and more like being introduced at a gallery.",
    author: "Charles M.",
    role: "Collector, New York",
  },
  {
    quote:
      "We moved four vehicles through ABRIEV last quarter — all at book, all to serious buyers. The listings are treated like editorial pieces, and it shows.",
    author: "Isobel V.",
    role: "Director, Harbour Row Automobiles",
  },
  {
    quote:
      "The rental handover at my hotel was so quiet I barely noticed it. An S-Class arrived; the chauffeur opened the door; that was the whole experience.",
    author: "Daniel R.",
    role: "Private client, Monaco",
  },
] as const;

export function TestimonialStrip() {
  return (
    <section className="section-y">
      <Container>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col gap-6">
              <span
                aria-hidden
                className="font-display-lg text-display-lg leading-none text-tertiary"
              >
                &ldquo;
              </span>
              <blockquote className="font-headline-md text-headline-md leading-[1.35] text-on-background text-balance">
                {t.quote}
              </blockquote>
              <figcaption className="flex flex-col gap-1 border-t border-card-divider pt-4">
                <span className="font-body-lg text-body-lg font-semibold text-on-background">
                  {t.author}
                </span>
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
