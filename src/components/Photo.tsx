import type { CSSProperties } from "react";
import { imageColor, imageSize, imageSrcSet, imageUrl } from "../lib/images";
import type { ImageName } from "../lib/images";
import { cn } from "../lib/cn";

type PhotoProps = {
  name: ImageName;
  alt: string;
  /** Variante para pantallas chicas (recorte más adecuado). */
  mobileName?: ImageName;
  /** Atributo `sizes`: por defecto asume media pantalla en desktop. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Imagen de la primera pantalla: se carga con prioridad alta. */
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * Fotografía real del complejo con `srcset`, dimensiones explícitas y
 * `object-fit: cover` para evitar saltos de layout.
 */
export function Photo({
  name,
  alt,
  mobileName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  className,
  imgClassName,
  priority = false,
  style,
}: PhotoProps) {
  const { width, height } = imageSize(name);

  const image = (
    <img
      src={imageUrl(name)}
      srcSet={imageSrcSet(name)}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-full w-full object-cover", imgClassName, className)}
      style={{ backgroundColor: imageColor(name), ...style }}
    />
  );

  if (!mobileName) return image;

  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet={imageSrcSet(mobileName)}
        sizes={sizes}
      />
      {image}
    </picture>
  );
}
