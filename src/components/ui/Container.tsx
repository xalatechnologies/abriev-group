import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  size?: "default" | "narrow" | "wide" | "full";
  padded?: boolean;
};

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-none",
  narrow: "max-w-5xl",
  wide: "max-w-[1600px]",
  full: "max-w-none",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", size = "default", padded = true, className, ...props }, ref) =>
    createElement(Tag, {
      ref,
      className: cn("mx-auto w-full", sizeMap[size], padded && "edge-x", className),
      ...props,
    }),
);

Container.displayName = "Container";
