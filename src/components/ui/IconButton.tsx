"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "ghost" | "inverse";
  "aria-label": string;
};

const sizeMap = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

const variantMap = {
  outline:
    "border border-outline-variant bg-surface-container-lowest text-on-surface hover:border-tertiary hover:text-tertiary",
  ghost: "text-on-surface hover:bg-tertiary-fixed hover:text-tertiary",
  inverse:
    "bg-inverse-surface text-inverse-on-surface hover:bg-tertiary",
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", variant = "outline", className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors duration-200 ease-editorial",
        sizeMap[size],
        variantMap[variant],
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

IconButton.displayName = "IconButton";
