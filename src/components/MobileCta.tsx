import { useEffect, useState } from "react";
import { MESSAGES } from "../data/site";
import { cn } from "../lib/cn";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { Icon } from "./Icon";

/**
 * Barra de consulta fija en móviles. Aparece al salir del hero y deja
 * espacio en el footer para no tapar contenido.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-olive-ink/95 px-3 pt-2.5 backdrop-blur-md md:hidden",
        "pb-[calc(0.625rem+env(safe-area-inset-bottom))]",
        "transition-transform duration-500 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={getWhatsAppUrl(MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-3 rounded-full bg-cream px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-olive"
      >
        <Icon name="whatsapp" className="h-4 w-4" />
        Consultar disponibilidad
        <Icon name="arrowUpRight" className="h-3.5 w-3.5 text-olive/50" />
      </a>
    </div>
  );
}
