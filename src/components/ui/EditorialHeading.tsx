import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type HeadingVariant = "display" | "headline-lg" | "headline-md";

type EditorialHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: HeadingVariant;
  balance?: boolean;
};

const variantMap: Record<HeadingVariant, string> = {
  display: "serif-display",
  "headline-lg": "serif-headline-lg",
  "headline-md": "serif-headline-md",
};

export const EditorialHeading = forwardRef<HTMLHeadingElement, EditorialHeadingProps>(
  ({ as = "h2", variant = "headline-lg", balance = true, className, ...props }, ref) =>
    createElement(as, {
      ref,
      className: cn(
        variantMap[variant],
        "text-on-background",
        balance && "text-balance",
        className,
      ),
      ...props,
    }),
);

EditorialHeading.displayName = "EditorialHeading";
