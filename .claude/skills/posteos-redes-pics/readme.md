# Carajo Vende — LinkedIn Design System

Sistema de diseño de **Carajo Vende**, la marca personal de **Roberto Ríos** (capacitación comercial / ventas) en LinkedIn: carruseles, posts de imagen y banner de perfil.

## Fuentes
- Repo GitHub: https://github.com/rcarlosrios-blip/dise-o-vendecarajo — "repo de diseño para mi marca personal". **Estaba vacío** al construir este sistema (sin commits); vale la pena revisarlo de nuevo cuando tenga contenido para afinar el sistema.
- Otro repo relacionado (no leído): https://github.com/rcarlosrios-blip/roberto-rios-capacitacion — sitio web de capacitación comercial.
- Look & feel: 6 capturas subidas por el usuario (`assets/references/`): boards de casos premiados en Cannes Lions — Volvo "Safety Standard" (Gold), Apple TV (Grand Prix), Tigris "Condensed Identity" (Silver), NPR "why/how/who" (Gold), Lions Winners 2022 y un retrato en malla/glitch de tenista.
- **Sin logo, por decisión de marca:** los posteos van "tal cual", solo con nombre en tipografía (`Signature`, rol "Carajo Vende").
- **Paleta: solo rojo y negro** (+ blanco de fondo), confirmado por el usuario.

## Content fundamentals
Idioma: español latinoamericano, tuteo ("tú", "guarda esto"). Voz de primera persona de Roberto ("Lo que veo en 9 de cada 10 equipos").
- **Directo y corto.** Frases declarativas, punto final, sin signos de exclamación. Titular = una idea: "El cliente no quiere tu demo." / "Presentan antes de preguntar."
- **Estructura de caso** (heredada de los boards): Contexto → Idea → Resultado, con cifras.
- **Cifras con fuente.** Toda cifra lleva leyenda y, si aplica, fuente en mono ("Fuente: CRM del cliente, T2 2026").
- **Casing:** oración normal en titulares; MAYÚSCULAS solo en la display condensada y en metadatos mono.
- **Preguntas-ancla** en minúsculas como objeto gráfico: qué / cómo / quién.
- **CTA concreto** al cierre: "Comenta “MÉTODO” y te mando la guía."
- **Sin emoji, sin hashtags dentro de la pieza.** (Los hashtags van en el caption del post.)
- Nota: tono inferido de las referencias + el contexto comercial; ajustar con textos reales de Roberto.

## Visual foundations
- **Vibe:** board de caso premiado — editorial, museo, alto contraste, mucho aire, la evidencia (cifras, fotos) manda.
- **Color:** solo **rojo `#D3202F`** y **negro `#0B0B0B`** sobre blanco. `--red-deep #A8121F` para texto rojo pequeño sobre blanco. Grises (`--mute`, `--hairline`) solo para texto secundario y filetes, nunca como fondo. Nada de otros colores, degradados ni tintes.
- **Tipo:** grotesca neo-suiza. Sustituto: **Archivo** (variable, con eje de ancho) + **IBM Plex Mono** para metadatos. Display bold con tracking −0.045em e interlineado 0.9; cifras en *light* (300) gigantes; condensada (ancho 72%) en mayúsculas para titulares largos; texto en columnas estrechas con filete superior.
- **Escala:** pensada para lienzo 1080 px (se ve al ~35% en el feed): display 120, h1 84, h2 56, body 30, mínimo 18.
- **Retícula:** 12 columnas, margen 72, medianil 24. Alineación a la izquierda siempre; cabecera MetaBar arriba, Signature abajo, contenido entre medio.
- **Fondos:** planos, solo tres: blanco (argumento, caso), negro (portada, datos), rojo (cierre, dato destacado). Sin texturas, patrones ni degradados.
- **Imagen:** sujeto aislado sobre negro o gris, alto contraste, tratamiento malla/glitch permitido para retrato; fondo negro o blanco.
- **Bordes y filetes:** 1 px en el color del texto; filete vertical para separar kicker/título; 4 px para énfasis.
- **Radios:** 0 en todo. Única excepción: 4 px en la etiqueta Label.
- **Sombras:** ninguna.
- **Transparencia/blur:** no se usan.
- **Animación** (si se hace video/carrusel animado): cortes secos, `--ease-cut`, 120–220 ms; sin rebotes.
- **Hover/press** (visor y UI web): inversión blanco/negro; sin cambios de opacidad.
- **Cards:** no hay "cards" redondeadas; los bloques son zonas de color plano o columnas con filete.

## Iconography
Sin íconos: el lenguaje gráfico: el lenguaje gráfico son letras en cuadros (LetterTiles), cifras y filetes. Flechas y separadores con unicode (← → · —). Sin emoji. Si en el futuro se necesitan íconos, usar Lucide (trazo 1.5, CDN) — **sustitución no validada**.

## Index
- `styles.css` → `tokens/` (fonts, colors, typography, spacing, effects)
- `guidelines/` — cards de fundamentos (Colors, Type, Spacing, Brand)
- `assets/references/` — capturas de look & feel
- `components/`
  - editorial: **Label**, **Stat**, **MetaBar**, **ColumnText**
  - graphic: **LetterTiles**, **ImageFrame**
  - brand: **Signature**
- `ui_kits/linkedin/` — carrusel (6 slides), posts (2) y banner
- `SKILL.md`, `thumbnail.html`, `github.md`

## Components
Label, Stat, MetaBar, ColumnText, LetterTiles, ImageFrame, Signature.

### Intentional additions
No había inventario de componentes en la fuente; los 7 se derivan de patrones visibles en las referencias (sello de premio, cifras, cabecera de board, columnas de caso, letras en cuadros, marcos de foto, firma).
