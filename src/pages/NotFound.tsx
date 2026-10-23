import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';

export default function NotFound() {
  useSeo('Page not found · Dinesh Kumar', 'This page does not exist.', '/404');
  return (
    <section className="notfound">
      <div>
        <h1 className="grad-text">404</h1>
        <p>This page doesn’t exist, but the work does.</p>
        <Link className="btn btn-primary" to="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
