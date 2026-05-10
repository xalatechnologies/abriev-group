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
            ? "rgba(255, 255, 255, 0.10)"
            : "rgba(0, 0, 0, 0.08)"
          : "rgba(0, 0, 0, 0)",
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
            "relative z-10 col-start-3 row-start-1 hidden min-w-0 w-full flex flex-row-reverse items-center justify-start gap-2 justify-self-end lg:flex xl:gap-3",
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
            className="min-w-0 max-w-[12rem] !shrink overflow-hidden bg-brand-primary text-sm font-extrabold tracking-[0.12em] text-white hover:bg-text-strong sm:max-w-[16rem] [&>span]:min-w-0 [&>span]:flex-1 [&>span]:truncate"
          >
            {tHeader("listVehicle")}
          </CTAButton>
          <AuthModeSwitch className="min-w-0 max-w-[218px] shrink" />
        </div>

        <div className="relative z-10 col-start-2 row-start-1 flex items-center gap-2 justify-self-end lg:hidden">
          <LocaleSwitcher compact />
          <ThemeToggle className="size-9 border-outline-variant/60" />
          <IconButton
            aria-label={open ? tNav("closeMenu") : tNav("openMenu")}
            onClick={() => setOpen((v) => !v)}
            variant="ghost"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </IconButton>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card-strong absolute left-0 right-0 top-full border-b border-outline-variant lg:hidden"
          >
            <div className="mx-auto flex max-w-container-max flex-col px-6 py-6 md:px-margin-edge">
              <nav
                aria-label={tNav("mobileAria")}
                className="flex flex-col divide-y divide-outline-variant"
              >
                {PRIMARY_NAV_ROUTES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between py-4 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong transition-colors hover:text-brand-primary"
                  >
                    <span>{tNav(item.key)}</span>
                    <ArrowUpRight className="size-4 text-text-muted" aria-hidden />
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <AuthModeSwitch density="comfortable" />
                <CTAButton
                  href="/list-your-vehicle"
                  variant="primary"
                  size="md"
                  fullWidth
                  aria-label={tHeader("postCarAria")}
                  className="bg-brand-primary text-sm font-extrabold tracking-[0.12em] text-white hover:bg-text-strong"
                >
                  {tHeader("listVehicle")}
                </CTAButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
