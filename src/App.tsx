import { useEffect } from "react";
import { About } from "./components/About";
import { Amenities } from "./components/Amenities";
import { Cabins } from "./components/Cabins";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Location } from "./components/Location";
import { MobileCta } from "./components/MobileCta";
import { useRevealOnScroll } from "./lib/hooks";

export default function App() {
  useRevealOnScroll();

  // Los enlaces con hash (por ejemplo, los que se comparten por WhatsApp)
  // deben ubicar la sección aunque la página se monte después del HTML.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const timeout = window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
    }, 120);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-[0.7rem] focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-olive focus:shadow-lg"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <About />
        <Cabins />
        <Amenities />
        <Gallery />
        <Location />
        <Contact />
      </main>

      <Footer />
      <MobileCta />
    </>
  );
}
