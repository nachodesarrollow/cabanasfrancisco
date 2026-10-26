import manifest from "../data/image-manifest.json";

export type ImageName = keyof typeof manifest;

const WIDTHS = [480, 760, 1080] as const;

const data = manifest as Record<
  string,
  { width: number; height: number; color: string }
>;

/** URL de la variante más grande disponible. */
export function imageUrl(name: ImageName): string {
  const entry = data[name];
  const width = Math.min(1080, entry.width);
  return `/images/${name}-${width}.webp`;
}

/** `srcset` con las variantes generadas en el build de imágenes. */
export function imageSrcSet(name: ImageName): string {
  const entry = data[name];
  return WIDTHS.filter((width) => width <= entry.width)
    .map((width) => `/images/${name}-${width}.webp ${width}w`)
    .join(", ");
}

export function imageSize(name: ImageName): { width: number; height: number } {
  const entry = data[name];
  return { width: entry.width, height: entry.height };
}

/** Color dominante: evita un bloque blanco mientras carga la fotografía. */
export function imageColor(name: ImageName): string {
  return data[name].color;
}
