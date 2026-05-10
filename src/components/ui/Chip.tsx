"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  size?: "sm" | "md";
};

const sizeMap = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
} as const;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ active = false, size = "md", className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-sans font-medium leading-none transition-colors duration-200 ease-editorial",
        sizeMap[size],
        active
          ? "border-on-background bg-on-background text-background"
          : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-outline hover:text-on-surface",
        className,
      )}
      {...props}
    />
  ),
);

Chip.displayName = "Chip";
