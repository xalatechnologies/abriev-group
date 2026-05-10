import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  variant?: "outline" | "outline-variant";
};

export function Divider({
  orientation = "horizontal",
  variant = "outline-variant",
  className,
  ...props
}: DividerProps) {
  const color =
    variant === "outline" ? "bg-outline" : "bg-outline-variant";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        color,
        className,
      )}
      {...props}
    />
  );
}
