import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation, matchPath } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './data/content';
import { WEBGL, useReducedMotion } from './lib/env';
import { route } from './lib/state';
import { scrollToTarget, startSmoothScroll } from './lib/smoothScroll';
import { shared } from './lib/sharedTransition';
import { Navbar } from './components/Navbar';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { TalkButton } from './components/TalkButton';
import { Toast } from './components/Toast';
import { SharedOverlay } from './components/SharedOverlay';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Scene = lazy(() => import('./three/Scene'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Capture = import.meta.env.DEV ? lazy(() => import('./three/Capture')) : null;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: -10, transition: { duration: shared.get().phase === 'flying' ? 0.3 : 0.4, ease: [0.76, 0, 0.24, 1] } }}
    >
      <main id="main">{children}</main>
      <Footer />
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const webgl = WEBGL && !reduced;
  const capture = import.meta.env.DEV && location.pathname.startsWith('/__capture');

  useEffect(() => startSmoothScroll(!reduced && !capture), [reduced, capture]);

  // Start loading the 3D bundle once the page has painted, so text appears first.
  const [sceneOn, setSceneOn] = useState(false);
  useEffect(() => {
    if (!webgl) return;
    const start = () => setSceneOn(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 120);
    return () => clearTimeout(t);
  }, [webgl]);

  // Tell the 3D layer which page it is on, and with which accent colour.
  const match = matchPath('/projects/:slug', location.pathname);
  const project = useMemo(() => projects.find((p) => p.slug === match?.params.slug), [match?.params.slug]);
  useLayoutEffect(() => {
    if (location.pathname === '/') route.set({ kind: 'home', accent: '#4F46E5', accent2: '#06B6D4' });
    else if (project) route.set({ kind: 'case', accent: project.accent, accent2: project.accent2 });
    else route.set({ kind: 'other', accent: '#4F46E5', accent2: '#06B6D4' });
  }, [location.pathname, project]);

  if (capture && Capture) {
    return (
      <Suspense fallback={null}>
        <Capture />
      </Suspense>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      {webgl && sceneOn && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          scrollToTarget(0, true);
          window.scrollTo(0, 0);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home staticHero={!webgl} />
              </Page>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Page>
                <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                  <CaseStudy />
                </Suspense>
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>
      <TalkButton />
      <Toast />
      <SharedOverlay />
      <Cursor />
      <Loader waitForScene={webgl} quick={reduced} />
    </MotionConfig>
  );
}
