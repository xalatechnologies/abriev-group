"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PRIMARY_NAV_ROUTES } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "@/components/theme";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { AuthModeSwitch } from "./AuthModeSwitch";

export function SiteHeader() {
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [chromeMounted, setChromeMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Scroll + theme differ between SSR and the first client tick (next-themes, scroll restoration).
  // Gate glass/border styles until mount so markup matches and React #418 hydration errors don’t fire.
  const isDark = chromeMounted && resolvedTheme === "dark";
  const scrolledChrome = chromeMounted && scrolled;

  useEffect(() => {
    setChromeMounted(true);
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tLocale = useTranslations("LocaleSwitcher");

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolledChrome
          ? isDark
            ? "rgba(10, 10, 10, 0.78)"
            : "rgba(255, 255, 255, 0.78)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolledChrome ? "blur(20px) saturate(1.4)" : "blur(0px)",
        borderBottomColor: scrolledChrome
          ? isDark
            ? "rgba(255, 255, 255, 0.16)"
            : "rgba(0, 0, 0, 0.12)"
          : isDark
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.10)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "supports-[backdrop-filter]:bg-transparent",
      )}
    >
      <div
        className={cn(
          // Full-bleed bar — extra `pr` + trailing pad on locale/theme cluster so toolbar doesn’t hug the viewport.
          "relative grid h-[72px] w-full max-w-none grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 px-3 sm:gap-x-2.5 sm:px-4",
          // Third track `minmax(0,auto)` lets the toolbar column yield width so long-copy locales don’t overflow the viewport.
          "lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,auto)] lg:items-center lg:gap-x-2.5 lg:pl-5 lg:pr-8 xl:pl-6 xl:pr-10 2xl:pr-11",
        )}
      >
        <Link
          href="/"
          className="col-start-1 row-start-1 flex shrink-0 items-center justify-self-start rounded-l-2xl"
          aria-label={tNav("brandHomeAria", { name: SITE.name })}
        >
          <Image
            src="/brand/abri-motors-logo.png"
            alt={`${SITE.name} logo`}
            width={715}
            height={708}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav
          aria-label={tNav("primaryAria")}
          className={cn(
            "col-start-2 row-start-1 hidden min-w-0 w-full items-center justify-center gap-x-9 gap-y-1 self-center lg:flex xl:gap-x-11 2xl:gap-x-14",
          )}
        >
          {PRIMARY_NAV_ROUTES.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname === ""
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap font-label-caps text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200",
                  active
                    ? "font-extrabold text-text-strong"
                    : "text-text-body hover:text-brand-primary",
                )}
              >
                {tNav(item.key)}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-brand-primary"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* `flex-row-reverse` + trailing cluster first in DOM pins locale/theme to the padded viewport edge when
            Amharic copy widens Auth/CTA—those shrink left instead of swallowing trailing margin */}
        <div
          className={cn(
            "relative z-10 col-start-3 row-start-1 hidden min-w-0 w-full flex-row-reverse items-center justify-start gap-2 justify-self-end lg:flex xl:gap-3",
          )}
        >
          <div
            dir="ltr"
            className="flex shrink-0 items-center gap-1.5 lg:pr-1.5 xl:pr-2"
          >
            <LocaleSwitcher compact />
            <ThemeToggle className="size-9 border-outline-variant/60" />
          </div>
          <span className="mx-0.5 h-9 w-px shrink-0 bg-outline-variant lg:mx-1" aria-hidden />
          <CTAButton
            href="/list-your-vehicle"
            variant="primary"
            size="md"
            aria-label={tHeader("postCarAria")}
            iconRight={<ArrowUpRight className="size-4 shrink-0" aria-hidden />}
            className="bg-brand-primary text-sm font-extrabold tracking-[0.12em] text-white hover:bg-text-strong"
          >
            {tHeader("listVehicle")}
          </CTAButton>
          <AuthModeSwitch className="min-w-0 max-w-[152px] shrink sm:max-w-[168px]" />
        </div>

        <div className="relative z-10 col-start-2 row-start-1 flex items-center justify-end justify-self-end lg:hidden">
          <IconButton
            type="button"
            size="lg"
            aria-label={open ? tNav("closeMenu") : tNav("openMenu")}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            variant="ghost"
            className="shrink-0"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </IconButton>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              key="mobile-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label={tHeader("closeOverlayAria")}
              className="fixed inset-0 top-[72px] z-[45] bg-[rgba(0,0,0,0.58)] backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="mobile-nav"
              id="site-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={tNav("mobileAria")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute left-0 right-0 top-full z-50 flex min-h-[calc(100dvh-72px)] flex-col overflow-y-auto overscroll-contain border-b border-outline-variant lg:hidden",
                /* Opaque surface — avoids hero body copy showing through glass */
                "bg-background text-on-background shadow-[0_18px_48px_-12px_rgba(0,0,0,0.18)] dark:bg-[#0a0a0a] dark:shadow-[0_24px_56px_-16px_rgba(0,0,0,0.65)]",
              )}
            >
              <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 edge-x py-6">
                <section aria-labelledby="mobile-menu-browse-heading" className="flex flex-col gap-3">
                  <h2
                    id="mobile-menu-browse-heading"
                    className="font-label-caps text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted"
                  >
                    {tNav("mobileMenuBrowse")}
                  </h2>
                  <nav aria-label={tNav("primaryAria")}>
                    <ul role="list" className="flex flex-col divide-y divide-outline-variant rounded-xl border border-card-border bg-white dark:bg-surface-container-lowest">
                      {PRIMARY_NAV_ROUTES.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong transition-colors first:rounded-t-[0.625rem] last:rounded-b-[0.625rem] hover:bg-surface-container-low hover:text-brand-primary dark:hover:bg-surface-container-high"
                          >
                            <span>{tNav(item.key)}</span>
                            <ArrowUpRight className="size-4 shrink-0 text-text-muted" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </section>

                <section aria-labelledby="mobile-menu-prefs-heading" className="flex flex-col gap-3">
                  <h2
                    id="mobile-menu-prefs-heading"
                    className="font-label-caps text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted"
                  >
                    {tNav("mobileMenuPreferences")}
                  </h2>
                  <div className="rounded-xl border border-card-border bg-white p-4 transition-colors duration-300 dark:bg-surface-container-low">
                    <p className="mb-3 font-label-caps text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                      {tLocale("hint")}
                    </p>
                    <div className="flex justify-center">
                      <LocaleSwitcher className="w-full max-w-[280px] justify-center" />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-card-divider pt-4 transition-colors duration-300">
                      <span className="text-sm font-semibold text-text-strong">{tHeader("appearance")}</span>
                      <ThemeToggle className="size-9 shrink-0 border-outline-variant/60" />
                    </div>
                  </div>
                </section>

                <section
                  aria-labelledby="mobile-menu-actions-heading"
                  className="mt-auto flex flex-col gap-3 border-t border-outline-variant pt-6"
                >
                  <h2
                    id="mobile-menu-actions-heading"
                    className="font-label-caps text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted"
                  >
                    {tNav("mobileMenuActions")}
                  </h2>
                  <div className="flex flex-col gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                    <CTAButton
                      href="/list-your-vehicle"
                      variant="primary"
                      size="md"
                      fullWidth
                      aria-label={tHeader("postCarAria")}
                      iconRight={<ArrowUpRight className="size-4 shrink-0" aria-hidden />}
                      className="bg-brand-primary text-sm font-extrabold tracking-[0.12em] text-white hover:bg-text-strong"
                    >
                      {tHeader("listVehicle")}
                    </CTAButton>
                    <AuthModeSwitch density="comfortable" />
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
