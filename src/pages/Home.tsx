import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronDown, FileText } from 'lucide-react';
import {
  about, certifications, contact, contactSection, education, experience, impactAtAGlance, person,
  projects, seo, skills, workSection,
} from '../data/content';
import { clean, shown } from '../lib/text';
import { loading, scroll } from '../lib/state';
import { useStore } from '../lib/useStore';
import { useSeo } from '../lib/seo';
import { scrollToTarget } from '../lib/smoothScroll';
import { Counter } from '../components/Counter';
import { Magnetic } from '../components/Magnetic';
import { Reveal, RevealText } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';
import { ContactCards, ContactForm } from '../components/Contact';
import { GithubIcon } from '../components/Icon';

/** Section ids, in order, that drive the 3D camera. */
export const SCENE_SECTIONS = ['hero', 'about', 'skills', 'work', 'experience', 'contact'];

/** Record where each section starts so the 3D scene can map scroll position to its storyboard. */
function useSceneAnchors() {
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      scroll.anchors = SCENE_SECTIONS.map((id, i) => {
        const el = document.getElementById(id);
        if (!el || i === 0) return 0;
        return el.getBoundingClientRect().top + window.scrollY - vh * 0.3;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      scroll.anchors = [];
    };
  }, []);
}

export default function Home({ staticHero }: { staticHero: boolean }) {
  useSeo(seo.home.title, seo.home.description, '/');
  useSceneAnchors();
  const { revealed } = useStore(loading);
  const { hash } = useLocation();

  useEffect(() => {
    if (!revealed || !hash) return;
    const t = window.setTimeout(() => scrollToTarget(hash), 120);
    return () => window.clearTimeout(t);
  }, [revealed, hash]);

  return (
    <>
      <Hero revealed={revealed} staticHero={staticHero} />
      <Impact />
      <About />
      <Skills />
      <Work />
      <Experience />
      <ContactSection />
    </>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

function Hero({ revealed, staticHero }: { revealed: boolean; staticHero: boolean }) {
  const lines = [person.firstName, person.lastName];
  const state = revealed ? 'show' : 'hidden';
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease, delay },
  });
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {staticHero && (
        <picture className="hero-static">
          <source media="(max-width: 767px)" srcSet="/hero/static-mobile.webp" />
          <img
            src="/hero/static-desktop.webp"
            alt="A glass AI core floating in a glowing portal, in a sky world of floating islands, waterfalls and light trails"
            width={2880}
            height={1800}
            {...{ fetchpriority: 'high' }}
          />
        </picture>
      )}
      <div className="container">
        <div className="hero-inner">
          <motion.span className="pill" {...fade(0.1)}>
            <span className="pill-dot" aria-hidden="true" />
            {person.availability}
          </motion.span>
          <h1 className="hero-name">
            <span className="sr-only">{person.name}</span>
            {lines.map((line, li) => (
              <span className="line" key={line} aria-hidden="true">
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial="hidden"
                  animate={state}
                  transition={{ staggerChildren: 0.045, delayChildren: 0.15 + li * 0.12 }}
                >
                  {line.split('').map((c, i) => (
                    <motion.span
                      key={i}
                      className="char"
                      variants={{
                        hidden: { y: '110%', rotate: 6 },
                        show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease } },
                      }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-role" {...fade(0.55)}>
            {person.role}
          </motion.p>
          <motion.p className="hero-headline" {...fade(0.65)}>
            {person.headline}
          </motion.p>
          <motion.p className="hero-value" {...fade(0.72)}>
            {person.valueProp}
          </motion.p>
          <motion.div className="hero-actions" {...fade(0.82)}>
            <Magnetic>
              <a
                className="btn btn-primary"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('#work');
                }}
              >
                View work <ArrowDown aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={contact.resumeView} target="_blank" rel="noopener">
                <FileText aria-hidden="true" /> Resume<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={contact.github} target="_blank" rel="noopener">
                <GithubIcon /> GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
      <motion.div className="hero-scroll" aria-hidden="true" {...fade(1.1)}>
        Scroll
        <i />
      </motion.div>
    </section>
  );
}

function Impact() {
  return (
    <section className="impact" aria-labelledby="impact-title">
      <div className="container">
        <div className="impact-head">
          <h2 id="impact-title" className="eyebrow" style={{ fontSize: 13 }}>
            Impact at a glance
          </h2>
        </div>
        <ul className="impact-grid" style={{ listStyle: 'none' }}>
          {impactAtAGlance.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.08} className="impact-card glass">
              <Counter className="metric-value grad-text" value={m.value} />
              <p className="metric-label">{m.label}</p>
              <p className="metric-source">{m.source}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container split">
        <Reveal className="about-card glass">
          <span className="eyebrow">{about.eyebrow}</span>
          <RevealText as="h2" id="about-title" className="section-title" text={about.title} />
          <div className="about-bio">
            {about.bio.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <ul className="stats" style={{ listStyle: 'none' }}>
            {about.stats.map((s) => (
              <li className="stat" key={s.label}>
                <Counter className="metric-value" value={s.value} />
                <p className="metric-label">{s.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <div aria-hidden="true" />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <span className="eyebrow">Skills</span>
        <h2 id="skills-title" className="sr-only">
          Skills
        </h2>
        <RevealText as="p" className="section-title" text="Six orbits, one core." />
        <p className="section-lead">
          From Python and classic ML to LLM apps, NLP, data and deployment, plus the product craft that gets models into
          users’ hands.
        </p>
        <div className="skills-grid">
          {skills.map((g, i) => (
            <Reveal key={g.id} delay={(i % 2) * 0.08} className="skill-card glass">
              <div className="skill-card-head">
                <span className="skill-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{g.title}</h3>
              </div>
              {g.groups.map((sg) => (
                <div className="skill-group" key={sg.name}>
                  {g.groups.length > 1 && <p className="skill-group-name">{sg.name}</p>}
                  <ul className="skill-items" aria-label={sg.name} style={g.groups.length === 1 ? { marginTop: 16 } : undefined}>
                    {sg.items.map((it) => (
                      <li className="chip" key={it}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <span className="eyebrow">{workSection.eyebrow}</span>
        <RevealText as="h2" id="work-title" className="section-title" text={workSection.title} />
        <p className="section-lead">{workSection.text}</p>
        <div className="work-list">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard p={p} index={i} total={projects.length} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="container">
        <span className="eyebrow">Experience</span>
        <RevealText as="h2" id="exp-title" className="section-title" text="7+ years of shipping." />
        <ol className="timeline">
          {experience.map((r) => (
            <Reveal as="li" key={r.company} className="role-card glass">
              <div className="role-top">
                <span className="role-period">{r.period}</span>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>{clean(r.location)}</span>
              </div>
              <h3>{r.title}</h3>
              <p className="role-company">{r.company}</p>
              <ul className="role-impact">
                {shown(r.impact).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {r.products && (
                <ul className="role-products" aria-label="Products">
                  {r.products.map((p) => (
                    <li key={p} className="chip">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {r.more.length > 0 && (
                <details className="role-more">
                  <summary>
                    More from this role <ChevronDown aria-hidden="true" />
                  </summary>
                  <ul>
                    {shown(r.more).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </details>
              )}
            </Reveal>
          ))}
          <Reveal as="li" className="edu-grid">
            <div className="edu-card glass">
              <span className="eyebrow">Education</span>
              <h3>{education.degree}</h3>
              <p>
                {education.school} · {education.period}
              </p>
            </div>
            <div className="edu-card glass">
              <span className="eyebrow">Certifications</span>
              <ul>
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <span className="eyebrow">{contactSection.eyebrow}</span>
        <RevealText as="h2" id="contact-title" className="contact-title" text={contactSection.title} />
        <p className="section-lead">{contactSection.text}</p>
        <div className="contact-layout">
          <ContactCards />
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
