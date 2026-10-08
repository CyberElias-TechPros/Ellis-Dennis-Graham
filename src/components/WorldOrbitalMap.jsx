import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { worlds } from '../content.js';
import { Icon } from './Icons.jsx';

export default function WorldOrbitalMap() {
  const [focusedWorld, setFocusedWorld] = useState(null);

  return (
    <nav className="orbit-map" aria-label="Explore Ellis's capability worlds">
      <div className="orbit-map-caption"><Icon name="Orbit" size={14} />A constellation of capabilities</div>
      <div className="orbit-track orbit-track--outer" aria-hidden="true" />
      <div className="orbit-track orbit-track--inner" aria-hidden="true" />
      <div className="orbit-track orbit-track--tilt" aria-hidden="true" />
      <div className="orbit-map-glow" aria-hidden="true" />

      <motion.div className="core-star" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="core-rings" aria-hidden="true"><span /><span /><span /></div>
        <Link to="/about" className="core-link" aria-label="Meet Ellis and explore the Core">
          <span className="core-monogram">EG</span>
          <span className="core-name">ELLIS</span>
          <span className="core-role">THE CORE</span>
        </Link>
      </motion.div>

      {worlds.map((world, index) => (
        <motion.div
          key={world.slug}
          className="orbit-node-wrap"
          data-world={world.slug}
          style={{ '--node-color': world.color, '--node-index': index }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            className={`orbit-node ${focusedWorld === world.slug ? 'is-focused' : ''}`}
            to={`/worlds/${world.slug}`}
            aria-label={`Enter the ${world.title} world. ${world.short}`}
            onMouseEnter={() => setFocusedWorld(world.slug)}
            onMouseLeave={() => setFocusedWorld(null)}
            onFocus={() => setFocusedWorld(world.slug)}
            onBlur={() => setFocusedWorld(null)}
          >
            <span className="orbit-node-aura" aria-hidden="true" />
            <span className="orbit-node-shell"><Icon name={world.icon} size={21} strokeWidth={1.55} /></span>
            <span className="orbit-node-label">{world.title}</span>
            <span className="orbit-node-index">{world.number}</span>
          </Link>
        </motion.div>
      ))}

      <div className={`orbit-focus-note ${focusedWorld ? 'is-visible' : ''}`} aria-live="polite">
        <span>{focusedWorld ? worlds.find((world) => world.slug === focusedWorld)?.short : 'SELECT A WORLD TO EXPLORE'}</span>
      </div>
      <span className="map-coordinate map-coordinate--one">EDG / 001</span>
      <span className="map-coordinate map-coordinate--two">SYSTEMS • SIGNAL • POSSIBILITY</span>
    </nav>
  );
}
