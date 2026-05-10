import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "outline" | "tertiary" | "inverse" | "success" | "error";
  size?: "sm" | "md";
};

const variantMap = {
  neutral: "bg-surface-container-high text-on-surface-variant",
  outline: "border border-outline-variant text-on-surface-variant",
  tertiary: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  inverse: "bg-inverse-surface text-inverse-on-surface",
  success: "bg-secondary-container text-on-secondary-container",
  error: "bg-error-container text-on-error-container",
} as const;

const sizeMap = {
  sm: "px-2 py-0.5 text-[10px] tracking-[0.14em]",
  md: "px-2.5 py-1 text-[11px] tracking-[0.15em]",
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", size = "md", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-sans font-semibold uppercase leading-none",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
