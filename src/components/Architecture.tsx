import { motion } from 'framer-motion';
import type { MlDeepDive } from '../data/content';

const ease = [0.22, 1, 0.36, 1] as const;

/** Animated pipeline diagram: data → processing → model → API → app, with a feedback loop. */
export function Architecture({ a, accent }: { a: MlDeepDive['architecture']; accent: string }) {
  const n = a.nodes.length;
  const W = 1000;
  const boxW = 156;
  const gap = (W - n * boxW) / (n - 1);
  const x = (i: number) => i * (boxW + gap);
  const desc = `${a.title}: ${a.nodes.map((nd) => `${nd.title} (${nd.sub})`).join(', then ')}. ${a.loop} flows back to the data.`;

  return (
    <figure className="arch">
      {/* Wide layout */}
      <svg className="arch-wide" viewBox={`-4 -10 ${W + 8} 222`} role="img" aria-label={desc}>
        <defs>
          <linearGradient id="arch-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#6366F1" />
          </marker>
        </defs>
        {a.nodes.slice(0, -1).map((_, i) => {
          const x1 = x(i) + boxW;
          const x2 = x(i + 1);
          return (
            <g key={`l${i}`}>
              <motion.path
                d={`M${x1 + 4} 60 L${x2 - 6} 60`}
                stroke="url(#arch-grad)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arch-arrow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.25, ease }}
              />
              <circle r="4" fill={accent} className="arch-pulse">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M${x1 + 4} 60 L${x2 - 6} 60`} />
              </circle>
            </g>
          );
        })}
        {a.nodes.map((nd, i) => (
          <motion.g
            key={nd.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.25, ease }}
          >
            <rect x={x(i)} y="18" width={boxW} height="84" rx="18" fill="#fff" stroke={i === 2 ? accent : 'rgba(11,11,18,0.14)'} strokeWidth={i === 2 ? 2 : 1} />
            <text x={x(i) + boxW / 2} y="56" textAnchor="middle" className="arch-title">
              {nd.title}
            </text>
            <text x={x(i) + boxW / 2} y="80" textAnchor="middle" className="arch-sub">
              {nd.sub}
            </text>
          </motion.g>
        ))}
        <motion.path
          d={`M${x(n - 1) + boxW / 2} 104 C ${x(n - 1) + boxW / 2} 200, ${x(0) + boxW / 2} 200, ${x(0) + boxW / 2} 108`}
          stroke="#A5B4FC"
          strokeWidth="2"
          strokeDasharray="6 7"
          fill="none"
          markerEnd="url(#arch-arrow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.4, ease }}
        />
        <text x={W / 2} y="196" textAnchor="middle" className="arch-loop">
          {a.loop}
        </text>
      </svg>

      {/* Narrow layout */}
      <ol className="arch-narrow" aria-hidden="true">
        {a.nodes.map((nd, i) => (
          <motion.li
            key={nd.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease }}
            style={i === 2 ? { borderColor: accent } : undefined}
          >
            <strong>{nd.title}</strong>
            <span>{nd.sub}</span>
          </motion.li>
        ))}
        <li className="arch-narrow-loop">↺ {a.loop} flows back to the data</li>
      </ol>
      <figcaption>{a.caption}</figcaption>
    </figure>
  );
}
