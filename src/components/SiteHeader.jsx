import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icons.jsx';
import { siteConfig } from '../siteConfig.js';

const links = [
  { label: 'Worlds', to: '/worlds' },
  { label: 'Work', to: '/projects' },
  { label: 'The Lab', to: '/lab' },
  { label: 'Services', to: '/services' },
  { label: 'Archive', to: '/archive' }
];

export default function SiteHeader({ mode, onToggleMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const firstMenuLinkRef = useRef(null);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) firstMenuLinkRef.current?.focus({ preventScroll: true });
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Ellis Digital Universe, home" onClick={close}>
          <span className="brand-seal"><Icon name="Orbit" size={19} /></span>
          <span className="brand-copy"><strong>ELLIS</strong><small>{siteConfig.alias.toUpperCase()} / DIGITAL UNIVERSE</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
        </nav>

        <div className="header-actions">
          <button
            className="theme-switch"
            type="button"
            onClick={onToggleMode}
            aria-label={`Switch to ${mode === 'celestial' ? 'Ascension' : 'Celestial'} mode`}
            aria-pressed={mode === 'ascension'}
            title={`Switch to ${mode === 'celestial' ? 'Ascension' : 'Celestial'} mode`}
          >
            <Icon name={mode === 'celestial' ? 'Sun' : 'MoonStar'} size={16} />
            <span>{mode === 'celestial' ? 'Celestial' : 'Ascension'}</span>
          </button>
          <Link className="header-cta" to="/start-a-project">Start a project <Icon name="ArrowUpRight" size={15} /></Link>
          <button ref={menuToggleRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={21} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onKeyDown={(event) => { if (event.key === 'Escape') { close(); menuToggleRef.current?.focus(); } }}>
            {links.map((item, index) => <Link key={item.label} ref={index === 0 ? firstMenuLinkRef : undefined} to={item.to} onClick={close}>{item.label}<Icon name="ArrowUpRight" size={15} /></Link>)}
            <Link to="/about" onClick={close}>Meet Ellis<Icon name="ArrowUpRight" size={15} /></Link>
            <Link to="/arsenal" onClick={close}>Technology Arsenal<Icon name="ArrowUpRight" size={15} /></Link>
            <Link to="/contact" onClick={close}>Contact<Icon name="ArrowUpRight" size={15} /></Link>
            {siteConfig.cvUrl && <a href={siteConfig.cvUrl} target="_blank" rel="noreferrer" onClick={close}>View CV<Icon name="FileText" size={15} /></a>}
            <Link className="mobile-menu-cta" to="/start-a-project" onClick={close}>Bring me a problem <Icon name="ArrowRight" size={16} /></Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
