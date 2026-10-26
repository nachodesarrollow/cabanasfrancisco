import type { ImageName } from "../lib/images";
import type { IconName } from "../components/Icon";

/**
 * Datos del negocio.
 * Todo lo que el propietario necesite actualizar (contacto, textos, fotos)
 * vive en este archivo.
 */

export const WHATSAPP_NUMBER = "542664205150";
export const WHATSAPP_DISPLAY = "+54 266 420-5150";

/** Enlace de ubicación compartido por el propietario. */
export const LOCATION_URL = "https://share.google/vo4gAx9Kwi7auFrZO";

/** Todavía no hay cuenta de Instagram definida: no se muestra ningún enlace. */
export const INSTAGRAM_URL: string | null = null;

export const MESSAGES = {
  general:
    "Hola, quisiera consultar disponibilidad y tarifas para alojarme en La Casa de Francisco, en Merlo. ¿Me podrían brindar información?",
  cabin1:
    "Hola, quisiera consultar disponibilidad y tarifas de la Cabaña 1 de La Casa de Francisco, para hasta 5 personas. ¿Me podrían brindar información?",
  cabin2:
    "Hola, quisiera consultar disponibilidad y tarifas de la Cabaña 2 de La Casa de Francisco, para hasta 3 personas. ¿Me podrían brindar información?",
} as const;

export type NavItem = { label: string; href: string; id: string };

export const NAV: NavItem[] = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "El complejo", href: "#complejo", id: "complejo" },
  { label: "Las cabañas", href: "#cabanas", id: "cabanas" },
  { label: "Galería", href: "#galeria", id: "galeria" },
  { label: "Ubicación", href: "#ubicacion", id: "ubicacion" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export const NAV_SECTION_IDS = NAV.map((item) => item.id);

export type Cabin = {
  id: string;
  index: string;
  name: string;
  title: string;
  description: string;
  guests: number;
  rooms: number;
  futon?: boolean;
  image: ImageName;
  imageAlt: string;
  imageCaption: string;
  features: { icon: IconName; label: string }[];
  whatsappMessage: string;
};

export const CABINS: Cabin[] = [
  {
    id: "cabana-1",
    index: "01",
    name: "Cabaña 1",
    title: "Más espacio para disfrutar juntos.",
    description:
      "Una cabaña pensada para compartir una escapada en familia o con amigos, con dos habitaciones y espacio para alojar cómodamente hasta cinco personas.",
    guests: 5,
    rooms: 2,
    image: "piscina-cabanas",
    imageAlt:
      "Piscina del complejo con reposeras rojas, sombrilla y las cabañas al fondo, en un día de sol.",
    imageCaption: "Piscina y cabañas",
    features: [
      { icon: "users", label: "Hasta 5 huéspedes" },
      { icon: "bed", label: "2 habitaciones" },
    ],
    whatsappMessage: MESSAGES.cabin1,
  },
  {
    id: "cabana-2",
    index: "02",
    name: "Cabaña 2",
    title: "Tu refugio para descansar.",
    description:
      "Una alternativa acogedora para parejas, pequeñas familias o grupos reducidos, con una habitación y un futón adicional.",
    guests: 3,
    rooms: 1,
    futon: true,
    image: "galeria-exterior",
    imageAlt:
      "Galería de la casa junto a la piscina, con sombrilla roja, reposeras y el jardín alrededor.",
    imageCaption: "Galería y piscina",
    features: [
      { icon: "users", label: "Hasta 3 huéspedes" },
      { icon: "bed", label: "1 habitación" },
      { icon: "sofa", label: "Futón adicional" },
    ],
    whatsappMessage: MESSAGES.cabin2,
  },
];

export type Amenity = { icon: IconName; title: string; description: string };

export const AMENITIES: Amenity[] = [
  {
    icon: "waves",
    title: "Piscina",
    description:
      "Rodeada de reposeras y sombrilla, para disfrutar de los días de sol.",
  },
  {
    icon: "sun",
    title: "Patio",
    description:
      "Un espacio amplio de baldosas cálidas para estar afuera sin apuro.",
  },
  {
    icon: "flame",
    title: "Asadores",
    description:
      "Parrilla de ladrillo para cocinar y compartir al aire libre.",
  },
];

export type GalleryCategory = "piscina" | "patio" | "interiores";

export const GALLERY_FILTERS: { id: GalleryCategory | "todas"; label: string }[] =
  [
    { id: "todas", label: "Todas" },
    { id: "piscina", label: "Piscina y exteriores" },
    { id: "patio", label: "Patio y asadores" },
    { id: "interiores", label: "Interiores" },
  ];

export type GalleryItem = {
  image: ImageName;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Relación de aspecto usada en la grilla. */
  aspect: string;
};

export const GALLERY: GalleryItem[] = [
  {
    image: "piscina-merlo",
    alt: "Vista de la piscina desde el patio, con el jardín, el árbol centenario y las sierras al fondo.",
    caption: "Piscina y jardín",
    category: "piscina",
    aspect: "aspect-[4/3]",
  },
  {
    image: "galeria-exterior",
    alt: "Galería cubierta junto a la piscina, con sombrilla roja, mesa y reposeras sobre el patio de baldosas.",
    caption: "Galería y piscina",
    category: "piscina",
    aspect: "aspect-[4/5]",
  },
  {
    image: "asador",
    alt: "Asador de ladrillo con campana metálica, bajo techo, junto al patio de baldosas rojas y el jardín.",
    caption: "El asador",
    category: "patio",
    aspect: "aspect-[4/3]",
  },
  {
    image: "interior-cocina",
    alt: "Cocina equipada con heladera, microondas, mesada de granito y cocina a gas.",
    caption: "Cocina",
    category: "interiores",
    aspect: "aspect-[4/5]",
  },
  {
    image: "piscina-jardin",
    alt: "Piscina sobre una plataforma de baldosas, rodeada de césped y árboles, con reposeras rojas y sombrilla.",
    caption: "Jardín y piscina",
    category: "piscina",
    aspect: "aspect-[3/2]",
  },
  {
    image: "patio-terraza",
    alt: "Vista desde el patio de baldosas rojas hacia la piscina y el jardín, con un escalón de acceso.",
    caption: "Patio y jardín",
    category: "patio",
    aspect: "aspect-[4/3]",
  },
  {
    image: "interior-comedor",
    alt: "Ambiente integrado con mesa y sillas, cocina con mesada de granito y ventana hacia el exterior.",
    caption: "Cocina y comedor",
    category: "interiores",
    aspect: "aspect-[4/3]",
  },
  {
    image: "piscina-cabanas",
    alt: "Piscina con sombrilla, reposeras y las cabañas de techos de chapa al fondo, bajo un cielo despejado.",
    caption: "Piscina y cabañas",
    category: "piscina",
    aspect: "aspect-[3/2]",
  },
  {
    image: "piscina-detalle",
    alt: "Detalle del agua turquesa de la piscina junto a una reposera blanca y las cabañas.",
    caption: "El agua de la piscina",
    category: "piscina",
    aspect: "aspect-[4/5]",
  },
];
