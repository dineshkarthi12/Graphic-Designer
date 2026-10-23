"""
Build the animated hero's image assets from design/hero/source.png.

Outputs (public/hero/):
  bg.webp        the scene with the animated floating islands painted out
  islands.png    the islands, cut out, packed side by side (RGBA)
  data.png       R = depth (0 far … 1 near), G = glow halo around the light rails and portal frames,
                 B = waterfall mask
  static.webp    still frame for no-WebGL / reduced motion (scene + glass core in the portal)
  src/three/heroLayout.json  island boxes and atlas positions, read by the hero shader

Run:  python design/hero/build_hero_assets.py   (needs numpy, pillow, opencv-python-headless, scipy)
All coordinates below are pixels in the 1672×941 source image.
"""

import json
import os

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'public', 'hero')
os.makedirs(OUT, exist_ok=True)

src = np.array(Image.open(os.path.join(HERE, 'source.png')).convert('RGB'))
H, W = src.shape[:2]

# ───────────────────────────── islands (crop box, depth for parallax)
ISLANDS = [
    {'id': 'tr_big', 'box': (1318, 52, 1462, 248), 'depth': 0.55},
    {'id': 'tr_small', 'box': (1514, 164, 1592, 242), 'depth': 0.35},
    {'id': 'tr_tiny', 'box': (1448, 230, 1498, 286), 'depth': 0.3},
    {'id': 'tl', 'box': (290, 104, 404, 246), 'depth': 0.5},
    {'id': 'left_small', 'box': (28, 318, 92, 392), 'depth': 0.35},
    {'id': 'center_r', 'box': (1104, 200, 1190, 306), 'depth': 0.4},
]


def island_mask(crop):
    """Flood-fill the sky from the crop border; whatever the sky can't reach is the island."""
    blur = cv2.GaussianBlur(crop, (3, 3), 0)
    h, w = crop.shape[:2]
    filled = np.zeros((h + 2, w + 2), np.uint8)
    flags = 4 | cv2.FLOODFILL_MASK_ONLY | (255 << 8)
    seeds = [(x, 0) for x in range(0, w, 3)] + [(x, h - 1) for x in range(0, w, 3)]
    seeds += [(0, y) for y in range(0, h, 3)] + [(w - 1, y) for y in range(0, h, 3)]
    for sx, sy in seeds:
        if filled[sy + 1, sx + 1] == 0:
            cv2.floodFill(blur, filled, (sx, sy), 0, (7, 7, 7), (7, 7, 7), flags)
    island = filled[1:-1, 1:-1] == 0
    # Keep the main body plus small pieces (drips) close to it.
    lab, n = ndimage.label(island)
    if n == 0:
        return island
    sizes = ndimage.sum(island, lab, range(1, n + 1))
    main = int(np.argmax(sizes)) + 1
    ys, xs = np.nonzero(lab == main)
    x_lo, x_hi, y_mid = xs.min(), xs.max(), (ys.min() + ys.max()) / 2
    near = ndimage.binary_dilation(lab == main, iterations=14)
    keep = np.zeros_like(island)
    for i in range(1, n + 1):
        if i == main:
            keep |= lab == i
            continue
        # Drips: small pieces hanging below the island, inside its width.
        cy, cx = ndimage.center_of_mass(lab == i)
        if 4 <= sizes[i - 1] <= 120 and x_lo <= cx <= x_hi and cy > y_mid and (near & (lab == i)).any():
            keep |= lab == i
    keep = ndimage.binary_fill_holes(keep)
    return keep


bg = src.copy()
atlas_tiles = []
layout = {'width': W, 'height': H, 'islands': []}
x_cursor = 0
for isl in ISLANDS:
    x0, y0, x1, y1 = isl['box']
    crop = src[y0:y1, x0:x1]
    m = island_mask(crop)
    # Soft alpha edge.
    alpha = cv2.GaussianBlur((m * 255).astype(np.uint8), (3, 3), 0)
    rgba = np.dstack([crop, alpha])
    atlas_tiles.append(rgba)
    # Paint the island out of the background (dilate so no halo is left behind).
    hole = ndimage.binary_dilation(m, iterations=4).astype(np.uint8) * 255
    region = bg[max(0, y0 - 12):y1 + 12, max(0, x0 - 12):x1 + 12].copy()
    full_hole = np.zeros(region.shape[:2], np.uint8)
    oy, ox = y0 - max(0, y0 - 12), x0 - max(0, x0 - 12)
    full_hole[oy:oy + hole.shape[0], ox:ox + hole.shape[1]] = hole
    region = cv2.inpaint(region, full_hole, 9, cv2.INPAINT_TELEA)
    bg[max(0, y0 - 12):y1 + 12, max(0, x0 - 12):x1 + 12] = region
    layout['islands'].append({
        'id': isl['id'], 'x': x0, 'y': y0, 'w': x1 - x0, 'h': y1 - y0,
        'ax': x_cursor, 'depth': isl['depth'],
    })
    x_cursor += (x1 - x0) + 4

