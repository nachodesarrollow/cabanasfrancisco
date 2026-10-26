import { useEffect } from "react";

/**
 * Revela suavemente los elementos con `data-reveal` cuando entran en pantalla.
 * Si el usuario prefiere movimiento reducido, el CSS los muestra directamente.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(
            (entry.target as HTMLElement).dataset.revealDelay ?? 0,
          );
          window.setTimeout(
            () => entry.target.classList.add("is-revealed"),
            delay,
          );
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observePending = () => {
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (element.classList.contains("is-revealed")) return;
        observer.observe(element);
      });
    };

    observePending();

    // La galería agrega y quita tarjetas al filtrar: hay que observarlas.
    const mutations = new MutationObserver(observePending);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}

/** Bloquea el scroll del documento mientras `locked` sea verdadero. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}
