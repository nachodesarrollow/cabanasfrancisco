import { CABINS } from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { CtaLink } from "./CtaLink";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";

export function Cabins() {
  return (
    <section
      id="cabanas"
      className="relative border-t border-olive/10 bg-cream-soft py-20 sm:py-24 lg:py-32"
    >
      <div className={cn("shell")}>
        <div className="max-w-3xl">
          <SectionHeading
            label="Las cabañas"
            title={
              <>
                Dos formas de <span className="italic text-clay">alojarte.</span>
              </>
            }
            description="Dos cabañas independientes dentro del mismo complejo, con los espacios exteriores compartidos. Elegí la que mejor se adapte a tu grupo."
          />
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:mt-20 lg:gap-24">
          {CABINS.map((cabin, index) => (
            <article
              key={cabin.id}
              id={cabin.id}
              aria-labelledby={`${cabin.id}-title`}
              className={cn(
                "grid items-center gap-9 lg:grid-cols-2 lg:gap-16 xl:gap-24",
                index > 0 && "border-t border-olive/10 pt-16 lg:pt-24",
              )}
            >
              <figure
                className={cn(
                  "relative",
                  index % 2 === 1 && "lg:order-2",
                )}
                data-reveal
              >
                <div className="relative overflow-hidden bg-sand">
                  <Photo
                    name={cabin.image}
                    alt={cabin.imageAlt}
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="aspect-[4/3] object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.03] sm:aspect-[16/10] lg:aspect-[5/4]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center bg-cream/95 font-display text-[1.45rem] leading-none text-olive backdrop-blur-sm"
                  >
                    {cabin.index}
                  </span>
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.26em] text-ink/65">
                  <Icon name="pin" className="h-3.5 w-3.5" />
                  {cabin.imageCaption} · Merlo
                </figcaption>
              </figure>

              <div
                className={cn("max-w-[34rem]", index % 2 === 1 && "lg:order-1")}
                data-reveal
                data-reveal-delay="100"
              >
                <p className="eyebrow text-clay">
                  Cabaña {cabin.index}
                </p>
                <h3
                  id={`${cabin.id}-title`}
                  className="mt-4 font-display text-[clamp(2rem,3.9vw,3.35rem)] leading-[1.03] tracking-[-0.015em] text-olive"
                >
                  {cabin.title}
                </h3>
                <p className="lead mt-5">{cabin.description}</p>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {cabin.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="inline-flex items-center gap-2.5 rounded-full border border-olive/15 px-4 py-2.5 text-[0.72rem] font-medium tracking-[0.02em] text-olive/85"
                    >
                      <Icon
                        name={feature.icon}
                        className="h-4 w-4 text-sage"
                      />
                      {feature.label}
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <CtaLink
                    href={getWhatsAppUrl(cabin.whatsappMessage)}
                    icon="whatsapp"
                    variant="solid"
                    external
                  >
                    Consultar por esta cabaña
                  </CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-20 flex flex-col gap-4 border-t border-olive/12 pt-6 text-[0.72rem] text-ink/65 sm:flex-row sm:items-center sm:justify-between"
          data-reveal
        >
          <p>Las fechas están sujetas a confirmación por parte del alojamiento.</p>
          <a
            href="#galeria"
            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-olive transition-colors hover:text-clay"
          >
            Ver todas las fotografías
            <Icon
              name="arrowRight"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
