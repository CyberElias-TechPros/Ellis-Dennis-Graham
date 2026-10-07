import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icons.jsx';

const phases = ['void', 'identity', 'ignition', 'ready'];

export default function IntroExperience({ onEnter }) {
  const [phase, setPhase] = useState('void');
  const skipRef = useRef(null);
  const enterRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    if (reducedMotion) {
      setPhase('ready');
      return () => { document.body.style.overflow = ''; };
    }

    const timers = [
      window.setTimeout(() => setPhase('identity'), 520),
      window.setTimeout(() => setPhase('ignition'), 1450),
      window.setTimeout(() => setPhase('ready'), 2460)
    ];
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
        if (event.key === 'Escape') onEnter();
        if (event.key === 'Tab') {
          const focusable = [skipRef.current, ...(phase === 'ready' ? [enterRef.current] : [])].filter(Boolean);
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
        <span className="intro-core"><i /><i /><i /></span>
        <span className="intro-spark intro-spark--one" /><span className="intro-spark intro-spark--two" /><span className="intro-spark intro-spark--three" />
      </div>

      <div className="intro-console">
        <div className="intro-console-top"><span>EDG // 001</span><span><i /> UNIVERSE SYSTEM</span></div>
        <div className="intro-copy">
          <AnimatePresence mode="wait">
            {phase === 'void' && <motion.p key="void" className="intro-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>A SIGNAL IN THE DARK</motion.p>}
            {phase !== 'void' && <motion.p key="identity" className="intro-eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .45 }}>WELCOME TO THE WORLD OF</motion.p>}
          </AnimatePresence>
          <h1 id="intro-title"><span>ELLIS</span><span>DENNIS GRAHAM</span></h1>
          <div className="intro-alias"><span className="eyebrow-mark" />CYBER ELIAS</div>
          <p className="intro-role">TECHNOLOGY SYSTEMS ARCHITECT</p>
          <p id="intro-description" className="intro-statement">I build, secure, connect, automate<br />and teach digital systems.</p>
        </div>
        <div className="intro-actions">
          <button ref={skipRef} className="intro-skip" type="button" onClick={onEnter}><Icon name="SkipForward" size={15} /> Skip intro</button>
          <AnimatePresence>
            {phase === 'ready' && <motion.button ref={enterRef} className="intro-enter" type="button" onClick={onEnter} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>Enter the universe <Icon name="ArrowUpRight" size={16} /></motion.button>}
          </AnimatePresence>
        </div>
        <div className="intro-progress" aria-hidden="true"><span className={`intro-progress-bar intro-progress-bar--${phase}`} /><span>{phase === 'void' ? 'AWAKENING' : phase === 'identity' ? 'IDENTITY FOUND' : phase === 'ignition' ? 'IGNITING CORE' : 'THE SYSTEM IS YOURS'}</span></div>
      </div>
      <span className="intro-corner intro-corner--tl" aria-hidden="true">CELESTIAL / ASCENSION</span>
      <span className="intro-corner intro-corner--br" aria-hidden="true">EST. IN CURIOSITY · BUILT TO CONNECT</span>
    </motion.div>
  );
}
