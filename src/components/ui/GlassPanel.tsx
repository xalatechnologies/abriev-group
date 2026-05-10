import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "aside" | "header" | "footer" | "nav";
  intensity?: "default" | "strong";
  radius?: "none" | "sm" | "lg" | "xl" | "full";
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    { as: Tag = "div", intensity = "default", radius = "xl", className, ...props },
    ref,
  ) =>
    createElement(Tag, {
      ref,
      className: cn(
        intensity === "strong" ? "glass-card-strong" : "glass-card",
        radiusMap[radius],
        className,
      ),
      ...props,
    }),
);

GlassPanel.displayName = "GlassPanel";
