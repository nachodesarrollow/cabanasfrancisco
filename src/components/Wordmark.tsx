import type { AnchorHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type WordmarkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: "ink" | "cream";
  size?: "sm" | "md";
  href?: string;
};

/**
 * Logotipo tipográfico. No se usa un símbolo gráfico inventado.
 */
export function Wordmark({
  tone = "ink",
  size = "md",
  href = "#inicio",
  className,
  ...rest
}: WordmarkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex flex-col leading-none",
        tone === "ink" ? "text-olive" : "text-cream",
        className,
      )}
      aria-label="La Casa de Francisco — ir al inicio"
      {...rest}
    >
      <span
        className={cn(
          "font-display tracking-[0.005em] transition-opacity duration-300 group-hover:opacity-80",
          size === "md"
            ? "text-[1.35rem] sm:text-[1.6rem] lg:text-[1.7rem]"
            : "text-[1.15rem]",
        )}
      >
        La Casa de Francisco
      </span>
      <span
        className={cn(
          "mt-[0.4rem] flex items-center gap-2 text-[0.46rem] font-semibold uppercase tracking-[0.38em] transition-colors duration-300 sm:text-[0.5rem]",
          tone === "ink" ? "text-clay" : "text-cream/70",
        )}
      >
        <span aria-hidden="true" className="h-px w-4 bg-current/60" />
        Merlo · San Luis
      </span>
    </a>
  );
}
