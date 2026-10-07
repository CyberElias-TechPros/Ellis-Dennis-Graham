import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icons.jsx';

const lensTabs = [
  { id: 'user', label: 'User', title: 'The human journey', icon: 'UserRound' },
  { id: 'business', label: 'Business', title: 'The operating model', icon: 'BriefcaseBusiness' },
  { id: 'architecture', label: 'Architect', title: 'The system structure', icon: 'Workflow' },
  { id: 'technical', label: 'Technical', title: 'Implementation detail', icon: 'CodeXml' }
];

export default function ArchitectureExplorer({ project, compact = false }) {
  const [activeLens, setActiveLens] = useState('user');
  const currentLens = lensTabs.find((lens) => lens.id === activeLens) || lensTabs[0];
  const items = useMemo(() => {
    if (activeLens === 'architecture') return project.architecture || [];
    if (activeLens === 'technical') return project.technicalDetails || [];
    return project.perspectives?.[activeLens] || [];
  }, [activeLens, project]);
  const isUnverified = project.verificationStatus !== 'owner-verified';
  const tabRefs = useRef([]);
  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % lensTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + lensTabs.length) % lensTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lensTabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      setActiveLens(lensTabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className={`architecture-explorer ${compact ? 'architecture-explorer--compact' : ''}`} aria-label={`Architecture Explorer for ${project.title}`}>
      <div className="architecture-explorer-top">
        <div><span className="micro-label">PROJECT SYSTEM VIEW</span><h3>{project.title}</h3><p>One system, four ways to understand it.</p></div>
        <span className="architecture-orbit-mark" aria-hidden="true"><Icon name="Orbit" size={19} /></span>
      </div>
      <div className="architecture-tabs" role="tablist" aria-label="Choose a project perspective">
        {lensTabs.map((lens, index) => (
          <button
            key={lens.id}
            type="button"
            role="tab"
            id={`${project.slug}-${lens.id}-tab`}
            aria-selected={activeLens === lens.id}
            aria-controls={`${project.slug}-architecture-panel`}
            className={activeLens === lens.id ? 'is-active' : ''}
            ref={(element) => { tabRefs.current[index] = element; }}
            tabIndex={activeLens === lens.id ? 0 : -1}
            onClick={() => setActiveLens(lens.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <Icon name={lens.icon} size={15} /><span>{lens.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${project.slug}-${activeLens}`}
          className="architecture-lens-panel"
          role="tabpanel"
          id={`${project.slug}-architecture-panel`}
          aria-labelledby={`${project.slug}-${activeLens}-tab`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: .2 }}
        >
          <div className="architecture-panel-heading"><span className="architecture-lens-icon"><Icon name={currentLens.icon} size={18} /></span><div><span className="micro-label">{currentLens.label.toUpperCase()} LENS</span><h4>{currentLens.title}</h4></div></div>
          {items.length > 0 ? (
            <div className="architecture-flow" aria-label={`${currentLens.title} sequence`}>
              {items.map((item, index) => <div className="architecture-flow-node" key={`${activeLens}-${item}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < items.length - 1 && <Icon name="ArrowRight" size={15} className="architecture-flow-arrow" />}</div>)}
            </div>
          ) : (
            <div className="architecture-unverified"><Icon name="FileLock2" size={19} /><div><strong>Not published yet</strong><p>Implementation and technology details need owner verification before they appear here.</p></div></div>
          )}
          {isUnverified && <p className="architecture-disclaimer"><Icon name="Info" size={13} /> Perspective map for exploration only—not evidence that this workflow or implementation is live.</p>}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
