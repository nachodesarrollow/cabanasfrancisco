import { useEffect, useRef, useState } from "react";
import {
  LOCATION_URL,
  MESSAGES,
  NAV,
  NAV_SECTION_IDS,
  WHATSAPP_DISPLAY,
} from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { useBodyScrollLock } from "../lib/hooks";
import { CtaLink } from "./CtaLink";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("inicio");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const whatsappUrl = getWhatsAppUrl(MESSAGES.general);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => Boolean(element));

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "bg-cream/95 text-ink shadow-[0_1px_0_0_rgba(41,45,40,0.09)] backdrop-blur-xl"
            : "bg-transparent text-cream",
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[190%] bg-gradient-to-b from-olive-ink/85 via-olive-ink/35 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          className={cn(
            "shell relative flex items-center justify-between gap-6 transition-[height] duration-500",
            scrolled ? "h-[68px]" : "h-[84px] sm:h-[92px]",
          )}
        >
          <Wordmark tone={scrolled ? "ink" : "cream"} size="md" />

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-7 xl:flex xl:gap-8 2xl:gap-10"
          >
            {NAV.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-100",
                    isActive ? "opacity-100" : "opacity-75",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <CtaLink
                href={whatsappUrl}
                variant={scrolled ? "solid" : "light"}
                external
                className="rounded-full px-6 py-3"
              >
                Consultar disponibilidad
              </CtaLink>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Abrir menú de navegación"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden",
                scrolled
                  ? "border-olive/20 text-olive hover:bg-olive/5"
                  : "border-cream/35 text-cream hover:bg-cream/10",
              )}
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!open}
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-olive-ink text-cream xl:hidden",
          "transition-[opacity,visibility] duration-500 ease-out",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="shell flex h-[84px] shrink-0 items-center justify-between">
          <Wordmark tone="cream" href="#inicio" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-label="Cerrar menú de navegación"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="shell flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <nav aria-label="Secciones" className="mt-2">
              {NAV.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-baseline justify-between gap-4 border-b border-cream/12 py-[1.05rem] transition-[opacity,transform] duration-500 sm:py-[1.1rem]",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-[0.56rem] font-semibold tracking-[0.28em] text-cream/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.8rem] leading-none sm:text-[2rem]">
                      {item.label}
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 text-cream/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="shrink-0 border-t border-cream/10 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
            <CtaLink
              href={whatsappUrl}
              variant="light"
              icon="whatsapp"
              external
              fullWidth
              onClick={() => setOpen(false)}
            >
              Consultar disponibilidad
            </CtaLink>
            <div className="mt-5 flex flex-col gap-2.5 text-[0.8rem] text-cream/70">
              <a
                href={`tel:+${WHATSAPP_DISPLAY.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-cream"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 transition-colors hover:text-cream"
              >
                <Icon name="pin" className="h-4 w-4" />
                Merlo, San Luis · Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
