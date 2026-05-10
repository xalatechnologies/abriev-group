import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link" | "inverse";
type Size = "md" | "lg";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

const baseClasses =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-label-caps text-label-caps uppercase leading-none transition-all duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-50";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-on-background text-background hover:bg-tertiary rounded-full",
  inverse:
    "bg-background text-on-background hover:bg-surface-container-low rounded-full",
  secondary:
    "bg-tertiary text-on-tertiary hover:bg-tertiary/90 rounded-full",
  outline:
    "border border-on-background/15 bg-transparent text-on-background hover:border-on-background hover:bg-surface-container-lowest rounded-full",
  ghost: "text-on-surface hover:bg-surface-container-high rounded-full",
  link: "text-on-background underline-offset-4 hover:text-tertiary hover:underline px-0",
};

const sizeMap: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-14 px-7",
};

function resolveClasses({
  variant = "primary",
  size = "lg",
  fullWidth,
  className,
}: SharedProps & { className?: string }) {
  return cn(
    baseClasses,
    variantMap[variant],
    variant !== "link" && sizeMap[size],
    fullWidth && "w-full",
    className,
  );
}

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedProps & { href?: undefined };

type LinkElementProps = SharedProps & {
  href: string;
  children?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

export type CTAButtonProps = ButtonElementProps | LinkElementProps;

export const CTAButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, CTAButtonProps>(
  (props, ref) => {
    if ("href" in props && props.href !== undefined) {
      const { href, children, className, iconLeft, iconRight, variant, size, fullWidth, ...rest } =
        props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={resolveClasses({ variant, size, fullWidth, className })}
          {...rest}
        >
          {iconLeft}
          <span>{children}</span>
          {iconRight}
        </Link>
      );
    }

    const {
      children,
      className,
      iconLeft,
      iconRight,
      variant,
      size,
      fullWidth,
      type = "button",
      ...rest
    } = props as ButtonElementProps;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={resolveClasses({ variant, size, fullWidth, className })}
        {...rest}
      >
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";
