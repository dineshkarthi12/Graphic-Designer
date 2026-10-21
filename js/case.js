/* Project pages: one template, filled from data.js by body[data-project]. */
(function () {
  "use strict";

  const { S, esc, rich, stripTodo, pad2, icons, motion } = DK;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const slug = document.body.dataset.project;
  const index = S.projects.findIndex((p) => p.slug === slug);
  const p = S.projects[index];
  const preview = new URLSearchParams(location.search).has("preview");
  const name = stripTodo(p.name) || p.category;

  // Unpublished projects stay out of search results.
  if (!p.published) {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.append(m);
  }
  document.title = `${name} · ${S.person.name}`;

  if (!p.published && !preview) {
    $("#main").innerHTML = `
      <section class="cs-draft" id="top" aria-labelledby="cs-title">
        <div class="wrap">
          <div class="sheet__meta">
            <span class="mono sheet__no"><i class="sheet__tick" aria-hidden="true"></i>Project</span>
            <span class="label">${esc(p.category)}</span>
            <span class="label">In progress</span>
          </div>
          <h1 class="h2" id="cs-title">This write-up is still being drawn up.</h1>
          <p>The work itself is on the home page and in the Google Drive archive.</p>
          <div class="scene__actions">
            <a class="btn btn--solid" href="../index.html#creatives">See the work ${icons.arrow}</a>
            <a class="btn" href="${esc(S.links.drive)}" ${DK.ext}>Open the Drive archive${DK.newTab}</a>
          </div>
        </div>
      </section>`;
    DK.renderFooter();
    return;
  }

  const published = S.projects.filter((x) => x.published || preview);
  const pos = published.indexOf(p);
  const next = published.length > 1 ? published[(pos + 1) % published.length] : null;
  const all = [...S.creatives, ...S.videos];
  const items = p.media.map((id) => all.find((m) => m.id === id)).filter(Boolean).filter((m) => DK.hasFile(m) || S.showPlaceholders);

  // Skip anything that is empty once draft notes are removed.
  const paras = (list) => (list || []).map(stripTodo).filter(Boolean).map((t) => `<p>${esc(t)}</p>`).join("");

  const section = (no, id, title, inner, cls = "") => `
    <section class="cs-sec ${cls}" id="${id}" aria-labelledby="${id}-h">
      <div class="wrap grid">
        <header class="cs-sec__head">
          <span class="mono cs-sec__no">${no}</span>
          <h2 class="cs-sec__title" id="${id}-h">${esc(title)}</h2>
        </header>
        ${inner}
      </div>
    </section>`;

  const metaRow = [
    ["Role", p.meta.role],
    ["Client", p.meta.client],
    ["Timeline", p.meta.timeline],
    ["Deliverables", p.meta.deliverables],
    ["Tools", p.meta.tools]
  ].filter(([, v]) => stripTodo(v))
    .map(([k, v]) => `<div class="cs-meta__item"><dt class="label">${k}</dt><dd>${rich(v)}</dd></div>`).join("");

  const results = (p.results || []).filter((r) => stripTodo(r.label)).map((r) => {
    const value = r.text
      ? `<span class="cs-result__num">${esc(r.text)}</span>`
      : `<span class="cs-result__num" data-count="${r.value}" data-prefix="${esc(r.prefix || "")}" data-suffix="${esc(r.suffix || "")}">${esc(r.prefix || "")}${r.value}${esc(r.suffix || "")}</span>`;
    return `<li class="cs-result">${value}<span class="mono cs-result__label">${rich(r.label)}</span></li>`;
  }).join("");

  const coverItem = { src: p.cover, aspect: "16:10", title: name, alt: `${name}, cover` };
  const mediaGrid = items.map((m, i) => {
    const title = stripTodo(m.title) || (m.type === "video" ? "Video" : "Creative");
    const vertical = DK.parseAspect(m.aspect).ratio > 1;
    const playable = m.type === "video" && DK.hasFile(m);
    return `
      <figure class="cs-media__item ${vertical ? "cs-media__item--v" : ""}">
        <div class="reel__media" style="aspect-ratio:${DK.parseAspect(m.aspect).css}">
          ${DK.mediaImg(m, { poster: m.type === "video", full: true, label: title })}
          ${playable ? `<button class="reel__play" type="button" data-play="${i}"><span class="reel__play-icon">${icons.play}</span><span class="sr-only">Play ${esc(title)}</span></button>` : ""}
        </div>
        <figcaption class="figcap mono"><span>Fig. ${pad2(index + 1)}.${i + 1} — ${esc(title)}</span></figcaption>
      </figure>`;
  }).join("");

  $("#main").innerHTML = `
    <section class="cs-cover" id="top" aria-labelledby="cs-title">
      <div class="wrap">
        <div class="sheet__meta">
          <span class="mono sheet__no"><i class="sheet__tick" aria-hidden="true"></i>Project ${pad2(index + 1)} / ${pad2(S.projects.length)}</span>
          <span class="label">${esc(p.category)}</span>
          <span class="label">Sheet P-${pad2(index + 1)}</span>
        </div>
        <div class="grid cs-cover__grid">
          <div class="cs-cover__text">
            <p class="label">${esc(p.category)}</p>
            <h1 class="display cs-title" id="cs-title">${esc(name)}</h1>
            ${stripTodo(p.summary) ? `<p class="lead cs-summary">${rich(p.summary)}</p>` : ""}
          </div>
        </div>
        <div class="cs-cover__stage">
          <div class="cs-cover__img">${DK.mediaImg(coverItem, { eager: true, label: name })}</div>
        </div>
        ${metaRow ? `<dl class="cs-meta">${metaRow}</dl>` : ""}
      </div>
    </section>

    ${paras(p.brief) ? section("01", "brief", "The brief", `<div class="cs-sec__body lead">${paras(p.brief)}</div>`) : ""}
    ${paras(p.approach) ? section("02", "approach", "Approach", `<div class="cs-sec__body">${paras(p.approach)}</div>`) : ""}
    ${mediaGrid ? section("03", "deliverables", "Deliverables", `<div class="cs-media">${mediaGrid}</div>`) : ""}
    ${results ? section("04", "results", "Results", `<ul class="cs-results">${results}</ul>`) : ""}
    ${paras(p.learned) ? section("05", "learned", "What I learned", `<div class="cs-sec__body lead">${paras(p.learned)}</div>`) : ""}

    <nav class="cs-next" aria-label="More work">
      <div class="wrap">
        ${next ? `
        <a class="cs-next__link" href="${next.slug}.html${preview && !next.published ? "?preview" : ""}">
          <span class="label">Next project</span>
          <span class="display cs-next__name">${rich(next.name) || esc(next.category)} ${icons.arrow}</span>
          <span class="label">${esc(next.category)}</span>
        </a>` : ""}
        <div class="cs-next__back">
          <a class="text-link" href="../index.html#creatives">← Back to all work</a>
          <a class="text-link" href="../index.html#contact">Get in touch</a>
        </div>
      </div>
    </nav>`;

  DK.renderFooter();

  /* ---------- videos: poster first, player on click ---------- */

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play]");
    if (!b) return;
    const box = b.closest(".reel__media");
    box.innerHTML = DK.playerHTML(items[+b.dataset.play]);
    box.classList.add("is-playing");
    const el = box.firstElementChild;
    if (el) { el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); if (el.tagName === "VIDEO") el.play().catch(() => {}); }
  });

  /* ---------- counters & motion ---------- */

  $$("[data-count]").forEach((el) =>
    DK.countUp(el, +el.dataset.count, { prefix: el.dataset.prefix, suffix: el.dataset.suffix }));

  if (motion) {
    gsap.fromTo(".cs-cover__img",
      { rotateX: 32, rotateZ: -7, scale: 0.9, y: 40, transformPerspective: 1600 },
      {
        rotateX: 0, rotateZ: 0, scale: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: ".cs-cover__stage", start: "top 95%", end: "center 55%", scrub: 0.6 }
      });
    gsap.from(".cs-cover__text > *", { y: 32, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.08, delay: 0.1 });
    $$(".cs-sec__head, .cs-sec__body, .cs-media__item, .cs-results").forEach((el) => el.classList.add("reveal"));
    DK.initReveals();
  }

  DK.scrollToHash();
})();
