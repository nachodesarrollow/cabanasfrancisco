import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "../data/site";
import { useBodyScrollLock } from "../lib/hooks";
import { imageSize, imageSrcSet, imageUrl } from "../lib/images";
import { Icon } from "./Icon";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const FOCUSABLE =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const { width, height } = imageSize(item.image);

  useBodyScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const nodes = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <div
      className="lightbox-backdrop fixed inset-0 z-[100] bg-olive-ink/96 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Galería de fotografías — ${item.caption}`}
        className="flex h-full flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-cream/70">
            Galería{" "}
            <span className="ml-2 text-cream/90">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar galería"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-300 hover:bg-cream/10"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 45) return;
            if (delta > 0) onPrev();
            else onNext();
          }}
        >
          <button
            type="button"
            onClick={onPrev}
            aria-label="Fotografía anterior"
            className="absolute left-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-olive-ink/40 text-cream transition-colors duration-300 hover:bg-cream hover:text-olive sm:left-6 sm:h-12 sm:w-12"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>

          <figure
            key={item.image}
            className="lightbox-figure flex h-full w-full flex-col items-center justify-center gap-5 py-2"
          >
            <img
              src={imageUrl(item.image)}
              srcSet={imageSrcSet(item.image)}
              sizes="(max-width: 1024px) 96vw, 88vw"
              width={width}
              height={height}
              alt={item.alt}
              className="max-h-[68svh] w-auto max-w-full object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:max-h-[70svh]"
            />
            <figcaption className="max-w-2xl px-2 text-center">
              <p className="font-display text-[1.35rem] leading-tight text-cream sm:text-[1.6rem]">
                {item.caption}
              </p>
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-cream/60">
                La Casa de Francisco · Merlo
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={onNext}
            aria-label="Fotografía siguiente"
            className="absolute right-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-olive-ink/40 text-cream transition-colors duration-300 hover:bg-cream hover:text-olive sm:right-6 sm:h-12 sm:w-12"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>

        <div className="shrink-0 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 text-center text-[0.6rem] uppercase tracking-[0.2em] text-cream/55 sm:px-8 sm:py-5 sm:text-[0.62rem] sm:tracking-[0.22em]">
          <span className="sm:hidden">
            Deslizá para navegar · Tocá fuera para cerrar
          </span>
          <span className="hidden sm:inline">
            Usá las flechas del teclado · Esc para cerrar
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
