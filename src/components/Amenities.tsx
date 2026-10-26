import { AMENITIES } from "../data/site";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";

export function Amenities() {
  return (
    <section
      id="exteriores"
      className="relative overflow-hidden bg-olive py-20 text-cream sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-sage/10 blur-3xl"
      />
      <div className={cn("shell relative")}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.75fr] lg:items-end lg:gap-20">
          <SectionHeading
            tone="light"
            label="Piscina, patio y asadores"
            title={
              <>
                Afuera, el tiempo{" "}
                <span className="italic text-cream/85">pasa distinto.</span>
              </>
            }
          />
          <p
            className="max-w-[30rem] text-[0.95rem] leading-[1.8] text-cream/65 sm:text-base"
            data-reveal
            data-reveal-delay="100"
          >
            Disfrutá de la piscina, relajate en el patio y compartí buenos
            momentos alrededor de los asadores. Un entorno tranquilo para
            aprovechar cada día de tu estadía.
          </p>
        </div>

        <div
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-4"
          data-reveal
        >
          <figure className="group relative overflow-hidden bg-olive-deep sm:col-span-2 lg:col-span-8">
            <Photo
              name="piscina-detalle"
              alt="Agua turquesa de la piscina junto a una reposera blanca, con las cabañas y los árboles del complejo de fondo."
              sizes="(max-width: 1024px) 92vw, 62vw"
              className="aspect-[4/3] transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03] lg:aspect-[16/11]"
            />
            <figcaption className="absolute bottom-4 left-4 bg-olive-ink/45 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-cream/85 backdrop-blur-sm">
              Piscina
            </figcaption>
          </figure>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
            <figure className="group relative overflow-hidden bg-olive-deep">
              <Photo
                name="asador"
                alt="Asador de ladrillo con campana metálica bajo techo, junto al patio de baldosas rojas."
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="aspect-[4/3] transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
              />
              <figcaption className="absolute bottom-4 left-4 bg-olive-ink/45 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-cream/85 backdrop-blur-sm">
                Asador
              </figcaption>
            </figure>
            <figure className="group relative overflow-hidden bg-olive-deep">
              <Photo
                name="piscina-jardin"
                alt="Piscina y jardín vistos desde la galería, con reposeras rojas y sombrilla."
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="aspect-[4/3] transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
              />
              <figcaption className="absolute bottom-4 left-4 bg-olive-ink/45 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-cream/85 backdrop-blur-sm">
                Jardín
              </figcaption>
            </figure>
          </div>
        </div>

        <ul className="mt-14 grid gap-8 border-t border-cream/15 pt-9 sm:grid-cols-3 sm:gap-10">
          {AMENITIES.map((amenity, index) => (
            <li key={amenity.title} data-reveal data-reveal-delay={index * 80}>
              <Icon name={amenity.icon} className="h-6 w-6 text-cream/65" />
              <h3 className="mt-4 font-display text-[1.6rem] leading-none text-cream">
                {amenity.title}
              </h3>
              <p className="mt-2.5 max-w-[19rem] text-[0.84rem] leading-relaxed text-cream/70">
                {amenity.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
