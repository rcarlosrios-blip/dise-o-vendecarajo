# Formato del plan (plan.json) para `scripts/build_video.py`

Las rutas son relativas a la carpeta donde está el plan. Pon el plan, los clips y las imágenes juntos.

```json
{
  "output": "video_editado.mp4",
  "size": [1080, 1920],            // vertical por defecto; [1080,1080] cuadrado, [1920,1080] horizontal
  "fps": 30,
  "crossfade": 0.4,                // segundos de transición entre clips; 0 para corte seco
  "progress_bar": true,
  "clean_audio": true,             // filtro de ruido + highpass; loudnorm a -14 LUFS siempre
  "look": "eq=contrast=1.06:saturation=1.12:brightness=0.01,unsharp=5:5:0.5",  // "" para no tocar color
  "crf": 22,
  "text_scale": 1.35,              // tamaño de los textos; 1.35 = ~35% más grande que el base (preferencia de RC)
  "brand": {"primary": "#FFD600", "dark": "#0F0F0F", "light": "#FFFFFF"},
  "music": {"path": "musica.mp3", "volume": 0.12},   // opcional
  "clips": [
    {"path": "clip1.mp4"},                       // completo
    {"path": "clip2.mp4", "in": 4.5, "out": 21}  // recorte en segundos del clip original
  ],
  "overlays": [ ... ]
}
```

## Overlays

Tiempo: con `"clip": N` (desde 1), `start`/`end` son relativos al inicio de ese clip en el video final
(el script calcula los crossfades). Sin `clip`, son absolutos. Usa `"duration"` en vez de `end`
(por defecto 3.5 s) o `"end": "end"` para llegar al final del video.

`y` es la posición vertical como fracción de la altura (0 = arriba, 1 = abajo).

| type | para qué | lines | defaults |
|---|---|---|---|
| `title` | gancho de apertura, 2–4 líneas cortas | lista | y 0.58; línea 1 resaltada (`highlight`) |
| `badge` | número + nombre de sección | `["01","TEXTO"]` | y 0.12; línea 0 resaltada |
| `caption` | frase clave / subtítulo | 1 frase (se ajusta sola) | y 0.70 |
| `bullet` | dato o lista breve | lista | y 0.62 |
| `cta` | cierre | `["¿TE SIRVIÓ?","Guárdalo…"]` | y 0.60; línea 0 resaltada |
| `image` | imagen de soporte | — | `path`, `width` 0.78, `max_height` 0.40, y 0.16, `label` opcional |

`highlight`: lista de índices de línea que van en caja amarilla (color primario) con texto oscuro;
las demás van en caja oscura con texto claro.

## Ejemplo

```json
{"clips":[{"path":"c1.mp4"},{"path":"c2.mp4","out":30}],
 "overlays":[
  {"type":"title","clip":1,"start":0.2,"duration":3.5,"lines":["LO QUE NADIE","TE ENSEÑA","DE VENTAS"]},
  {"type":"badge","clip":1,"start":4,"lines":["01","CONOCE A TU CLIENTE"]},
  {"type":"image","clip":2,"start":2,"duration":4,"path":"embudo.png","label":"Así se ve tu embudo"},
  {"type":"caption","clip":2,"start":8,"duration":2.5,"lines":["Sin citas no hay cierres"]},
  {"type":"cta","clip":2,"start":25.5,"end":"end","lines":["¿TE SIRVIÓ?","Guárdalo y compártelo"]}
 ]}
```

Para el CTA final: `start` = duración del último clip − 4.5, con `"clip"` del último clip y `"end": "end"`.
