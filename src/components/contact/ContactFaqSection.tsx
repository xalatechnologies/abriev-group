import { ChevronDown } from "lucide-react";
import {
  CONTACT_PAGE_COPY,
  CONTACT_PAGE_FAQ_ITEMS,
} from "@/content/contactPage";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

export function ContactFaqSection() {
  return (
    <section
      className="section-y scroll-mt-[88px] border-t border-outline-variant bg-surface"
      aria-labelledby="contact-faq-heading"
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionIntro
          eyebrow={CONTACT_PAGE_COPY.faqEyebrow}
          title={CONTACT_PAGE_COPY.faqTitle}
          titleId="contact-faq-heading"
          lede={CONTACT_PAGE_COPY.faqLede}
          headingAs="h2"
          align="center"
          titleClassName="text-balance"
          className="mx-auto max-w-3xl items-center px-4 text-center"
        />

        <ul role="list" className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {CONTACT_PAGE_FAQ_ITEMS.map((item) => (
            <li key={item.question}>
              <details
                className={cn(
                  "rounded-xl border border-card-border bg-surface-container-lowest shadow-editorial transition-colors duration-300 hover:border-card-border-hover",
                  "focus-within:border-card-border-hover open:border-card-border-hover [&[open]>summary_svg]:rotate-180",
                )}
              >
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left outline-none transition-colors marker:content-none sm:py-5",
                    "[&::-webkit-details-marker]:hidden [&::marker]:content-none [&_svg]:shrink-0 [&_svg]:text-brand-primary [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-editorial",
                    "font-body-lg text-[1rem] font-semibold leading-snug text-text-strong sm:text-[17px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest",
                  )}
                >
                  {item.question}
                  <ChevronDown className="size-5" aria-hidden />
                </summary>
                <div className="border-t border-card-divider px-5 pb-5 pt-3 transition-colors duration-300 md:pb-6">
                  <p className="font-body-md text-[15px] leading-relaxed text-on-surface-variant text-pretty sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link
            href={CONTACT_PAGE_COPY.faqBrowseAllHref}
            className={cn(
              "rounded-full border border-card-border bg-surface-container-low px-6 py-3 font-label-caps text-sm font-bold uppercase tracking-[0.12em]",
              "text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label={CONTACT_PAGE_COPY.faqBrowseAllAria}
          >
            {CONTACT_PAGE_COPY.faqBrowseAllLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
