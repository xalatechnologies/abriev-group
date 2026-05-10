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

function isRegisterPath(pathname: string) {
  return pathname === "/auth/register" || pathname.startsWith("/auth/register/");
}

export function AuthModeSwitch({ className, density = "compact" }: AuthModeSwitchProps) {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const loginActive = isLoginPath(pathname);
  const registerActive = isRegisterPath(pathname);

  const baseLink =
    "relative z-[1] flex min-w-0 flex-1 items-center justify-center rounded-full font-extrabold uppercase tracking-[0.12em] transition-colors duration-200 outline-none ring-brand-primary ring-offset-background ring-offset-2 focus-visible:z-[2] focus-visible:ring-2";

  const sizeClass =
    density === "compact"
      ? "min-h-[34px] overflow-hidden px-2 py-2 text-[11px] sm:min-h-[38px] sm:px-3.5 sm:text-xs truncate"
      : "py-3.5 text-xs sm:text-sm";

  return (
    <div
      className={cn(
        "inline-flex w-full max-w-none items-center gap-0.5 rounded-full border border-outline bg-surface-container-low/92 p-1 font-primary text-text-strong shadow-sm backdrop-blur-md ring-1 ring-black/[0.08] dark:bg-surface-container-high/92 dark:ring-white/[0.12]",
        density === "comfortable" && "justify-stretch shadow-editorial dark:shadow-black/40",
        className,
      )}
      aria-label={t("accountModesAria")}
      role="group"
    >
      <Link
        href="/auth/login"
        prefetch={false}
        className={cn(
          baseLink,
          sizeClass,
          loginActive
            ? "bg-on-background text-background shadow-inner"
            : "text-text-strong hover:bg-surface-container-high dark:hover:bg-surface-container-highest",
        )}
      >
        {t("signIn")}
      </Link>
      <Link
        href="/auth/register"
        prefetch={false}
        className={cn(
          baseLink,
          sizeClass,
          registerActive
            ? "bg-on-background text-background shadow-inner"
            : "text-text-strong hover:bg-surface-container-high dark:hover:bg-surface-container-highest",
        )}
      >
        {t("register")}
      </Link>
    </div>
  );
}
