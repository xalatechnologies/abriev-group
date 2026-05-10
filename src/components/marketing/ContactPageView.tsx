import { BadgeCheck, Building2, Clock, Mail, Phone } from "lucide-react";

import type { Dealer } from "@/types/dealer";
import { SITE } from "@/lib/constants/site";
import { CONTACT_PAGE_COPY } from "@/content/contactPage";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";
import { ContactLocationMap } from "@/components/contact/ContactLocationMap";
import { ContactForm } from "@/components/contact/ContactForm";
import { Link } from "@/i18n/navigation";

const AVATAR_TONES = ["bg-sky-600", "bg-cyan-600", "bg-emerald-700", "bg-lime-600"] as const;

function avatarLetter(fullName: string) {
  const t = fullName.trim();
  return t.charAt(0)?.toUpperCase() ?? "?";
}

type ContactPageViewProps = {
  dealers: Dealer[];
};

export function ContactPageView({ dealers }: ContactPageViewProps) {
  return (
    <div className="font-primary">
      <header className="bg-surface font-primary">
        <Container>
          <div className="relative flex flex-col pt-20 md:pt-24 lg:pt-28">
            <div className="flex max-w-5xl flex-col gap-5 pb-8 md:gap-6 md:pb-10 lg:pb-12">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-on-surface-variant">
                {CONTACT_PAGE_COPY.heroEyebrow}
              </span>
              <h1 className="font-display-lg text-display-lg text-balance text-on-background">
                {CONTACT_PAGE_COPY.heroTitle}
              </h1>
              <p className="max-w-4xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant text-pretty">
                {CONTACT_PAGE_COPY.heroLede}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section
        className="section-y border-t border-outline-variant bg-surface-container-low"
        aria-labelledby="trusted-dealers-heading"
      >
        <Container className="flex flex-col gap-12 md:gap-14">
          <SectionIntro
            align="center"
            eyebrow={CONTACT_PAGE_COPY.dealersEyebrow}
            title={CONTACT_PAGE_COPY.dealersTitle}
            titleId="trusted-dealers-heading"
            lede={CONTACT_PAGE_COPY.dealersLede}
            headingAs="h2"
            titleClassName="text-balance"
            className="mx-auto items-center px-4 text-center lg:max-w-5xl"
          />

          <ul
            role="list"
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {dealers.map((dealer, index) => {
              const avatarClass = AVATAR_TONES[index % AVATAR_TONES.length];
              const isPremier = dealer.verification === "premier";

              return (
                <li key={dealer.id} className="h-full">
                  <Link
                    href={`/dealers/${dealer.slug}`}
                    className={[
                      "group flex h-full min-h-[15.5rem] flex-col rounded-2xl border border-card-border bg-surface px-6 py-8 transition-colors duration-300 hover:-translate-y-0.5 hover:border-card-border-hover hover:shadow-editorial md:min-h-[16rem] md:py-10",
                      isPremier ? "ring-2 ring-transparent transition-[box-shadow,color] hover:ring-brand-primary/25" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className={[
                          "flex size-16 shrink-0 items-center justify-center rounded-full font-display-lg text-xl font-semibold tracking-tight text-white shadow-inner",
                          avatarClass,
                          isPremier ? "outline outline-2 outline-offset-4 outline-brand-primary/65" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-hidden
                      >
                        {avatarLetter(dealer.name)}
                      </span>

                      <div className="min-w-0 flex-1 pt-1 text-left">
                        <div className="flex flex-wrap items-center gap-2 gap-y-2">
                          <h3 className="line-clamp-2 flex-1 text-left font-headline-md text-[1.125rem] font-semibold leading-snug text-text-strong md:text-[1.225rem]">
                            {dealer.name}
                          </h3>
                          <span className="inline-flex shrink-0 items-center rounded-full bg-brand-primary/14 px-2 py-1 font-label-caps text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary">
                            <BadgeCheck className="mr-1 size-4" aria-hidden />
                            Verified
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 font-body-md text-[14px] text-on-surface-variant text-pretty">
                          {dealer.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-1 flex-col justify-end border-t border-card-divider pb-4 pt-6 transition-colors duration-300 group-hover:border-card-divider-hover">
                      <p className="flex items-center gap-2 font-label-caps text-[11px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        <Building2 className="size-4 shrink-0 text-brand-primary" aria-hidden />
                        {`${dealer.inventoryCount} Cars`}
                      </p>
                      <p className="mt-5 break-all font-body-md text-[13px] font-semibold tracking-tight text-text-strong">
                        {dealer.contact.email}
                      </p>
                      <p className="mt-1 font-body-md text-[13px] text-on-surface-variant">
                        {dealer.contact.phone ?? "Reach us via email"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="concierge-desk"
        className="section-y scroll-mt-[88px] border-t border-outline-variant bg-surface"
        aria-labelledby="concierge-contact-heading"
      >
        <Container>
          <div className="flex flex-col gap-12 lg:gap-14">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div className="flex flex-col gap-10 rounded-2xl border border-card-border bg-surface-container-lowest p-6 shadow-editorial md:p-8">
              <div className="flex flex-col gap-4">
                <span className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">
                  {CONTACT_PAGE_COPY.eyebrowConcierge}
                </span>
                <h2
                  id="concierge-contact-heading"
                  className="text-balance font-headline-lg text-headline-lg text-text-strong"
                >
                  {CONTACT_PAGE_COPY.contactTitle}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant text-pretty">
                  {CONTACT_PAGE_COPY.contactLede}
                </p>
              </div>

              <div className="border-t border-card-divider pt-8 transition-colors duration-300">
                <p className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  {CONTACT_PAGE_COPY.conciergeEmailLabel}
                </p>
                <Link
                  href={`mailto:${SITE.contact.email}`}
                  className="mt-4 inline-flex items-center gap-3 rounded-xl border border-card-border bg-surface px-4 py-3 font-body-md text-[15px] font-semibold text-text-strong shadow-editorial transition-colors duration-300 hover:border-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                >
                  <Mail className="size-[18px] shrink-0 text-brand-primary" aria-hidden />
                  {SITE.contact.email}
                </Link>
              </div>

              <div className="border-t border-card-divider pt-8 transition-colors duration-300">
                <p className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  {CONTACT_PAGE_COPY.phoneLabelDirect}
                </p>
                <ul role="list" className="mt-4 flex flex-col gap-3">
                  {SITE.contact.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-3 font-body-md text-[15px] font-medium text-brand-primary underline-offset-4 transition-colors hover:text-text-strong hover:underline"
                      >
                        <Phone className="size-[18px] shrink-0 text-brand-primary opacity-85" aria-hidden />
                        <span>{phone}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-card-divider pt-8 transition-colors duration-300">
                <div className="flex gap-4">
                  <Clock className="size-6 shrink-0 text-brand-primary" aria-hidden />
                  <div>
                    <p className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                      {CONTACT_PAGE_COPY.hoursTitle}
                    </p>
                    <p className="mt-2 font-body-md text-body-md text-on-surface text-pretty">
                      {CONTACT_PAGE_COPY.hoursBody}
                    </p>
                  </div>
                </div>
              </div>
              </div>

              <ContactForm />
            </div>

            <ContactLocationMap />
          </div>
        </Container>
      </section>

      <ContactFaqSection />
    </div>
  );
}
