---
name: edicion-video-rc
description: Edita videos de capacitación, ventas y redes de Roberto Ríos (RC) con textos en pantalla (gancho, títulos de sección, frases clave, CTA, subtítulos) e imágenes de soporte (diagramas, embudos, datos, logos), en vertical para Reels/TikTok/Shorts, usando ffmpeg y, para animaciones, HyperFrames. Úsala SIEMPRE que RC suba o mencione videos y pida editarlos, unirlos, recortarlos, ponerles texto, títulos, subtítulos, gráficos, imágenes, "edición tipo Reel", "hazlo para TikTok", "versión corta", clips de un curso o taller, o un video animado/motion graphics para sus marcas (Colmena, VendeCarajo, Roberto Ríos Capacitación, Stadibox), aunque no diga "skill" ni "edición".
---

# Edición de video RC

Convierte clips crudos (casi siempre grabados con celular en talleres o capacitaciones) en un video
listo para redes, con textos que refuerzan el mensaje e imágenes que explican lo que se dice.

## Cómo lo pide RC (receta probada)

Esta receta salió del video vertical "De la cita a la venta" y es el estilo que RC aprobó. Úsala por
defecto aunque RC solo diga "edítalo como el de la cita a la venta":

1. **Gancho** al inicio (0–3.5 s) con la promesa del video en 2–4 líneas.
2. **Textos grandes**: ~35% más grandes que el tamaño base (`"text_scale": 1.35`, ya es el default
   del script). Si RC pide "más grande" o "más chico", ajusta ese valor.
3. **Secciones numeradas por clip**: un badge "01 · …", "02 · …" al inicio de cada clip.
4. **Imágenes de soporte de ~5 s** (`"duration": 5`) cuando se explica algo visual.
5. **Cierre** con CTA en los últimos ~4 s.
6. **El texto nunca tapa la cara**: revisa los cuadros y mueve `y` arriba o abajo según dónde esté
   la cabeza.

Plantilla de pedido para RC: *"Edita estos clips en vertical: gancho '…', secciones '01 …', '02 …',
imágenes de soporte de 5 s sobre …, cierre '…', textos grandes y sin taparme la cara."*

## 1. Revisa el material

```bash
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of compact CLIP.mp4
```

Haz una tira de cuadros por clip y míralos (con Read) para entender el contenido: quién habla,
qué hay en pizarrón o pantalla, dónde está la cara (para que el texto no la tape).

```bash
ffmpeg -v error -y -i CLIP.mp4 -vf "fps=6/DURACION,scale=232:-1,tile=6x1" -frames:v 1 tira.jpg
```

Copia los videos subidos a una carpeta de trabajo nueva antes de procesarlos.

## 2. Consigue el texto de lo que se dice

Los textos buenos salen de lo que la persona dice, no de adivinar. En orden de preferencia:
1. Guion o notas que dé RC.
2. Transcripción automática: `pip install faster-whisper` y modelo `small` en español con
   `word_timestamps=True`. Los modelos se bajan de Hugging Face; si la red lo bloquea, no insistas.
3. Lo visible (pizarrón, láminas). En este caso, dile a RC que los textos son inferidos y pídele
   que confirme o corrija.

## 3. Diseña la edición antes de renderizar

Piensa en el espectador que hace scroll: los primeros 2 segundos deciden si se queda.

- **Gancho** (0–3.5 s): promesa o tensión en 2–4 líneas cortas, mayúsculas. Ej. "LO QUE NADIE TE
  ENSEÑA DE VENTAS", "EL ERROR QUE TE CUESTA CITAS".
- **Secciones**: un badge numerado ("01 · CONOCE A TU CLIENTE") al inicio de cada idea o clip. Da
  estructura y sensación de avance.
- **Frases clave**: 1 cada 15–25 s, máximo ~6 palabras, en el momento exacto en que se dicen.
- **Imágenes de soporte**: cuando el tema es visual (embudos, procesos, números, comparaciones), una
  imagen de 3–5 s vale más que una frase. Ver sección 4.
- **CTA final** (últimos 4 s): guardar, compartir, comentar una palabra, agendar.
- **Barra de progreso** arriba: aumenta retención en videos de más de 40 s.
- Si el video pasa de ~60 s, ofrece además cortes de 30–45 s con lo más fuerte.

Ubica el texto donde no tape la cara: arriba (y≈0.12) si la persona está a media pantalla, abajo
(y≈0.58–0.70) si la cabeza está arriba. Verifica con los cuadros del paso 1.

Estilo por defecto de RC: cajas redondeadas negro/amarillo (#0F0F0F / #FFD600), texto blanco, fuente
Inter ExtraBold. Si pide otra marca, cambia `brand` en el plan.

## 4. Imágenes de soporte

Créalas como PNG con Pillow (o SVG convertido) a ~1000 px de ancho, fondo blanco, colores de marca:
embudos, pasos 1-2-3, antes/después, un número grande con su etiqueta, íconos simples. Mantenlas
sencillas: se ven 3–5 s en un celular, así que pocas palabras y letra grande.
Si RC sube fotos, logos o capturas, úsalas directo.

## 5. Renderiza con el script

Escribe un `plan.json` (formato completo en `references/plan.md`) y ejecuta:

```bash
python3 scripts/build_video.py ruta/plan.json
```

El script escala a 1080×1920, une con crossfade, corrige color, limpia y normaliza audio (-14 LUFS),
agrega barra de progreso, textos con fade e imágenes de soporte, y exporta MP4 H.264. Imprime la
duración final y dónde empieza cada clip.

## 6. Verifica antes de entregar

Saca 4–6 cuadros en los momentos con texto, júntalos con `hstack` y míralos. Revisa: texto legible,
no tapa la cara, barra avanza, nada se corta en los bordes. Corrige y vuelve a renderizar si algo
falla. Entrega con SendUserFile y recuerda a RC descargarlo (el entorno es temporal).

En la respuesta di qué textos pusiste y de dónde salieron (transcripción, guion o inferidos).

## Animaciones y motion graphics: HyperFrames

Para piezas animadas (intro con logo, datos que aparecen, texto cinético, video sin grabación) usa
HyperFrames de HeyGen:
- **En Claude Code** (este entorno): instala las skills locales con
  `npx skills add heygen-com/hyperframes` y usa `/hyperframes` para componer en HTML/GSAP y
  `/hyperframes-cli` para renderizar a MP4. El resultado se puede usar como clip dentro del plan.
- **En Claude.ai web/app** con el conector HyperFrames: herramienta `compose` (crea el proyecto en
  HeyGen) y `render_video`.

Combina: anima intro/cierre con HyperFrames y edita el material grabado con `build_video.py`.
