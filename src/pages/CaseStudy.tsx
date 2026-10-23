import { useLayoutEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Download, ExternalLink, Mail, X as XIcon } from 'lucide-react';
import { aiDesignPrinciple, contact, ctaCopy, projects, type Fact, type Project } from '../data/content';
import { clean, hasValue, readingMinutes, shown } from '../lib/text';
import { useSeo } from '../lib/seo';
import { rectOf, shared } from '../lib/sharedTransition';
import { useStore } from '../lib/useStore';
import { Counter } from '../components/Counter';
import { Icon } from '../components/Icon';
import { Reveal, RevealText } from '../components/Reveal';
import { ZoomImage } from '../components/Lightbox';
import { Architecture } from '../components/Architecture';
import { ConfusionMatrix } from '../components/ConfusionMatrix';
import { Magnetic } from '../components/Magnetic';
import { useOpenProject } from '../components/ProjectCard';
import { copyEmail } from '../components/Contact';
import NotFound from './NotFound';

const ease = [0.22, 1, 0.36, 1] as const;

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const p = projects[index];
  if (!p) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  return <CaseStudyBody key={p.slug} p={p} next={next} />;
}

function CaseStudyBody({ p, next }: { p: Project; next: Project }) {
  useSeo(`${p.seo.title} · Dinesh Kumar`, p.seo.description, `/projects/${p.slug}`, p.cover);
  const minutes = readingMinutes(p);
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <article className="case" style={{ '--accent': p.accent, '--accent-2': p.accent2 } as React.CSSProperties}>
      <Hero p={p} minutes={minutes} />
      <TLDR p={p} />

      <Section num={num()} title="The challenge" id="challenge">
        <div className="case-cols">
          <div className="case-prose">
            {p.challenge.intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <dl className="case-facts">
            <div>
              <dt>Who was affected</dt>
              <dd>{p.challenge.affected}</dd>
            </div>
            <div>
              <dt>Why it mattered</dt>
              <dd>{p.challenge.mattered}</dd>
            </div>
            {shown(p.challenge.constraints).length > 0 && (
              <div>
                <dt>Constraints</dt>
                <dd>
                  <ul className="dash-list">
                    {shown(p.challenge.constraints).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Section>

      <Section num={num()} title="My role & responsibilities" id="role">
        <div className="role-split">
          <Reveal className="role-box glass is-mine">
            <h3>What I owned</h3>
            <ul className="check-list">
              {shown(p.role.owned).map((r) => (
                <li key={r}>
                  <Check aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          {shown(p.role.team).length > 0 && (
            <Reveal className="role-box glass" delay={0.08}>
              <h3>What the team owned</h3>
              <ul className="dash-list">
                {shown(p.role.team).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Section>

      <Section num={num()} title="Process" id="process">
        <ol className="process">
          {p.process.map((s, i) => (
            <motion.li
              key={s.step}
              className="process-step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <span className="process-dot" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.step}</h3>
              <p>{clean(s.text)}</p>
            </motion.li>
          ))}
          <motion.span
            className="process-line"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
        </ol>
      </Section>

      <Section num={num()} title="The solution" id="solution" lead={p.solution.intro}>
        <div className="feature-grid">
          {p.solution.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="feature glass">
              <span className="feature-icon">
                <Icon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p>{clean(f.text)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="case-figure">
          <ZoomImage src={p.cover} alt={p.coverAlt} width={1600} height={900} />
        </Reveal>
      </Section>

      {p.ai.kind === 'deep-dive' ? (
        <Section num={num()} title={p.ai.title} id="ml" lead={p.ai.intro}>
          <DeepDive p={p} />
          <p className="ai-principle">{aiDesignPrinciple}</p>
        </Section>
      ) : (
        <Section num={num()} title="The AI features" id="ai" lead={p.ai.intro}>
          <div className="feature-grid ai-grid">
            {p.ai.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="feature glass is-ai">
                <span className="feature-icon">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{clean(f.text)}</p>
              </Reveal>
            ))}
          </div>
          <p className="ai-principle">{aiDesignPrinciple}</p>
        </Section>
      )}

      <Section num={num()} title="Key decisions & trade-offs" id="decisions">
        <div className="decisions">
          {p.decisions.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} className="decision glass">
              <span className="decision-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d.title}</h3>
              <p>
                <strong>Why: </strong>
                {d.why}
              </p>
              <p className="decision-not">
                <XIcon aria-hidden="true" />
                <span>
                  <strong>Chose not to: </strong>
                  {d.notChosen}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section num={num()} title="Before → After" id="before-after">
        <Reveal className="case-figure">
          <ZoomImage src={p.secondary} alt={p.secondaryAlt} width={1600} height={p.secondary.includes('loyaltri') ? 1067 : 900} />
        </Reveal>
        <div className="ba">
          <Reveal className="ba-col is-before">
            <span className="ba-tag">Before</span>
            <h3>{p.beforeAfter.before.title}</h3>
            <ul>
              {p.beforeAfter.before.items.map((it) => (
                <li key={it}>
                  <XIcon aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="ba-col is-after" delay={0.1}>
            <span className="ba-tag">After</span>
            <h3>{p.beforeAfter.after.title}</h3>
            <ul>
              {p.beforeAfter.after.items.map((it) => (
                <li key={it}>
                  <Check aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section num={num()} title="Results & impact" id="results" lead={p.results.impact}>
        <ul className="results-grid">
          {p.results.metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.06} className="result glass">
              <Counter className="metric-value accent-text" value={m.value} />
              <p className="metric-label">{m.label}</p>
              {m.detail && <p className="metric-source">{m.detail}</p>}
            </Reveal>
          ))}
        </ul>
        {p.results.breakdowns && (
          <div className="breakdowns">
            {p.results.breakdowns.map((b) => (
              <Reveal key={b.title} className="breakdown glass">
                <h3>{b.title}</h3>
                {b.caption && <p className="metric-source">{b.caption}</p>}
                <ul>
                  {b.rows.map((r, i) => (
                    <li key={r.label}>
                      <span className="bd-label">{r.label}</span>
                      <span className="bd-track" aria-hidden="true">
                        <motion.span
                          className="bd-fill"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: r.value / Math.max(...b.rows.map((x) => x.value)) }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: i * 0.08, ease }}
                        />
                      </span>
                      <span className="bd-value">{r.display}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section num={num()} title="What I learned & what I’d do next" id="learned">
        <ul className="learned">
          {p.learned.map((l, i) => (
            <Reveal as="li" key={l} delay={i * 0.06}>
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p>{l}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section num={num()} title="Tech stack & links" id="stack">
        <ul className="stack">
          {shown(p.stack).map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        {p.links.some((l) => hasValue(l.href)) && (
          <ul className="case-links">
            {p.links
              .filter((l) => hasValue(l.href))
              .map((l) => (
                <li key={l.label}>
                  <a className="btn btn-ghost btn-sm" href={l.href} target="_blank" rel="noopener">
                    {l.label} <ExternalLink aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        )}
      </Section>

      <NextProject next={next} />
      <CaseCTA />
    </article>
  );
}

function Section({ num, title, id, lead, children }: { num: string; title: string; id: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="case-section" aria-labelledby={`${id}-title`}>
      <div className="case-container">
        <div className="case-head">
          <span className="case-num" aria-hidden="true">
            {num}
          </span>
          <RevealText as="h2" id={`${id}-title`} className="case-title" text={title} />
        </div>
        {lead && <p className="case-lead">{clean(lead)}</p>}
        {children}
      </div>
    </section>
  );
}

function Hero({ p, minutes }: { p: Project; minutes: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const s = useStore(shared);
  const flying = s.phase === 'flying' && s.slug === p.slug;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], ['0%', '18%']);
  const scale = useTransform(scrollY, [0, 800], [1.06, 1.16]);

  // Report where the hero image is, so the shared-element overlay can land on it.
  useLayoutEffect(() => {
    if (shared.get().phase === 'flying' && shared.get().slug === p.slug && frame.current) {
      shared.set({ phase: 'landing', to: rectOf(frame.current) });
    }
  }, [p.slug]);

  const meta = [
    { k: 'Role', v: clean(p.meta.role) },
    { k: 'Duration', v: clean(p.meta.duration) },
    { k: 'Team', v: clean(p.meta.team) },
    { k: 'Platform', v: clean(p.meta.platform) },
    { k: 'Stack', v: shown(p.meta.stack).join(', ') },
  ].filter((m) => m.v);

  return (
    <header className="case-hero">
      <div className="case-hero-media" ref={frame} style={{ opacity: flying ? 0 : 1 }}>
        <motion.img
          src={p.cover}
          alt={p.coverAlt}
          width={1600}
          height={900}
          {...{ fetchpriority: 'high' }}
          style={{ y, scale }}
        />
      </div>
      <div className="case-container">
        <motion.div
          className="case-hero-card glass"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
        >
          <div className="case-crumbs">
            <Link to="/#work" className="back-link">
              <ArrowLeft aria-hidden="true" /> All work
            </Link>
            <span className="case-reading">
              <Clock aria-hidden="true" /> {minutes} min read
            </span>
          </div>
          <p className="case-kicker">
            <span className="dot" aria-hidden="true" />
            {p.name} · {p.category}
          </p>
          <h1 className="case-h1">{p.outcome}</h1>
          <dl className="case-meta">
            {meta.map((m) => (
              <div key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </header>
  );
}

function TLDR({ p }: { p: Project }) {
  const rows = [
    { k: 'Problem', v: p.tldr.problem },
    { k: 'What I did', v: p.tldr.did },
    { k: 'Result', v: p.tldr.result },
  ];
  return (
    <section className="case-section tldr-section" aria-labelledby="tldr-title">
      <div className="case-container">
        <Reveal className="tldr glass">
          <h2 id="tldr-title" className="tldr-title">
            TL;DR <span>· the 30-second version</span>
          </h2>
          <dl className="tldr-rows">
            {rows.map((r) => (
              <div key={r.k}>
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
          <ul className="tldr-metrics">
            {p.tldr.metrics.map((m) => (
              <li key={m.label}>
                <Counter className="metric-value accent-text" value={m.value} />
                <p className="metric-label">{m.label}</p>
                {m.detail && <p className="metric-source">{m.detail}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Facts({ facts }: { facts: Fact[] }) {
  const visible = facts.map((f) => ({ ...f, value: clean(f.value) })).filter((f) => f.value);
  return (
    <dl className="facts">
      {visible.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DeepDive({ p }: { p: Project }) {
  if (p.ai.kind !== 'deep-dive') return null;
  const ai = p.ai;
  const blocks = [
    { id: 'data', title: ai.data.title ?? 'Data', icon: 'database' as const, text: ai.data.text, facts: ai.data.facts },
    { id: 'model', title: ai.model.title ?? 'Model & approach', icon: 'brain' as const, text: ai.model.text, facts: ai.model.facts },
  ];
  return (
    <div className="ml">
      <Reveal className="ml-arch glass">
        <h3 className="ml-h3">{ai.architecture.title}</h3>
        <Architecture a={ai.architecture} accent={p.accent} />
      </Reveal>
      <div className="ml-grid">
        {blocks.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.06} className="ml-block glass">
            <span className="feature-icon">
              <Icon name={b.icon} />
            </span>
            <h3 className="ml-h3">{b.title}</h3>
            <p>{b.text}</p>
            <Facts facts={b.facts} />
          </Reveal>
        ))}
      </div>
      <Reveal className="ml-block glass ml-eval">
        <span className="feature-icon">
          <Icon name="gauge" />
        </span>
        <h3 className="ml-h3">{ai.evaluation.title ?? 'Evaluation'}</h3>
        <p>{ai.evaluation.text}</p>
        <Facts facts={ai.evaluation.facts} />
        {ai.evaluation.confusion && (
          <ConfusionMatrix labels={ai.evaluation.confusion.labels} matrix={ai.evaluation.confusion.matrix} accent={p.accent} />
        )}
        {ai.evaluation.reading && (
          <ul className="ml-reading">
            {ai.evaluation.reading.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
        {ai.evaluation.curvesImage && (
          <figure className="ml-curves">
            <ZoomImage src={ai.evaluation.curvesImage} alt={ai.evaluation.curvesAlt ?? ''} width={714} height={318} />
            {ai.evaluation.curvesNote && <figcaption>{ai.evaluation.curvesNote}</figcaption>}
          </figure>
        )}
      </Reveal>
      <Reveal className="ml-block glass">
        <span className="feature-icon">
          <Icon name="server" />
        </span>
        <h3 className="ml-h3">{ai.serving.title ?? 'Serving & integration'}</h3>
        <p>{ai.serving.text}</p>
        <Facts facts={ai.serving.facts} />
      </Reveal>
    </div>
  );
}

function NextProject({ next }: { next: Project }) {
  const media = useRef<HTMLDivElement>(null);
  const open = useOpenProject();
  return (
    <section className="case-section next-section" aria-label="Next project">
      <div className="case-container">
        <a
          href={`/projects/${next.slug}`}
          className="next-card"
          data-cursor="Next"
          style={{ '--accent': next.accent } as React.CSSProperties}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            open(next, media.current);
          }}
        >
          <span className="next-label">
            Next project <ArrowRight aria-hidden="true" />
          </span>
          <span className="next-title">{next.name}</span>
          <span className="next-outcome">{next.outcome}</span>
          <div className="next-media" ref={media}>
            <img src={next.coverMd} alt={next.coverAlt} loading="lazy" width={960} height={540} />
          </div>
        </a>
      </div>
    </section>
  );
}

function CaseCTA() {
  return (
    <section className="case-section cta-section" aria-labelledby="cta-title">
      <div className="case-container">
        <Reveal className="cta glass">
          <h2 id="cta-title">{ctaCopy.title}</h2>
          <p>{ctaCopy.text}</p>
          <div className="cta-actions">
            <Magnetic>
              <a className="btn btn-primary" href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" /> {contact.email}
              </a>
            </Magnetic>
            <button type="button" className="btn btn-ghost" onClick={copyEmail}>
              Copy email
            </button>
            <Magnetic>
              <a className="btn btn-ghost" href={contact.resumePdf} download="Dinesh_Kumar_AI_ML_Engineer_Resume.pdf">
                <Download aria-hidden="true" /> Download resume
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
