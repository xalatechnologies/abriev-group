import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Divider } from "@/components/ui/Divider";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "Browse a verified, editorially curated catalog — or let our concierge shortlist vehicles against your brief.",
  },
  {
    number: "02",
    title: "Evaluate",
    body: "Review provenance, condition reports, and documented history. Arrange a private viewing or a virtual walkaround.",
  },
  {
    number: "03",
    title: "Acquire",
    body: "Secure the vehicle through our dealer-direct process. Handover, delivery, and after-sales handled in-house.",
  },
  {
    number: "04",
    title: "Live with it",
    body: "Complimentary ownership services — insurance, replacement, and listing support — available for the life of the car.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section-y">
      <Container>
        <SectionIntro
          eyebrow="How it works"
          title="Four quiet steps, from first look to delivery."
          lede="The ABRIEV process is deliberate. No noise, no pressure — just a considered pathway to the right vehicle."
          className="mb-16 max-w-5xl"
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-card-border bg-card-divider md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.number}
              className="flex flex-col gap-6 bg-surface-container-lowest p-8 transition-colors duration-300 hover:bg-surface-container-low md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="font-headline-lg text-headline-lg leading-none text-tertiary">
                  {s.number}
                </span>
                <Divider orientation="vertical" className="h-8" />
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  Step
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background">
                {s.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
