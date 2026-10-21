/* Home page: renders content from data.js, then wires up the interactions and scroll scenes. */
(function () {
  "use strict";

  const { S, esc, rich, stripTodo, pad2, icons, ext, newTab, motion } = DK;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  // Pinned scroll scenes only make sense on wide, landscape screens. Tall
  // viewports (portrait tablets, phones in "desktop site" mode) get the
  // stacked layout instead, or the pin leaves a screen of empty space.
  const PIN_QUERY = "(min-width: 900px) and (min-aspect-ratio: 5/4)";
  const NOPIN_QUERY = "(max-width: 899px), (max-aspect-ratio: 249/200)";

  const catName = (id) => (S.categories.find((c) => c.id === id) || {}).name || id;
  const creatives = DK.visible(S.creatives);
  const videos = DK.visible(S.videos);
  const showreel = stripTodo(S.showreel.src) ? S.showreel : null;

  /* ======================================================================
     Render
     ====================================================================== */

  function bindText() {
    $$("[data-bind]").forEach((el) => {
      const val = el.dataset.bind.split(".").reduce((o, k) => (o ? o[k] : undefined), S);
      if (val != null) el.textContent = stripTodo(val);
    });
    $$(".js-resume").forEach((a) => (a.href = S.links.resume));
    $$(".js-drive").forEach((a) => (a.href = S.links.drive));
    $$(".js-ux").forEach((a) => (a.href = S.links.uxPortfolio));
    $$(".js-showreel").forEach((b) => (b.hidden = !showreel));
  }

  /* --- hero wall: real creatives when there are enough, otherwise artboards --- */

  const ARTBOARDS = [
    { aspect: "4:5", label: "Social post · 1080×1350", v: 1 },
    { aspect: "9:16", label: "Reel · 1080×1920", v: 2 },
    { aspect: "1:1", label: "Logo · 1:1", v: 3 },
    { aspect: "1200:628", label: "Display ad · 1200×628", v: 4 },
    { aspect: "16:9", label: "Pitch deck · 1920×1080", v: 5 },
    { aspect: "1:1", label: "Icon set · 1:1", v: 6 },
    { aspect: "9:16", label: "Story · 1080×1920", v: 7 },
    { aspect: "4:5", label: "Carousel · 1080×1350", v: 8 }
  ];

  function artboardHTML(a, n) {
    return `<div class="art art--${a.v}" style="aspect-ratio:${DK.parseAspect(a.aspect).css}">
      <span class="art__label">Art. ${pad2(n)} — ${esc(a.label)}</span>
      <span class="art__body"><i></i><i></i><i></i><i></i></span>
      <span class="art__crop"></span>
    </div>`;
  }

  function renderHeroWall() {
    const wall = $(".hero__wall");
    const real = creatives.filter((c) => c.featured && DK.hasFile(c));
    const useReal = real.length >= 3;
    const COLS = 6;
    const PER = 4;
    const tile = (c, j) => {
      if (useReal) {
        const item = real[(c * PER + j) % real.length];
        return `<div class="art art--img" style="aspect-ratio:${DK.parseAspect(item.aspect).css}">${DK.mediaImg(item, { alt: "", eager: j < 2 })}</div>`;
      }
      return artboardHTML(ARTBOARDS[(c * 3 + j) % ARTBOARDS.length], c * PER + j + 1);
    };
    const cols = Array.from({ length: COLS }, (_, c) => {
      const set = Array.from({ length: PER }, (_, j) => tile(c, j)).join("");
      // the column holds its set twice so the drift can loop without a seam
      return `<div class="hero__col hero__col--${c % 2 ? "down" : "up"}" style="--dur:${70 + (c % 3) * 14}s"><div class="hero__col-track">${set}${set}</div></div>`;
    });
    wall.innerHTML = `<div class="hero__wall-inner">${cols.join("")}</div>`;

    // Showreel loop behind the hero (silent). Never for reduced motion or Save-Data.
    const loop = stripTodo(S.showreel.heroVideo);
    const poster = stripTodo(S.showreel.poster);
    const saveData = navigator.connection && navigator.connection.saveData;
    if (loop) {
      const stage = $(".hero__stage");
      if (motion && !saveData) {
        const v = document.createElement("video");
        v.className = "hero__video";
        Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true, preload: "auto" });
        v.setAttribute("muted", "");
        v.setAttribute("playsinline", "");
        v.setAttribute("aria-hidden", "true");
        if (poster) v.poster = DK.media(poster).url;
        v.src = DK.media(loop, "video").url;
        stage.insertBefore(v, wall.nextSibling);
        v.addEventListener("playing", () => stage.classList.add("has-video"), { once: true });
      } else if (poster) {
        const img = document.createElement("img");
        img.className = "hero__video";
        img.alt = "";
        img.src = DK.media(poster).url;
        img.width = 1600; img.height = 900;
        stage.insertBefore(img, wall.nextSibling);
        stage.classList.add("has-video");
      }
    }
  }

  function renderStats() {
    $(".stats").innerHTML = S.stats.map((s) => `
      <li class="stat">
        <div class="stat__num" aria-hidden="true" data-value="${s.value}" data-suffix="${esc(s.suffix)}">${s.value}${esc(s.suffix)}</div>
        <div class="mono stat__label"><span class="sr-only">${s.value}${esc(s.suffix)} </span>${esc(s.label)}</div>
      </li>`).join("");
  }

  function renderAbout() {
    $(".about__story").innerHTML = S.about.paragraphs.map(stripTodo).filter(Boolean).map((p) => `<p class="reveal">${esc(p)}</p>`).join("");
    $(".spec").innerHTML = S.about.spec.map(([k, v]) =>
      `<div class="spec__row"><dt class="mono">${esc(k)}</dt><dd>${rich(v)}</dd></div>`).join("");
  }

  /* --- creatives gallery --- */

  function renderGallery() {
    const counts = { all: creatives.length };
    creatives.forEach((c) => { counts[c.category] = (counts[c.category] || 0) + 1; });
    const chips = [{ id: "all", name: "All" }, ...S.categories];
    $(".chips").innerHTML = chips.map((c, i) => `
      <button class="chip" type="button" data-filter="${esc(c.id)}" aria-pressed="${i === 0}">
        ${esc(c.name)}<span class="chip__count mono">${pad2(counts[c.id] || 0)}</span>
      </button>`).join("");

    $("#gallery").innerHTML = creatives.map((c, i) => {
      const title = stripTodo(c.title) || catName(c.category);
      return `
      <li class="gallery__item" data-cat="${esc(c.category)}" data-index="${i}">
        <figure class="tile">
          <button class="tile__btn" type="button" data-open="${i}" style="aspect-ratio:${DK.parseAspect(c.aspect).css}">
            ${DK.mediaImg(c, { label: catName(c.category) })}
            <span class="tile__zoom" aria-hidden="true">${icons.expand}</span>
            <span class="sr-only">Open ${esc(title)} full size</span>
          </button>
          <figcaption class="tile__cap">
            <span class="tile__title">${esc(title)}</span>
            <span class="label">${esc(catName(c.category))}</span>
          </figcaption>
        </figure>
      </li>`;
    }).join("");
  }

  /* --- reels & motion --- */

  function reelCard(v, i) {
    const title = stripTodo(v.title) || S.videoCategories[v.category] || "Video";
    const playable = DK.hasFile(v);
    const a = DK.parseAspect(v.aspect);
    return `
      <li class="reel ${a.ratio > 1 ? "reel--v" : "reel--h"}">
        <div class="reel__media" style="aspect-ratio:${a.css}" data-video="${i}">
          ${DK.mediaImg(v, { poster: true, alt: "", label: S.videoCategories[v.category] })}
          ${playable ? `<button class="reel__play" type="button" data-play="${i}"><span class="reel__play-icon">${icons.play}</span><span class="sr-only">Play ${esc(title)}</span></button>` : ""}
        </div>
        <div class="reel__meta">
          <h4 class="reel__title">${esc(title)}</h4>
          ${title !== S.videoCategories[v.category] ? `<span class="label">${esc(S.videoCategories[v.category] || "")}</span>` : ""}
        </div>
      </li>`;
  }

  function renderReels() {
    const vertical = [], wide = [];
    videos.forEach((v, i) => (DK.parseAspect(v.aspect).ratio > 1 ? vertical : wide).push(reelCard(v, i)));
    $(".reels__grid--v").innerHTML = vertical.join("");
    $(".reels__grid--h").innerHTML = wide.join("");
    $(".reels__group--vertical").hidden = !vertical.length;
    $(".reels__group--vertical .reels__title").textContent = `Reels & shorts · 9:16 · ${pad2(vertical.length)}${vertical.length > 3 ? " · scroll →" : ""}`;
    $(".reels__group--wide").hidden = !wide.length;

    if (showreel) {
      const box = $(".showreel");
      box.hidden = false;
      const item = { ...showreel, aspect: "16:9" };
      box.innerHTML = `
        <div class="reel__media showreel__media" style="aspect-ratio:16 / 9" data-showreel>
          ${DK.mediaImg(item, { poster: true, alt: "", label: "Showreel" })}
          <button class="reel__play reel__play--lg" type="button" data-play="showreel"><span class="reel__play-icon">${icons.play}</span><span class="sr-only">Play showreel</span></button>
        </div>
        <p class="figcap mono"><span>Fig. 03.0 — ${esc(stripTodo(showreel.title) || "Showreel")}</span><span>Sound on</span></p>`;
    }
  }

  function renderServices() {
    $(".services__grid").innerHTML = S.services.map((s, i) => `
      <li class="service reveal">
        <span class="mono service__code">S-${pad2(i + 1)}</span>
        <h3 class="service__name">${esc(s.name)}</h3>
        <p class="service__text">${rich(s.text)}</p>
        <ul class="service__tags" aria-label="Tools">${s.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <span class="service__line" aria-hidden="true"></span>
      </li>`).join("");
  }

  function renderProcess() {
    $(".process__track").innerHTML = S.process.map((s, i) => `
      <li class="step">
        <div class="step__top">
          <span class="step__num" aria-hidden="true">${pad2(i + 1)}</span>
          <span class="mono step__arrow" aria-hidden="true">${i < S.process.length - 1 ? "→ " + pad2(i + 2) : "End"}</span>
        </div>
        <h3 class="step__name"><span class="sr-only">Step ${i + 1}: </span>${esc(s.name)}</h3>
        <p class="step__text">${esc(s.text)}</p>
        <ul class="step__tools" aria-label="Tools">${s.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </li>`).join("");
  }

  function renderExperience() {
    $(".timeline__roles").innerHTML = S.experience.map((r) => `
      <li class="role">
        <span class="role__dot" aria-hidden="true"></span>
        <div class="role__when">
          <span class="mono">${rich(r.dates)}</span>
          <span class="label">${rich(r.company)}</span>
        </div>
        <div class="role__body">
          <h3 class="role__title">${rich(r.role)}</h3>
          <ul class="role__points">${r.points.map(stripTodo).filter(Boolean).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>
      </li>`).join("");
  }

  function renderToolkit() {
    $(".toolkit__list").innerHTML = S.skills.map(([group, items], i) => `
      <li class="toolkit__row">
        <span class="mono toolkit__code">T-${pad2(i + 1)}</span>
        <h3 class="toolkit__group">${esc(group)}</h3>
        <p class="toolkit__items">${items.split(/,\s*(?![^()]*\))/).map((t) => `<span>${esc(t)}</span>`).join("")}</p>
      </li>`).join("");
    const e = S.education;
    $(".creds__edu").innerHTML = `
      <p class="edu__degree">${esc(e.degree)}</p>
      <p class="edu__school">${esc(e.school)}</p>
      <p class="label">${esc(e.years)}</p>`;
  }

  function renderContact() {
    const L = S.links;
    const row = (kind, value, href, icon, external, extra = "", cls = "") => `
      <li class="contact__row ${cls}">
        <a class="contact__link" href="${esc(href)}" ${external ? ext : ""}>
          <span class="contact__icon">${icons[icon]}</span>
          <span class="mono contact__kind">${kind}</span>
          <span class="contact__value">${value}${external ? newTab : ""}</span>
          ${icons.arrowUpRight}
          <span class="contact__sweep" aria-hidden="true"></span>
        </a>${extra}
      </li>`;
    $(".contact__rows").innerHTML = [
      row("Email", esc(L.email), "mailto:" + L.email, "mail", false,
        `<button class="contact__copy" type="button" data-copy="${esc(L.email)}" aria-label="Copy email address">Copy</button>`, "contact__row--email"),
      row("Phone", esc(L.phone), L.phoneHref, "phone", false),
      row("WhatsApp", "Message me on WhatsApp", L.whatsapp, "whatsapp", true),
      row("LinkedIn", esc(L.linkedinLabel), L.linkedin, "linkedin", true),
      row("Resume", "Resume on Google Drive", L.resume, "doc", true),
      row("UX work", "View my UX portfolio", L.uxPortfolio, "grid", true)
    ].join("") + '<li class="sr-only" aria-live="polite" id="copy-status"></li>';
  }

  /* ======================================================================
     Interactions that work with or without motion
     ====================================================================== */

  // Live local time in Chennai, so people in other time zones know when I'm around.
  function initClock() {
    const out = $(".contact__time");
    if (!out) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
    } catch (_) { return; }
    const tick = () => {
      const now = new Date();
      out.textContent = fmt.format(now);
      out.setAttribute("datetime", now.toISOString());
    };
    tick();
    setInterval(tick, 1000);
  }

  function initCopy() {
    $$("[data-copy]").forEach((btn) => {
      let t;
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        let ok = false;
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch (_) {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.append(ta);
          ta.select();
          try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
          ta.remove();
        }
        btn.textContent = ok ? "Copied" : "Press Ctrl+C";
        btn.classList.toggle("is-copied", ok);
        $("#copy-status").textContent = ok ? "Email address copied to clipboard" : "Copy failed. The address is " + text;
        clearTimeout(t);
        t = setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
          $("#copy-status").textContent = "";
        }, 2200);
      });
    });
  }

  /* --- gallery: filter + masonry --- */

  let filter = "all";
  const galleryItems = () => $$(".gallery__item");
  const shownItems = () => galleryItems().filter((li) => !li.hidden);

  // Masonry on a CSS grid: each tile goes into the shortest column and spans
  // as many 4px rows as its height needs. DOM order (and tab order) stays the
  // data.js order.
  function layoutGallery() {
    const g = $("#gallery");
    const cs = getComputedStyle(g);
    const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length || 1;
    const row = parseFloat(cs.gridAutoRows) || 4;
    const gap = parseFloat(cs.columnGap) || 0;
    const heights = new Array(cols).fill(0);
    shownItems().forEach((li) => {
      const h = li.firstElementChild.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((h + gap) / row));
      const c = heights.indexOf(Math.min(...heights));
      li.style.gridColumn = String(c + 1);
      li.style.gridRow = `${heights[c] + 1} / span ${span}`;
      heights[c] += span;
    });
  }

  function initGallery() {
    const g = $("#gallery");
    const status = $("#gallery-status");
    const empty = $(".gallery__empty");

    const apply = (id, animate) => {
      filter = id;
      $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === id)));
      galleryItems().forEach((li) => { li.hidden = !(id === "all" || li.dataset.cat === id); });
      const n = shownItems().length;
      empty.hidden = n > 0;
      layoutGallery();
      status.textContent = `Showing ${n} ${id === "all" ? "" : catName(id).toLowerCase() + " "}creative${n === 1 ? "" : "s"}`;
      if (animate && motion) {
        gsap.fromTo(shownItems().map((li) => li.firstElementChild), { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05, overwrite: true, onComplete: () => ScrollTrigger.refresh() });
      } else if (motion) {
        ScrollTrigger.refresh();
      }
    };

    $(".chips").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (b && b.dataset.filter !== filter) apply(b.dataset.filter, true);
    });

    apply("all", false);
    let raf = 0;
    new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layoutGallery); }).observe(g);
    if (document.fonts) document.fonts.ready.then(layoutGallery);
  }

  /* --- creative lightbox --- */

  function initLightbox() {
    const dlg = $(".lightbox--gallery");
    const panel = $("#lb-panel");
    const count = $(".lightbox__count", dlg);
    const cat = $(".lightbox__cat", dlg);
    let list = [];
    let pos = 0;
    let opener = null;

    const show = (p) => {
      pos = (p + list.length) % list.length;
      const c = creatives[list[pos]];
      const title = stripTodo(c.title) || catName(c.category);
      $("#lb-title").textContent = title;
      cat.textContent = catName(c.category);
      panel.innerHTML = DK.mediaImg(c, { eager: true, full: true, label: catName(c.category), cls: "lightbox__img" });
      count.textContent = `${pad2(pos + 1)} / ${pad2(list.length)}`;
      $$(".lightbox__nav", dlg).forEach((b) => (b.style.visibility = list.length < 2 ? "hidden" : ""));
    };

    const open = (i, btn) => {
      list = shownItems().map((li) => +li.dataset.index);
      opener = btn;
      show(Math.max(0, list.indexOf(i)));
      dlg.showModal();
      DK.lenis && DK.lenis.stop();
      $(".lightbox__close", dlg).focus();
    };
    const close = () => dlg.open && dlg.close();

    $("#gallery").addEventListener("click", (e) => {
      const b = e.target.closest("[data-open]");
      if (b) open(+b.dataset.open, b);
    });
    $$(".lightbox__nav", dlg).forEach((b) => b.addEventListener("click", () => show(pos + +b.dataset.step)));
    $(".lightbox__close", dlg).addEventListener("click", close);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener("close", () => {
      DK.lenis && DK.lenis.start();
      opener && opener.focus();
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); show(pos + 1); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(pos - 1); return; }
      if (e.key === "Home") { e.preventDefault(); show(0); return; }
      if (e.key === "End") { e.preventDefault(); show(list.length - 1); return; }
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      DK.trapFocus(dlg, e);
    });

    // Swipe left / right on touch screens.
    let x0 = null;
    panel.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    panel.addEventListener("pointerup", (e) => {
      if (x0 == null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 48) show(pos + (dx < 0 ? 1 : -1));
    });
  }

  /* --- videos: poster first, player on click --- */

  function initVideos() {
    // Inline cards: the poster becomes the player.
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-play]");
      if (!b || b.closest(".hero")) return;
      const key = b.dataset.play;
      const item = key === "showreel" ? showreel : videos[+key];
      if (!item) return;
      const box = b.closest(".reel__media");
      box.innerHTML = DK.playerHTML(item);
      box.classList.add("is-playing");
      const el = box.firstElementChild;
      if (el) {
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
        if (el.tagName === "VIDEO") el.play().catch(() => {});
      }
    });

    // Only one inline video plays at a time.
    document.addEventListener("play", (e) => {
      $$(".reel__media video").forEach((v) => { if (v !== e.target) v.pause(); });
    }, true);

    // Hero button: showreel in a dialog.
    const dlg = $(".lightbox--video");
    const player = $(".lightbox__player", dlg);
    let opener = null;
    $$(".js-showreel").forEach((btn) => btn.addEventListener("click", () => {
      if (!showreel) return;
      opener = btn;
      $("#sr-title").textContent = stripTodo(showreel.title) || "Showreel";
      player.innerHTML = DK.playerHTML(showreel);
      dlg.showModal();
      DK.lenis && DK.lenis.stop();
      $(".lightbox__close", dlg).focus();
    }));
    const close = () => dlg.open && dlg.close();
    $(".lightbox__close", dlg).addEventListener("click", close);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      DK.trapFocus(dlg, e);
    });
    dlg.addEventListener("close", () => {
      player.innerHTML = ""; // stops playback
      DK.lenis && DK.lenis.start();
      opener && opener.focus();
    });
  }

  function initHeaderState() {
    const header = $(".site-header");
    const after = $("#about");
    const update = () => {
      const solid = after.getBoundingClientRect().top <= header.offsetHeight + 1;
      header.dataset.state = solid ? "solid" : "over";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Stat numbers count up when they scroll into view (or just sit still).
  function initStats() {
    $$(".stat__num").forEach((el) => DK.countUp(el, +el.dataset.value, { suffix: el.dataset.suffix }));
  }

  /* ======================================================================
     Section animations (motion only)
     ====================================================================== */

  function initHero() {
    const hero = $(".hero");
    const wall = $(".hero__wall-inner");
    const block = $(".hero__block--1");
    const label = $(".hero__frame");

    gsap.from($$(".hero__label, .hero__name-line, .hero__line, .hero__ctas > *", block), {
      y: 36, autoAlpha: 0, duration: 1.2, ease: "power3.out", stagger: 0.09, delay: 0.1
    });
    gsap.from(wall, { autoAlpha: 0, scale: 1.08, duration: 1.8, ease: "power2.out" });

    // Scrolling away: the wall tilts flat and recedes, the text lifts off.
    gsap.timeline({
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
    })
      .to(wall, { yPercent: -8, scale: 0.94, rotate: -2, ease: "none" }, 0)
      .to(block, { y: -80, autoAlpha: 0.2, ease: "none" }, 0);

    // Caption counts the artboards drifting past.
    let n = 1;
    const total = $$(".art", wall).length / 2;
    setInterval(() => { n = (n % total) + 1; label.textContent = `Art. ${pad2(n)} / ${pad2(total)}`; }, 2400);
  }

  // Process cards. Desktop: pinned horizontal scroll with a 3D tilt.
  // Mobile, reduced motion or no GSAP: a native swipe row with scroll snap.
  function processParts() {
    const viewport = $(".process__viewport");
    const track = $(".process__track");
    const cards = $$(".step", track);
    const count = $(".process__count");
    const bar = $(".process__bar span");
    let current = -1;
    const setCurrent = (i) => {
      if (i === current) return;
      current = i;
      cards.forEach((c, k) => c.classList.toggle("is-current", k === i));
      count.textContent = `${pad2(i + 1)} / ${pad2(cards.length)}`;
    };
    const setBar = (p) => { bar.style.transform = `scaleX(${clamp01(p).toFixed(4)})`; };
    return { section: $(".process"), viewport, track, cards, setCurrent, setBar };
  }

  function initProcessSwipe() {
    const { viewport, cards, setCurrent, setBar } = processParts();
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = viewport.scrollWidth - viewport.clientWidth;
      const left = viewport.scrollLeft;
      setBar(max > 0 ? left / max : 0);
      if (max > 0 && left >= max - 2) return setCurrent(cards.length - 1);
      const origin = cards[0].offsetLeft;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - origin - left);
        if (d < bestD) { bestD = d; best = i; }
      });
      setCurrent(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }

  function initProcess() {
    const { section, viewport, track, cards, setCurrent, setBar } = processParts();
    const mm = gsap.matchMedia();

    mm.add(PIN_QUERY, () => {
      section.classList.add("is-pinned");
      let centers = [];
      const measure = () => { centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2); };
      const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      // Reads only cached positions and the tween's own x, so no layout work per frame.
      const render = () => {
        const x = gsap.getProperty(track, "x");
        const vw = viewport.clientWidth;
        cards.forEach((c, i) => {
          const raw = (centers[i] + x - vw / 2) / (vw * 0.65);
          const e = Math.sin(Math.max(-1, Math.min(1, raw)) * Math.PI / 2);
          c.style.transform = `translate3d(0, 0, ${(-Math.abs(e) * 60).toFixed(1)}px) rotateY(${(-e * 14).toFixed(2)}deg)`;
        });
        const D = dist();
        const progress = D ? clamp01(-x / D) : 0;
        setBar(progress);
        setCurrent(Math.round(progress * (cards.length - 1)));
      };

      measure();
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: () => { measure(); render(); }
        }
      });
      render();
      return () => {
        section.classList.remove("is-pinned");
        cards.forEach((c) => { c.style.transform = ""; });
      };
    });

    mm.add(NOPIN_QUERY, () => initProcessSwipe());
  }

  function initTimeline() {
    const tlEl = $(".timeline");
    gsap.fromTo($(".timeline__line"), { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: tlEl, start: "top 70%", end: "bottom 70%", scrub: 0.4 }
    });
    $$(".role").forEach((role) => {
      ScrollTrigger.create({
        trigger: role,
        start: "top 70%",
        onEnter: () => role.classList.add("is-active"),
        onLeaveBack: () => role.classList.remove("is-active")
      });
    });
  }

  // Gallery tiles and reel cards rise in as they enter the viewport.
  function initCards() {
    gsap.set(".tile, .reel", { autoAlpha: 0 });
    ScrollTrigger.batch(".tile, .reel", {
      start: "top 92%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.07, overwrite: true })
    });
  }

  /* ======================================================================
     Boot
     ====================================================================== */

  bindText();
  renderHeroWall();
  renderStats();
  renderAbout();
  renderGallery();
  renderReels();
  renderServices();
  renderProcess();
  renderExperience();
  renderToolkit();
  renderContact();
  DK.renderFooter();

  initCopy();
  initClock();
  initGallery();
  initLightbox();
  initVideos();
  initHeaderState();
  initStats();

  if (motion) {
    initHero();
    initProcess();
    initTimeline();
    initCards();
    DK.initReveals();
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => { layoutGallery(); ScrollTrigger.refresh(); });
    window.addEventListener("load", () => ScrollTrigger.refresh());
  } else {
    initProcessSwipe();
  }
  document.documentElement.classList.add("loaded");
  DK.scrollToHash && DK.scrollToHash();
})();
