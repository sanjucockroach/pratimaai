"""Prepare lossless web derivatives from the PRATIMA AI supplied logo."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Logo.png"
OUTPUT = ROOT / "public" / "assets" / "pratima-lockup-transparent.png"
POSTER = ROOT / "public" / "assets" / "hero-poster.png"
SOCIAL = ROOT / "public" / "assets" / "og-pratima.png"

image = Image.open(SOURCE).convert("RGBA")
pixels = image.load()

for y in range(image.height):
    for x in range(image.width):
        red, green, blue, _ = pixels[x, y]
        minimum = min(red, green, blue)
        if minimum >= 250:
            pixels[x, y] = (red, green, blue, 0)
        elif minimum >= 238:
            alpha = round((250 - minimum) / 12 * 255)
            pixels[x, y] = (red, green, blue, alpha)

bounds = image.getbbox()
if bounds is None:
    raise RuntimeError("The supplied logo contains no visible artwork.")

padding = 24
left = max(0, bounds[0] - padding)
top = max(0, bounds[1] - padding)
right = min(image.width, bounds[2] + padding)
bottom = min(image.height, bounds[3] + padding)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
lockup = image.crop((left, top, right, bottom))
lockup.save(OUTPUT, optimize=True)

social = Image.open(POSTER).convert("RGBA")
target_width = 500
target_height = round(lockup.height * target_width / lockup.width)
social_lockup = lockup.resize((target_width, target_height), Image.Resampling.LANCZOS)
social.alpha_composite(social_lockup, (56, (social.height - target_height) // 2))
social.convert("RGB").save(SOCIAL, optimize=True)
