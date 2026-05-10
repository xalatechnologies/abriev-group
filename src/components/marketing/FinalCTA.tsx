import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { ArrowUpRight } from "lucide-react";

export async function FinalCTA() {
  const t = await getTranslations("FinalCTA");

  return (
    <section className="section-y border-t border-outline-variant bg-surface-container-low font-primary">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="flex flex-col gap-5">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">
              {t("eyebrow")}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-balance text-text-strong">
              {t.rich("titleRich", {
                accent: (chunks) => (
                  <em className="not-italic text-brand-primary">{chunks}</em>
                ),
              })}
            </h2>
            <p className="max-w-xl font-body-lg text-body-lg text-text-body text-pretty">{t("description")}</p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <CTAButton
              href="/contact"
              variant="primary"
              size="lg"
              iconRight={<ArrowUpRight className="size-4" aria-hidden />}
            >
              {t("speakCta")}
            </CTAButton>
            <CTAButton href="/list-your-vehicle" variant="link" size="lg">
              {t("listCta")}
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
