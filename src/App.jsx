import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import AmbientStars from './components/AmbientStars.jsx';
import IntroExperience from './components/IntroExperience.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import Footer from './components/Footer.jsx';
import { metadataFor } from './routeMetadata.js';
import { siteConfig } from './siteConfig.js';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const WorldPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.WorldPage })));
const ProjectPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.ProjectPage })));
const ProjectsPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.AboutPage })));
const ArchivePage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.ArchivePage })));
const ArsenalPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.ArsenalPage })));
const LabPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.LabPage })));
const WarRoomPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.WarRoomPage })));
const StartProjectPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.StartProjectPage })));
const ServicesPage = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.ServicesPage })));
const NotFound = lazy(() => import('./pages/DetailPages.jsx').then((module) => ({ default: module.NotFound })));
const WorldsIndexPage = lazy(() => import('./pages/DirectoryPages.jsx').then((module) => ({ default: module.WorldsIndexPage })));
const ContactPage = lazy(() => import('./pages/DirectoryPages.jsx').then((module) => ({ default: module.ContactPage })));

function RouteMotion({ children, routePath }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="route-motion"
      data-route-path={routePath}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function LoadingState() {
  return <div className="route-loading" role="status"><span className="loading-sigil" />Opening the universe…</div>;
}

function shouldShowIntro(pathname) {
  return pathname === '/' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function routeElement(pathname) {
  return [...document.querySelectorAll('#main-content [data-route-path]')].find((element) => element.dataset.routePath === pathname) || null;
}

function elementForHash(hash, pathname) {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
  const existing = document.getElementById(id);
  const existingRoute = existing?.closest('[data-route-path]');
  if (existing && (!existingRoute || existingRoute.dataset.routePath === pathname)) return existing;
  const currentRoute = routeElement(pathname);
  return [...(currentRoute?.querySelectorAll('[id]') || [])].find((element) => element.id === id) || null;
}

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(selector.startsWith('meta') ? 'meta' : 'link');
    if (selector.includes('property=')) element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
    else if (selector.includes('name=')) element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
    else if (selector.includes('rel=')) element.setAttribute('rel', selector.match(/rel="([^"]+)"/)?.[1] || '');
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export default function App() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const introReturnFocus = useRef(null);
  const [mode, setMode] = useState(() => {
    try {
      return window.localStorage.getItem('edg-universe-mode') === 'ascension' ? 'ascension' : 'celestial';
    } catch {
      return 'celestial';
    }
  });
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro(location.pathname));
  const [introClosing, setIntroClosing] = useState(false);

  const dismissIntro = useCallback(() => {
    setIntroClosing(true);
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    introReturnFocus.current = document.activeElement;
    setIntroClosing(false);
    setShowIntro(true);
  }, []);

  const finishIntroExit = useCallback(() => {
    setIntroClosing(false);
    const returnTarget = introReturnFocus.current;
    introReturnFocus.current = null;
    if (returnTarget?.isConnected) {
      returnTarget.focus({ preventScroll: true });
      return;
    }
    let attempts = 0;
    const focusHeading = () => {
      const heading = routeElement(location.pathname)?.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      } else if (attempts++ < 40) {
        window.requestAnimationFrame(focusHeading);
      }
    };
    window.requestAnimationFrame(focusHeading);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try { window.localStorage.setItem('edg-universe-mode', mode); } catch { /* Storage may be unavailable. */ }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute('content', mode === 'celestial' ? '#070a12' : '#f3f0e9');
  }, [mode]);

  useEffect(() => {
    const hash = location.hash;
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    let frame = 0;
    let attempts = 0;
    let cancelled = false;

    if (!hash) {
      window.scrollTo(0, 0);
      if (pathChanged) {
        const focusRouteHeading = () => {
          if (cancelled) return;
          const heading = routeElement(location.pathname)?.querySelector('main h1');
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
          } else if (attempts++ < 90) {
            frame = window.requestAnimationFrame(focusRouteHeading);
          }
        };
        frame = window.requestAnimationFrame(focusRouteHeading);
      }
    } else {
      const locateAnchor = () => {
        if (cancelled) return;
        const target = elementForHash(hash, location.pathname);
        if (target) {
          target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
          if (pathChanged && typeof target.focus === 'function') {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          }
        } else if (attempts++ < 90) {
          frame = window.requestAnimationFrame(locateAnchor);
        }
      };
      frame = window.requestAnimationFrame(locateAnchor);
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const meta = metadataFor(location.pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    if (siteConfig.siteUrl) setMeta('link[rel="canonical"]', 'href', `${siteConfig.siteUrl}${location.pathname}`);
    else document.head.querySelector('link[rel="canonical"]')?.remove();
  }, [location.pathname]);

  const toggleMode = () => setMode((current) => current === 'celestial' ? 'ascension' : 'celestial');

  return (
    <MotionConfig reducedMotion="user">
      <>
        <AnimatePresence onExitComplete={finishIntroExit}>{showIntro && <IntroExperience key="intro" onEnter={dismissIntro} />}</AnimatePresence>
        <div className="app-frame" aria-hidden={showIntro || introClosing || undefined} inert={showIntro || introClosing || undefined}>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <AmbientStars />
          <div className="cosmic-haze" aria-hidden="true" />
          <SiteHeader mode={mode} onToggleMode={toggleMode} />
          <div id="main-content" tabIndex={-1}>
            <Suspense fallback={<LoadingState />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<RouteMotion routePath={location.pathname}><HomePage /></RouteMotion>} />
                  <Route path="/worlds" element={<RouteMotion routePath={location.pathname}><WorldsIndexPage /></RouteMotion>} />
                  <Route path="/worlds/:slug" element={<RouteMotion routePath={location.pathname}><WorldPage /></RouteMotion>} />
                  <Route path="/projects/:slug" element={<RouteMotion routePath={location.pathname}><ProjectPage /></RouteMotion>} />
                  <Route path="/projects" element={<RouteMotion routePath={location.pathname}><ProjectsPage /></RouteMotion>} />
                  <Route path="/about" element={<RouteMotion routePath={location.pathname}><AboutPage /></RouteMotion>} />
                  <Route path="/archive" element={<RouteMotion routePath={location.pathname}><ArchivePage /></RouteMotion>} />
                  <Route path="/arsenal" element={<RouteMotion routePath={location.pathname}><ArsenalPage /></RouteMotion>} />
                  <Route path="/lab" element={<RouteMotion routePath={location.pathname}><LabPage /></RouteMotion>} />
                  <Route path="/war-room" element={<RouteMotion routePath={location.pathname}><WarRoomPage /></RouteMotion>} />
                  <Route path="/start-a-project" element={<RouteMotion routePath={location.pathname}><StartProjectPage /></RouteMotion>} />
                  <Route path="/services" element={<RouteMotion routePath={location.pathname}><ServicesPage /></RouteMotion>} />
                  <Route path="/contact" element={<RouteMotion routePath={location.pathname}><ContactPage /></RouteMotion>} />
                  <Route path="*" element={<RouteMotion routePath={location.pathname}><NotFound /></RouteMotion>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </div>
          <Footer onReplayIntro={replayIntro} />
        </div>
      </>
    </MotionConfig>
  );
}
