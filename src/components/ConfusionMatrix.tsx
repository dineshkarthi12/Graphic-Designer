import { motion } from 'framer-motion';
import { Counter } from './Counter';

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

/** Confusion matrix (rows = actual, columns = predicted) plus per-class precision, recall and F1 computed from it. */
export function ConfusionMatrix({ labels, matrix, accent }: { labels: string[]; matrix: number[][]; accent: string }) {
  const max = Math.max(...matrix.flat());
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const correct = matrix.reduce((a, row, i) => a + row[i], 0);
  const stats = labels.map((l, i) => {
    const tp = matrix[i][i];
    const rowSum = matrix[i].reduce((a, b) => a + b, 0);
    const colSum = matrix.reduce((a, row) => a + row[i], 0);
    const precision = tp / colSum;
    const recall = tp / rowSum;
    const f1 = (2 * precision * recall) / (precision + recall);
    return { l, precision, recall, f1 };
  });

  return (
    <div className="cm">
      <div className="cm-grid-wrap">
        <table className="cm-table">
          <caption className="sr-only">
            Confusion matrix of the resume classifier on {total} test resumes. Rows are the actual class, columns the predicted class.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="cm-axis">Actual ↓ / Predicted →</span>
              </th>
              {labels.map((l) => (
                <th scope="col" key={l}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={labels[i]}>
                <th scope="row">{labels[i]}</th>
                {row.map((v, j) => (
                  <motion.td
                    key={j}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i * 3 + j) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: `color-mix(in srgb, ${accent} ${Math.round((v / max) * 88)}%, #ffffff)`,
                      color: v / max > 0.5 ? '#fff' : 'var(--ink)',
                    }}
                    className={i === j ? 'is-diag' : undefined}
                  >
                    <Counter value={String(v)} />
                  </motion.td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cm-side">
        <p className="cm-acc">
          <Counter className="metric-value" value={pct(correct / total)} />
          <span>
            Test accuracy · {correct} of {total} correct
          </span>
        </p>
        <table className="cm-stats">
          <caption className="sr-only">Per-class precision, recall and F1, calculated from the confusion matrix</caption>
          <thead>
            <tr>
              <th scope="col">Class</th>
              <th scope="col">Precision</th>
              <th scope="col">Recall</th>
              <th scope="col">F1</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.l}>
                <th scope="row">{s.l}</th>
                <td>{pct(s.precision)}</td>
                <td>{pct(s.recall)}</td>
                <td>{pct(s.f1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
