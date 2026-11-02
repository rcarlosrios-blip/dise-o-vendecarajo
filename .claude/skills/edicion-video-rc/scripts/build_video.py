#!/usr/bin/env python3
"""Arma un video vertical editado a partir de un plan JSON.

Uso:  python3 build_video.py plan.json

El plan describe clips, textos (título, badge, subtítulo, CTA), imágenes de
soporte y opciones de acabado. Ver references/plan.md para el formato completo.
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont, ImageOps

FONT_DIRS = ["/usr/share/fonts/opentype/inter", "/usr/share/fonts/truetype/dejavu"]
FONTS = {
    "black": ["Inter-ExtraBold.otf", "DejaVuSans-Bold.ttf"],
    "bold": ["Inter-Bold.otf", "DejaVuSans-Bold.ttf"],
    "regular": ["Inter-Medium.otf", "DejaVuSans.ttf"],
}


def font(weight, size):
    for name in FONTS[weight]:
        for d in FONT_DIRS:
            p = os.path.join(d, name)
            if os.path.exists(p):
                return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


def rgba(hexcolor, alpha=255):
    h = hexcolor.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def probe_duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                   "-of", "csv=p=0", path], text=True)
    return float(out.strip())


def has_audio(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "a",
                                   "-show_entries", "stream=index", "-of", "csv=p=0", path], text=True)
    return bool(out.strip())


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=fnt) <= max_w or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# Estilos de bloque: (peso, tamaño, color texto, color caja)
def styles(brand, W, scale=1.0):
    s = W / 1080 * scale
    p, d, l = brand["primary"], brand["dark"], brand["light"]
    return {
        "title": [("black", int(84 * s), d, p), ("black", int(84 * s), l, d)],
        "badge": [("black", int(64 * s), d, p), ("black", int(60 * s), l, d)],
        "caption": [("black", int(58 * s), l, d)],
        "cta": [("black", int(88 * s), d, p), ("bold", int(56 * s), l, d)],
        "bullet": [("bold", int(54 * s), l, d)],
    }


def render_text_card(ov, brand, W, H, path, scale=1.0):
    """Pila de cajas redondeadas centradas. `highlight` marca qué líneas van en color primario."""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    kind = ov["type"]
    st = styles(brand, W, scale)[kind]
    lines = ov["lines"] if isinstance(ov["lines"], list) else [ov["lines"]]
    hl = set(ov.get("highlight", [0] if kind in ("badge", "cta") else [1] if kind == "title" else []))
    y = int(ov.get("y", {"title": 0.58, "badge": 0.12, "caption": 0.70, "cta": 0.60, "bullet": 0.62}[kind]) * H)
    max_w = int(W * 0.84)
    for i, raw in enumerate(lines):
        weight, size, fg, bg = st[0] if i in hl else st[-1]
        fnt = font(weight, size)
        for txt in wrap(dr, raw, fnt, max_w):
            bb = dr.textbbox((0, 0), txt, font=fnt)
            tw, th = bb[2] - bb[0], bb[3] - bb[1]
            px, py = int(size * 0.42), int(size * 0.28)
            x = (W - tw) // 2
            dr.rounded_rectangle([x - px, y - py, x + tw + px, y + th + py + 6],
                                 radius=int(size * 0.26), fill=rgba(bg, 242))
            dr.text((x - bb[0], y - bb[1]), txt, font=fnt, fill=rgba(fg))
            y += th + 2 * py + int(size * 0.26)
    im.save(path)


def render_image_card(ov, brand, W, H, path, base_dir, scale=1.0):
    """Imagen de soporte: tarjeta con esquinas redondeadas, borde de marca y etiqueta opcional."""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    src = Image.open(os.path.join(base_dir, ov["path"])).convert("RGBA")
    w = int(W * ov.get("width", 0.78))
    src = ImageOps.contain(src, (w, int(H * ov.get("max_height", 0.40))))
    r = int(W * 0.03)
    mask = Image.new("L", src.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, *src.size], radius=r, fill=255)
    bw = max(6, int(W * 0.008))
    frame = Image.new("RGBA", (src.width + 2 * bw, src.height + 2 * bw), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rounded_rectangle([0, 0, *frame.size], radius=r + bw, fill=rgba(brand["primary"]))
    frame.paste(src, (bw, bw), mask)
    x = (W - frame.width) // 2
    y = int(ov.get("y", 0.16) * H)
    im.alpha_composite(frame, (x, y))
    if ov.get("label"):
        lab = {"type": "caption", "lines": [ov["label"]], "y": (y + frame.height + W * 0.03) / H}
        tmp = path + ".label.png"
        render_text_card(lab, brand, W, H, tmp, scale)
        im.alpha_composite(Image.open(tmp))
        os.remove(tmp)
    im.save(path)


def main(plan_path):
    plan = json.load(open(plan_path))
    base = os.path.dirname(os.path.abspath(plan_path))
    W, H = plan.get("size", [1080, 1920])
    fps = plan.get("fps", 30)
    xf = plan.get("crossfade", 0.4)
    brand = {"primary": "#FFD600", "dark": "#0F0F0F", "light": "#FFFFFF", **plan.get("brand", {})}
    # RC prefiere textos ~35% más grandes que el tamaño base: 1.35 por defecto
    scale = plan.get("text_scale", 1.35)
    work = tempfile.mkdtemp(prefix="vid_")

    clips = []
    for c in plan["clips"]:
        p = os.path.join(base, c["path"])
        a = c.get("in", 0)
        b = c.get("out") or probe_duration(p)
        clips.append((p, a, b - a))

    args = ["ffmpeg", "-v", "error", "-y"]
    for p, a, d in clips:
        args += ["-ss", str(a), "-t", str(d), "-i", p]
    n = len(clips)

    look = plan.get("look", "eq=contrast=1.06:saturation=1.12:brightness=0.01,unsharp=5:5:0.5")
    vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={fps},"
          f"{look + ',' if look else ''}settb=AVTB,format=yuv420p")
    f = [f"[{i}:v]{vf}[v{i}]" for i in range(n)]
    for i, (p, _, d) in enumerate(clips):
        if has_audio(p):
            f.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo[a{i}]")
        else:
            f.append(f"anullsrc=r=48000:cl=stereo,atrim=0:{d}[a{i}]")

    # Uniones con crossfade; `starts` guarda dónde arranca cada clip en el video final
    total, starts, vlab, alab = clips[0][2], [0.0], "v0", "a0"
    for i in range(1, n):
        off = total - xf
        starts.append(off)
        f.append(f"[{vlab}][v{i}]xfade=transition=fade:duration={xf}:offset={off:.3f}[xv{i}]")
        f.append(f"[{alab}][a{i}]acrossfade=d={xf}[xa{i}]")
        vlab, alab = f"xv{i}", f"xa{i}"
        total = off + clips[i][2]

    music = plan.get("music")
    afx = "highpass=f=80,afftdn=nf=-25," if plan.get("clean_audio", True) else ""
    f.append(f"[{alab}]{afx}loudnorm=I=-14:TP=-1.5:LRA=11[voice]")
    extra_inputs = []
    if music:
        extra_inputs += ["-stream_loop", "-1", "-i", os.path.join(base, music["path"])]
        mi = n
        vol = music.get("volume", 0.12)
        f.append(f"[{mi}:a]atrim=0:{total:.3f},volume={vol},afade=t=out:st={total - 2:.3f}:d=2[mus]")
        f.append("[voice][mus]amix=inputs=2:duration=first:normalize=0[aout]")
    else:
        f.append("[voice]anull[aout]")

    cur = vlab
    if plan.get("progress_bar", True):
        bh = max(8, H // 137)
        f.append(f"color=c={brand['primary'].replace('#', '0x')}:s={W}x{bh}:r={fps}:d={total:.3f}[bar]")
        f.append(f"[{cur}]drawbox=x=0:y=0:w=iw:h={bh}:color=black@0.45:t=fill[bbg]")
        f.append(f"[bbg][bar]overlay=x='-W+W*t/{total:.3f}':y=0:shortest=1[pb]")
        cur = "pb"

    # Overlays: el tiempo puede ser absoluto o relativo a un clip ("clip": índice desde 1)
    ov_inputs = []
    idx = n + (1 if music else 0)
    for k, ov in enumerate(plan.get("overlays", [])):
        off = starts[ov["clip"] - 1] if "clip" in ov else 0
        s = off + ov["start"]
        if ov.get("end") == "end":
            e = total
        elif "end" in ov:
            e = off + ov["end"]
        else:
            e = s + ov.get("duration", 3.5)
        e = min(e, total)
        png = os.path.join(work, f"ov{k}.png")
        if ov["type"] == "image":
            render_image_card(ov, brand, W, H, png, base, scale)
        else:
            render_text_card(ov, brand, W, H, png, scale)
        d = e - s
        fd = min(0.3, d / 3)
        ov_inputs += ["-loop", "1", "-t", f"{d:.3f}", "-i", png]
        f.append(f"[{idx}:v]format=rgba,fade=in:st=0:d={fd}:alpha=1,fade=out:st={d - fd:.3f}:d={fd}:alpha=1,"
                 f"setpts=PTS+{s:.3f}/TB[o{k}]")
        f.append(f"[{cur}][o{k}]overlay=0:0:eof_action=pass[c{k}]")
        cur = f"c{k}"
        idx += 1

    out = os.path.join(base, plan.get("output", "video_editado.mp4"))
    args += extra_inputs + ov_inputs + ["-filter_complex", ";".join(f), "-map", f"[{cur}]", "-map", "[aout]",
                                        "-c:v", "libx264", "-preset", "medium", "-crf", str(plan.get("crf", 22)),
                                        "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)
    print(json.dumps({"output": out, "duration": round(total, 2),
                      "clip_starts": [round(x, 2) for x in starts]}, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1])
