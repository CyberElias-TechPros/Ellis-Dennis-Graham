import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icons.jsx';
import { worlds } from '../content.js';

const quickLinks = [
  { label: 'Worlds', to: '/worlds' },
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

const phaseCopy = {
  void: 'A quiet signal waits in the dark.',
  'first-light': 'First light. The center begins to answer.',
  identity: 'Ellis Dennis Graham. Technology Systems Architect.',
  ignition: 'The core is forming. The worlds are finding their paths.',
  ready: 'The universe is yours to explore.'
};

export default function IntroExperience({ onEnter }) {
  const [phase, setPhase] = useState('void');
  const skipRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    if (reducedMotion) {
      setPhase('ready');
      return () => { document.body.style.overflow = ''; };
    }

    const timeline = [
      ['first-light', 620],
      ['identity', 1420],
      ['ignition', 2440],
      ['ready', 3340]
    ];
    const timers = timeline.map(([nextPhase, delay]) => window.setTimeout(() => setPhase(nextPhase), delay));
    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = '';
    };
  }, [reducedMotion]);

  return (
    <motion.div
      className={`intro-experience intro-experience--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      aria-describedby="intro-description"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.55 }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onEnter();
          return;
        }
        if (event.key === 'Tab') {
          const focusable = [...event.currentTarget.querySelectorAll('button:not(:disabled), a[href]')]
            .filter((element) => element.getClientRects().length > 0);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <div className="intro-atmosphere" aria-hidden="true">
        <span className="intro-nebula intro-nebula--one" />
        <span className="intro-nebula intro-nebula--two" />
        <span className="intro-orbit intro-orbit--one" />
        <span className="intro-orbit intro-orbit--two" />
        <span className="intro-core">
          <svg className="intro-sigil" viewBox="0 0 120 120" focusable="false" aria-hidden="true">
            <circle cx="60" cy="60" r="51" />
            <circle cx="60" cy="60" r="36" />
            <path d="M60 7 70 48 113 60 70 72 60 113 50 72 7 60 50 48Z" />
            <path d="m60 20 40 40-40 40-40-40Z" />
            <path d="m60 37 23 23-23 23-23-23Z" />
            <circle className="intro-sigil-heart" cx="60" cy="60" r="4" />
          </svg>
          <i /><i /><i />
        </span>
        <span className="intro-first-light" />
        <span className="intro-spark intro-spark--one" /><span className="intro-spark intro-spark--two" /><span className="intro-spark intro-spark--three" />
      </div>

      {phase === 'ready' && (
        <nav className="intro-worlds" aria-label="Choose a capability world">
          {worlds.map((world, index) => (
            <div key={world.slug} className="intro-world-position" data-world={world.slug} style={{ '--world-color': world.color }}>
              <motion.div
                className="intro-world-reveal"
                initial={reducedMotion ? false : { opacity: 0, scale: .72 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : .48, delay: reducedMotion ? 0 : index * .075, ease: [.22, 1, .36, 1] }}
              >
                <Link className="intro-world-link" to={`/worlds/${world.slug}`} onClick={onEnter} aria-label={`Enter ${world.title}. ${world.short}`}>
                  <span className="intro-world-icon"><Icon name={world.icon} size={18} strokeWidth={1.6} /></span>
                  <span className="intro-world-label">{world.title}</span>
                </Link>
              </motion.div>
            </div>
          ))}
        </nav>
      )}

      <div className="intro-console">
        <div className="intro-console-top"><span>EDG / 001</span><span><i /> CELESTIAL OBSERVATORY</span></div>
        <div className="intro-content">
          <AnimatePresence mode="wait">
            <motion.p key={phase} className="intro-eyebrow" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .28 }}>
              {phase === 'void' ? 'A SIGNAL IN THE DARK' : phase === 'first-light' ? 'FIRST LIGHT' : phase === 'identity' ? 'THE PERSON AT THE CENTER' : phase === 'ignition' ? 'CORE IGNITION' : 'WELCOME TO THE UNIVERSE'}
            </motion.p>
          </AnimatePresence>
          <div className="intro-identity">
            <h1 id="intro-title"><span>ELLIS</span><span>DENNIS GRAHAM</span></h1>
            <div className="intro-alias"><span className="eyebrow-mark" />CYBER ELIAS</div>
            <p className="intro-role">TECHNOLOGY SYSTEMS ARCHITECT</p>
            <p id="intro-description" className="intro-statement">I build, secure, connect, automate<br />and teach digital systems.</p>
          </div>
        </div>
        {phase === 'ready' && <nav className="intro-quick-nav" aria-label="Browse the portfolio">
          {quickLinks.map((item) => <Link key={item.to} to={item.to} onClick={onEnter}>{item.label}</Link>)}
        </nav>}
        <div className="intro-actions">
          <button ref={skipRef} className="intro-skip" type="button" onClick={onEnter}><Icon name="ArrowRight" size={15} /> Skip sequence</button>
          <AnimatePresence>
            {phase === 'ready' && <motion.button className="intro-enter" type="button" onClick={onEnter} initial={reducedMotion ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35 }}>Enter the universe <Icon name="ArrowUpRight" size={16} /></motion.button>}
          </AnimatePresence>
        </div>
        <div className="intro-progress" aria-hidden="true"><span className={`intro-progress-bar intro-progress-bar--${phase}`} /><span>{phase === 'void' ? 'VOID' : phase === 'first-light' ? 'FIRST LIGHT' : phase === 'identity' ? 'IDENTITY' : phase === 'ignition' ? 'IGNITION' : 'UNIVERSE OPEN'}</span></div>
      </div>
      <span className="intro-corner intro-corner--tl" aria-hidden="true">ELLIS DENNIS GRAHAM / 001</span>
      <span className="intro-corner intro-corner--br" aria-hidden="true">A SYSTEMS PRACTICE IN MOTION</span>
      <span className="sr-only" aria-live="polite">{phaseCopy[phase]}</span>
    </motion.div>
  );
}
