/**
 * ALL site content lives in this file: every word, number, link and image path.
 *
 * Sources: Dinesh_Kumar_AI_ML_Engineer_Resume.pdf (public/resume.pdf), the ten
 * project images in public/projects/, and Dinesh's own answers about Monkify's ML work.
 *
 * Anything written as "[TODO: …]" is a note to you. It is never shown on the site:
 * the UI strips TODO markers, and hides a line or chip that is only a TODO.
 * Replace a TODO with the real value and it appears automatically.
 */

export const SITE_URL = 'https://graphic-designer-portfolio-ruddy.vercel.app';

// ───────────────────────────────────────────── types

export type Metric = {
  /** Display value. Numbers inside it count up, e.g. "+65%", "−40%", "4.8/5". */
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

export type MlDeepDive = {
  kind: 'deep-dive';
  intro: string;
  data: { text: string; facts: Fact[] };
  model: { text: string; facts: Fact[] };
  evaluation: {
    text: string;
    facts: Fact[];
    /** Rows = actual class, columns = predicted class. */
    confusion: { labels: string[]; matrix: number[][] };
    curvesImage: string;
    curvesAlt: string;
    curvesNote: string;
    reading: string[];
  };
  serving: { text: string; facts: Fact[] };
  architecture: { title: string; caption: string; nodes: { title: string; sub: string }[]; loop: string };
};

export type AiFeatures = {
  kind: 'features';
  intro: string;
  features: Feature[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Accent colours sampled from the project's own images. */
  accent: string;
  accent2: string;
  cover: string;
  coverMd: string;
  coverAlt: string;
  secondary: string;
  secondaryAlt: string;
  secondaryTitle: string;
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
  ai: MlDeepDive | AiFeatures;
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
  role: 'AI/ML Engineer',
  resumeHeadline: 'AI/ML Engineer | Generative AI & LLM Applications | Machine Learning | AI Product Engineering',
  /** What I do and for whom. Condensed from the resume summary. */
  headline:
    'I turn machine learning and LLMs into reliable, easy-to-use product features for B2B SaaS teams in HR-tech, recruitment, fintech and healthcare.',
  valueProp:
    '7+ years building B2B SaaS. Now building ML models and LLM-powered applications, from data preparation to deployment.',
  availability: 'Open to opportunities',
  location: 'Chennai, India',
};

export const contact = {
  email: 'dineshkumarsn33@gmail.com',
  phoneDisplay: '+91 99521 29182',
  phoneHref: 'tel:+919952129182',
  whatsapp: 'https://wa.me/919952129182',
  linkedin: 'https://www.linkedin.com/in/dinesh-karthi-9224ba205',
  github: 'https://github.com/dineshkarthi12',
  resumeView: 'https://drive.google.com/file/d/1MQVeaNZ5d9a4A7Qndk7tnN0jfM_s2qzU/view',
  resumePdf: '/resume.pdf',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chennai%2C%20India',
};

// ───────────────────────────────────────────── home page

export const impactAtAGlance: (Metric & { source: string })[] = [
  { value: '60%', label: 'Reduced hiring time', source: 'Monkify AI' },
  { value: '−70%', label: 'Payment failures', source: 'Veyro · Aura' },
  { value: '+65%', label: 'Appointment bookings', source: 'NovaCare' },
  { value: '96%', label: 'Payment success, up from 78%', source: 'Aura' },
];

export const about = {
  eyebrow: 'About',
  title: 'Models are only useful when people can use them.',
  bio: [
    "I'm an AI/ML engineer with 7+ years of experience building B2B SaaS products for HR-tech, recruitment, fintech and healthcare.",
    'I build LLM-powered applications with Python, LangChain, RAG pipelines and vector databases, and machine learning models with scikit-learn, XGBoost and PyTorch, from data preparation and model evaluation to deployment with FastAPI, Docker and Streamlit.',
    'My front-end, data-visualisation and UX background helps me turn models into reliable, easy-to-use product features.',
  ],
  stats: [
    { value: '7+', label: 'Years of experience' },
    { value: '6', label: 'SaaS products led at Orange Office' },
    { value: '35%', label: 'Fewer visual inconsistencies from my design system' },
    { value: '5', label: 'Junior designers mentored' },
  ] as Metric[],
};

export type SkillGroup = { id: string; title: string; short: string; groups: { name: string; items: string[] }[] };

/** Six orbit rings in the 3D scene, one per group. Every item is taken word for word from the resume. */
export const skills: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    short: 'Languages',
    groups: [{ name: 'Programming', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bash'] }],
  },
  {
    id: 'ml',
    title: 'ML / Deep Learning',
    short: 'ML / DL',
    groups: [
      {
        name: 'Machine learning',
        items: [
          'Supervised and unsupervised learning', 'Regression', 'Classification', 'Clustering',
          'Feature engineering', 'Model evaluation (precision, recall, F1, ROC-AUC)', 'Cross-validation',
          'Hyperparameter tuning', 'scikit-learn', 'XGBoost', 'SHAP',
        ],
      },
      {
        name: 'Deep learning',
        items: [
          'PyTorch', 'TensorFlow', 'Keras', 'Neural networks', 'CNNs', 'RNNs/LSTMs', 'Transformers',
          'Transfer learning', 'Fine-tuning',
        ],
      },
      {
        name: 'Computer vision',
        items: [
          'OpenCV', 'Image classification', 'Object detection (YOLO)', 'OCR', 'Stable Diffusion',
          'Hugging Face Diffusers', 'Adobe Firefly',
        ],
      },
    ],
  },
  {
    id: 'llm',
    title: 'LLM / Generative AI',
    short: 'LLM / GenAI',
    groups: [
      {
        name: 'Generative AI & LLMs',
        items: [
          'OpenAI GPT', 'Claude', 'Gemini', 'Llama', 'Hugging Face Transformers', 'LangChain', 'LlamaIndex',
          'Retrieval-Augmented Generation (RAG)', 'Prompt engineering', 'Embeddings', 'AI agents',
          'Tool calling', 'LoRA/PEFT fine-tuning', 'LLM evaluation',
        ],
      },
      {
        name: 'NLP',
        items: [
          'Text classification', 'Named entity recognition', 'Sentiment analysis', 'Semantic search',
          'Resume parsing', 'Job matching', 'Sentence-Transformers', 'spaCy', 'NLTK',
        ],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & Vector Stores',
    short: 'Data',
    groups: [
      {
        name: 'Data & analytics',
        items: [
          'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'Jupyter',
          'Exploratory data analysis', 'Data cleaning', 'Data visualisation', 'Dashboards',
        ],
      },
      { name: 'Databases & vector stores', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Pinecone', 'ChromaDB', 'FAISS'] },
    ],
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    short: 'MLOps',
    groups: [
      {
        name: 'MLOps & deployment',
        items: [
          'FastAPI', 'Flask', 'REST APIs', 'Streamlit', 'Gradio', 'Docker', 'Git', 'GitHub Actions', 'MLflow',
          'AWS (SageMaker, EC2, S3)', 'Azure OpenAI', 'Google Cloud Vertex AI',
        ],
      },
    ],
  },
  {
    id: 'product',
    title: 'AI Product & UX',
    short: 'Product / UI',
    groups: [
      {
        name: 'AI product & UX',
        items: [
          'AI feature design', 'Human-in-the-loop workflows', 'Figma', 'Figma AI', 'Figma Make', 'Prototyping',
          'Design systems', 'WCAG 2.1 AA accessibility',
        ],
      },
    ],
  },
];

export const collaboration = [
  'Agile/Scrum', 'Jira', 'Cross-functional product and engineering teams', 'Stakeholder presentations', 'Mentoring',
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

export const experience: Role[] = [
  {
    title: 'Senior UI/UX & Product Designer',
    company: 'Orange Office Technologies',
    location: 'Chennai',
    period: 'Sep 2020 – Present',
    impact: [
      'Led product and AI feature design for 6 SaaS products across HR-tech, recruitment, fintech and healthcare, in Agile/Scrum sprints with engineering and product teams.',
      'Built a Figma design system with reusable components and design tokens, reducing visual inconsistencies by 35%.',
      "Simplified Auvia's healthcare appointment booking flow, increasing appointment completion by 25%.",
    ],
    more: [
      'Designed AI feature experiences: prompt inputs, model output display, confidence and fallback states, and human-in-the-loop review flows.',
      'Built AI-assisted workflows with Claude, Adobe Firefly, Figma AI and Figma Make, using prompt engineering for faster concepting and prototyping.',
      'Produced 50+ product demo and explainer videos and 300+ launch assets; mentored 5 junior designers and presented to clients and leadership.',
    ],
    products: ['Loyaltri', 'Monkify AI', 'NovaCare', 'Veyro', 'Aura', 'Auvia'],
  },
  {
    title: 'UI/UX Designer & Front-End Developer',
    company: 'Qmax',
    location: '[TODO: location]',
    period: 'Mar 2019 – Sep 2020',
    impact: [
      'Designed and built real-time analytics dashboards and data visualisations, driving a 20% increase in user engagement.',
      'Created a reusable component and pattern library that sped up design-to-development handoff by 40%.',
      'Developed responsive front-end interfaces with HTML, CSS and JavaScript, working closely with backend developers on API integration.',
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
];

// ───────────────────────────────────────────── shared copy

/** From the resume: how I design AI features. Shown on every case study with an AI-features section. */
export const aiDesignPrinciple =
  'How I design AI features: clear prompt inputs, readable model output, confidence and fallback states, and human-in-the-loop review where it matters.';

export const ctaCopy = {
  title: "Like this work? Let's talk.",
  text: "I'm open to AI/ML engineering roles where models have to work for real users.",
};

export const contactSection = {
  eyebrow: 'Contact',
  title: "Let's build something intelligent.",
  text: 'Hiring for an AI/ML engineer, or have a product that needs ML that people can actually use? I reply to every message.',
};

// ───────────────────────────────────────────── projects

const monkify: Project = {
  slug: 'monkify-ai',
  name: 'Monkify AI',
  category: 'AI recruitment · iOS & Android',
  accent: '#6A48F9',
  accent2: '#06B6D4',
  cover: '/projects/monkify-cover.webp',
  coverMd: '/projects/monkify-cover-md.webp',
  coverAlt:
    'Monkify AI mobile screens: splash, sign-in, registration, recruiter home, candidate list, job details and verification code.',
  secondary: '/projects/monkify-results.webp',
  secondaryAlt:
    'Monkify AI results: training curves, a confusion matrix, before and after AI resume screening, candidate shortlisting, interview insights and job match scores.',
  secondaryTitle: 'Before vs after AI resume screening',
  outcome: 'Cut hiring time by 60% with AI-powered resume screening',
  summary: 'An AI recruitment app that screens resumes, scores job matches and helps recruiters shortlist faster.',
  cardMetric: { value: '60%', label: 'Reduced hiring time' },
  tags: ['Machine learning', 'NLP', 'Mobile'],
  meta: {
    role: 'ML engineering & product design',
    duration: '[TODO: project duration]',
    team: '[TODO: team size and roles]',
    platform: 'iOS & Android',
    stack: ['Python', 'TF-IDF', 'FastAPI', 'Docker', 'AWS', 'Figma'],
  },
  tldr: {
    problem: 'Recruiters screened every resume by hand, at about 2–3 minutes each, with inconsistent results.',
    did: 'I built a TF-IDF resume classifier, served it with FastAPI on AWS, and designed the matching and shortlisting flows around it.',
    result: 'Screening became 70% faster, 85% of surfaced candidates were relevant, and hiring time fell by 60%.',
    metrics: [
      { value: '70%', label: 'Faster screening' },
      { value: '85%', label: 'Relevant candidates' },
      { value: '60%', label: 'Reduced hiring time' },
      { value: '4.8/5', label: 'Recruiter satisfaction' },
    ],
  },
  challenge: {
    intro: [
      'Recruiters on Monkify reviewed every application by hand. At about 2–3 minutes per resume, one job post could eat hours before the first interview.',
      'Manual screening was also inconsistent, so shortlists were hard to trust.',
    ],
    affected: 'Recruiters and hiring managers screening applicants, and the candidates waiting to hear back.',
    mattered: 'Screening is the bottleneck before interviews. Every hour saved there shortens time-to-hire for the whole pipeline.',
    constraints: [
      'Predictions had to come back fast enough to feel instant inside a mobile app.',
      'Recruiters needed to stay in control: the AI ranks and explains, people decide.',
      '[TODO: data, privacy or budget constraints]',
    ],
  },
  role: {
    owned: [
      "I built the resume classification model: TF-IDF features and a classifier trained on Monkify's own platform data.",
      'I evaluated it on a train/validation/test split, with per-class precision, recall and F1.',
      'I served the model as a FastAPI service, containerised with Docker and deployed on AWS.',
      'I designed and built the candidate-to-job matching flow, AI job recommendations, job filters and recruiter shortlisting dashboards for iOS and Android.',
    ],
    team: [
      'Product and engineering teams shipped the iOS and Android apps with me in Agile/Scrum sprints.',
      '[TODO: team size and who owned the mobile and backend code]',
    ],
  },
  process: [
    { step: 'Research', text: 'I mapped how recruiters screened applicants. Manual review took about 2–3 minutes per resume.' },
    { step: 'Define', text: 'I framed screening as three classes (Relevant, Partially Relevant, Not Relevant) to match how recruiters triage.' },
    { step: 'Build', text: 'I built the TF-IDF + classifier pipeline and designed match scores, AI summaries and shortlisting into the app.' },
    { step: 'Test', text: 'I validated the model on a held-out test set of 300 resumes and with recruiter feedback on real shortlists.' },
    { step: 'Launch', text: 'I shipped the model behind a FastAPI service in Docker on AWS, powering the iOS and Android apps.' },
  ],
  solution: {
    intro: 'Monkify gives recruiters a ranked, explained shortlist instead of a pile of PDFs.',
    features: [
      { icon: 'brain', title: 'AI-powered screening', text: 'Every resume is classified as Relevant, Partially Relevant or Not Relevant in seconds.' },
      { icon: 'target', title: 'Job match score', text: 'Each candidate gets a match percentage per role, such as 92% for UI/UX Designer.' },
      { icon: 'sparkles', title: 'AI summary & interview insights', text: 'Recruiters read a short AI summary and generated interview insights on every profile.' },
      { icon: 'list-checks', title: 'One-tap shortlisting', text: 'Candidates move through Shortlisted, Interview and Hired from one list.' },
    ],
  },
  ai: {
    kind: 'deep-dive',
    intro:
      'I built the screening model end to end: data, features, training, evaluation and the API the apps call.',
    data: {
      text: "I trained on Monkify's own platform data: resumes and job posts collected through the app, labelled by relevance.",
      facts: [
        { label: 'Source', value: 'Monkify platform data (resumes and job posts)' },
        { label: 'Volume', value: '[TODO: number of resumes and jobs]' },
        { label: 'Labels', value: 'Relevant · Partially Relevant · Not Relevant' },
        { label: 'Test set', value: '300 resumes, 100 per class' },
      ],
    },
    model: {
      text: 'I turned resume and job text into TF-IDF features and trained a classifier to predict relevance in three classes: fast, light to serve and easy to explain.',
      facts: [
        { label: 'Features', value: 'TF-IDF vectors from resume and job text' },
        { label: 'Classifier', value: '[TODO: algorithm, e.g. Logistic Regression or SVM]' },
        { label: 'Classes', value: '3' },
        { label: 'Training', value: '25 epochs (see curves)' },
      ],
    },
    evaluation: {
      text: 'I tracked loss and accuracy on training and validation sets every epoch, then scored a held-out test set per class. Recruiters reviewed AI shortlists as a human-in-the-loop check.',
      facts: [
        { label: 'Split', value: 'Train / validation / test [TODO: split ratio]' },
        { label: 'Test accuracy', value: '84.7% (254 of 300 correct)' },
        { label: 'Human check', value: 'Recruiters reviewed AI shortlists: 4.8/5 satisfaction' },
      ],
      confusion: {
        labels: ['Relevant', 'Partially Relevant', 'Not Relevant'],
        matrix: [
          [92, 5, 3],
          [8, 78, 14],
          [4, 12, 84],
        ],
      },
      curvesImage: '/projects/monkify-curves.webp',
      curvesAlt:
        'Training and validation loss falling from about 0.7 to under 0.1, and accuracy rising toward 0.9 and above, over 25 epochs.',
      curvesNote: 'Loss falls steadily and levels off by epoch 25, and validation accuracy tracks training accuracy with a small gap.',
      reading: [
        'Relevant resumes are the easiest to spot: 92 of 100 were classified correctly, and only 3 were predicted Not Relevant.',
        'Partially Relevant is the hardest class (78% recall). Most of its errors fall next door, into Not Relevant.',
        'That is why recruiters stay in the loop: borderline candidates get a human look, not an automatic rejection.',
      ],
    },
    serving: {
      text: 'I wrapped the model in a FastAPI service, containerised it with Docker and deployed it on AWS. The iOS and Android apps call it for screening and shortlisting.',
      facts: [
        { label: 'API', value: 'FastAPI (Python)' },
        { label: 'Packaging', value: 'Docker' },
        { label: 'Cloud', value: 'AWS [TODO: service, e.g. EC2 or ECS]' },
        { label: 'Clients', value: 'Monkify iOS & Android apps' },
      ],
    },
    architecture: {
      title: 'How a resume becomes a shortlist',
      caption: 'From platform data to the recruiter app, with recruiter feedback closing the loop.',
      nodes: [
        { title: 'Platform data', sub: 'Resumes & job posts' },
        { title: 'TF-IDF', sub: 'Text → feature vectors' },
        { title: 'Classifier', sub: '3 relevance classes' },
        { title: 'FastAPI', sub: 'Docker on AWS' },
        { title: 'Recruiter app', sub: 'iOS & Android' },
      ],
      loop: 'Recruiter feedback',
    },
  },
  decisions: [
    {
      title: 'TF-IDF and a classic classifier, not a large transformer',
      why: 'It trains fast, serves cheaply from a small container, and its features explain each prediction.',
      notChosen: 'A fine-tuned transformer: heavier to serve and harder to explain for a first release.',
    },
    {
      title: 'Three relevance classes instead of yes/no',
      why: 'A "Partially Relevant" bucket mirrors how recruiters actually triage, and keeps borderline candidates visible.',
      notChosen: 'A binary filter that silently drops borderline resumes.',
    },
    {
      title: 'The recruiter makes the final call',
      why: 'The model ranks and summarises; recruiters shortlist. Keeping people in the loop earned a 4.8/5 satisfaction score.',
      notChosen: 'Auto-rejecting candidates without human review.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Time-consuming and inconsistent screening',
      items: [
        'Manual review of every resume',
        'About 2–3 minutes per resume',
        'Inconsistent screening decisions',
        'Stacks of resume PDFs reviewed one by one',
      ],
    },
    after: {
      title: 'Instant AI-powered analysis with clear insights',
      items: [
        'Instant relevance classification',
        'A match score per role (for example, 92% match)',
        'Skill checks such as React, Figma, UI/UX Design and Product Design',
        'An AI summary of every candidate',
      ],
    },
  },
  results: {
    metrics: [
      { value: '70%', label: 'Faster screening' },
      { value: '85%', label: 'Relevant candidates' },
      { value: '60%', label: 'Reduced hiring time' },
      { value: '4.8/5', label: 'Recruiter satisfaction' },
      { value: '84.7%', label: 'Test-set accuracy', detail: '254 of 300 resumes' },
    ],
    impact:
      'Recruiters now spend their time on interviews instead of inbox triage. Faster, more consistent screening shortens the path from job post to hire.',
    breakdowns: [
      {
        title: 'Job match score',
        caption: 'Example match scores for one candidate profile',
        rows: [
          { label: 'UI/UX Designer', value: 92, display: '92%' },
          { label: 'Product Designer', value: 78, display: '78%' },
          { label: 'Frontend Developer', value: 65, display: '65%' },
          { label: 'Graphic Designer', value: 52, display: '52%' },
          { label: 'Product Manager', value: 48, display: '48%' },
        ],
      },
    ],
  },
  learned: [
    'A simple, explainable model that ships beats a complex one that doesn’t. TF-IDF gave recruiters real value fast.',
    'The confusion matrix is a product tool, not just a metric: it showed exactly where recruiters needed to stay in the loop.',
    'Next, I’d test embedding-based semantic matching with Sentence-Transformers against the TF-IDF baseline, focusing on the Partially Relevant class.',
  ],
  stack: ['Python', 'TF-IDF', 'FastAPI', 'Docker', 'AWS', 'Figma'],
  links: [
    { label: 'Live app', href: '[TODO: App Store / Play Store link]' },
    { label: 'GitHub', href: '[TODO: repository link]' },
  ],
  seo: {
    title: 'Monkify AI: AI resume screening case study',
    description:
      'How Dinesh Kumar built a TF-IDF resume classifier served with FastAPI on AWS, cutting hiring time by 60% and screening time by 70%.',
  },
};

const loyaltri: Project = {
  slug: 'loyaltri',
  name: 'Loyaltri',
  category: 'AI HRMS · Web SaaS · India & GCC',
  accent: '#6A4EF4',
  accent2: '#A78BFA',
  cover: '/projects/loyaltri-cover.webp',
  coverMd: '/projects/loyaltri-cover-md.webp',
  coverAlt:
    'Loyaltri HR dashboard on a laptop: work schedule, leave balance, requests, today’s events, team members and a company feed.',
  secondary: '/projects/loyaltri-before-after.webp',
  secondaryAlt:
    'Before: paper forms, an old registration form and an employee list with no tracking. After: Loyaltri’s 4-step online onboarding with progress tracking.',
  secondaryTitle: 'Before vs after onboarding',
  outcome: 'Took employee onboarding 100% online for HR teams across India and the GCC',
  summary: 'An AI-powered HRMS covering onboarding, attendance, payroll, leave and recruitment.',
  cardMetric: { value: '100%', label: 'Online onboarding' },
  tags: ['HR-tech SaaS', 'People analytics', 'AI features'],
  meta: {
    role: 'Senior UI/UX & Product Designer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Web app (SaaS)',
    stack: ['Figma', '[TODO: other tools]'],
  },
  tldr: {
    problem: 'Onboarding ran on paper forms and scattered documents, which caused delays and errors.',
    did: "I designed Loyaltri's onboarding, attendance, payroll, leave and recruitment modules, plus its people-analytics dashboards.",
    result: 'Onboarding became a 100% online, 4-step flow with automatic validation and real-time tracking.',
    metrics: [
      { value: '100%', label: 'Online onboarding' },
      { value: '5', label: 'HR modules designed' },
      { value: '4', label: 'Guided onboarding steps' },
      { value: 'India + GCC', label: 'Client regions' },
    ],
  },
  challenge: {
    intro: [
      'HR teams handled onboarding manually, with paper forms and documents scattered across the business.',
      'Every new hire meant time-consuming data entry, a higher chance of human error and no way to see progress in real time.',
    ],
    affected: 'HR teams onboarding employees, and new hires waiting to get started.',
    mattered: 'Slow, error-prone onboarding delays a new hire’s first day and gets harder to manage as headcount grows.',
    constraints: [
      'One platform had to cover onboarding, attendance, payroll, leave and recruitment.',
      'It served client companies across India and the GCC.',
      '[TODO: timeline, compliance or localisation constraints]',
    ],
  },
  role: {
    owned: [
      'I designed the onboarding, attendance, payroll, leave and recruitment modules.',
      'I designed AI-driven HR features and people-analytics dashboards that turn attendance and payroll data into clear insights for HR teams.',
      'I designed the 4-step digital onboarding flow with live progress tracking.',
    ],
    team: [
      'Engineering and product teams built and shipped the platform with me in Agile/Scrum sprints.',
      '[TODO: team size]',
    ],
  },
  process: [
    { step: 'Research', text: 'I mapped the manual process and its pain points: paper forms, data entry, errors and no tracking.' },
    { step: 'Define', text: 'I broke onboarding into four steps: Personal Details, Work Details, Documents and Review.' },
    { step: 'Design', text: 'I designed the onboarding flow, HR modules and analytics dashboards on shared components.' },
    { step: 'Test', text: 'I reviewed each flow with product and engineering in sprint reviews before release.' },
    { step: 'Launch', text: 'Loyaltri rolled out to client companies across India and the GCC.' },
  ],
  solution: {
    intro: 'Loyaltri brings every HR task into one web app, starting with an onboarding flow people can finish on their own.',
    features: [
      { icon: 'list-checks', title: 'Guided 4-step onboarding', text: 'Personal details, work details, documents and review, with progress shown at every step.' },
      { icon: 'shield-check', title: 'Automatic data validation', text: 'Required fields are validated automatically, so fewer errors reach HR.' },
      { icon: 'activity', title: 'Real-time progress', text: 'HR sees each hire’s progress and status: Completed, In Progress or Pending.' },
      { icon: 'layout-dashboard', title: 'People-analytics dashboard', text: 'Work schedule, leave balance, requests, events and team in one view.' },
    ],
  },
  ai: {
    kind: 'features',
    intro: 'Loyaltri is an AI-powered HRMS. My job was to make its AI and data genuinely useful to HR teams.',
    features: [
      { icon: 'line-chart', title: 'People-analytics dashboards', text: 'Turn attendance and payroll data into clear insights for HR teams.' },
      { icon: 'sparkles', title: 'AI-driven HR features', text: 'Designed into the core HR workflows. [TODO: name the specific AI features]' },
    ],
  },
  decisions: [
    {
      title: 'Four short steps instead of one long form',
      why: 'The old registration form asked for everything at once. Steps with a progress ring make onboarding feel shorter and easier to finish.',
      notChosen: 'Restyling the single long form.',
    },
    {
      title: 'Save Draft at every step',
      why: 'New hires don’t always have every document to hand. Drafts let them finish later without losing work.',
      notChosen: 'Forcing onboarding to be completed in one sitting.',
    },
    {
      title: 'One status language everywhere',
      why: 'Completed, In Progress and Pending mean the same thing in the employee’s flow and in HR’s list, so nobody has to translate.',
      notChosen: 'Separate status systems for employees and HR.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Manual & time-consuming onboarding',
      items: [
        'Paper-based forms & physical documents',
        'Time-consuming data entry',
        'Higher chances of human error',
        'No real-time tracking',
        'Difficult to manage multiple employees',
      ],
    },
    after: {
      title: 'Streamlined & automated onboarding',
      items: [
        '100% online process',
        'Auto data validation',
        'Real-time tracking & status',
        'Integrated document upload',
        'Faster onboarding time',
      ],
    },
  },
  results: {
    metrics: [
      { value: '100%', label: 'Online onboarding process' },
      { value: '4', label: 'Guided steps with live progress' },
      { value: '5', label: 'HR modules on one platform' },
      { value: 'Real-time', label: 'Onboarding tracking & status' },
    ],
    impact:
      'Less manual work, more time for what matters. HR teams onboard people with fewer errors, and every hire’s progress is visible in real time.',
  },
  learned: [
    'Visibility matters as much as speed: people trust a process they can see.',
    'Shared components kept five HR modules consistent and faster to design.',
    'Next, I’d measure time-to-onboard per hire to put a hard number on “faster onboarding”.',
  ],
  stack: ['Figma', 'Design system', 'Data visualisation', '[TODO: other tools]'],
  links: [
    { label: 'Live product', href: '[TODO: Loyaltri link]' },
    { label: 'Figma', href: '[TODO: Figma link]' },
  ],
  seo: {
    title: 'Loyaltri: AI HRMS onboarding case study',
    description:
      'How Dinesh Kumar designed Loyaltri’s AI-powered HRMS and took employee onboarding 100% online for HR teams across India and the GCC.',
  },
};

const novacare: Project = {
  slug: 'novacare',
  name: 'NovaCare',
  category: 'Healthcare · Patient mobile app',
  accent: '#1E5CF9',
  accent2: '#5EEAD4',
  cover: '/projects/novacare-cover.webp',
  coverMd: '/projects/novacare-cover-md.webp',
  coverAlt: 'NovaCare app on three phones: welcome screen, home with live consult and health insights, and a doctor search list.',
  secondary: '/projects/novacare-results.webp',
  secondaryAlt:
    'NovaCare results: +65% bookings, −40% waiting time, +55% doctor utilization, +70% satisfaction, a before and after comparison, booking trend, patient distribution and satisfaction scores.',
  secondaryTitle: 'NovaCare results & impact',
  outcome: 'Cut patient waiting time by 40% and grew appointment bookings by 65%',
  summary: 'A patient app for finding doctors, booking, video consults, digital prescriptions and health tracking.',
  cardMetric: { value: '+65%', label: 'Appointment bookings' },
  tags: ['Healthcare', 'Mobile', 'AI recommendations'],
  meta: {
    role: 'Senior UI/UX & Product Designer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app (patient-facing)',
    stack: ['Figma', '[TODO: other tools]'],
  },
  tldr: {
    problem: 'Patients made multiple hospital visits to find the right doctor, then waited a long time at the clinic.',
    did: 'I designed doctor discovery, booking, reminders and health records, with symptom-based doctor recommendations.',
    result: 'Bookings rose 65%, waiting time fell 40% and patient satisfaction rose 70%.',
    metrics: [
      { value: '+65%', label: 'Appointment bookings' },
      { value: '−40%', label: 'Average waiting time' },
      { value: '+55%', label: 'Doctor utilization' },
      { value: '+70%', label: 'Patient satisfaction' },
    ],
  },
  challenge: {
    intro: [
      'Getting care was scattered and slow. Patients visited multiple hospitals to find the right doctor, then waited at the clinic.',
      'Prescriptions were handled manually, health records were hard to track, and follow-ups and reminders were limited.',
    ],
    affected: 'Patients looking for care, and doctors whose time was under-used.',
    mattered: 'Long waits and missed follow-ups hurt the patient experience and waste doctors’ time.',
    constraints: [
      'Patients with any level of tech confidence had to book without help.',
      '[TODO: regulatory or data-privacy constraints]',
    ],
  },
  role: {
    owned: [
      'I designed doctor discovery, appointment booking, reminders and health records.',
      'I designed the AI-assisted features: symptom-based doctor recommendations and smart appointment slot suggestions.',
    ],
    team: [
      'Engineering and product teams built and shipped the app with me in Agile/Scrum sprints.',
      '[TODO: team size]',
    ],
  },
  process: [
    { step: 'Research', text: 'I mapped the patient journey from finding a doctor to follow-up, and where it broke down.' },
    { step: 'Define', text: 'I set four pillars: book appointments, video consultation, digital prescriptions and health tracking.' },
    { step: 'Design', text: 'I designed specialty filters, doctor cards with ratings and experience, and one-tap booking.' },
    { step: 'Test', text: 'I iterated on the booking flow with the product team through sprint reviews.' },
    { step: 'Launch', text: 'NovaCare launched with booking, consults, prescriptions and health insights in one app.' },
  ],
  solution: {
    intro: 'NovaCare puts the whole care journey in one app, from finding a doctor to following up.',
    features: [
      { icon: 'calendar', title: 'Book in seconds', text: 'Filter by specialty, compare ratings and experience, and book in one tap.' },
      { icon: 'video', title: 'Video consultation', text: 'Consult verified doctors online or in person.' },
      { icon: 'file-text', title: 'Digital prescriptions', text: 'Medications, dosage and advice in the app, ready to download.' },
      { icon: 'heart-pulse', title: 'Health tracking', text: 'Heart rate, sleep and steps as simple health insights.' },
    ],
  },
  ai: {
    kind: 'features',
    intro: 'NovaCare uses AI to get patients to the right doctor at the right time. I designed how patients meet it.',
    features: [
      { icon: 'stethoscope', title: 'Symptom-based doctor recommendations', text: 'Patients describe symptoms and get pointed to the right specialty and doctor.' },
      { icon: 'clock', title: 'Smart appointment slot suggestions', text: 'The app suggests suitable slots so booking takes seconds.' },
    ],
  },
  decisions: [
    {
      title: 'Specialty-first discovery',
      why: 'Patients think in problems, not doctor names. Specialty chips such as Cardiology, Pediatrics and Dermatology lead straight to the right doctors.',
      notChosen: 'A search-only doctor directory.',
    },
    {
      title: 'Recommendations suggest, patients decide',
      why: 'Symptom-based recommendations narrow the options, while the patient still chooses the doctor and the slot.',
      notChosen: 'Assigning a doctor automatically.',
    },
    {
      title: 'Reminders next to the appointment',
      why: 'Follow-ups were easy to miss before. Reminders sit right next to the upcoming appointment on the home screen.',
      notChosen: 'Leaving follow-ups to the clinic.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Scattered & time-consuming',
      items: [
        'Multiple hospital visits to find doctors',
        'Long waiting time at clinic',
        'Manual prescription handling',
        'Difficult to track health records',
        'Limited follow-up and reminders',
      ],
    },
    after: {
      title: 'Seamless & connected care',
      items: [
        'Book appointments in seconds',
        'Consult with verified doctors online or in-person',
        'Receive digital prescriptions',
        'Access complete health history',
        'Get reminders and follow-ups',
      ],
    },
  },
  results: {
    metrics: [
      { value: '+65%', label: 'Appointment bookings', detail: 'More patients booking through the app' },
      { value: '−40%', label: 'Average waiting time', detail: 'Reduced patient waiting time' },
      { value: '+55%', label: 'Doctor utilization', detail: 'Better use of available doctors' },
      { value: '+70%', label: 'Patient satisfaction', detail: 'Higher satisfaction scores' },
      { value: '2,850', label: 'Patients', detail: 'Across six departments' },
    ],
    impact:
      'More patients booked through the app, and doctors’ time was better used. Ease of booking scored 92% with app users.',
    breakdowns: [
      {
        title: 'Patient satisfaction',
        caption: 'Feedback from app users',
        rows: [
          { label: 'Ease of booking', value: 92, display: '92%' },
          { label: 'Doctor interaction', value: 88, display: '88%' },
          { label: 'Prescription access', value: 90, display: '90%' },
          { label: 'Overall experience', value: 87, display: '87%' },
        ],
      },
      {
        title: 'Patients by department',
        caption: '2,850 patients',
        rows: [
          { label: 'General Physician', value: 32, display: '32%' },
          { label: 'Cardiology', value: 22, display: '22%' },
          { label: 'Dermatology', value: 18, display: '18%' },
          { label: 'Pediatrics', value: 15, display: '15%' },
          { label: 'Neurology', value: 8, display: '8%' },
          { label: 'Others', value: 5, display: '5%' },
        ],
      },
    ],
  },
  learned: [
    'In healthcare, clarity beats cleverness: every extra tap is a patient who might give up.',
    'Satisfaction breakdowns show where to focus next: overall experience (87%) trails ease of booking (92%).',
    'Next, I’d test recommendation explanations, showing patients why a specialty was suggested.',
  ],
  stack: ['Figma', '[TODO: other tools]'],
  links: [
    { label: 'Live app', href: '[TODO: NovaCare link]' },
    { label: 'Figma', href: '[TODO: Figma link]' },
  ],
  seo: {
    title: 'NovaCare: healthcare app case study',
    description:
      'How Dinesh Kumar designed NovaCare’s patient app, growing appointment bookings by 65% and cutting waiting time by 40%.',
  },
};

const veyro: Project = {
  slug: 'veyro',
  name: 'Veyro',
  category: 'Fintech · Payments & spend analytics',
  accent: '#1562E9',
  accent2: '#22C55E',
  cover: '/projects/fintech-cover.webp',
  coverMd: '/projects/fintech-cover-md.webp',
  coverAlt:
    'Veyro app screens: home with card balance and quick actions, send money, pay bill, insurance, ATM locator and gift cards.',
  secondary: '/projects/fintech-before-after.webp',
  secondaryAlt:
    'Before: five separate apps for banking, bills, insurance, ATMs and gift cards. After: one Veyro app, with +48% active users, +62% transactions, −40% payment time and −70% payment failures.',
  secondaryTitle: 'Five apps → one app',
  outcome: 'Merged five finance apps into one and grew transactions by 62%',
  summary: 'One app for payments, bills, insurance, ATM search and gift cards, with AI spend insights.',
  cardMetric: { value: '+62%', label: 'Transactions' },
  tags: ['Fintech', 'Payments', 'Spend analytics'],
  meta: {
    role: 'Senior UI/UX & Product Designer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app',
    stack: ['Figma', '[TODO: other tools]'],
  },
  tldr: {
    problem: 'Users juggled separate apps for banking, bills, insurance, ATM search and gift cards, each with a different interface.',
    did: 'I designed one unified app for payments, transaction history and spend tracking, with automatic transaction categorisation and AI spend insights.',
    result: 'Transactions rose 62%, active users grew 48%, and payment failures fell 70%.',
    metrics: [
      { value: '+48%', label: 'Active users' },
      { value: '+62%', label: 'Transactions' },
      { value: '−40%', label: 'Average payment time' },
      { value: '−70%', label: 'Payment failures' },
    ],
  },
  challenge: {
    intro: [
      'People managed their money across five apps: banking, bill payments, insurance, an ATM finder and gift cards.',
      'Each app had its own interface, so simple tasks took longer and spending was impossible to see in one place.',
    ],
    affected: 'Everyday users paying bills, sending money and keeping track of their spending.',
    mattered: 'A fragmented experience slows payments, causes failed transactions and hides where the money goes.',
    constraints: [
      'Many services had to fit into one app without overwhelming the home screen.',
      '[TODO: technical or compliance constraints]',
    ],
  },
  role: {
    owned: [
      'I designed payments, transaction history and personal spend tracking.',
      'I designed AI-driven spend insights, automatic transaction categorisation and data-visualisation dashboards.',
      'I designed the unified home screen, the Pay Bill flow and the ATM locator.',
    ],
    team: [
      'Engineering and product teams built and shipped the app with me in Agile/Scrum sprints.',
      '[TODO: team size]',
    ],
  },
  process: [
    { step: 'Research', text: 'I compared the five separate experiences users relied on: banking, bills, insurance, ATMs and gift cards.' },
    { step: 'Define', text: 'I grouped everything into Quick Actions and Services on a single home screen.' },
    { step: 'Design', text: 'I designed one Pay Bill pattern for every biller, a transactions feed and an ATM locator with walking time.' },
    { step: 'Test', text: 'I refined the flows with product and engineering through sprint reviews.' },
    { step: 'Launch', text: 'Veyro launched as one app for every everyday money task.' },
  ],
  solution: {
    intro: 'Veyro replaces five apps with one home screen that knows what you do most.',
    features: [
      { icon: 'wallet', title: 'One unified home', text: 'Card balance, quick actions, services and recent transactions on one screen.' },
      { icon: 'receipt', title: 'Easy bill payments', text: 'Internet, electricity, water and DTH bills in one Pay Bill flow.' },
      { icon: 'pie-chart', title: 'Smart financial tracking', text: 'Transactions sorted automatically, with AI spend insights and dashboards.' },
      { icon: 'gift', title: 'Rewards & gift cards', text: 'Eid, birthday and marriage gift cards with cashback offers.' },
    ],
  },
  ai: {
    kind: 'features',
    intro: 'Veyro’s AI turns a list of transactions into an answer to “where did my money go?”. I designed how users see it.',
    features: [
      { icon: 'layers', title: 'Automatic transaction categorisation', text: 'Every payment is sorted into a category without manual tagging.' },
      { icon: 'line-chart', title: 'AI spend insights', text: 'Spending patterns turned into short, readable insights.' },
      { icon: 'pie-chart', title: 'Data-visualisation dashboards', text: 'Spending shown as clear charts users can scan in seconds.' },
    ],
  },
  decisions: [
    {
      title: 'Two tiers on the home screen: Quick Actions and Services',
      why: 'Daily tasks (transfer, pay bill, scan & pay, gift cards) sit one tap away; occasional services sit one row below.',
      notChosen: 'A separate tab for every service.',
    },
    {
      title: 'One Pay Bill pattern for every biller',
      why: 'Select a bill, check the details, pay. Learning it once works for internet, electricity, water and DTH.',
      notChosen: 'A custom flow per bill type.',
    },
    {
      title: 'Categorise automatically, explain visually',
      why: 'Users shouldn’t have to tag transactions. Automatic categories feed the spend insights and dashboards.',
      notChosen: 'Manual tagging before insights appear.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Multiple apps, disconnected experience',
      items: [
        'A banking app',
        'A bill payment app',
        'An insurance app',
        'An ATM locator app',
        'A gift card app',
        'Inconsistent interfaces across all five',
      ],
    },
    after: {
      title: 'All financial services in one app',
      items: [
        'Banking, bills, insurance, ATM locator and gift cards together',
        'One consistent interface',
        'Quick actions on the home screen',
        'Recent transactions at a glance',
      ],
    },
  },
  results: {
    metrics: [
      { value: '+48%', label: 'Active users' },
      { value: '+62%', label: 'Transactions' },
      { value: '−40%', label: 'Average payment time' },
      { value: '−70%', label: 'Payment failures' },
    ],
    impact:
      'One app means more reasons to come back: users transact more, pay faster and fail less, and the business keeps them in a single product.',
  },
  learned: [
    'Consolidation is an information-architecture problem first: deciding what lives on the home screen decides everything else.',
    'Consistent patterns compound. One Pay Bill flow made every new biller cheap to add.',
    'Next, I’d test how users respond to spend insights, and which insights actually change behaviour.',
  ],
  stack: ['Figma', '[TODO: other tools]'],
  links: [
    { label: 'Live app', href: '[TODO: Veyro link]' },
    { label: 'Figma', href: '[TODO: Figma link]' },
  ],
  seo: {
    title: 'Veyro: unified fintech app case study',
    description:
      'How Dinesh Kumar merged five finance apps into Veyro, growing transactions by 62% and cutting payment failures by 70%.',
  },
};

const aura: Project = {
  slug: 'aura',
  name: 'Aura',
  category: 'Fintech · Personal finance',
  accent: '#3D3BF3',
  accent2: '#F59E0B',
  cover: '/projects/aura-cover.webp',
  coverMd: '/projects/aura-cover-md.webp',
  coverAlt:
    'Aura Fintech app screens: home with VaultPay card and accounts, send money, review transfer, choose country, scan QR, pay bill, insurance, ATM locator and gift cards.',
  secondary: '/projects/aura-results.webp',
  secondaryAlt:
    'Aura results: user growth to 18.4K, transaction volume up across services, payment success from 78% to 96%, about 10-second transfers and instant gift card delivery.',
  secondaryTitle: 'Aura results & impact',
  outcome: 'Raised payment success from 78% to 96% with a faster, safer finance app',
  summary: 'A personal finance app for banking, global transfers, bills and budgeting, with AI-powered insights.',
  cardMetric: { value: '96%', label: 'Payment success, up from 78%' },
  tags: ['Fintech', 'Personal finance', 'AI insights'],
  meta: {
    role: 'Senior UI/UX & Product Designer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app',
    stack: ['Figma', '[TODO: other tools]'],
  },
  tldr: {
    problem: 'Only 78% of payments succeeded, transfers were slow, and users had no clear picture of their money.',
    did: 'I designed budgeting, savings goals and account management, plus AI budgeting suggestions and unusual-transaction alerts.',
    result: 'Payment success rose from 78% to 96%, failures fell 70% and active users grew 65%.',
    metrics: [
      { value: '96%', label: 'Payment success', detail: 'Up from 78%' },
      { value: '+65%', label: 'Active users' },
      { value: '−70%', label: 'Payment failures' },
      { value: '~10s', label: 'Average transfer time' },
    ],
  },
  challenge: {
    intro: [
      'Trust is the product in personal finance. Before Aura, only 78% of payments succeeded: roughly one in five failed.',
      'Users also relied on separate apps for different money tasks, so budgeting and saving meant piecing their finances together by hand.',
    ],
    affected: 'Everyday users sending money locally and abroad, paying bills and trying to stick to a budget.',
    mattered: 'Every failed payment erodes trust. People won’t budget or save in an app they don’t trust with a transfer.',
    constraints: [
      'Transfers had to be fast and safe, locally and globally.',
      '[TODO: compliance or technical constraints]',
    ],
  },
  role: {
    owned: [
      'I designed budgeting, savings goals and account management.',
      'I designed AI-powered budgeting suggestions, unusual-transaction alerts and clear financial reports for everyday users.',
      'I designed the transfer flow, from choosing a recipient and country to reviewing and sending.',
    ],
    team: [
      'Engineering and product teams built and shipped the app with me in Agile/Scrum sprints.',
      '[TODO: team size]',
    ],
  },
  process: [
    { step: 'Research', text: 'I focused on the moments that decide trust: sending money, paying bills and checking balances.' },
    { step: 'Define', text: 'I set two goals: every payment should succeed first time, and money should be easy to understand.' },
    { step: 'Design', text: 'I designed a review-before-send transfer, a slide-to-send action and smart validation.' },
    { step: 'Test', text: 'I refined the transfer and budgeting flows with product and engineering through sprint reviews.' },
    { step: 'Launch', text: 'Aura launched as one app for banking, transfers, bills and insights.' },
  ],
  solution: {
    intro: 'Aura makes every payment feel certain, and every balance easy to read.',
    features: [
      { icon: 'send', title: 'Instant money transfer', text: 'Send locally or globally, with amount, fee and arrival time shown before you send.' },
      { icon: 'shield-check', title: 'Smart validation', text: 'Checks before sending help payments succeed first time: 78% → 96% success.' },
      { icon: 'wallet', title: 'Accounts at a glance', text: 'Savings and card balances, quick actions and recent transactions on one screen.' },
      { icon: 'scan', title: 'Scan & pay', text: 'Scan a QR code to pay instantly, or send a gift card for any occasion.' },
    ],
  },
  ai: {
    kind: 'features',
    intro: 'Aura’s AI watches the numbers so users don’t have to. I designed how its suggestions and alerts reach people.',
    features: [
      { icon: 'piggy-bank', title: 'AI budgeting suggestions', text: 'Personal suggestions that help users stick to budgets and savings goals.' },
      { icon: 'alert-triangle', title: 'Unusual-transaction alerts', text: 'Users are alerted when a transaction looks out of the ordinary.' },
      { icon: 'file-text', title: 'Clear financial reports', text: 'Reports written for everyday users, not accountants.' },
    ],
  },
  decisions: [
    {
      title: 'Review before you send',
      why: 'Showing the amount, fee, estimated arrival and source account before every transfer catches mistakes before they cost money.',
      notChosen: 'One-tap transfers with no review step.',
    },
    {
      title: 'Slide to send',
      why: 'A deliberate gesture prevents accidental transfers without adding another confirmation screen.',
      notChosen: 'A plain button followed by a confirmation pop-up.',
    },
    {
      title: 'Alerts that tell you what to do next',
      why: 'An unusual-transaction alert is only useful if it’s clear and actionable, so alerts lead with the transaction and the next step.',
      notChosen: 'Generic security notifications.',
    },
  ],
  beforeAfter: {
    before: {
      title: 'Before: separate apps',
      items: ['Separate apps for different money tasks', '78% payment success', 'Slower payments'],
    },
    after: {
      title: 'After: one unified Aura app',
      items: [
        '96% payment success with smart validation',
        'About 10-second average transfers',
        'Real-time ATM location',
        'Instant gift card delivery',
      ],
    },
  },
  results: {
    metrics: [
      { value: '+65%', label: 'Active users', detail: 'Increase in monthly users' },
      { value: '+48%', label: 'Transaction volume', detail: 'More digital transactions' },
      { value: '−40%', label: 'Time to complete payments' },
      { value: '−70%', label: 'Payment failures' },
      { value: '96%', label: 'Payment success', detail: 'Up from 78%' },
      { value: '18.4K', label: 'Active users at peak' },
    ],
    impact:
      'Payments that succeed build the trust a finance app needs. With failures down 70%, users came back more often and moved more money through Aura.',
    breakdowns: [
      {
        title: 'Transaction volume growth by service',
        caption: 'After launch vs before',
        rows: [
          { label: 'Money transfer', value: 52, display: '+52%' },
          { label: 'Bill payments', value: 68, display: '+68%' },
          { label: 'Insurance', value: 45, display: '+45%' },
          { label: 'ATM locator', value: 60, display: '+60%' },
          { label: 'Gift cards', value: 55, display: '+55%' },
        ],
      },
    ],
  },
  learned: [
    'In finance, reliability is the feature. Smart validation did more for growth than any new screen.',
    'Friction can be good: a slide-to-send gesture adds a beat of intent exactly where mistakes are expensive.',
    'Next, I’d measure how often users act on AI budgeting suggestions and tune them for usefulness, not volume.',
  ],
  stack: ['Figma', '[TODO: other tools]'],
  links: [
    { label: 'Live app', href: '[TODO: Aura link]' },
    { label: 'Figma', href: '[TODO: Figma link]' },
  ],
  seo: {
    title: 'Aura: personal finance app case study',
    description:
      'How Dinesh Kumar designed Aura’s personal finance app, raising payment success from 78% to 96% and cutting failures by 70%.',
  },
};

/** Display order on the home page and for "next project". */
export const projects: Project[] = [monkify, loyaltri, novacare, veyro, aura];

export const workSection = {
  eyebrow: 'Selected work',
  title: 'Five products. Real numbers.',
  text: 'Case studies from recruitment, HR-tech, healthcare and fintech, each with the problem, my role and the measured impact.',
};

export const seo = {
  home: {
    title: 'Dinesh Kumar · AI/ML Engineer',
    description:
      'AI/ML engineer with 7+ years building B2B SaaS. ML models and LLM-powered features for HR-tech, recruitment, fintech and healthcare.',
  },
  ogImage: '/og-image.png',
};
