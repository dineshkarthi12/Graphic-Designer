/**
 * ALL site content lives in this file: every word, number, link and image path.
 *
 * Source: Dinesh's UI/UX portfolio (github.com/dineshkarthi12/Modern-UXPortfolio, js/data.js):
 * the same profile, case studies, experience, skills and links, laid out in this site's template.
 *
 * Anything written as "[TODO: …]" is a note to you. It is never shown on the site:
 * the UI strips TODO markers, and hides a line or chip that is only a TODO.
 * Replace a TODO with the real value and it appears automatically.
 */

export const SITE_URL = 'https://graphic-designer-portfolio-ruddy.vercel.app';

// ───────────────────────────────────────────── types

export type Metric = {
  /** Display value. Numbers inside it count up, e.g. "+25%", "50+", "4.8/5". Text without digits shows as is. */
  value: string;
  label: string;
  detail?: string;
};

export type IconName =
  | 'brain' | 'target' | 'sparkles' | 'users' | 'list-checks' | 'shield-check' | 'gauge'
  | 'file-check' | 'activity' | 'layout-dashboard' | 'calendar' | 'video' | 'file-text'
  | 'heart-pulse' | 'bell' | 'wallet' | 'receipt' | 'pie-chart' | 'gift' | 'map-pin'
  | 'send' | 'scan' | 'line-chart' | 'alert-triangle' | 'piggy-bank' | 'stethoscope'
  | 'clock' | 'layers' | 'database' | 'server' | 'smartphone' | 'code';

export type Feature = { icon: IconName; title: string; text: string };
export type Fact = { label: string; value: string };
export type Decision = { title: string; why: string; notChosen: string };

/** One block of the deep dive. `title` overrides the default heading (Data, Model & approach, …). */
export type DiveBlock = { title?: string; text: string; facts: Fact[] };

export type MlDeepDive = {
  kind: 'deep-dive';
  /** Section heading, e.g. "AI/ML deep dive". */
  title: string;
  intro: string;
  data: DiveBlock;
  model: DiveBlock;
  evaluation: DiveBlock & {
    /** Rows = actual class, columns = predicted class. */
    confusion?: { labels: string[]; matrix: number[][] };
    curvesImage?: string;
    curvesAlt?: string;
    curvesNote?: string;
    reading?: string[];
  };
  serving: DiveBlock;
  architecture: { title: string; caption: string; nodes: { title: string; sub: string }[]; loop: string };
};

