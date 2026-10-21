# Dinesh Kumar — Graphic Designer & Video Editor

Portfolio site. Static HTML, CSS and JavaScript: no framework and no build step.
Animation uses GSAP 3.12.5 + ScrollTrigger and Lenis smooth scroll, loaded from a CDN.

```
index.html              home page (one page, nine sections)
projects/*.html         project write-ups (hidden until published)
css/style.css           all shared styles
css/case.css            project page layout
js/data.js              ALL content: text, links, images, videos  ← edit this
js/common.js            header, menus, footer, smooth scroll, media helpers
js/home.js              home page rendering and interactions
js/case.js              project page template
assets/                 favicon, Open Graph image, your work files
```

Every word, link, image and video on the site comes from `js/data.js`.
Anything written as `[TODO: …]` is a note to you and is never shown on the site.

## Run it locally

Any static server works, for example:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open http://localhost:3000 (or :8080).

## Adding your work

Every creative and video is one entry in `js/data.js`, in the `creatives` or
`videos` list. Each entry has these fields:

| field | what it is |
| --- | --- |
| `id` | unique, lowercase, no spaces (`cr-07`, `vd-03`) |
| `title` | short name shown under the piece |
| `category` | creatives: `social`, `branding`, `ads`, `decks`, `illustration`<br>videos: `reel`, `promo`, `demo`, `motion` |
| `type` | `"image"` or `"video"` |
| `src` | the file — see the three options below |
| `poster` | preview image (videos), or a smaller preview (images, optional) |
| `alt` | one sentence on what the piece shows, for screen readers |
| `aspect` | width:height of the file, e.g. `"4:5"`, `"1:1"`, `"9:16"`, `"16:9"`, `"1200:628"` |
| `featured` | creatives only: `true` also puts it in the hero collage (needs at least 3) |

`src` and `poster` accept three forms:

```js
src: "assets/work/creatives/social-01.webp"   // a file in this repo (preferred: fastest)
src: "drive:1AbCdEfGh..."                      // a Google Drive file ID
src: "youtube:dQw4w9WgXcQ"                     // a YouTube video ID (videos only)
```

To add more, copy an existing entry, give it a new `id` and fill it in.
When all your real files are in, set `showPlaceholders: false` so any
empty entries disappear instead of showing a grey "add file" tile.

### Option A — local files (recommended)

Put files here:

```
assets/work/creatives/   images (webp)
assets/work/videos/      videos (mp4)
assets/work/posters/     video poster images (webp)
```

**Images:** WebP, at most **1600 px wide**, ideally under 300 KB.
Recommended export sizes:

| type | size |
| --- | --- |
| Social post | 1080×1350 (4:5) or 1080×1080 (1:1) |
| Story / reel cover | 1080×1920 (9:16) |
| Banner / display ad | 1200×628 or your real ad size |
| Pitch deck slide | 1600×900 (16:9) |
| Logo / icon set | 1200×1200 (1:1) |

Convert to WebP (pick one):

```bash
# cwebp (brew install webp / apt install webp)
cwebp -q 82 -resize 1600 0 input.png -o assets/work/creatives/social-01.webp

# ImageMagick
magick input.jpg -resize '1600x1600>' -quality 82 assets/work/creatives/social-01.webp

# a whole folder with ImageMagick
magick mogrify -path assets/work/creatives -format webp -resize '1600x1600>' -quality 82 exports/*.png
```

No command line? https://squoosh.app → WebP, quality 80, resize to 1600 wide.
Photoshop: File → Export → Export As → WebP.

**Videos:** H.264 MP4, **under 8 MB**, with a poster image. Reels 1080×1920
(or 720×1280), others 1920×1080 (or 1280×720). With ffmpeg:

```bash
# compress to H.264, 720p, web-ready (raise -crf to make it smaller)
ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 128k -movflags +faststart assets/work/videos/demo-01.mp4

# vertical reel: scale=720:-2 instead of scale=-2:720

# poster from the frame at 2 seconds
ffmpeg -ss 2 -i assets/work/videos/demo-01.mp4 -frames:v 1 -vf "scale=1600:-2" assets/work/posters/demo-01.webp
```

