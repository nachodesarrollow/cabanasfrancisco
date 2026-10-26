import { useEffect, useState } from "react";
import {
  GALLERY,
  GALLERY_FILTERS,
  type GalleryCategory,
} from "../data/site";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";

type FilterId = GalleryCategory | "todas";

export function Gallery() {
  const [filter, setFilter] = useState<FilterId>("todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items =
    filter === "todas"
      ? GALLERY
      : GALLERY.filter((item) => item.category === filter);

  useEffect(() => {
    setOpenIndex(null);
  }, [filter]);

  const countFor = (id: FilterId) =>
    id === "todas"
      ? GALLERY.length
      : GALLERY.filter((item) => item.category === id).length;

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((current) =>
      current === null ? current : (current - 1 + items.length) % items.length,
    );
  const next = () =>
    setOpenIndex((current) =>
      current === null ? current : (current + 1) % items.length,
    );

  return (
    <section id="galeria" className="bg-cream py-20 sm:py-24 lg:py-32">
      <div className={cn("shell")}>
        <div className="max-w-3xl">
          <SectionHeading
            label="Galería"
            title={
              <>
                Cada rincón, <span className="italic text-clay">en imágenes.</span>
              </>
            }
            description="Fotografías reales del complejo: la piscina, el jardín, el patio con los asadores y los interiores de las cabañas."
          />
        </div>
        <div
          className="mt-9 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar fotografías por espacio"
          data-reveal
        >
          {GALLERY_FILTERS.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                  isActive
                    ? "border-olive bg-olive text-cream"
                    : "border-olive/20 text-olive/65 hover:border-olive/50 hover:text-olive",
                )}
              >
                {option.label}
                <span
                  className={cn(
                    "text-[0.55rem] tabular-nums",
                    isActive ? "text-cream/60" : "text-olive/70",
                  )}
                >
                  {countFor(option.id)}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {items.length} fotografías visibles.
        </p>

        <div className="mt-12 columns-2 gap-3 md:columns-3 lg:mt-16 lg:gap-4">
          {items.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar fotografía: ${item.caption}`}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-sand text-left lg:mb-4"
              data-reveal
              data-reveal-delay={(index % 3) * 60}
            >
              <Photo
                name={item.image}
                alt={item.alt}
                sizes="(max-width: 768px) 48vw, 32vw"
                className={cn(
                  item.aspect,
                  "transition-transform duration-[1.5s] ease-out group-hover:scale-[1.045]",
                )}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-olive-ink/65 via-olive-ink/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:gap-3 sm:p-4">
                <span className="text-[0.56rem] font-semibold uppercase leading-snug tracking-[0.12em] text-cream sm:text-[0.62rem] sm:tracking-[0.18em]">
                  {item.caption}
                </span>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream opacity-0 transition-all duration-300 group-hover:opacity-100 max-md:hidden">
                  <Icon name="expand" className="h-3.5 w-3.5" />
                </span>
              </span>
            </button>
          ))}
        </div>

        <p
          className="mt-8 max-w-2xl text-[0.72rem] leading-relaxed text-ink/65"
          data-reveal
        >
          Las fotografías muestran el complejo tal como es. Si querés ver más
          detalles de una cabaña en particular, escribinos por WhatsApp.
        </p>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