export type AiFeatures = {
  kind: 'features';
  /** Section heading. Defaults to "The AI features". */
  title?: string;
  intro: string;
  features: Feature[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Accent colours sampled from the project's own images (darkened where needed for 4.5:1 text contrast). */
  accent: string;
  accent2: string;
  cover: string;
  coverMd: string;
  coverAlt: string;
  /** Optional second image, shown above Before → After. */
  secondary?: string;
  secondaryAlt?: string;
  secondaryTitle?: string;
  /** One-line outcome headline. */
  outcome: string;
  summary: string;
  cardMetric: Metric;
  tags: [string, string, string];
  meta: { role: string; duration: string; team: string; platform: string; stack: string[] };
  tldr: { problem: string; did: string; result: string; metrics: Metric[] };
  challenge: { intro: string[]; affected: string; mattered: string; constraints: string[] };
  role: { owned: string[]; team: string[] };
  process: { step: string; text: string }[];
  solution: { intro: string; features: Feature[] };
  /** Optional AI / ML section. */
  ai?: MlDeepDive | AiFeatures;
  decisions: Decision[];
  beforeAfter: { before: { title: string; items: string[] }; after: { title: string; items: string[] } };
  results: {
    metrics: Metric[];
    impact: string;
    breakdowns?: { title: string; caption?: string; rows: { label: string; value: number; display: string }[] }[];
  };
  learned: string[];
  stack: string[];
  links: { label: string; href: string }[];
  seo: { title: string; description: string };
};

// ───────────────────────────────────────────── person & contact

export const person = {
  name: 'Dinesh Kumar',
  firstName: 'Dinesh',
  lastName: 'Kumar',
  initials: 'DK',
  role: 'Senior UI/UX & Product Designer',
  /** What I do. */
  headline: 'I design calm interfaces for complicated products.',
  valueProp:
    'Seven years. SaaS, fintech, healthcare and AI. Trained as a civil engineer, I still work out the load before I draw the structure.',
  availability: 'Open to senior product design roles',
  location: 'Chennai, India',
};

export const contact = {
  email: 'dineshkarthivel@gmail.com',
  phoneDisplay: '+91 99521 29182',
  phoneHref: 'tel:+919952129182',
  whatsapp: 'https://wa.me/919952129182',
  linkedin: 'https://www.linkedin.com/in/dinesh-karthi-9224ba205',
  github: 'https://github.com/dineshkarthi12',
  resumeView: 'https://drive.google.com/file/d/12IQA5aOfOivI6v2IAtpou71HtvutawIL/view?usp=drivesdk',
  /** Direct download of the same Google Drive file. */
  resumePdf: 'https://drive.google.com/uc?export=download&id=12IQA5aOfOivI6v2IAtpou71HtvutawIL',
  resumeFileName: 'Dinesh_Kumar_UI_UX_Product_Designer_Resume.pdf',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chennai%2C%20India',
};

// ───────────────────────────────────────────── home page

export const impactAtAGlance: (Metric & { source: string })[] = [
  { value: '35%', label: 'Fewer UI inconsistencies', source: 'Figma design system · React library' },
  { value: '+25%', label: 'Appointment completion', source: 'MedCare · 3-tap booking' },
  { value: '20%', label: 'Better task success', source: 'Usability testing · healthcare & fintech' },
  { value: '40%', label: 'Faster developer handoff', source: 'Atomic design system · Qmax' },
];

export const about = {
  eyebrow: 'About',
  title: 'Seven years of making hard software easier to use.',
  bio: [
    "I'm a product designer in Chennai. Since 2019 I've designed software people use to get work done: payroll and billing tools, patient apps, recruitment platforms and payment flows.",
    'I studied civil engineering before I moved into design, and the habit stayed. I start with the load: who uses this, what they need to finish, and what breaks if we get it wrong. Then I draw.',
    'At Orange Office Technologies I lead product design from research to handoff. I run a Figma design system that engineering mirrors as a React library, and I mentor five junior designers. Accessibility is part of the brief from day one, not a check at the end.',
  ],
  stats: [
    { value: '7+', label: 'Years of experience, since March 2019' },
    { value: '5', label: 'Junior designers mentored' },
    { value: '50+', label: 'Enterprise clients on Loyaltri' },
    { value: 'AA', label: 'WCAG 2.1 standard, ADA/508-aligned' },
  ] as Metric[],
};

export type SkillGroup = { id: string; title: string; short: string; groups: { name: string; items: string[] }[] };

export const skillsSection = {
  title: 'Six orbits, one core.',
  text: 'From research and data to interaction, design systems, accessibility and front-end, plus the leadership that gets designs shipped.',
};

/** Six orbit rings in the 3D scene, one per group. Every item is taken word for word from the UX portfolio. */
export const skills: SkillGroup[] = [
  {
    id: 'tools',
    title: 'Design Tools',
    short: 'Tools',
    groups: [
      {
        name: 'Design tools',
        items: [
          'Figma (Auto Layout, Variables, Components, Prototyping, Dev Mode)', 'FigJam', 'Adobe XD', 'Photoshop',
          'Illustrator', 'Miro', 'Canva',
        ],
      },
    ],
  },
  {
    id: 'research',
    title: 'UX Research & Data',
    short: 'Research',
    groups: [
      {
        name: 'UX research & strategy',
        items: [
          'User Research', 'Stakeholder Interviews', 'Usability Testing', 'Heuristic Evaluation', 'UX Audits',
          'User Flows', 'Journey Mapping', 'Information Architecture', 'Problem Framing', 'Design Thinking',
        ],
      },
      {
        name: 'Data-informed design',
        items: [
          'A/B Testing', 'Google Analytics', 'Hotjar', 'Microsoft Clarity', 'Heatmaps & Session Recordings',
          'Funnel Analysis', 'KPI Tracking',
        ],
      },
    ],
  },
  {
    id: 'ui',
    title: 'UI & Interaction',
    short: 'Interaction',
    groups: [
      {
        name: 'UI & interaction',
        items: [
          'Wireframing', 'Rapid Prototyping', 'High-Fidelity UI', 'Interaction Design', 'Micro-interactions',
          'Visual Design', 'Progressive Disclosure', 'Dashboard & Data Visualization Design',
        ],
      },
    ],
  },
  {
    id: 'systems',
    title: 'Design Systems & Accessibility',
    short: 'Systems',
    groups: [
      {
        name: 'Design systems',
        items: [
          'Atomic Design', 'Design Tokens', 'Component Libraries', 'Reusable Pattern Systems', 'Design Documentation',
          'Design QA', 'Developer Handoff Specs',
        ],
      },
      {
        name: 'Accessibility',
        items: [
          'WCAG 2.1 AA', 'ADA/508-aligned Design', 'Colour-Contrast Audits', 'Keyboard Navigation', 'Focus States',
          'ARIA Annotations',
        ],
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-End & Responsive',
    short: 'Front-End',
    groups: [
      {
        name: 'Front-end',
        items: ['HTML5', 'CSS3', 'SASS', 'Tailwind CSS', 'JavaScript (ES6+)', 'React.js', 'Semantic HTML'],
      },
      {
        name: 'Responsive & mobile',
        items: ['Mobile-First', 'Responsive Web', 'Cross-Platform (Web, iOS, Android)', 'CSS Flexbox & Grid'],
      },
    ],
  },
  {
    id: 'ai-lead',
    title: 'AI Product Design & Leadership',
    short: 'AI & Lead',
    groups: [
      {
        name: 'AI product design',
        items: [
          'UX for AI-powered Search & Recommendations',
          'AI-assisted Design Workflows (Adobe Firefly, Uizard, Google Stitch)',
          'LLM-assisted Concepting & Prototyping',
        ],
      },
      {
        name: 'Leadership',
        items: [
          'Design Mentoring', 'Design Reviews & Critiques', 'Client & Leadership Presentations',
          'Stakeholder Management', 'Agile/Scrum', 'Jira', 'Cross-Functional Teams',
        ],
      },
    ],
  },
];

export type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  impact: string[];
  more: string[];
  products?: string[];
};

export const experienceSection = {
  title: 'Two companies, seven years.',
};

export const experience: Role[] = [
  {
    title: 'Senior UI/UX & Product Designer',
    company: 'Orange Office Technologies',
    location: 'Chennai',
    period: 'Sep 2020 – Present',
    impact: [
      'Led end-to-end product design for multi-tenant SaaS, healthcare and fintech platforms: requirement gathering, user research, user flows, wireframes, high-fidelity Figma prototypes and production handoff.',
      'Built and scaled a Figma design system with design tokens, variables and reusable components, mirrored by engineering as a React component library. Reduced UI inconsistencies by 35%.',
      'Conducted usability testing, heuristic evaluations and UX audits on healthcare and fintech portals. Reduced support tickets by 15% and improved task success rates by 20%.',
    ],
    more: [
      'Drove data-informed design decisions using product analytics, heatmaps and A/B testing on key user flows, delivering an 18% conversion lift on the winning variant before full rollout.',
      'Designed WCAG 2.1 AA compliant clinician dashboards and digital payment flows with colour-contrast audits, keyboard navigation, focus states and ARIA annotations for developers.',
      'Defined information architecture and data-dense dashboard layouts for payroll, billing and subscription modules, using progressive disclosure to reduce cognitive load for HR and finance users.',
      'Designed mobile-first, responsive interfaces and validated flows with interactive prototypes and micro-interaction specs before build. Ran design QA with Figma Dev Mode specs on every release to reduce rework.',
      'Mentored a team of 5 junior designers through design reviews, critiques and Figma best practices.',
      'Presented concepts, prototypes and research insights to clients and leadership to secure sign-off. Partnered daily with Product Owners and Developers in Agile/Scrum sprints.',
      'Used AI-powered design tools (Adobe Firefly, Uizard, Google Stitch) to speed up ideation, concept exploration and early-stage prototyping.',
    ],
    products: ['Loyaltri', 'MedCare', 'MonkifyAI', 'Aura'],
  },
  {
    title: 'UI/UX Designer & Front-End Developer',
    company: 'Qmax',
    location: '[TODO: location]',
    period: 'Mar 2019 – Sep 2020',
    impact: [
      'Designed high-density, real-time analytics dashboards with data visualization, dynamic filtering and responsive layouts. Drove a 20% increase in user engagement.',
      'Established an Atomic Design system with reusable Figma components and matching HTML/CSS patterns. Accelerated developer handoff by 40%.',
      'Conducted user research and usability testing to validate design decisions, iterating on navigation flows and interaction patterns for mobile.',
      'Built interactive HTML, CSS and JavaScript prototypes to validate interactions before production development.',
    ],
    more: [],
  },
];

export const education = {
  degree: 'B.E. Civil Engineering',
  school: 'Government College of Engineering',
  period: '2013 – 2017',
};

export const certifications = [
  'Google UX Design Professional Certificate',
  'Figma Advanced UI Design',
  'Design Patterns (UI/UX)',
  'HTML, CSS & JavaScript for Web Developers (Coursera)',
];

// ───────────────────────────────────────────── shared copy

/** Shown in every case study's "team" column. */
const teamNote = 'A 3-person team, with design led by me.';

export const ctaCopy = {
  title: "Like this work? Let's talk.",
  text: 'I’m open to senior product design and design system roles.',
};

export const contactSection = {
  eyebrow: 'Contact',
  title: 'Let’s build something useful.',
  text: 'I’m open to senior product design and design system roles. I reply to every message.',
  /** Placeholder in the contact form's subject field. */
  subjectPlaceholder: 'Product design role at …',
};

// ───────────────────────────────────────────── projects

const designTools = ['Figma', 'Adobe XD', 'Sketch'];

const loyaltri: Project = {
  slug: 'loyaltri',
  name: 'Loyaltri',
  category: 'SaaS · Payroll, loyalty & subscription billing',
  accent: '#6A4EF4',
  accent2: '#A78BFA',
  cover: '/projects/loyaltri-cover.webp',
  coverMd: '/projects/loyaltri-cover-md.webp',
  coverAlt:
    'Loyaltri HR dashboard on a laptop: work schedule, leave balance, requests, today’s events, team members and a company feed.',
  outcome: 'Payroll, billing and loyalty UX for 50+ enterprise clients',
  summary: 'Payroll, subscription billing and loyalty modules for 50+ enterprise clients.',
  cardMetric: { value: '50+', label: 'Enterprise clients' },
  tags: ['B2B SaaS', 'Progressive disclosure', 'Inline validation'],
  meta: {
    role: 'Lead Designer',
    duration: '6–7 months',
    team: '3-person team, design led by me',
    platform: 'Web and mobile',
    stack: designTools,
  },
  tldr: {
    problem:
      'HR administrators were making errors while setting up multi-tier tax and payroll rules, and mistakes only surfaced after saving.',
    did: 'As lead designer I owned the UX from start to finish: research, wireframes, user flows and high-fidelity prototypes for payroll, subscription billing and loyalty, through to developer handoff.',
    result:
      'Rule configuration redesigned with progressive disclosure and real-time inline validation, reducing configuration errors for HR administrators.',
    metrics: [
      { value: '50+', label: 'Enterprise clients on the product' },
      { value: '3', label: 'Modules designed end to end', detail: 'Payroll · billing · loyalty' },
    ],
  },
  challenge: {
    intro: [
      'Loyaltri is a SaaS product from Orange Office Technologies. It runs payroll, subscription billing and loyalty programmes for more than 50 enterprise clients.',
      'The hardest part was rule configuration. Tax and payroll rules come in several tiers, and HR administrators were making errors while setting them up.',
      'The configuration screens asked administrators to hold too many settings in their head at once, and mistakes only surfaced after saving.',
    ],
    affected: 'HR administrators setting up tax and payroll rules, and the employees those rules pay.',
    mattered: 'A wrong payroll rule is not a cosmetic bug. It ends up in someone’s salary.',
    constraints: [
      'Tax and payroll rules come in several tiers.',
      'One product covers payroll, subscription billing and loyalty for 50+ enterprise clients.',
      'Data rules and edge cases had to be agreed with developers before high-fidelity design.',
    ],
  },
  role: {
    owned: [
      'End-to-end UX (wireframes, user flows, high-fidelity prototypes) for payroll, subscription billing and loyalty modules used by 50+ enterprise clients.',
      'Redesigned multi-tier tax and payroll rule configuration with progressive disclosure and real-time inline validation, reducing configuration errors for HR administrators.',
      'Research: stakeholder interviews with the product owner and the people who support HR teams, and a heuristic evaluation of the existing configuration screens.',
      'Developer handoff for all three modules.',
    ],
    team: [
      teamNote,
      'I reviewed wireframes with the product owner and developers early, so data rules and edge cases were agreed before high-fidelity design.',
    ],
  },
  process: [
    {
      step: 'Research',
      text: 'Stakeholder interviews, then a walk through the existing configuration screens as an HR administrator would, with a heuristic evaluation.',
    },
    {
      step: 'Insight',
      text: 'Administrators work tier by tier, and need to know a rule is wrong while they are typing it, not after saving a payroll run.',
    },
    {
      step: 'Flow',
      text: 'I mapped how an HR administrator moves through payroll, billing and loyalty setup before drawing any screens.',
    },
    {
      step: 'Wireframes',
      text: 'Low-fidelity wireframes settled structure and step order, reviewed early with the product owner and developers.',
    },
    {
      step: 'Final UI',
      text: 'Real-time inline validation checks each rule as it is entered, right next to the field that caused the mistake.',
    },
  ],
  solution: {
    intro:
      'Rule configuration got the most attention. Administrators see one tier at a time, and every rule is checked as it is entered.',
    features: [
      {
        icon: 'layers',
        title: 'Progressive disclosure',
        text: 'Administrators only see the settings for the tier they are working on, not every option at once.',
      },
      {
        icon: 'list-checks',
        title: 'One tier at a time',
        text: 'Each tier is confirmed before the next one opens, so the flow always has one clear next step.',
      },
      {
        icon: 'shield-check',
        title: 'Real-time inline validation',
        text: 'A mistake shows up next to the field that caused it, instead of after saving.',
      },
      {
        icon: 'layout-dashboard',
        title: 'Three modules, one product',
        text: 'Payroll, subscription billing and loyalty, designed end to end for 50+ enterprise clients.',
      },
    ],
  },
  decisions: [
    {
      title: 'Show one tier at a time',
      why: 'Administrators work tier by tier. Progressive disclosure did more for error rates than any visual change.',
      notChosen: 'One configuration screen with every setting visible at once.',
    },
    {
      title: 'Validate while typing, not after saving',
      why: 'Administrators need to know a rule is wrong while they are typing it, not after they have saved a payroll run.',
      notChosen: 'Errors that only surface after save.',
    },
    {
      title: 'Design the error states with the happy path',
      why: 'Validation is part of the interface, not a developer detail. Designing error states alongside the happy path saved a round of rework.',
      notChosen: 'Leaving error handling for developers to decide during build.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Error-prone rule configuration',
      items: [
        'Too many settings to hold in your head at once',
        'Every tier’s options on screen together',
        'Mistakes only surfaced after saving',
        'A wrong rule could end up in someone’s salary',
      ],
    },
    after: {
      title: 'Guided, validated configuration',
      items: [
        'Only the current tier’s settings on screen',
        'Each tier confirmed before the next opens',
        'Real-time inline validation next to the field',
        'One clear next step at every point',
      ],
    },
  },
  results: {
    metrics: [
      { value: '50+', label: 'Enterprise clients on the product' },
      { value: '3', label: 'Modules designed end to end', detail: 'Payroll, billing, loyalty' },
    ],
    impact:
      'Progressive disclosure and real-time inline validation reduced configuration errors for HR administrators, on a product used by more than 50 enterprise clients.',
  },
  learned: [
    'In data-heavy products the best design decision is often what to hide. Progressive disclosure did more for error rates than any visual change.',
    'Validation is part of the interface, not a developer detail. Designing the error states alongside the happy path saved a round of rework.',
  ],
  stack: [...designTools, 'Stakeholder interviews', 'Heuristic evaluation', 'User flows', 'Wireframes', 'Prototyping'],
  links: [{ label: 'Figma file', href: 'https://www.figma.com/design/0npQmAvx6Nscf4k6FWUJlL' }],
  seo: {
    title: 'Loyaltri: payroll & billing UX case study',
    description:
      'How Dinesh Kumar designed payroll, subscription billing and loyalty modules for 50+ enterprise clients, with progressive disclosure and real-time inline validation.',
  },
};

const medcare: Project = {
  slug: 'medcare',
  name: 'MedCare',
  category: 'Healthcare · Patient mobile app',
  accent: '#1E5CF9',
  accent2: '#5EEAD4',
  // [TODO: replace with MedCare's own screens; these files are placeholders from an earlier healthcare app]
  cover: '/projects/novacare-cover.webp',
  coverMd: '/projects/novacare-cover-md.webp',
  coverAlt: 'Patient app on three phones: a welcome screen, home with live consult and health insights, and a doctor search list.',
  outcome: 'A 3-tap booking flow that raised appointment completion by 25%',
  summary: 'A patient app for booking appointments, medical records and telehealth.',
  cardMetric: { value: '+25%', label: 'Appointment completion' },
  tags: ['Healthcare', 'Mobile', 'Accessibility'],
  meta: {
    role: 'Lead Designer',
    duration: '3–4 months',
    team: '3-person team, design led by me',
    platform: 'Web and mobile',
    stack: designTools,
  },
  tldr: {
    problem:
      'Clinical terms in the booking process got in the way of patients trying to see a doctor, and every extra screen was a point where they could give up.',
    did: 'As lead designer I took the patient flows for appointment booking, medical records and telehealth from research to high-fidelity prototypes and developer handoff.',
    result: 'Booking now takes three taps in plain language, and appointment completion rose 25%.',
    metrics: [
      { value: '+25%', label: 'Appointment completion' },
      { value: '3', label: 'Taps to book an appointment' },
    ],
  },
  challenge: {
    intro: [
      'MedCare is a patient app on web and mobile. Appointment booking, medical records and telehealth sit in one place.',
      'Booking an appointment should not need a medical vocabulary. The clinical terms in the booking process got in the way of patients trying to see a doctor.',
    ],
    affected: 'Patients of every age booking appointments, checking records and joining telehealth calls.',
    mattered: 'Every extra screen and unfamiliar word was a point where a patient could give up before the booking was done.',
    constraints: [
      'Patients think in plain terms, not in departments and procedure names.',
      'The app had to stay usable for patients of every age, in line with WCAG 2.1 AA.',
      'Booking, records and telehealth had to live in one app on web and mobile.',
    ],
  },
  role: {
    owned: [
      'Patient flows for appointment booking, medical records and telehealth.',
      'Clinical terminology simplified into a 3-tap booking flow.',
      'Usability testing on the booking flow, a heuristic evaluation of the existing screens, and analytics to see where patients left the flow.',
      'Interactive prototypes, high-fidelity design and developer handoff.',
    ],
    team: [teamNote],
  },
  process: [
    {
      step: 'Research',
      text: 'Usability testing on the booking flow, a heuristic evaluation of the existing screens, and analytics on where patients left.',
    },
    {
      step: 'Insight',
      text: 'Patients think in plain terms: what is wrong, which doctor, what time. Fewer decisions per screen meant more finished bookings.',
    },
    {
      step: 'Flow',
      text: 'I cut booking down to three taps and replaced clinical terms with plain words patients already use.',
    },
    {
      step: 'Wireframes',
      text: 'Booking, records and telehealth in low fidelity first, then clickable prototypes tested with patients.',
    },
    {
      step: 'Final UI',
      text: 'Large tap targets, plain labels and clear focus states, in line with WCAG 2.1 AA.',
    },
  ],
  solution: {
    intro:
      'Choose what you need, pick a doctor and a time, confirm. Records and telehealth sit one step away from the same home screen.',
    features: [
      { icon: 'calendar', title: '3-tap booking', text: 'Choose what you need, pick a doctor and a time, confirm.' },
      { icon: 'file-text', title: 'Plain language', text: 'Clinical terms replaced with plain words patients already use.' },
      {
        icon: 'video',
        title: 'Records & telehealth',
        text: 'Medical records and telehealth sit one step away from the same home screen.',
      },
      {
        icon: 'users',
        title: 'Usable at every age',
        text: 'Large tap targets, plain labels and clear focus states, in line with WCAG 2.1 AA.',
      },
    ],
  },
  decisions: [
    {
      title: 'Plain words over clinical terms',
      why: 'Patients think in what is wrong, which doctor and what time. Changing the words did as much for completion as changing the layout.',
      notChosen: 'Departments and procedure names in the booking flow.',
    },
    {
      title: 'Fewer decisions per screen',
      why: 'The fewer decisions per screen, the more bookings were finished, so booking became three taps.',
      notChosen: 'A longer booking flow with every option up front.',
    },
    {
      title: 'Test a clickable prototype early',
      why: 'Testing the three-tap flow with patients showed problems that would have been expensive to find after build.',
      notChosen: 'Locking the visual design before testing the flow.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Booking needed a medical vocabulary',
      items: [
        'Clinical terms in the booking process',
        'Extra screens before a booking was done',
        'Many decisions on each screen',
        'Points where patients could give up',
      ],
    },
    after: {
      title: 'Three taps in plain language',
      items: [
        'Choose what you need, pick a doctor and a time, confirm',
        'Plain words patients already use',
        'Records and telehealth one step from home',
        'Large tap targets and clear focus states (WCAG 2.1 AA)',
      ],
    },
  },
  results: {
    metrics: [
      { value: '+25%', label: 'Appointment completion' },
      { value: '3', label: 'Taps to book an appointment' },
    ],
    impact: 'Plain language and a three-tap flow helped more patients finish booking: appointment completion rose 25%.',
  },
  learned: [
    'Plain language is a design tool. Changing the words did as much for completion as changing the layout.',
    'Testing a clickable prototype early showed us problems that would have been expensive to find after build.',
  ],
  stack: [...designTools, 'Usability testing', 'Heuristic evaluation', 'Analytics', 'Prototyping', 'WCAG 2.1 AA'],
  links: [{ label: 'Figma file', href: 'https://www.figma.com/design/AFBBvjWdp7wJBpWa7QP71s' }],
  seo: {
    title: 'MedCare: patient app UX case study',
    description:
      'How Dinesh Kumar designed a patient app for booking, records and telehealth, with a 3-tap booking flow that raised appointment completion by 25%.',
  },
};

const monkifyai: Project = {
  slug: 'monkifyai',
  name: 'MonkifyAI',
  category: 'AI · Recruitment platform',
  accent: '#6A48F9',
  accent2: '#06B6D4',
  cover: '/projects/monkify-cover.webp',
  coverMd: '/projects/monkify-cover-md.webp',
  coverAlt:
    'MonkifyAI mobile screens: splash, sign-in, registration, recruiter home, candidate list, job details and verification code.',
  outcome: 'AI candidate search that cut shortlisting time by 40%',
  summary: 'AI candidate search with blockchain credential checks, built for recruiters.',
  cardMetric: { value: '40%', label: 'Less shortlisting time' },
  tags: ['AI product design', 'Dashboards', 'Trust & verification'],
  meta: {
    role: 'Lead Designer',
    duration: '3–4 months',
    team: '3-person team, design led by me',
    platform: 'Web and mobile',
    stack: designTools,
  },
  tldr: {
    problem:
      'Recruiters want deep search, but every extra filter is one more thing to keep in their head. AI results also have to earn trust.',
    did: 'As lead designer I took the AI-driven search experience and the recruiter dashboard from research to developer handoff.',
    result:
      'Customisable filter chips, modular dashboard widgets and verified-credential badges cut shortlisting time by 40%.',
    metrics: [
      { value: '40%', label: 'Less time spent shortlisting' },
      { value: '2', label: 'Audiences served', detail: 'Recruiters and job seekers' },
    ],
  },
  challenge: {
    intro: [
      'MonkifyAI is a recruitment platform. Recruiters find candidates through AI-driven search, and candidate credentials are verified on a blockchain.',
      'Recruiters want deep search. But every extra filter is one more thing to keep in their head. The design had to give them depth without the clutter.',
    ],
    affected: 'Recruiters searching and shortlisting candidates, and the job seekers being matched.',
    mattered:
      'AI results need to earn trust. A recruiter has to see why a candidate appears and whether their credentials are real.',
    constraints: [
      'Search depth had to be balanced against recruiter cognitive load.',
      'Verification only helps if it is visible at the moment of decision.',
      'Two audiences: recruiters and job seekers.',
    ],
  },
  role: {
    owned: [
      'AI-driven candidate search with blockchain credential verification.',
      'Modular dashboard widgets and customisable filter chips that balance search depth against recruiter cognitive load.',
      'Stakeholder interviews with the product team, and a step-by-step walkthrough of how recruiters search and shortlist today.',
      'The search experience and recruiter dashboard, from research to developer handoff.',
    ],
    team: [teamNote],
  },
  process: [
    {
      step: 'Research',
      text: 'Stakeholder interviews with the product team, and a step-by-step walkthrough of how recruiters search and shortlist today.',
    },
    {
      step: 'Insight',
      text: 'Recruiters reuse a small set of filters most of the time, and verification only helps when it is visible at the moment of decision.',
    },
    {
      step: 'Flow',
      text: 'Search is built around filter chips. Recruiters compare, check credentials and shortlist without leaving the page.',
    },
    {
      step: 'Wireframes',
      text: 'The widget set and dashboard layout in wireframes, exploring options quickly with AI-assisted tools like Uizard.',
    },
    {
      step: 'Final UI',
      text: 'Verified credentials carry a clear badge right in the results, so trust is visible without an extra click.',
    },
  ],
  solution: {
    intro:
      'From search results a recruiter can compare, check verified credentials and shortlist without leaving the page.',
    features: [
      {
        icon: 'sparkles',
        title: 'AI-driven candidate search',
        text: 'Recruiters find candidates through AI-driven search across the platform.',
      },
      {
        icon: 'target',
        title: 'Customisable filter chips',
        text: 'Recruiters add the filters they need and leave out the ones they don’t.',
      },
      {
        icon: 'layout-dashboard',
        title: 'Modular dashboard widgets',
        text: 'The recruiter dashboard is made of modular widgets, laid out in wireframes before any visual design.',
      },
      {
        icon: 'shield-check',
        title: 'Verified credential badges',
        text: 'Blockchain-verified credentials carry a clear badge in the results.',
      },
    ],
  },
  decisions: [
    {
      title: 'Filters recruiters shape themselves',
      why: 'Recruiters reuse a small set of filters most of the time. Letting users shape their own filters beat designing one perfect panel for everyone.',
      notChosen: 'One fixed filter panel with every option.',
    },
    {
      title: 'Verification visible in the results',
      why: 'Verification only helps at the moment of decision, so the badge sits in the results instead of inside a profile.',
      notChosen: 'Credential details hidden in the candidate profile.',
    },
    {
      title: 'Explain the AI result',
      why: 'With AI features, explaining the result matters as much as the result. Recruiters trusted matches more when they could see the reasons.',
      notChosen: 'An unexplained list of AI matches.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Depth meant clutter',
      items: [
        'Every extra filter one more thing to remember',
        'No clear reason why a candidate appears',
        'Credentials hidden away in a profile',
      ],
    },
    after: {
      title: 'Deep search, calm interface',
      items: [
        'Filter chips recruiters add and remove',
        'Verified badge right in the results',
        'Compare, verify and shortlist on one page',
        'A dashboard of modular widgets',
      ],
    },
  },
  results: {
    metrics: [
      { value: '40%', label: 'Less time spent shortlisting' },
      { value: '2', label: 'Audiences served', detail: 'Recruiters and job seekers' },
    ],
    impact: 'Recruiters search deeper without the clutter, and shortlist 40% faster with trust visible in every result.',
  },
  learned: [
    'With AI features, explaining the result matters as much as the result. Recruiters trusted matches more when they could see the reasons.',
    'Letting users shape their own filters beat trying to design one perfect filter panel for everyone.',
  ],
  stack: [...designTools, 'Uizard', 'Stakeholder interviews', 'Wireframes', 'Dashboard design', 'Prototyping'],
  links: [{ label: 'Figma file', href: 'https://www.figma.com/design/Ox1ACsCYyqnWhx6mmIpwnZ' }],
  seo: {
    title: 'MonkifyAI: AI recruitment UX case study',
    description:
      'How Dinesh Kumar designed AI candidate search with blockchain credential checks for recruiters, cutting shortlisting time by 40%.',
  },
};

const aura: Project = {
  slug: 'aura',
  name: 'Aura',
  category: 'Fintech · B2C digital wallet',
  accent: '#3D3BF3',
  accent2: '#F59E0B',
  cover: '/projects/aura-cover.webp',
  coverMd: '/projects/aura-cover-md.webp',
  coverAlt:
    'Aura app screens: home with card and accounts, send money, review transfer, choose country, scan QR, pay bill, insurance, ATM locator and gift cards.',
  outcome: 'A mobile-first wallet with 20% higher checkout conversion',
  summary: 'A mobile-first wallet: onboarding, KYC, history and checkout.',
  cardMetric: { value: '+20%', label: 'Checkout conversion' },
  tags: ['Fintech', 'Mobile-first', 'WCAG 2.1 AA'],
  meta: {
    role: 'Lead Designer',
    duration: '3–4 months',
    team: '3-person team, design led by me',
    platform: 'Web and mobile',
    stack: designTools,
  },
  tldr: {
    problem:
      'Every extra verification step was another place to give up, and unclear payment states at checkout made people hesitate, retry or leave.',
    did: 'As lead designer I took Aura’s mobile-first payment flows (onboarding, KYC, transaction history and checkout) from research to developer handoff.',
    result:
      'Multi-step verification became a single-screen biometric flow, checkout conversion rose 20%, and the flows meet WCAG 2.1 AA.',
    metrics: [
      { value: '+20%', label: 'Checkout conversion' },
      { value: 'AA', label: 'WCAG 2.1 compliance across the flows' },
    ],
  },
  challenge: {
    intro: [
      'Aura is a digital wallet for consumers. A wallet has to verify who you are. But every extra verification step is another place to give up.',
      'People also need to trust that a payment went through.',
    ],
    affected: 'Consumers signing up, verifying their identity and paying with the wallet.',
    mattered: 'An unclear state at checkout makes people hesitate, retry or leave.',
    constraints: [
      'A wallet has to verify who you are.',
      'Mobile-first, across onboarding, KYC, history and checkout.',
      'The flows had to meet WCAG 2.1 AA.',
    ],
  },
  role: {
    owned: [
      'Mobile-first payment flows (onboarding, KYC, transaction history, checkout) with micro-interactions that build trust.',
      'Multi-step verification collapsed into a single-screen biometric flow, with full WCAG 2.1 AA compliance.',
      'A UX audit of onboarding and checkout, funnel analysis to find drop-off, and A/B tests of key variants.',
      'Interactive prototypes with micro-interaction specs, and developer handoff.',
    ],
    team: [teamNote],
  },
  process: [
    {
      step: 'Research',
      text: 'A UX audit of onboarding and checkout, funnel analysis to find where people dropped off, and A/B tests of key variants.',
    },
    {
      step: 'Insight',
      text: 'Most drop-off sat in verification and at the final payment step: effort and uncertainty, not missing features.',
    },
    {
      step: 'Flow',
      text: 'I collapsed multi-step verification into one biometric screen, with one shared pattern across all four flows.',
    },
    {
      step: 'Wireframes',
      text: 'Onboarding, KYC, history and checkout wireframed as one connected set, then prototyped with micro-interaction specs.',
    },
    {
      step: 'Final UI',
      text: 'Micro-interactions confirm each payment state, and the flows meet WCAG 2.1 AA.',
    },
  ],
  solution: {
    intro:
      'Onboarding, KYC, history and checkout share one pattern, so what people learn in one step carries to the next.',
    features: [
      {
        icon: 'scan',
        title: 'Single-screen biometric verification',
        text: 'The multi-step verification collapsed into one biometric screen.',
      },
      {
        icon: 'layers',
        title: 'One shared pattern',
        text: 'What people learn in one flow carries to the next, from onboarding to checkout.',
      },
      {
        icon: 'sparkles',
        title: 'Trust-building micro-interactions',
        text: 'Each payment state is confirmed, so people can see their money went where they meant it to.',
      },
      {
        icon: 'shield-check',
        title: 'WCAG 2.1 AA',
        text: 'Clear focus states and contrast help every user move faster.',
      },
    ],
  },
  decisions: [
    {
      title: 'One biometric screen instead of many steps',
      why: 'Most drop-off sat in verification, and it was about effort, not missing features.',
      notChosen: 'Keeping verification as several separate steps.',
    },
    {
      title: 'Confirm every payment state',
      why: 'In payments, feedback is the product. Small, clear confirmations did more for trust than any visual polish.',
      notChosen: 'Leaving payment status for people to guess at checkout.',
    },
    {
      title: 'Validate before build',
      why: 'A/B tests of key variants and prototypes with micro-interaction specs validated timing and feedback before build.',
      notChosen: 'Tuning timing and feedback after release.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Effort and uncertainty',
      items: [
        'Multi-step verification',
        'Unclear payment state at checkout',
        'People hesitating, retrying or leaving',
        'Drop-off in verification and at the final payment step',
      ],
    },
    after: {
      title: 'Fast and certain',
      items: [
        'Single-screen biometric verification',
        'Micro-interactions confirm each payment state',
        'One shared pattern across all four flows',
        'WCAG 2.1 AA across the flows',
      ],
    },
  },
  results: {
    metrics: [
      { value: '+20%', label: 'Checkout conversion' },
      { value: 'AA', label: 'WCAG 2.1 compliance across the flows' },
    ],
    impact: 'Less effort at verification and clear feedback at checkout: conversion rose 20%, with accessible flows for everyone.',
  },
  learned: [
    'In payments, feedback is the product. Small, clear confirmations did more for trust than any visual polish.',
    'Accessibility made the flow better for everyone: clear focus states and contrast helped every user move faster.',
  ],
  stack: [...designTools, 'UX audit', 'Funnel analysis', 'A/B testing', 'Micro-interactions', 'WCAG 2.1 AA'],
  links: [{ label: 'Figma file', href: 'https://www.figma.com/design/VwyjnjVnCKGmv3S9XpOeSL' }],
  seo: {
    title: 'Aura: digital wallet UX case study',
    description:
      'How Dinesh Kumar designed Aura’s mobile-first wallet flows, with single-screen biometric verification and a 20% lift in checkout conversion.',
  },
};

/** Display order on the home page and for "next project". */
export const projects: Project[] = [loyaltri, medcare, monkifyai, aura];

export const workSection = {
  eyebrow: 'Selected work',
  title: 'Four products, drawn in three layers.',
  text: 'Each project starts as a wireframe, becomes a user flow and ends as the final interface: the problem, my role, the decisions and the measured result.',
};

export const seo = {
  home: {
    title: 'Dinesh Kumar · UI/UX & Product Designer',
    description:
      'Senior UI/UX & Product Designer in Chennai with 7+ years designing SaaS, fintech, healthcare and AI products: research, design systems, accessibility and developer handoff.',
  },
  ogImage: '/og-image.png',
};
