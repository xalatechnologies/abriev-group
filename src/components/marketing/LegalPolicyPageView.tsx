import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants/site";

export type LegalPolicyPageKey =
  | "carInsuranceAssistance"
  | "temporaryCarReplacement"
  | "refundPolicy"
  | "terms"
  | "privacy";

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export async function legalPolicyPageMeta(pageKey: LegalPolicyPageKey): Promise<Metadata> {
  const t = await getTranslations("PolicyPages");
  return {
    title: t(`${pageKey}.metaTitle`),
    description: t(`${pageKey}.metaDescription`),
    robots: { index: true, follow: true },
  };
}

type LegalPolicyPageViewProps = {
  pageKey: LegalPolicyPageKey;
};

export async function LegalPolicyPageView({ pageKey }: LegalPolicyPageViewProps) {
  const t = await getTranslations("PolicyPages");
  const pageRaw = t.raw(pageKey) as {
    sections?: PolicySection[];
    lastUpdatedIso?: string;
  };
  const sections = Array.isArray(pageRaw.sections) ? pageRaw.sections : [];
  const lastUpdatedIso =
    typeof pageRaw.lastUpdatedIso === "string" ? pageRaw.lastUpdatedIso : undefined;
  const titleId = `${pageKey}-title`;

  return (
    <div className="font-primary">
      <header className="bg-surface font-primary">
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex max-w-5xl flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {t(`${pageKey}.eyebrow`)}
              </span>
              <EditorialHeading as="h1" variant="display" id={titleId}>
                {t(`${pageKey}.title`)}
              </EditorialHeading>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty">
                {t(`${pageKey}.intro`)}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <article aria-labelledby={titleId}>
        <section
          className="section-y border-t border-outline-variant bg-surface-container-low"
          aria-label={t("shell.documentAriaLabel")}
        >
          <Container>
            <div className="mx-auto flex max-w-3xl flex-col gap-10 md:gap-12">
              <div>
                {lastUpdatedIso ? (
                  <p className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                    <time dateTime={lastUpdatedIso}>{t(`${pageKey}.lastUpdated`)}</time>
                  </p>
                ) : (
                  <p className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                    {t(`${pageKey}.lastUpdated`)}
                  </p>
                )}
              </div>

              {sections.length > 1 ? (
                <nav
                  aria-labelledby="policy-toc-heading"
                  className="rounded-xl border border-card-border bg-surface-container-lowest p-5 shadow-editorial md:p-6"
                >
                  <p
                    id="policy-toc-heading"
                    className="font-headline-md text-[1.0625rem] font-semibold text-on-background md:text-lg"
                  >
                    {t("shell.tocHeading")}
                  </p>
                  <ol
                    role="list"
                    className="mt-4 flex list-decimal flex-col gap-2 pl-5 marker:text-brand-primary marker:font-semibold md:gap-2.5"
                  >
                    {sections.map((section, index) => {
                      const anchor = `${pageKey}-section-${index}`;
                      return (
                        <li key={anchor} className="pl-1 marker:font-semibold">
                          <a
                            href={`#${anchor}`}
                            className="font-body-md text-body-md text-brand-primary underline-offset-4 transition-colors hover:text-text-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
                          >
                            {section.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              ) : null}

              {sections.length > 0 ? (
                <div className="flex flex-col gap-10 md:gap-14">
                  {sections.map((section, index) => {
                    const paragraphs = section.paragraphs ?? [];
                    const bullets = section.bullets ?? [];
                    const sectionHeadingId = `${pageKey}-section-${index}`;
                    return (
                      <section
                        key={sectionHeadingId}
                        aria-labelledby={sectionHeadingId}
                        className="flex flex-col gap-4 md:gap-5 scroll-mt-28"
                      >
                        <h2
                          id={sectionHeadingId}
                          className="font-headline-md text-[1.25rem] font-semibold leading-snug text-on-background md:text-[1.375rem]"
                        >
                          {section.heading}
                        </h2>
                        {paragraphs.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {paragraphs.map((p, pi) => (
                              <p
                                key={`${sectionHeadingId}-p-${pi}`}
                                className="font-body-md text-body-md leading-relaxed text-on-surface text-pretty"
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        ) : null}
                        {bullets.length > 0 ? (
                          <ul
                            className="mt-1 flex list-disc flex-col gap-2 pl-5 md:pl-6"
                            role="list"
                          >
                            {bullets.map((item, bi) => (
                              <li
                                key={`${sectionHeadingId}-b-${bi}`}
                                className="font-body-md text-body-md leading-relaxed text-on-surface text-pretty"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              ) : null}

              <div className="border-t border-outline-variant pt-8 md:pt-10">
                <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant text-pretty">
                  {t(`${pageKey}.contactLead`, { email: SITE.contact.email, brand: SITE.name })}
                </p>
                <p className="mt-3">
                  <Link
                    href="/contact"
                    className="font-label-caps text-label-caps uppercase text-brand-primary underline-offset-4 transition-colors duration-200 hover:text-brand-primary/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
                  >
                    {t(`${pageKey}.contactCta`)}
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </div>
  );
}
