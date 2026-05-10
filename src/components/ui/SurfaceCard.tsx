import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type SurfaceVariant =
  | "lowest"
  | "low"
  | "base"
  | "high"
  | "highest"
  | "variant"
  | "inverse";

type SurfaceCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SurfaceVariant;
  radius?: "none" | "sm" | "lg" | "xl";
  bordered?: boolean;
  shadow?: "none" | "editorial" | "editorial-lg";
  as?: "div" | "article" | "section" | "aside" | "li";
};

const surfaceMap: Record<SurfaceVariant, string> = {
  lowest: "bg-surface-container-lowest text-on-surface",
  low: "bg-surface-container-low text-on-surface",
  base: "bg-surface-container text-on-surface",
  high: "bg-surface-container-high text-on-surface",
  highest: "bg-surface-container-highest text-on-surface",
  variant: "bg-surface-variant text-on-surface-variant",
  inverse: "bg-inverse-surface text-inverse-on-surface",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

const shadowMap = {
  none: "",
  editorial: "editorial-shadow",
  "editorial-lg": "editorial-shadow-lg",
} as const;

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(
  (
    {
      variant = "low",
      radius = "xl",
      bordered = false,
      shadow = "none",
      as: Tag = "div",
      className,
      ...props
    },
    ref,
  ) =>
    createElement(Tag, {
      ref,
      className: cn(
        surfaceMap[variant],
        radiusMap[radius],
        bordered && "border border-card-border",
        shadowMap[shadow],
        className,
      ),
      ...props,
    }),
);

SurfaceCard.displayName = "SurfaceCard";
