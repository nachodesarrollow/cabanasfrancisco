import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type Variant = "solid" | "light" | "outline" | "outlineLight" | "text";

const variants: Record<Variant, string> = {
  solid:
    "bg-olive text-cream hover:bg-olive-deep shadow-[0_10px_30px_-18px_rgba(26,36,30,0.9)]",
  light: "bg-cream text-olive hover:bg-white",
  outline:
    "border border-olive/25 text-olive hover:border-olive/60 hover:bg-olive/[0.04]",
  outlineLight:
    "border border-cream/35 text-cream hover:border-cream/70 hover:bg-cream/10",
  text: "px-0 py-0 text-olive hover:text-olive-deep",
};

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  icon?: IconName;
  children: ReactNode;
  /** Etiqueta más corta para pantallas pequeñas. */
  mobileLabel?: string;
  className?: string;
  fullWidth?: boolean;
  /** Abre en una pestaña nueva con atributos seguros. */
  external?: boolean;
};

export function CtaLink({
  href,
  variant = "solid",
  icon,
  children,
  mobileLabel,
  className,
  fullWidth = false,
  external = false,
  ...rest
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-center text-[0.62rem] font-semibold uppercase tracking-[0.13em] transition-all duration-300 sm:gap-3 sm:text-[0.72rem] sm:tracking-[0.16em]",
        variant !== "text" && "rounded-full px-5 py-3.5 sm:px-7 sm:py-4",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...rest}
    >
      {icon === "whatsapp" && (
        <Icon name="whatsapp" className="h-[1.05rem] w-[1.05rem] shrink-0" />
      )}
      {mobileLabel ? (
        <>
          <span className="sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      {icon && icon !== "whatsapp" && (
        <Icon
          name={icon}
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
