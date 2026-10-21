/*
 * All editable content for the site lives here.
 * Pages read window.SITE and render from it, so change copy, links, media
 * and numbers in this file only.
 *
 * Draft notes written as [TODO: …] are never shown on the site.
 *
 * Media sources (the `src` and `poster` fields below) accept three forms:
 *   "assets/work/creatives/brand-01.webp"   a local file (preferred: fastest)
 *   "drive:FILE_ID"                          a Google Drive file shared as
 *                                            "Anyone with the link: Viewer"
 *   "youtube:VIDEO_ID"                       videos only
 * See README.md → "Adding your work" for sizes and step-by-step instructions.
 */
window.SITE = {
  person: {
    name: "Dinesh Kumar",
    title: "Graphic Designer & Video Editor",
    location: "Chennai, India",
    coords: "N 13.08° · E 80.27° · Chennai"
  },

  links: {
    email: "dineshkumarsn33@gmail.com",
    phone: "+91 99521 29182",
    phoneHref: "tel:+919952129182",
    whatsapp: "https://wa.me/919952129182",
    linkedin: "https://www.linkedin.com/in/dinesh-karthi-9224ba205",
    linkedinLabel: "in/dinesh-karthi-9224ba205",
    resume: "https://drive.google.com/file/d/1-mWyjqvFvRbcq3GU1MOPolDng5ZytK2K/view?usp=drivesdk",
    uxPortfolio: "https://dineshuxportfolio.vercel.app/",
    drive: "https://drive.google.com/drive/folders/142cz54l6UC17Xxu7qpe_2_wKrU2q_pxG"
  },

  hero: {
    label: "Graphic Designer & Video Editor · Chennai",
    line: "I make brand, social and motion content that reads at a glance and stays on-brand."
  },

  /*
   * Showreel. Leave src empty to hide every showreel button.
   *   src:       "assets/work/videos/showreel.mp4", "drive:FILE_ID" or "youtube:VIDEO_ID"
   *   poster:    a still frame, e.g. "assets/work/posters/showreel.webp"
   *   heroVideo: a short, silent, looping MP4 (local file, under 8 MB) that plays
   *              behind the hero. Leave empty to show the collage of creatives.
   */
  showreel: {
    src: "", // [TODO: paste your showreel link — local mp4, drive:FILE_ID or youtube:VIDEO_ID]
    poster: "", // [TODO: showreel poster image, 1600×900 webp]
    heroVideo: "", // [TODO: optional silent hero loop, e.g. assets/work/videos/hero-loop.mp4]
    title: "Showreel"
  },

  stats: [
    { value: 300, suffix: "+", label: "marketing creatives" },
    { value: 50, suffix: "+", label: "reels & videos" },
    { value: 7, suffix: "+", label: "years in design" },
    { value: 6, suffix: "+", label: "pro tools" }
  ],

  about: {
    statement: "Seven years. Three hundred creatives. Fifty reels and videos.",
    paragraphs: [
      "I'm a graphic designer and video editor in Chennai. Since 2019 I've made the things a brand shows the world: social media posts, banners, digital ads, pitch decks, logos, reels and product videos.",
      "I also work as a UI/UX designer, so I design with systems in mind. Grids, type scales and reusable components keep a campaign consistent from the first post to the fiftieth.",
      "At Orange Office Technologies I work across static and motion: ad banners and pitch decks one day, a product demo edit or a reel the next."
    ],
    spec: [
      ["Based in", "Chennai, India"],
      ["Experience", "7+ years, since March 2019"],
      ["Creatives", "300+ posts, banners, ads, decks, logos"],
      ["Video", "50+ reels, promos, demos, motion"],
      ["Also", "UI/UX design · WCAG 2.1 AA"],
      ["Education", "B.E. Civil Engineering"]
    ]
  },

  /*
   * Gallery filter chips. `id` matches the `category` of each creative.
   */
  categories: [
    { id: "social", name: "Social Media" },
    { id: "branding", name: "Branding & Logos" },
    { id: "ads", name: "Ads & Banners" },
    { id: "decks", name: "Pitch Decks" },
    { id: "illustration", name: "Icons & Illustrations" }
  ],

  /*
   * Show a labelled placeholder for entries that have no `src` yet.
   * Set to false once your real files are in, so empty entries are hidden.
   */
  showPlaceholders: true,

  /*
   * Creatives (images). Order here is the order in the gallery.
   *   id        unique, lowercase, no spaces
   *   title     short name shown under the image and in the lightbox
   *   category  one of the `categories` ids above
   *   type      "image"
   *   src       local path, "drive:FILE_ID" or a full https URL
   *   poster    optional smaller preview; leave "" to use src
   *   alt       what the image shows, for screen readers
   *   aspect    "w:h", e.g. "1:1", "4:5", "16:9", "1200:628"; must match the file
   *   featured  true = also used in the hero collage
   */
  creatives: [
    {
      id: "cr-01",
      title: "[TODO: title, e.g. Product launch post]",
      category: "social",
      type: "image",
      src: "", // [TODO: assets/work/creatives/social-01.webp or drive:FILE_ID]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "4:5",
      featured: true
    },
    {
      id: "cr-02",
      title: "[TODO: title, e.g. Logo and identity]",
      category: "branding",
      type: "image",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "1:1",
      featured: true
    },
    {
      id: "cr-03",
      title: "[TODO: title, e.g. Display ad set]",
      category: "ads",
      type: "image",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "1200:628",
      featured: true
    },
    {
      id: "cr-04",
      title: "[TODO: title, e.g. Investor pitch deck]",
      category: "decks",
      type: "image",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "16:9",
      featured: true
    },
    {
      id: "cr-05",
      title: "[TODO: title, e.g. Icon set]",
      category: "illustration",
      type: "image",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "1:1",
      featured: true
    },
    {
      id: "cr-06",
      title: "[TODO: title, e.g. Festival campaign story]",
      category: "social",
      type: "image",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO: describe the image]",
      aspect: "9:16",
      featured: true
    }
  ],

  /*
   * Videos. Posters show first; the video only loads when someone clicks play.
   *   category  "reel" (vertical shorts) | "promo" | "demo" | "motion"
   *   type      "video"
   *   src       local .mp4 (H.264, under 8 MB), "drive:FILE_ID" or "youtube:VIDEO_ID"
   *   poster    still frame (webp). For Drive videos it can be left "" to use
   *             Drive's own thumbnail.
   *   aspect    "9:16" for reels, "16:9" for everything else
   */
  videos: [
    {
      id: "vd-01",
      title: "[TODO: title, e.g. Product teaser reel]",
      category: "reel",
      type: "video",
      src: "", // [TODO: assets/work/videos/reel-01.mp4, drive:FILE_ID or youtube:VIDEO_ID]
      poster: "", // [TODO: assets/work/posters/reel-01.webp]
      alt: "[TODO: one line on what the video shows]",
      aspect: "9:16"
    },
    {
      id: "vd-02",
      title: "[TODO: title, e.g. Festival greeting short]",
      category: "reel",
      type: "video",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO]",
      aspect: "9:16"
    },
    {
      id: "vd-03",
      title: "[TODO: title, e.g. Feature walkthrough reel]",
      category: "reel",
      type: "video",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO]",
      aspect: "9:16"
    },
    {
      id: "vd-04",
      title: "[TODO: title, e.g. Product demo video]",
      category: "demo",
      type: "video",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO]",
      aspect: "16:9"
    },
    {
      id: "vd-05",
      title: "[TODO: title, e.g. UI animation]",
      category: "motion",
      type: "video",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO]",
      aspect: "16:9"
    },
    {
      id: "vd-06",
      title: "[TODO: title, e.g. Promo ad]",
      category: "promo",
      type: "video",
      src: "", // [TODO]
      poster: "",
      alt: "[TODO]",
      aspect: "16:9"
    }
  ],

  videoCategories: {
    reel: "Reel / Short",
    promo: "Promo & ad",
    demo: "Product demo & explainer",
    motion: "Motion graphics & UI animation"
  },

  services: [
    {
      name: "Graphic Design",
      text: "Social posts, banners, digital ads, pitch decks and marketing collateral, built on a grid and true to the brand.",
      tags: ["Photoshop", "Illustrator", "Canva"]
    },
    {
      name: "Video Editing",
      text: "Reels, shorts, promo and ad videos, product demos and explainers, cut for pace and a clear message.",
      tags: ["Premiere Pro", "DaVinci Resolve"]
    },
    {
      name: "Motion Graphics",
      text: "Animated titles, logo reveals and UI animation that explain a product in seconds.",
      tags: ["After Effects", "Figma"]
    },
    {
      name: "Brand Identity",
      text: "Logos, identity basics, icons and illustrations that hold together across every format.",
      tags: ["Illustrator", "Figma"]
    },
    {
      name: "Social Media Content",
      text: "Posts, stories and reels sized and paced for each platform, planned as a set rather than one-offs.",
      tags: ["Photoshop", "Premiere Pro", "Canva"]
    },
    {
      name: "AI-assisted Creative",
      text: "AI tools to explore more concepts, faster. The final craft, type and edit are done by hand.",
      tags: ["Adobe Firefly", "Figma AI", "Figma Make", "Claude"]
    }
  ],

  process: [
    {
      name: "Brief",
      text: "Who is it for, where will it run, and what should people do after seeing it.",
      tools: ["Goals", "Audience", "Formats", "Brand guidelines"]
    },
    {
      name: "Concept",
      text: "References, moodboards and rough directions. A weak idea should be cheap to drop.",
      tools: ["Moodboards", "Storyboards", "Adobe Firefly"]
    },
    {
      name: "Design / Edit",
      text: "Layouts, typography and the edit itself, built on the brand system.",
      tools: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"]
    },
    {
      name: "Review",
      text: "Share drafts early and check them on the screens where they will actually be seen.",
      tools: ["Device previews", "Feedback rounds"]
    },
    {
      name: "Revise",
      text: "Act on feedback, tighten the timing and copy, check contrast and legibility.",
      tools: ["DaVinci Resolve", "Colour", "Sound"]
    },
    {
      name: "Deliver",
      text: "Export every size and format the channels need, named and organised.",
      tools: ["Export presets", "Source files", "Hand-off"]
    }
  ],

  experience: [
    {
      role: "Graphic Designer, Video Editor & UI/UX Designer", // [TODO: confirm the job title exactly as it appears on your resume]
      company: "Orange Office Technologies, Chennai",
      dates: "Sep 2020 – Present",
      points: [
        "Design marketing creatives end to end: social media posts, banners, digital ads, pitch decks and marketing collateral.",
        "Edit social reels and shorts, promo and ad videos, and product demo and explainer videos.",
        "Create motion graphics and UI animation that show product features in a few seconds.",
        "Design logos, brand identity elements, icons and illustrations.",
        "Use AI tools (Adobe Firefly, Figma AI, Figma Make, Claude) to explore more concepts in less time, then finish the craft by hand.",
        "Also lead UI/UX work: a Figma design system, WCAG 2.1 AA accessible interfaces, and mentoring five junior designers."
      ]
    },
    {
      role: "UI/UX Designer & Front-End Developer", // [TODO: confirm the job title]
      company: "Qmax",
      dates: "Mar 2019 – Sep 2020",
      points: [
        "[TODO: add the graphic design or video work you did at Qmax, if any]",
        "Designed interfaces and reusable components in Figma, and built them as HTML, CSS and JavaScript prototypes.",
        "Started the design practice that grew into seven years of brand, social and motion work."
      ]
    }
  ],

  skills: [
    ["Design", "Adobe Photoshop, Adobe Illustrator, Canva, Figma"],
    ["Video & Motion", "Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve"],
    ["AI", "Adobe Firefly, Figma AI, Figma Make, Claude"],
    ["UI/UX", "Figma design systems, WCAG 2.1 AA, Mentoring (5 junior designers)"]
  ],

  education: {
    degree: "B.E. Civil Engineering",
    school: "Government College of Engineering",
    years: "2013 – 2017"
  },

  /*
   * Project pages (projects/<slug>.html). They stay hidden from navigation and
   * are marked noindex until `published` is true. Only publish one once its
   * text and media are real. Preview an unpublished page by adding ?preview
   * to its URL, e.g. projects/social-campaign.html?preview
   *   media: ids from `creatives` and `videos` above
   */
  projects: [
    {
      slug: "social-campaign",
      published: false,
      name: "[TODO: campaign name]",
      category: "Social campaign",
      summary: "[TODO: one sentence on what the campaign was for]",
      cover: "", // [TODO: cover image, 1600×1000 webp]
      meta: {
        role: "[TODO: your role]",
        client: "[TODO: client or brand — only if you may name them]",
        timeline: "[TODO]",
        deliverables: "[TODO: e.g. 12 posts, 4 reels, 3 banner sizes]",
        tools: "[TODO: e.g. Photoshop, Premiere Pro]"
      },
      brief: ["[TODO: what was asked for, and for whom]"],
      approach: ["[TODO: how you got from brief to final work]"],
      media: ["cr-01", "cr-06", "vd-01"],
      results: [], // e.g. { value: 12, suffix: "", label: "Posts delivered" } — real numbers only
      learned: ["[TODO]"]
    },
    {
      slug: "brand-identity",
      published: false,
      name: "[TODO: brand name]",
      category: "Brand identity",
      summary: "[TODO: one sentence on the brand and what you made]",
      cover: "", // [TODO]
      meta: {
        role: "[TODO]",
        client: "[TODO]",
        timeline: "[TODO]",
        deliverables: "[TODO: e.g. logo, colour palette, type, icon set]",
        tools: "[TODO: e.g. Illustrator, Figma]"
      },
      brief: ["[TODO]"],
      approach: ["[TODO]"],
      media: ["cr-02", "cr-05"],
      results: [],
      learned: ["[TODO]"]
    },
    {
      slug: "product-video",
      published: false,
      name: "[TODO: video name]",
      category: "Product video",
      summary: "[TODO: one sentence on the product and the video]",
      cover: "", // [TODO]
      meta: {
        role: "[TODO]",
        client: "[TODO]",
        timeline: "[TODO]",
        deliverables: "[TODO: e.g. 90-second demo, 3 cut-downs]",
        tools: "[TODO: e.g. Premiere Pro, After Effects]"
      },
      brief: ["[TODO]"],
      approach: ["[TODO]"],
      media: ["vd-04", "vd-05"],
      results: [],
      learned: ["[TODO]"]
    }
  ],

  contact: {
    title: "Let’s make something people stop for.",
    line: "Have a brief, a role or a question? Email or WhatsApp works best." // [TODO: say what you are open to, e.g. full-time roles or freelance]
  }
};
