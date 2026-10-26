"""Genera las imágenes optimizadas del sitio (WebP) y la imagen para redes.

Uso (desde la raíz del proyecto):
    python scripts/build-images.py

Las fotos originales viven en `assets/fotos-originales/`. Para cambiar una
fotografía, reemplazá el archivo manteniendo el nombre y volvé a ejecutar el
script. Los nuevos archivos se escriben en `public/images/` y se actualiza
`src/data/image-manifest.json`.
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = ROOT / "assets" / "fotos-originales"
IMG_OUT = PUBLIC / "images"
IMG_OUT.mkdir(parents=True, exist_ok=True)

# Nombre de salida -> archivo original.
PHOTOS = {
    "piscina-merlo": "piscina-merlo.jpg",
    "piscina-jardin": "piscina-jardin.jpg",
    "piscina-cabanas": "piscina-cabanas.jpg",
    "piscina-detalle": "piscina-detalle.jpg",
    "asador": "asador.jpg",
    "galeria-exterior": "galeria-exterior.jpg",
    "patio-terraza": "patio-terraza.jpg",
    "interior-comedor": "interior-comedor.jpg",
    "interior-cocina": "interior-cocina.jpg",
}

# Los originales miden 1080 px de ancho: nunca se escala por encima de eso.
WIDTHS = [480, 760, 1080]

manifest = {}


def load(name: str) -> Image.Image:
    path = SRC / PHOTOS[name]
    if not path.exists():
        raise FileNotFoundError(f"Falta la fotografía original: {path}")
    image = Image.open(path)
    return ImageOps.exif_transpose(image).convert("RGB")


for name in PHOTOS:
    image = load(name)
    width, height = image.size
    variants = []

    for target in WIDTHS:
        target_width = min(target, width)
        target_height = round(height * target_width / width)
        resized = image.resize((target_width, target_height), Image.LANCZOS)
        output = IMG_OUT / f"{name}-{target_width}.webp"
        resized.save(output, "WEBP", quality=82, method=6)
        variants.append(
            {
                "width": target_width,
                "height": target_height,
                "bytes": output.stat().st_size,
            }
        )

    manifest[name] = {
        "width": width,
        "height": height,
        "variants": variants,
    }
    print(f"{name}: {width}x{height} -> {', '.join(str(v['width']) for v in variants)}")

# Imagen de Open Graph: 1200x630 centrada en la piscina.
hero = load("piscina-merlo")
og = ImageOps.fit(hero, (1200, 630), method=Image.LANCZOS, centering=(0.5, 0.55))
og.save(PUBLIC / "og-image.jpg", "JPEG", quality=86, optimize=True, progressive=True)

# Color dominante: se usa como fondo mientras carga cada fotografía.
for name in PHOTOS:
    pixel = load(name).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    manifest[name]["color"] = "#%02x%02x%02x" % pixel

manifest_path = ROOT / "src" / "data" / "image-manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"listo: {manifest_path}")