atlas_h = max(t.shape[0] for t in atlas_tiles)
atlas = np.zeros((atlas_h, x_cursor, 4), np.uint8)
for isl, tile in zip(layout['islands'], atlas_tiles):
    atlas[:tile.shape[0], isl['ax']:isl['ax'] + tile.shape[1]] = tile
layout['atlas'] = {'w': x_cursor, 'h': atlas_h}

# ───────────────────────────── depth map (hand-built from the composition)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
u, v = xx / W, yy / H
depth = np.clip((v - 0.52) / 0.48, 0, 1) ** 1.2 * 0.85 + 0.05          # road and foreground come forward
depth = np.maximum(depth, 0.18 * np.clip((v - 0.3) / 0.3, 0, 1))      # mountains / horizon band
edge = np.clip((np.abs(u - 0.5) - 0.32) / 0.18, 0, 1) * np.clip((v - 0.45) / 0.25, 0, 1)
depth = np.maximum(depth, 0.72 * edge)                                  # foreground cliffs left and right


def rect(a, x0, y0, x1, y1, val):
    a[y0:y1, x0:x1] = np.maximum(a[y0:y1, x0:x1], val)


rect(depth, 545, 85, 1048, 595, 0.48)      # main portal frame
depth[160:590, 655:985] = 0.12             # …its opening shows the far world
rect(depth, 452, 222, 525, 570, 0.42)      # left pillar
rect(depth, 1058, 332, 1118, 572, 0.4)     # right pillar
rect(depth, 732, 398, 902, 565, 0.3)       # small centre portal
rect(depth, 1168, 428, 1282, 590, 0.34)    # small right portal
depth = cv2.GaussianBlur(depth, (0, 0), 9)

# ───────────────────────────── glow mask (light rails, reflections, portal frames)
hsv = cv2.cvtColor(src, cv2.COLOR_RGB2HSV).astype(np.float32)
val = hsv[..., 2] / 255
sat = hsv[..., 1] / 255
r, g, b = [src[..., i].astype(np.float32) / 255 for i in range(3)]
warm = np.clip((r - b) * 3 + 0.3, 0, 1)
bright = np.clip((val - 0.82) / 0.15, 0, 1)
# Road, rails and their reflections: everything below the outer light rails (clouds above them are excluded).
rail_x = np.array([0, 300, 620, 830, 1000, 1300, 1672], np.float32)
rail_y = np.array([790, 705, 600, 568, 568, 640, 730], np.float32)
line = np.interp(np.arange(W), rail_x, rail_y)
region = (yy >= line[None, :]).astype(np.float32)
ring = np.zeros((H, W), np.float32)
ring[80:600, 540:1052] = 1
ring[175:575, 670:970] = 0                        # main portal frame band only
region = np.maximum(region, ring)
region[395:570, 728:906] = 1                      # small portals
region[425:595, 1164:1286] = 1
glow = bright * (0.35 + 0.65 * warm) * region
glow = np.maximum(glow, cv2.GaussianBlur(glow, (0, 0), 6) * 1.6)  # soft halo around each line
glow = np.clip(glow, 0, 1)

# ───────────────────────────── waterfall mask
falls = np.zeros((H, W), np.float32)
for (x0, y0, x1, y1) in [(140, 236, 245, 535), (1432, 436, 1472, 565), (196, 244, 236, 520)]:
    sub = np.clip((val[y0:y1, x0:x1] - 0.72) / 0.2, 0, 1) * np.clip((0.28 - sat[y0:y1, x0:x1]) / 0.2, 0, 1)
    falls[y0:y1, x0:x1] = np.maximum(falls[y0:y1, x0:x1], sub)
falls = cv2.GaussianBlur(falls, (0, 0), 1.2)

data = np.dstack([depth, glow, falls])
data = (np.clip(data, 0, 1) * 255).astype(np.uint8)

Image.fromarray(bg).save(os.path.join(OUT, 'bg.webp'), 'WEBP', quality=88, method=6)
Image.fromarray(atlas, 'RGBA').save(os.path.join(OUT, 'islands.png'), optimize=True)
Image.fromarray(data).resize((W // 2, H // 2), Image.BILINEAR).save(os.path.join(OUT, 'data.png'), optimize=True)
with open(os.path.join(ROOT, 'src', 'three', 'heroLayout.json'), 'w') as f:
    json.dump(layout, f, indent=2)
print('wrote', OUT, layout['atlas'])
