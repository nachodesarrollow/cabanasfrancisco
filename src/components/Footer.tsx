import {
  INSTAGRAM_URL,
  LOCATION_URL,
  MESSAGES,
  NAV,
  WHATSAPP_DISPLAY,
} from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-ink pb-24 text-cream/70 md:pb-0">
      <div className={cn("shell pt-16 pb-10 sm:pt-20")}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <Wordmark tone="cream" size="sm" />
            <p className="mt-6 max-w-[23rem] text-[0.85rem] leading-[1.8] text-cream/50">
              Cabañas en Merlo, San Luis. Piscina, patio y asadores en un
              entorno tranquilo, a minutos del centro.
            </p>
            <p className="mt-5 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-cream/55">
              Merlo · San Luis · Argentina
            </p>
          </div>

          <nav aria-label="Secciones del sitio">
            <h2 className="eyebrow text-cream/55">Secciones</h2>
            <ul className="mt-5 space-y-2.5 text-[0.82rem]">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-cream/55">Contacto</h2>
            <ul className="mt-5 space-y-3 text-[0.82rem]">
              <li>
                <a
                  href={getWhatsAppUrl(MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-cream"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-cream/60" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-cream"
                >
                  <Icon name="pin" className="h-4 w-4 text-cream/60" />
                  Ver ubicación
                </a>
              </li>
              {INSTAGRAM_URL && (
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-cream"
                  >
                    <Icon name="arrowUpRight" className="h-4 w-4 text-cream/60" />
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[0.65rem] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} La Casa de Francisco. Todos los derechos reservados.</p>
          <p>Sitio informativo · Las consultas se responden por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
