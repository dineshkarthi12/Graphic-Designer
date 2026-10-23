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
    'I build machine learning and LLM-powered features that ship: from data and models to APIs inside B2B SaaS products for HR-tech, recruitment, fintech and healthcare.',
  valueProp:
    '7+ years in B2B SaaS. AI features delivered across 6 products: NLP job matching, people analytics, transaction classification, anomaly alerts and symptom-based recommendations.',
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
  { value: '60%', label: 'Reduced hiring time', source: 'Monkify AI · NLP matching' },
  { value: '−70%', label: 'Payment failures', source: 'Veyro · Aura' },
  { value: '+65%', label: 'Appointment bookings', source: 'NovaCare' },
  { value: '96%', label: 'Payment success, up from 78%', source: 'Aura' },
];

export const about = {
  eyebrow: 'About',
  title: 'Models are only useful when people can use them.',
  bio: [
    "I'm an AI/ML engineer with 7+ years of experience building B2B SaaS products for HR-tech, recruitment, fintech and healthcare, now focused on machine learning and generative AI.",
    'I build LLM-powered applications with Python, LangChain, RAG pipelines and vector databases, and machine learning models with scikit-learn, XGBoost and PyTorch, from data preparation and model evaluation to deployment with FastAPI, Docker and Streamlit.',
    "I've delivered AI features across 6 products, including NLP-based job matching (Monkify AI), people analytics (Loyaltri), transaction classification and anomaly alerts (Veyro, Aura) and symptom-based recommendations (NovaCare). My front-end and data-visualisation background helps me turn models into reliable, easy-to-use features.",
  ],
  stats: [
    { value: '7+', label: 'Years of experience' },
    { value: '6', label: 'Products with AI/ML features delivered' },
    { value: '25%', label: 'Higher appointment completion (Auvia)' },
    { value: '5', label: 'Junior team members mentored' },
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
          'Regression', 'Classification', 'Clustering', 'Anomaly detection', 'Feature engineering',
          'Model evaluation (precision, recall, F1, ROC-AUC)', 'Cross-validation', 'Hyperparameter tuning',
          'scikit-learn', 'XGBoost', 'SHAP',
        ],
      },
      {
        name: 'Deep learning & computer vision',
        items: [
          'PyTorch', 'TensorFlow', 'Keras', 'CNNs', 'RNNs/LSTMs', 'Transformers', 'Transfer learning', 'Fine-tuning',
          'OpenCV', 'YOLO', 'OCR', 'Stable Diffusion',
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
          'OpenAI GPT', 'Claude', 'Gemini', 'Llama', 'Hugging Face', 'LangChain', 'LlamaIndex', 'RAG',
          'Prompt engineering', 'Embeddings', 'AI agents', 'Tool calling', 'LoRA/PEFT', 'LLM evaluation',
        ],
      },
      {
        name: 'NLP',
        items: [
          'Text classification', 'NER', 'Sentiment analysis', 'Semantic search', 'Resume parsing', 'Job matching',
          'Sentence-Transformers', 'spaCy', 'NLTK',
        ],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & Databases',
    short: 'Data',
    groups: [
      {
        name: 'Data & databases',
        items: [
          'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'Jupyter', 'EDA', 'PostgreSQL', 'MySQL',
          'MongoDB', 'Pinecone', 'ChromaDB', 'FAISS',
        ],
      },
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
          'AWS (SageMaker, EC2, S3)', 'Azure OpenAI', 'Vertex AI',
        ],
      },
    ],
  },
  {
    id: 'product',
    title: 'AI Product & Collaboration',
    short: 'AI Product',
    groups: [
      {
        name: 'AI product & collaboration',
        items: [
          'Human-in-the-loop workflows', 'Confidence and fallback handling', 'Prototyping', 'Figma', 'Agile/Scrum',
          'Jira', 'Stakeholder presentations', 'Mentoring',
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

export const experience: Role[] = [
  {
    title: 'AI/ML Product Engineer',
    company: 'Orange Office Technologies',
    location: 'Chennai',
    period: 'Sep 2020 – Present',
    impact: [
      'Delivered AI/ML features for 6 SaaS products across HR-tech, recruitment, fintech and healthcare, working with engineering and product teams in 2-week Agile/Scrum sprints from requirement to release.',
      "Built Monkify AI's candidate-to-job matching: parsing resumes into structured skills, experience and role data, embedding candidates and job descriptions, and ranking matches with semantic search.",
      'Translated business problems into ML tasks (ranking, recommendation, classification, anomaly detection) and defined success criteria for each feature with product owners and engineering leads.',
    ],
    more: [
      'People analytics (Loyaltri): dashboards that turn attendance, leave and payroll data into trends such as absenteeism, overtime and headcount movement.',
      'Fintech ML (Veyro, Aura): automatic transaction categorisation (multi-class classification on merchant and transaction text) and unusual-transaction alerts (anomaly detection on spending patterns).',
      'Healthcare AI (NovaCare, Auvia): symptom-based doctor recommendations, smart appointment slot suggestions and health-metric trend analytics; simplified the appointment booking flow, increasing appointment completion by 25%.',
      'Worked with backend and data engineers on data preparation and feature definitions, and integrated model outputs into web and mobile apps through REST APIs.',
      'Designed LLM feature experiences end to end: prompt inputs, model output display, confidence scores, fallback states for low-confidence results and human-in-the-loop review.',
      'Reviewed model outputs and edge cases with stakeholders to improve recommendation relevance and reduce false alerts before release.',
      'Used prompt engineering with LLMs (Claude, GPT) to prototype and validate AI features faster; built a reusable component system that reduced UI inconsistencies by 35%.',
      'Mentored 5 junior team members, ran feature walkthroughs and presented AI feature demos to clients and leadership.',
    ],
    products: ['Loyaltri', 'Monkify AI', 'NovaCare', 'Veyro', 'Aura', 'Auvia'],
  },
  {
    title: 'Front-End Engineer',
    company: 'Qmax',
    location: '[TODO: location]',
    period: 'Mar 2019 – Sep 2020',
    impact: [
      'Built real-time analytics dashboards and data visualisations, driving a 20% increase in user engagement.',
      'Developed responsive front-end interfaces with HTML, CSS and JavaScript, integrating them with backend REST APIs.',
      'Created a reusable component and pattern library that sped up design-to-development handoff by 40%.',
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

/** From the resume: how model outputs reach users. Shown at the end of every deep dive. */
export const aiDesignPrinciple =
  'How I ship model outputs: confidence scores, fallback states for low-confidence results, and human-in-the-loop review flows.';

/** From the resume: who I worked with. Shown in every case study's "team" column. */
const teamNote =
  'Backend and data engineers worked with me on data preparation, feature definitions and integrating model outputs through REST APIs, in 2-week Agile/Scrum sprints.';

export const ctaCopy = {
  title: "Like this work? Let's talk.",
  text: "I'm open to AI/ML engineering roles where models have to work for real users.",
};

export const contactSection = {
  eyebrow: 'Contact',
  title: "Let's build something intelligent.",
  text: 'Hiring an AI/ML engineer, or have a product that needs ML that people can actually use? I reply to every message.',
};

// ───────────────────────────────────────────── projects

const monkify: Project = {
  slug: 'monkify-ai',
  name: 'Monkify AI',
  category: 'AI recruitment · NLP matching · iOS & Android',
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
  summary: 'An AI recruitment app that parses resumes, matches candidates to jobs with embeddings and ranks them for recruiters.',
  cardMetric: { value: '60%', label: 'Reduced hiring time' },
  tags: ['NLP', 'Semantic search', 'Mobile'],
  meta: {
    role: 'AI/ML Product Engineer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size and roles]',
    platform: 'iOS & Android',
    stack: ['Python', 'Sentence-Transformers', 'FAISS', 'FastAPI', 'Docker', 'AWS'],
  },
  tldr: {
    problem: 'Recruiters screened every resume by hand, at about 2–3 minutes each, with inconsistent results.',
    did: 'I built the matching pipeline: resume parsing, Sentence-Transformers embeddings and FAISS semantic search, served with FastAPI to the iOS and Android apps.',
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
    mattered: 'Screening is the bottleneck before interviews; every hour saved there shortens time-to-hire.',
    constraints: [
      'Recruiters should review the best-matched candidates first, instead of screening every application.',
      'Matches had to come back fast enough to feel instant inside a mobile app.',
      '[TODO: data, privacy or budget constraints]',
    ],
  },
  role: {
    owned: [
      'I built the candidate-to-job matching flow, starting with parsing resumes into structured skills, experience and role data.',
      'I generated embeddings for candidates and job descriptions with Sentence-Transformers and ranked matches with semantic search on FAISS.',
      'I evaluated match quality on 300 held-out resumes and served the pipeline with FastAPI and Docker on AWS.',
      'I powered AI job recommendations, smart job filters and recruiter shortlisting dashboards on iOS and Android.',
    ],
    team: [teamNote, '[TODO: team size and who owned the mobile and backend code]'],
  },
  process: [
    { step: 'Research', text: 'I mapped the recruiter workflow: every application screened by hand, at about 2–3 minutes per resume.' },
    { step: 'Define', text: 'I framed it as ranking with three relevance classes and agreed success criteria with the product owner.' },
    { step: 'Build', text: 'I built resume parsing, candidate and job embeddings, and FAISS semantic search behind a FastAPI service.' },
    { step: 'Test', text: 'I validated on a held-out set of 300 resumes and reviewed edge cases with recruiters and stakeholders.' },
    { step: 'Launch', text: 'The pipeline powers job recommendations, smart filters and shortlisting in the iOS and Android apps.' },
  ],
  solution: {
    intro: 'Monkify gives recruiters a ranked, explained shortlist instead of a pile of PDFs.',
    features: [
      { icon: 'brain', title: 'AI-powered screening', text: 'Every candidate is ranked against the job: Relevant, Partially Relevant or Not Relevant.' },
      { icon: 'target', title: 'Job match score', text: 'Each candidate gets a match percentage per role, such as 92% for UI/UX Designer.' },
      { icon: 'sparkles', title: 'AI summary & interview insights', text: 'Recruiters read a short AI summary and generated interview insights on every profile.' },
      { icon: 'list-checks', title: 'One-tap shortlisting', text: 'Candidates move through Shortlisted, Interview and Hired from one list.' },
    ],
  },
  ai: {
    kind: 'deep-dive',
    title: 'AI/ML deep dive',
    intro: 'I built the matching pipeline end to end: parsing, embeddings, search, evaluation and the API the apps call.',
    data: {
      text: "Monkify's own platform data: resumes and job posts from the app, each resume parsed into skills, experience and role.",
      facts: [
        { label: 'Source', value: 'Monkify platform data (resumes and job posts)' },
        { label: 'Volume', value: '[TODO: number of resumes and jobs]' },
        { label: 'Parsed into', value: 'Skills · experience · role' },
        { label: 'Test set', value: '300 resumes, 100 per class' },
      ],
    },
    model: {
      text: 'I embedded candidates and job descriptions with Sentence-Transformers and ranked pairs by similarity with FAISS, so skills match by meaning, not keyword.',
      facts: [
        { label: 'Parsing', value: 'Resume → skills, experience, role' },
        { label: 'Embeddings', value: 'Sentence-Transformers' },
        { label: 'Search', value: 'FAISS vector search (semantic similarity)' },
        { label: 'Output', value: 'Ranked matches in 3 relevance classes' },
      ],
    },
    evaluation: {
      text: 'I tracked training and validation loss and accuracy every epoch, then scored a held-out test set of 300 resumes per class. Recruiters reviewed AI shortlists as a human-in-the-loop check.',
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
      text: 'I wrapped the pipeline in a FastAPI service, containerised it with Docker and deployed it on AWS. The iOS and Android apps call it for recommendations, filters and shortlists.',
      facts: [
        { label: 'API', value: 'FastAPI (Python)' },
        { label: 'Packaging', value: 'Docker' },
        { label: 'Cloud', value: 'AWS [TODO: service, e.g. EC2 or ECS]' },
        { label: 'Clients', value: 'Monkify iOS & Android apps' },
      ],
    },
    architecture: {
      title: 'How a resume becomes a ranked shortlist',
      caption: 'From raw resumes to a ranked shortlist, with recruiter feedback closing the loop.',
      nodes: [
        { title: 'Platform data', sub: 'Resumes & job posts' },
        { title: 'Parsing', sub: 'Skills & experience' },
        { title: 'Embeddings', sub: 'Sentence-Transformers' },
        { title: 'FAISS', sub: 'Semantic search' },
        { title: 'FastAPI', sub: 'Docker on AWS' },
        { title: 'Recruiter app', sub: 'iOS & Android' },
      ],
      loop: 'Recruiter feedback',
    },
  },
  decisions: [
    {
      title: 'Semantic matching with embeddings, not keyword filters',
      why: 'Candidates describe the same skill in different words. Embeddings match on meaning, so strong profiles aren’t lost to wording.',
      notChosen: 'Boolean keyword filters on job titles and skills.',
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
      'Recruiters review the best-matched candidates first instead of screening every application. Faster, more consistent screening shortens the path from job post to hire.',
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
    'Parsing quality caps matching quality: clean skills and experience data mattered as much as the model.',
    'The confusion matrix is a product tool, not just a metric: it showed exactly where recruiters needed to stay in the loop.',
    'Next, I’d add hybrid retrieval (keywords plus embeddings) and target the Partially Relevant class, where recall is lowest at 78%.',
  ],
  stack: ['Python', 'NLP', 'Resume parsing', 'Sentence-Transformers', 'FAISS', 'FastAPI', 'Docker', 'AWS'],
  links: [
    { label: 'Live app', href: '[TODO: App Store / Play Store link]' },
    { label: 'GitHub', href: '[TODO: repository link]' },
  ],
  seo: {
    title: 'Monkify AI: NLP job matching case study',
    description:
      'How Dinesh Kumar built NLP job matching with resume parsing, Sentence-Transformers and FAISS, cutting hiring time by 60% and screening time by 70%.',
  },
};

const loyaltri: Project = {
  slug: 'loyaltri',
  name: 'Loyaltri',
  category: 'AI HRMS · People analytics · India & GCC',
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
  outcome: 'Built people analytics and 100% online onboarding for HR teams across India and the GCC',
  summary: 'An AI-powered HRMS for onboarding, attendance, payroll, leave and recruitment, with people-analytics dashboards.',
  cardMetric: { value: '100%', label: 'Online onboarding' },
  tags: ['People analytics', 'Python & SQL', 'HR-tech SaaS'],
  meta: {
    role: 'AI/ML Product Engineer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Web app (SaaS)',
    stack: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'Plotly / Power BI', 'REST APIs'],
  },
  tldr: {
    problem: 'Onboarding ran on paper forms and scattered documents, which caused delays and errors.',
    did: "I delivered Loyaltri's onboarding, attendance, payroll, leave and recruitment modules, and built people-analytics dashboards on attendance, leave and payroll data.",
    result: 'Onboarding became 100% online with automatic validation and real-time tracking, and HR teams see trends like absenteeism, overtime and headcount movement.',
    metrics: [
      { value: '100%', label: 'Online onboarding' },
      { value: '5', label: 'HR modules delivered' },
      { value: '3', label: 'Workforce trends tracked', detail: 'Absenteeism · overtime · headcount' },
      { value: 'India + GCC', label: 'Client regions' },
    ],
  },
  challenge: {
    intro: [
      'HR teams handled onboarding manually, with paper forms and documents scattered across the business.',
      'Every new hire meant time-consuming data entry, a higher chance of human error and no way to see progress in real time.',
    ],
    affected: 'HR teams onboarding employees and managing attendance, leave and payroll, and new hires waiting to get started.',
    mattered: 'Slow, error-prone onboarding delays a new hire’s first day and gets harder to manage as headcount grows.',
    constraints: [
      'One platform had to cover onboarding, attendance, payroll, leave and recruitment.',
      'It served client companies across India and the GCC.',
      '[TODO: timeline, compliance or localisation constraints]',
    ],
  },
  role: {
    owned: [
      'I delivered the onboarding, attendance, payroll, leave and recruitment modules.',
      'I built people-analytics dashboards that turn attendance, leave and payroll data into trends such as absenteeism, overtime and headcount movement.',
      'I wrote the analytics in Python, Pandas and SQL on PostgreSQL, and served them to the web app through REST APIs.',
    ],
    team: [teamNote, '[TODO: team size]'],
  },
  process: [
    { step: 'Research', text: 'I mapped the manual process and its pain points: paper forms, data entry, errors and no tracking.' },
    { step: 'Define', text: 'I defined the trends HR needs (absenteeism, overtime, headcount movement) and split onboarding into four steps.' },
    { step: 'Build', text: 'I built the analytics in Python, Pandas and SQL on PostgreSQL, with dashboards in Plotly / Power BI.' },
    { step: 'Test', text: 'I reviewed the numbers and edge cases with HR stakeholders before each release.' },
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
    kind: 'deep-dive',
    title: 'People-analytics deep dive',
    intro: 'Behind the dashboards is a data pipeline that turns raw HR records into trends HR teams can act on.',
    data: {
      text: 'Attendance, leave and payroll records from the HRMS, stored in PostgreSQL.',
      facts: [
        { label: 'Sources', value: 'Attendance · leave · payroll' },
        { label: 'Storage', value: 'PostgreSQL' },
        { label: 'Volume', value: '[TODO: employees or records covered]' },
      ],
    },
    model: {
      title: 'Analytics approach',
      text: 'I wrote SQL and Pandas transformations that turn raw records into workforce trends: absenteeism, overtime and headcount movement.',
      facts: [
        { label: 'Tools', value: 'Python · Pandas · SQL' },
        { label: 'Trends', value: 'Absenteeism · overtime · headcount movement' },
      ],
    },
    evaluation: {
      title: 'Validation',
      text: 'I reviewed the numbers and edge cases with HR stakeholders before release, so the dashboards matched what HR saw on the ground.',
      facts: [{ label: 'Accuracy checks', value: '[TODO: how the figures were validated]' }],
    },
    serving: {
      text: 'The analytics reach HR teams through REST APIs and dashboards built with Plotly / Power BI inside the web app.',
      facts: [
        { label: 'API', value: 'REST APIs' },
        { label: 'Dashboards', value: 'Plotly / Power BI' },
        { label: 'Users', value: 'HR teams across India and the GCC' },
      ],
    },
    architecture: {
      title: 'From HR records to people analytics',
      caption: 'Attendance, leave and payroll data flow into trends HR teams read every day.',
      nodes: [
        { title: 'HR data', sub: 'Attendance, leave, payroll' },
        { title: 'PostgreSQL', sub: 'SQL queries' },
        { title: 'Pandas', sub: 'Trend metrics' },
        { title: 'REST APIs', sub: 'Web app' },
        { title: 'Dashboards', sub: 'Plotly / Power BI' },
      ],
      loop: 'Stakeholder review',
    },
  },
  decisions: [
    {
      title: 'Trends HR can act on, not raw tables',
      why: 'Absenteeism, overtime and headcount movement answer HR’s real questions faster than raw attendance logs.',
      notChosen: 'Exporting raw records for HR to analyse in spreadsheets.',
    },
    {
      title: 'Four short steps instead of one long form',
      why: 'The old registration form asked for everything at once. Steps with a progress ring make onboarding easier to finish.',
      notChosen: 'Restyling the single long form.',
    },
    {
      title: 'Save Draft at every step',
      why: 'New hires don’t always have every document to hand. Drafts let them finish later without losing work.',
      notChosen: 'Forcing onboarding to be completed in one sitting.',
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
      { value: '3', label: 'Workforce trends on dashboards' },
    ],
    impact:
      'Less manual work, more time for what matters. HR teams onboard people with fewer errors, track progress in real time and see workforce trends at a glance.',
  },
  learned: [
    'Analytics are only useful when they answer a question: three focused trends beat a wall of charts.',
    'Reviewing the numbers and edge cases with HR stakeholders is part of shipping analytics, not an afterthought.',
    'Next, I’d add forecasting on top of the trends, such as predicting overtime peaks, and measure time-to-onboard per hire.',
  ],
  stack: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'Plotly / Power BI', 'REST APIs'],
  links: [{ label: 'Live product', href: '[TODO: Loyaltri link]' }],
  seo: {
    title: 'Loyaltri: people analytics case study',
    description:
      'How Dinesh Kumar built people-analytics dashboards with Python, SQL and PostgreSQL and took HR onboarding 100% online across India and the GCC.',
  },
};

const novacare: Project = {
  slug: 'novacare',
  name: 'NovaCare',
  category: 'Healthcare · NLP recommendations · Mobile',
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
  summary: 'A patient app for doctor discovery, booking, reminders and health records, with symptom-based doctor recommendations.',
  cardMetric: { value: '+65%', label: 'Appointment bookings' },
  tags: ['NLP', 'Recommendations', 'Healthcare'],
  meta: {
    role: 'AI/ML Product Engineer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app (patient-facing)',
    stack: ['Python', 'NLP text classification', 'scikit-learn', 'REST APIs'],
  },
  tldr: {
    problem: 'Patients made multiple hospital visits to find the right doctor, then waited a long time at the clinic.',
    did: 'I delivered symptom-based doctor recommendations (NLP text classification mapping symptoms to medical specialities) and smart appointment slot suggestions.',
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
    mattered: 'Sending a patient to the wrong specialist wastes a visit, and long waits hurt the patient experience.',
    constraints: [
      'Patients with any level of tech confidence had to book without help.',
      '[TODO: regulatory or data-privacy constraints]',
    ],
  },
  role: {
    owned: [
      'I delivered symptom-based doctor recommendations: an NLP text classifier that maps patient symptoms to medical specialities.',
      'I delivered smart appointment slot suggestions.',
      'I worked on doctor discovery, appointment booking, reminders and health records, integrating model outputs into the app through REST APIs.',
    ],
    team: [teamNote, '[TODO: team size]'],
  },
  process: [
    { step: 'Research', text: 'I mapped the patient journey from finding a doctor to follow-up, and where it broke down.' },
    { step: 'Define', text: 'I framed recommendations as text classification: symptoms in, medical speciality out.' },
    { step: 'Build', text: 'I built the classifier with Python and scikit-learn and served it through REST APIs.' },
    { step: 'Test', text: 'I reviewed recommendations and edge cases with stakeholders before release.' },
    { step: 'Launch', text: 'NovaCare launched with recommendations, booking, consults, prescriptions and health insights in one app.' },
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
    kind: 'deep-dive',
    title: 'AI/ML deep dive',
    intro: 'NovaCare’s recommendations start with what the patient types.',
    data: {
      text: 'Patient symptom descriptions paired with the medical speciality that treats them.',
      facts: [
        { label: 'Input', value: 'Patient symptom text' },
        { label: 'Target', value: 'Medical speciality' },
        { label: 'Volume', value: '[TODO: number of labelled examples]' },
      ],
    },
    model: {
      text: 'An NLP text-classification model built with scikit-learn maps symptoms to specialities such as Cardiology, Dermatology or Pediatrics. The app then suggests matching doctors and appointment slots.',
      facts: [
        { label: 'Task', value: 'Multi-class text classification' },
        { label: 'Library', value: 'scikit-learn' },
        { label: 'Features', value: '[TODO: text features, e.g. TF-IDF]' },
      ],
    },
    evaluation: {
      text: 'I reviewed recommendations and edge cases with stakeholders before release to improve recommendation relevance.',
      facts: [{ label: 'Metrics', value: '[TODO: accuracy or F1 on held-out data]' }],
    },
    serving: {
      text: 'The model runs behind REST APIs; the mobile app calls it while the patient books.',
      facts: [
        { label: 'API', value: 'REST APIs' },
        { label: 'Client', value: 'NovaCare mobile app' },
      ],
    },
    architecture: {
      title: 'From symptoms to the right doctor',
      caption: 'The patient’s words go in; a speciality, matching doctors and open slots come out.',
      nodes: [
        { title: 'Symptoms', sub: 'Patient text' },
        { title: 'NLP', sub: 'Text features' },
        { title: 'Classifier', sub: 'scikit-learn' },
        { title: 'REST API', sub: 'Speciality' },
        { title: 'Booking app', sub: 'Doctors & slots' },
      ],
      loop: 'Edge-case review',
    },
  },
  decisions: [
    {
      title: 'Text classification over a rules-based symptom checker',
      why: 'A model learns many ways of describing the same symptom; hand-written rules break on new wording.',
      notChosen: 'A hard-coded symptom-to-speciality lookup table.',
    },
    {
      title: 'Recommendations suggest, patients decide',
      why: 'The model narrows the options to a speciality, while the patient still chooses the doctor and the slot.',
      notChosen: 'Assigning a doctor automatically.',
    },
    {
      title: 'Specialty-first discovery',
      why: 'Patients think in problems, not doctor names. Specialty chips such as Cardiology, Pediatrics and Dermatology lead straight to the right doctors.',
      notChosen: 'A search-only doctor directory.',
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
      'More patients reached the right specialist through the app, and doctors’ time was better used. Ease of booking scored 92% with app users.',
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
    'In healthcare, a wrong recommendation costs a visit, so relevance mattered more than coverage.',
    'Satisfaction breakdowns show where to focus next: overall experience (87%) trails ease of booking (92%).',
    'Next, I’d show a confidence score on each recommendation and fall back to a General Physician when the model is unsure.',
  ],
  stack: ['Python', 'NLP text classification', 'scikit-learn', 'REST APIs'],
  links: [{ label: 'Live app', href: '[TODO: NovaCare link]' }],
  seo: {
    title: 'NovaCare: symptom-based recommendations case study',
    description:
      'How Dinesh Kumar delivered NLP symptom-to-speciality recommendations in NovaCare, growing appointment bookings by 65% and cutting waiting time by 40%.',
  },
};

const veyro: Project = {
  slug: 'veyro',
  name: 'Veyro',
  category: 'Fintech · Transaction classification · Spend analytics',
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
  summary: 'One app for payments, bills, insurance, ATM search and gift cards, with ML transaction categorisation and spend insights.',
  cardMetric: { value: '+62%', label: 'Transactions' },
  tags: ['Classification', 'XGBoost', 'Fintech'],
  meta: {
    role: 'AI/ML Product Engineer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app',
    stack: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Plotly'],
  },
  tldr: {
    problem: 'Users juggled separate apps for banking, bills, insurance, ATM search and gift cards, and couldn’t see where their money went.',
    did: 'I worked on automatic transaction categorisation (multi-class classification on merchant and transaction text) and delivered AI spend insights with visual dashboards.',
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
      'I worked on automatic transaction categorisation: multi-class classification on merchant and transaction text with scikit-learn and XGBoost.',
      'I delivered AI-driven spend insights and Plotly dashboards that explain where users’ money goes in plain language.',
      'I worked on payments, transaction history and personal spend tracking, integrating model outputs into the app through REST APIs.',
    ],
    team: [teamNote, '[TODO: team size]'],
  },
  process: [
    { step: 'Research', text: 'I compared the five separate experiences users relied on: banking, bills, insurance, ATMs and gift cards.' },
    { step: 'Define', text: 'I framed categorisation as multi-class classification and agreed success criteria with the product owner.' },
    { step: 'Build', text: 'I built features from merchant and transaction text in Pandas and trained classifiers with scikit-learn and XGBoost.' },
    { step: 'Test', text: 'I reviewed predictions and edge cases with stakeholders before release.' },
    { step: 'Launch', text: 'Veyro launched as one app for everyday money tasks, with categories and insights built in.' },
  ],
  solution: {
    intro: 'Veyro replaces five apps with one home screen, and tells users where their money goes.',
    features: [
      { icon: 'wallet', title: 'One unified home', text: 'Card balance, quick actions, services and recent transactions on one screen.' },
      { icon: 'receipt', title: 'Easy bill payments', text: 'Internet, electricity, water and DTH bills in one Pay Bill flow.' },
      { icon: 'pie-chart', title: 'Smart financial tracking', text: 'Every transaction categorised automatically, with AI spend insights.' },
      { icon: 'gift', title: 'Rewards & gift cards', text: 'Eid, birthday and marriage gift cards with cashback offers.' },
    ],
  },
  ai: {
    kind: 'deep-dive',
    title: 'AI/ML deep dive',
    intro: 'Veyro’s categories turn a list of transactions into an answer to “where did my money go?”.',
    data: {
      text: 'Transaction records with merchant names and transaction text, prepared in Pandas.',
      facts: [
        { label: 'Input', value: 'Merchant name · transaction text' },
        { label: 'Volume', value: '[TODO: number of transactions]' },
        { label: 'Categories', value: '[TODO: list of spending categories]' },
      ],
    },
    model: {
      text: 'Multi-class classification on merchant and transaction text with scikit-learn and XGBoost. Predicted categories feed the spend insights and dashboards.',
      facts: [
        { label: 'Task', value: 'Multi-class classification' },
        { label: 'Libraries', value: 'scikit-learn · XGBoost' },
        { label: 'Features', value: 'Merchant and transaction text' },
      ],
    },
    evaluation: {
      text: 'I reviewed predictions and edge cases with stakeholders before release.',
      facts: [{ label: 'Metrics', value: '[TODO: accuracy or F1 per category]' }],
    },
    serving: {
      text: 'Categories reach the app through REST APIs, and spend dashboards are built with Plotly.',
      facts: [
        { label: 'API', value: 'REST APIs' },
        { label: 'Dashboards', value: 'Plotly' },
        { label: 'Client', value: 'Veyro mobile app' },
      ],
    },
    architecture: {
      title: 'From a payment to a spend insight',
      caption: 'Every transaction is categorised automatically and rolled up into plain-language insights.',
      nodes: [
        { title: 'Transactions', sub: 'Merchant & text' },
        { title: 'Pandas', sub: 'Text features' },
        { title: 'XGBoost', sub: 'Multi-class model' },
        { title: 'REST API', sub: 'Categories' },
        { title: 'Spend insights', sub: 'App dashboards' },
      ],
      loop: 'Edge-case review',
    },
  },
  decisions: [
    {
      title: 'Categorise automatically, explain in plain language',
      why: 'Users shouldn’t have to tag transactions. The classifier labels every payment, and insights explain spending in words, not just charts.',
      notChosen: 'Manual tagging before any insight appears.',
    },
    {
      title: 'Gradient-boosted trees for categorisation',
      why: 'XGBoost handles sparse text features well, trains fast and is easy to inspect with feature importance.',
      notChosen: 'A deep model that would be heavier to serve for a first release.',
    },
    {
      title: 'Two tiers on the home screen: Quick Actions and Services',
      why: 'Daily tasks (transfer, pay bill, scan & pay, gift cards) sit one tap away; occasional services sit one row below.',
      notChosen: 'A separate tab for every service.',
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
      'One app with built-in spend insights gives users more reasons to come back: they transact more, pay faster and fail less.',
  },
  learned: [
    'A category is only useful when the insight built on it is easy to read.',
    'Consolidation is an information-architecture problem first: deciding what lives on the home screen decides everything else.',
    'Next, I’d add confidence thresholds so low-confidence transactions ask the user, and feed those answers back as new training labels.',
  ],
  stack: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Plotly'],
  links: [{ label: 'Live app', href: '[TODO: Veyro link]' }],
  seo: {
    title: 'Veyro: transaction classification case study',
    description:
      'How Dinesh Kumar worked on ML transaction categorisation with scikit-learn and XGBoost in Veyro, a unified fintech app with 62% more transactions.',
  },
};

const aura: Project = {
  slug: 'aura',
  name: 'Aura',
  category: 'Fintech · Anomaly detection · Personal finance',
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
  summary: 'A personal finance app for budgeting, savings goals and transfers, with anomaly alerts and AI budgeting suggestions.',
  cardMetric: { value: '96%', label: 'Payment success, up from 78%' },
  tags: ['Anomaly detection', 'scikit-learn', 'Fintech'],
  meta: {
    role: 'AI/ML Product Engineer',
    duration: '[TODO: project duration]',
    team: '[TODO: team size]',
    platform: 'Mobile app',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Plotly'],
  },
  tldr: {
    problem: 'Only 78% of payments succeeded, transfers were slow, and users had no clear picture of their spending.',
    did: 'I worked on unusual-transaction alerts (anomaly detection on spending patterns) and delivered AI budgeting suggestions and savings-goal tracking.',
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
    mattered: 'Every failed payment or missed suspicious charge erodes trust. People won’t budget in an app they don’t trust with a transfer.',
    constraints: [
      'Alerts had to catch unusual spending without flooding users with false alarms.',
      'Transfers had to be fast and safe, locally and globally.',
      '[TODO: compliance or technical constraints]',
    ],
  },
  role: {
    owned: [
      'I worked on unusual-transaction alerts: anomaly detection on spending patterns with scikit-learn.',
      'I delivered AI budgeting suggestions based on spending patterns, savings-goal tracking and spend-insight dashboards.',
      'I reviewed alerts and edge cases with stakeholders to reduce false alerts before release.',
    ],
    team: [teamNote, '[TODO: team size]'],
  },
  process: [
    { step: 'Research', text: 'I focused on the moments that decide trust: sending money, paying bills and spotting unusual charges.' },
    { step: 'Define', text: 'I framed alerts as anomaly detection on spending patterns, with success criteria agreed with the product owner.' },
    { step: 'Build', text: 'I built spending-pattern features in Pandas and the anomaly detector with scikit-learn.' },
    { step: 'Test', text: 'I reviewed alerts and edge cases with stakeholders to reduce false alerts before release.' },
    { step: 'Launch', text: 'Aura launched as one app for banking, transfers, bills, budgets and alerts.' },
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
    kind: 'deep-dive',
    title: 'AI/ML deep dive',
    intro: 'Aura’s models watch spending so users don’t have to.',
    data: {
      text: 'Users’ transaction history, summarised into spending patterns with Pandas.',
      facts: [
        { label: 'Input', value: 'Transaction history' },
        { label: 'Features', value: 'Spending patterns' },
        { label: 'Volume', value: '[TODO: number of users or transactions]' },
      ],
    },
    model: {
      text: 'An anomaly-detection model built with scikit-learn learns normal spending patterns and flags transactions that fall outside them. The same patterns drive personalised budgeting suggestions.',
      facts: [
        { label: 'Task', value: 'Anomaly detection' },
        { label: 'Library', value: 'scikit-learn' },
        { label: 'Algorithm', value: '[TODO: e.g. Isolation Forest]' },
      ],
    },
    evaluation: {
      text: 'I reviewed alerts and edge cases with stakeholders to reduce false alerts before release.',
      facts: [{ label: 'Metrics', value: '[TODO: precision / false-alert rate]' }],
    },
    serving: {
      text: 'Alerts and budgeting suggestions reach the app through REST APIs, and spend dashboards are built with Plotly.',
      facts: [
        { label: 'API', value: 'REST APIs' },
        { label: 'Dashboards', value: 'Plotly' },
        { label: 'Client', value: 'Aura mobile app' },
      ],
    },
    architecture: {
      title: 'From spending patterns to alerts and budgets',
      caption: 'Transactions become spending patterns; the model flags what doesn’t fit and suggests budgets that do.',
      nodes: [
        { title: 'Transactions', sub: 'History' },
        { title: 'Pandas', sub: 'Spending patterns' },
        { title: 'Anomaly model', sub: 'scikit-learn' },
        { title: 'REST API', sub: 'Alerts & suggestions' },
        { title: 'Aura app', sub: 'Alerts & budgets' },
      ],
      loop: 'Edge-case review',
    },
  },
  decisions: [
    {
      title: 'Alerts tuned for precision',
      why: 'If alerts cry wolf, users ignore them. I reviewed edge cases with stakeholders to cut false alerts before release.',
      notChosen: 'Alerting on every large transaction.',
    },
    {
      title: 'Learn normal spending instead of fixed rules',
      why: 'What’s unusual for one user is normal for another. Anomaly detection adapts to spending patterns.',
      notChosen: 'One fixed threshold for everyone.',
    },
    {
      title: 'Review before you send',
      why: 'Showing the amount, fee, estimated arrival and source account before every transfer catches mistakes before they cost money.',
      notChosen: 'One-tap transfers with no review step.',
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
    'In finance, reliability is the feature: a trusted alert is worth more than many noisy ones.',
    'Cutting false alerts takes reviewing real edge cases with stakeholders, not just offline metrics.',
    'Next, I’d measure how often users act on alerts and suggestions, and use that feedback to retrain the anomaly model.',
  ],
  stack: ['Python', 'Pandas', 'scikit-learn', 'Plotly'],
  links: [{ label: 'Live app', href: '[TODO: Aura link]' }],
  seo: {
    title: 'Aura: anomaly detection case study',
    description:
      'How Dinesh Kumar worked on anomaly-detection alerts and AI budgeting in Aura, a finance app that raised payment success from 78% to 96%.',
  },
};

/** Display order on the home page and for "next project". */
export const projects: Project[] = [monkify, loyaltri, novacare, veyro, aura];

export const workSection = {
  eyebrow: 'Selected work',
  title: 'Five products. Real numbers.',
  text: 'ML in production across recruitment, HR-tech, healthcare and fintech: the problem, the model, my role and the measured impact.',
};

export const seo = {
  home: {
    title: 'Dinesh Kumar · AI/ML Engineer',
    description:
      'AI/ML engineer with 7+ years in B2B SaaS: NLP job matching, classification, anomaly detection and LLM features for HR-tech, recruitment, fintech and healthcare.',
  },
  ogImage: '/og-image.png',
};
