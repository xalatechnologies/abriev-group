"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type AuthModeSwitchProps = {
  className?: string;
  /** `compact`: header toolbar · `comfortable`: mobile drawer row */
  density?: "compact" | "comfortable";
};

function isLoginPath(pathname: string) {
  return pathname === "/auth/login" || pathname.startsWith("/auth/login/");
}

export function AuthModeSwitch({ className, density = "compact" }: AuthModeSwitchProps) {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const loginActive = isLoginPath(pathname);

  const baseLink =
    "relative flex w-full min-w-0 items-center justify-center rounded-full border border-outline bg-surface-container-low/92 font-extrabold uppercase tracking-[0.12em] text-text-strong shadow-sm backdrop-blur-md ring-1 ring-black/[0.08] transition-colors duration-200 outline-none ring-brand-primary ring-offset-background ring-offset-2 focus-visible:z-[2] focus-visible:ring-2 dark:bg-surface-container-high/92 dark:ring-white/[0.12]";

  const sizeClass =
    density === "compact"
      ? "min-h-[40px] px-4 py-2 text-[11px] sm:min-h-[44px] sm:px-5 sm:text-xs"
      : "min-h-[48px] py-3.5 text-xs sm:text-sm";

  return (
    <Link
      href="/auth/login"
      prefetch={false}
      className={cn(
        baseLink,
        sizeClass,
        loginActive
          ? "border-on-background/20 bg-on-background text-background shadow-inner ring-on-background/15 dark:border-on-background/25 dark:ring-on-background/20"
          : "hover:bg-surface-container-high dark:hover:bg-surface-container-highest",
        density === "comfortable" && "shadow-editorial dark:shadow-black/40",
        className,
      )}
    >
      {t("signIn")}
    </Link>
  );
}
