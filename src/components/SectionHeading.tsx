import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  tone = "dark",
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      data-reveal
    >
      <p
        className={cn(
          "eyebrow flex items-center gap-3",
          align === "center" && "justify-center",
          tone === "dark" ? "text-clay" : "text-cream/70",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-7",
            tone === "dark" ? "bg-clay/50" : "bg-cream/30",
          )}
        />
        {label}
      </p>
      <h2
        className={cn(
          "section-title mt-5",
          tone === "dark" ? "text-olive" : "text-cream",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <div
          className={cn(
            "lead mt-6 max-w-2xl",
            align === "center" && "mx-auto",
            tone === "light" && "text-cream/70",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
