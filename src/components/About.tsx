import { cn } from "../lib/cn";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";

const concepts = [
  {
    title: "Tranquilidad",
    description: "Un entorno silencioso, lejos del movimiento del centro.",
  },
  {
    title: "Comodidad",
    description: "Ambientes funcionales, pensados para sentirte como en casa.",
  },
  {
    title: "Aire libre",
    description: "Piscina, patio y asadores para disfrutar cada día afuera.",
  },
];

export function About() {
  return (
    <section id="complejo" className="relative bg-cream py-20 sm:py-24 lg:py-32">
      <div className={cn("shell")}>
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-20 xl:gap-28">
          <div className="lg:pt-4">
            <SectionHeading
              label="El complejo"
              title={
                <>
                  Un descanso <span className="italic text-clay">a tu manera.</span>
                </>
              }
            />

            <div className="mt-8 max-w-[34rem] space-y-5 text-[0.95rem] leading-[1.8] text-ink/70 sm:text-base">
              <p data-reveal data-reveal-delay="60">
                Hay lugares que invitan a bajar el ritmo. En La Casa de Francisco
                vas a encontrar un entorno tranquilo para disfrutar de Merlo,
                compartir momentos y descansar con la comodidad de sentirte como
                en casa.
              </p>
              <p data-reveal data-reveal-delay="120">
                Con dos opciones de alojamiento y espacios exteriores para
                disfrutar, cada estadía se convierte en una oportunidad para
                desconectar de la rutina.
              </p>
            </div>

            <dl
              className="mt-11 grid gap-y-7 border-t border-olive/15 pt-1 sm:grid-cols-3 sm:gap-x-7"
              data-reveal
              data-reveal-delay="180"
            >
              {concepts.map((concept, index) => (
                <div
                  key={concept.title}
                  className="border-t border-olive/12 pt-5 sm:border-t-0 sm:pt-6"
                >
                  <dt className="flex items-baseline gap-2.5 font-display text-[1.45rem] leading-none text-olive">
                    <span className="font-sans text-[0.55rem] font-semibold tracking-[0.2em] text-clay">
                      0{index + 1}
                    </span>
                    {concept.title}
                  </dt>
                  <dd className="mt-2.5 text-[0.8rem] leading-relaxed text-ink/70">
                    {concept.description}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="#galeria"
              className="group mt-12 hidden w-fit items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-olive transition-colors duration-300 hover:text-clay lg:inline-flex"
              data-reveal
              data-reveal-delay="220"
            >
              Ver el complejo en imágenes
              <span
                aria-hidden="true"
                className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12"
              />
            </a>
          </div>

          <div className="relative mt-2 lg:mt-0" data-reveal data-reveal-delay="120">
            <figure className="relative">
              <figcaption className="mb-3 flex items-center justify-between text-[0.56rem] font-semibold uppercase tracking-[0.26em] text-ink/65">
                <span>El jardín y la piscina</span>
                <span>Merlo, San Luis</span>
              </figcaption>
              <div className="relative overflow-hidden bg-sand">
                <Photo
                  name="piscina-jardin"
                  alt="Piscina del complejo sobre una plataforma de baldosas, rodeada de césped y árboles, con reposeras rojas y sombrilla."
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="aspect-[4/5] object-[50%_36%] transition-transform duration-[1.4s] ease-out hover:scale-[1.02]"
                />
              </div>
            </figure>

            <figure className="absolute -bottom-8 -left-6 hidden w-[40%] border-[8px] border-cream shadow-[0_25px_60px_-35px_rgba(26,36,30,0.7)] sm:block">
              <Photo
                name="interior-cocina"
                alt="Interior de la cocina, con heladera, microondas y cocina a gas."
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="aspect-[4/5] object-[center_60%]"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
