import { LOCATION_URL, MESSAGES, WHATSAPP_DISPLAY } from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { CtaLink } from "./CtaLink";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";

export function Location() {
  return (
    <section
      id="ubicacion"
      className="relative isolate overflow-hidden bg-olive-deep py-20 text-cream sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          name="galeria-exterior"
          alt="Galería y piscina del complejo, rodeadas de jardín."
          sizes="100vw"
          imgClassName="object-[60%_55%] opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-olive-ink via-olive-ink/92 to-olive-ink/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-olive-ink/80 via-transparent to-olive-ink/40"
        />
      </div>

      <div
        className={cn(
          "shell grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:gap-20",
        )}
      >
        <div>
          <SectionHeading
            tone="light"
            label="Ubicación"
            title={
              <>
                Cerca del centro.{" "}
                <span className="italic text-cream/85">Lejos del ruido.</span>
              </>
            }
            description="En una zona tranquila de Merlo, La Casa de Francisco te ofrece un lugar para descansar y disfrutar de la ciudad, a aproximadamente tres minutos del centro."
          />

          <dl
            className="mt-10 max-w-[30rem] border-t border-cream/15 pt-7 text-[0.86rem]"
            data-reveal
          >
            <div className="flex items-start gap-4 border-b border-cream/10 pb-5">
              <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-cream/70" />
              <div>
                <dt className="font-medium text-cream/90">A 3 minutos del centro</dt>
                <dd className="mt-1 text-cream/70">
                  Lo suficiente cerca para salir y volver, lo suficiente lejos
                  para descansar.
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4 pt-5">
              <Icon name="whatsapp" className="mt-0.5 h-5 w-5 shrink-0 text-cream/70" />
              <div>
                <dt className="font-medium text-cream/90">Consultas y ubicación</dt>
                <dd className="mt-1 text-cream/70">
                  Escribinos por WhatsApp para consultar por la ubicación y la
                  llegada.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div
          className="bg-cream p-7 text-ink shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)] sm:p-9"
          data-reveal
          data-reveal-delay="120"
        >
          <p className="font-display text-[1.9rem] leading-[1.1] text-olive">
            Merlo, San Luis
            <br />
            Argentina
          </p>

          <div className="mt-6 flex items-center gap-3 border-y border-olive/12 py-4 text-[0.82rem]">
            <Icon name="pin" className="h-4.5 w-4.5 shrink-0 text-sage" />
            <span className="text-ink/65">
              Zona tranquila, a unos 3 minutos del centro de Merlo.
            </span>
          </div>

          <div className="mt-6 space-y-2.5">
            <CtaLink
              href={LOCATION_URL}
              external
              icon="arrowUpRight"
              fullWidth
            >
              Cómo llegar
            </CtaLink>
            <a
              href={getWhatsAppUrl(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-olive/70 transition-colors hover:text-olive"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
          </div>

          <p className="mt-4 text-[0.65rem] leading-relaxed text-ink/65">
            El enlace abre el mapa compartido por el alojamiento. Las consultas
            se responden por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