Videos never autoplay. Only the poster loads; the video loads when someone presses play.

**Silent hero loop (optional):** a 6–15 second, muted, looping clip from your
showreel, under 5 MB, saved as `assets/work/videos/hero-loop.mp4`, set as
`showreel.heroVideo`. Add `showreel.poster` too; that still is what visitors
with "reduce motion" switched on see. Without a loop the hero shows a collage
of your `featured` creatives (or abstract artboards until you have three).

```bash
ffmpeg -ss 5 -t 12 -i showreel.mp4 -an -vf "scale=-2:720" -c:v libx264 -crf 28 -movflags +faststart assets/work/videos/hero-loop.mp4
```

### Option B — Google Drive

Good for large videos you don't want in the repo. Slower than local files.

1. In Google Drive, right-click the file → **Share** → **Share**.
2. Under **General access**, choose **Anyone with the link**, role **Viewer**. Click **Done**.
3. Right-click → **Share** → **Copy link**. The link looks like
   `https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing`
4. The **FILE_ID** is the part between `/d/` and `/view`: `1AbCdEfGhIjKlMnOp`.
5. In `data.js`: `src: "drive:1AbCdEfGhIjKlMnOp"`.

The site turns that into
`https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600` for images and an
embedded player `https://drive.google.com/file/d/FILE_ID/preview` for videos.
For Drive videos you can leave `poster` empty; Drive's thumbnail is used.

Each file must be shared individually (sharing the folder alone is not enough
for the thumbnail link to work reliably). Drive can rate-limit thumbnails on a
busy site, which is why local files are preferred for images.

### Showreel

Set `showreel.src` in `data.js` (local mp4, `drive:FILE_ID` or `youtube:VIDEO_ID`)
and `showreel.poster`. A "Play showreel" button appears in the hero and a large
player at the top of Reels & Motion. While `src` is empty both stay hidden.

## Project pages

`projects/social-campaign.html`, `brand-identity.html` and `product-video.html`
use one template filled from `projects` in `data.js`. While `published: false`
they are hidden from the navigation, marked `noindex`, and show an "in
progress" note. To preview the full layout, add `?preview` to the URL, e.g.
`/projects/social-campaign.html?preview`.

To publish one: fill in its text, pick its `media` (ids from `creatives` and
`videos`), add a `cover` image (1600×1000 webp), then set `published: true`.
A "Projects" menu appears in the header automatically. Only use real facts —
leave `results` empty rather than guessing numbers.

## Deploy on Vercel

1. Push this repo to GitHub (already done: `dineshkarthi12/Graphic-Designer`).
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: **Other**. Leave build command and output directory **empty**.
4. Click **Deploy**. Every push to `main` redeploys automatically.
5. After the first deploy, copy your address (e.g. `https://graphic-designer.vercel.app`)
   and make the Open Graph tags in `index.html` absolute:
   `og:url` → your address, `og:image` and `twitter:image` →
   `https://<your address>/assets/og-image.jpg`. This makes link previews work
   on LinkedIn and WhatsApp.
6. Optional: Project → Settings → Domains to add your own domain.

`vercel.json` sets long cache headers for `assets/` and short ones for CSS/JS.
After changing CSS or JS, bump the `?v=` number on the `<link>`/`<script>` tags
in the HTML files so visitors get the new version.

## Accessibility and performance notes

- Visitors with "reduce motion" get a still page: no smooth scroll, no drifting
  collage, no pinned sections, no background video.
- Every image has `width`/`height` and an aspect-ratio box, so nothing shifts while loading.
- Images below the hero load lazily; videos load only on click.
- The lightbox works with the keyboard: Enter opens, ← → browse, Esc closes,
  Tab stays inside, focus returns to the tile you opened.
