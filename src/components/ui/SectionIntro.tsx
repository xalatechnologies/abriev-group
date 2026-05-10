import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { EditorialHeading } from "./EditorialHeading";

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Sets `id` on the heading for `aria-labelledby` on parent sections. */
  titleId?: string;
  lede?: ReactNode;
  align?: "start" | "center";
  headingAs?: "h1" | "h2" | "h3";
  variant?: "display" | "headline-lg" | "headline-md";
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  titleId,
  lede,
  align = "start",
  headingAs = "h2",
  variant = "headline-lg",
  actions,
  className,
  titleClassName,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
          {eyebrow}
        </span>
      ) : null}
      <EditorialHeading
        as={headingAs}
        variant={variant}
        id={titleId}
        className={cn(
          align === "center" ? "max-w-5xl" : "max-w-6xl",
          titleClassName,
        )}
      >
        {title}
      </EditorialHeading>
      {lede ? (
        <p
          className={cn(
            "font-body-lg text-body-lg text-on-surface-variant text-pretty",
            align === "center" ? "max-w-4xl" : "max-w-4xl",
          )}
        >
          {lede}
        </p>
      ) : null}
      {actions ? <div className="mt-3 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
