---
name: posteos-redes-pics
description: Crea imágenes para posteos en redes (LinkedIn, Instagram, carruseles, posts cuadrados, banners) con el sistema visual de Carajo Vende / Roberto Ríos — solo rojo y negro sobre blanco, sin logo, tipografía grotesca bold estilo case board. Úsala SIEMPRE que pidan una imagen, pic, carrusel, portada, slide o banner para un post.
user-invocable: true
---

Lee readme.md (reglas de contenido, visuales e iconografía) antes de diseñar.

Reglas no negociables:
- Colores: solo `--red #D3202F`, `--ink #0B0B0B` y blanco. Grises solo para texto secundario y filetes.
- Sin logo: firma tipográfica "Roberto Ríos · Carajo Vende" (componente Signature).
- Tipografía: Archivo (bold, tracking −0.045em, interlineado 0.9) + IBM Plex Mono para metadatos. Cifras en peso light.
- Esquinas rectas, sin sombras, sin degradados, sin emoji. Alineado a la izquierda.
- Formatos: carrusel 1080×1350, post 1080×1080, banner 1584×396. Margen 72px. Texto mínimo 18px.
- Copy: español, tuteo, frases cortas con punto final, una idea por titular, CTA concreto al cierre.

Archivos:
- `styles.css` + `tokens/` — variables CSS.
- `components/` — Label, Stat, MetaBar, ColumnText, LetterTiles, ImageFrame, Signature (JSX + .d.ts + .prompt.md con uso).
- `ui_kits/linkedin/` — ejemplos: Slides.jsx (portada, problema, método, caso, cifras, cierre) y Formats.jsx (post dato, post nota, banner).
- `assets/references/` — capturas de look & feel.

Para entregar: genera HTML estático al tamaño exacto del formato enlazando styles.css, y exporta PNG si lo piden. Si invocan la skill sin contexto, pregunta: formato, idea del post, cifras o caso disponibles y CTA.
