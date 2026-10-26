import { MESSAGES } from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { CtaLink } from "./CtaLink";
import { Photo } from "./Photo";

const highlights = [
  "Dos cabañas independientes",
  "Piscina, patio y asadores",
  "A 3 minutos del centro",
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-olive-ink"
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          name="piscina-merlo"
          mobileName="piscina-jardin"
          alt="Piscina del complejo rodeada de jardín, con un gran árbol y las sierras de Merlo al fondo."
          sizes="100vw"
          priority
          imgClassName="max-md:object-[48%_52%] md:object-[58%_46%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-olive-ink/92 via-olive-ink/25 to-olive-ink/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[84%] bg-gradient-to-t from-olive-ink via-olive-ink/78 to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(115%_85%_at_18%_100%,rgba(20,30,24,0.45),transparent_60%)]"
        />
      </div>

      <div className={cn("shell relative pb-14 pt-32 sm:pb-16 lg:pb-20")}>
        <div className="max-w-[54rem]">
          <p
            className="eyebrow flex items-center gap-3 text-cream/70"
            data-reveal
          >
            <span aria-hidden="true" className="h-px w-8 bg-cream/40" />
            Merlo · San Luis · Argentina
          </p>

          <h1
            className="mt-6 font-display text-[clamp(2.9rem,8.4vw,7.2rem)] leading-[0.94] tracking-[-0.025em] text-cream sm:mt-7"
            data-reveal
            data-reveal-delay="90"
          >
            Tu lugar para
            <br />
            <span className="italic text-cream/90">desconectar.</span>
          </h1>

          <p
            className="mt-7 max-w-[36rem] text-[0.98rem] leading-[1.8] text-cream/75 sm:mt-8 sm:text-[1.05rem]"
            data-reveal
            data-reveal-delay="180"
          >
            Descubrí La Casa de Francisco, un espacio pensado para descansar,
            disfrutar al aire libre y sentirte como en casa, a solo unos minutos
            del centro de Merlo.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            data-reveal
            data-reveal-delay="260"
          >
            <CtaLink href="#cabanas" variant="light" icon="arrowDown">
              Descubrir las cabañas
            </CtaLink>
            <CtaLink
              href={getWhatsAppUrl(MESSAGES.general)}
              variant="outlineLight"
              icon="whatsapp"
              external
            >
              Consultar por WhatsApp
            </CtaLink>
          </div>
        </div>

        <ul
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-cream/15 pt-6 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:mt-14 sm:gap-x-8"
          data-reveal
          data-reveal-delay="340"
        >
          {highlights.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden h-1 w-1 rounded-full bg-cream/30 sm:block"
                />
              )}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#complejo"
        className="absolute bottom-8 right-6 hidden items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-cream/50 transition-colors duration-300 hover:text-cream lg:right-13 lg:flex"
      >
        <span className="cue-line relative block h-14 w-px overflow-hidden bg-cream/20" />
        <span className="[writing-mode:vertical-rl]">Deslizá</span>
      </a>
    </section>
  );
}
