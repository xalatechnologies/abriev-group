"use client";

import Image from "next/image";
import { useMessages, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants/site";

const footerNavLinkClass =
  "font-body-md text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[15px]";

const footerContactLinkClass =
  "inline-flex items-center gap-2 font-body-md text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:text-[15px]";

type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, phones } = SITE.contact;
  const tNav = useTranslations("Navigation");
  const tFoot = useTranslations("Footer");

  const messages = useMessages() as Record<string, { columns?: FooterColumn[] }>;
  const columns =
    messages.Footer && Array.isArray(messages.Footer.columns) ? messages.Footer.columns : [];

  return (
    <footer className="mt-section-gap font-primary">
      <div className="border-t border-white/15 bg-black text-zinc-100">
        <Container as="div" className="py-14 md:py-16">
          <div className="flex flex-col gap-14 lg:flex-row lg:gap-16 xl:gap-24">
            <div className="shrink-0 lg:max-w-[min(100%,380px)]">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-l-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:gap-4"
                aria-label={tNav("brandHomeAria", { name: SITE.name })}
              >
                <Image
                  src="/brand/abri-motors-logo.png"
                  alt=""
                  width={715}
                  height={708}
                  aria-hidden
                  className="h-12 w-auto md:h-14"
                />
                <span className="font-headline-md text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
                  {SITE.name}
                </span>
              </Link>
              <p className="mt-5 font-body-md text-[15px] leading-relaxed text-zinc-400 md:text-base">
                {tFoot("tagline")}
              </p>
            </div>

            <nav
              aria-label={tNav("footerAria")}
              className="min-w-0 flex-1 border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16"
            >
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12 xl:gap-16">
                {columns.map((col) => {
                  const headingId = `footer-heading-${col.title.replace(/\s+/g, "-")}`;
                  return (
                    <section key={col.title} aria-labelledby={headingId}>
                      <h2
                        id={headingId}
                        className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-white"
                      >
                        {col.title}
                      </h2>
                      <ul role="list" className="mt-4 flex list-none flex-col gap-3 pl-0">
                        {col.items.map((item) => (
                          <li key={`${col.title}-${item.label}`}>
                            <Link
                              href={item.href}
                              className={footerNavLinkClass}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}

                <section
                  aria-labelledby="footer-contact-heading"
                  className="sm:col-span-2 sm:border-t sm:border-white/10 sm:pt-10 lg:col-span-1 lg:border-t-0 lg:pt-0"
                >
                  <h2
                    id="footer-contact-heading"
                    className="font-label-caps text-label-caps uppercase tracking-[0.12em] text-white"
                  >
                    {tFoot("contactHeading")}
                  </h2>
                  <ul role="list" className="mt-4 flex list-none flex-col gap-3 pl-0">
                    <li>
                      <a href={`mailto:${email}`} className={footerContactLinkClass}>
                        <Mail className="size-4 shrink-0 text-zinc-500" aria-hidden strokeWidth={2} />
                        <span>{email}</span>
                      </a>
                    </li>
                    {phones.map((raw) => {
                      const tel = raw.replace(/\s/g, "");
                      const display = formatPhoneDisplay(raw);
                      return (
                        <li key={raw}>
                          <a href={`tel:${tel}`} className={footerContactLinkClass}>
                            <Phone className="size-4 shrink-0 text-zinc-500" aria-hidden strokeWidth={2} />
                            <span>{display}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>
            </nav>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8 md:mt-14 md:pt-10">
            <p className="font-body-md text-center text-sm text-zinc-400 md:text-[15px]">
              {tFoot("rightsLine", {
                year,
                brand: SITE.name,
                rightsReserved: tFoot("rightsReserved"),
              })}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/** Readable formatting for +251 mobile numbers in footer. */
function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("251")) {
    const rest = digits.slice(3);
    return `+251 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
  }
  return raw;
}
