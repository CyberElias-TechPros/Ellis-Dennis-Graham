import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icons.jsx';
import ArchitectureExplorer from './ArchitectureExplorer.jsx';
import { DataConstellation, NetworkForge, TeachingLab, WarRoom, WorkflowEngine } from './LabExperiences.jsx';

const businessSignals = [
  { id: 'network', label: 'Our network or IT keeps disrupting work', world: 'infrastructure', route: 'Infrastructure discovery', path: ['Map the environment', 'Locate shared points of failure', 'Prioritize reliability and visibility'] },
  { id: 'manual', label: 'Too much work is repeated by hand', world: 'ai-automation', route: 'Workflow mapping', path: ['Document the current steps', 'Find safe automation candidates', 'Keep human review and exception paths'] },
  { id: 'systems', label: 'Our business tools do not fit together', world: 'digital-business', route: 'Business systems discovery', path: ['Understand who uses each system', 'Map the information handoffs', 'Plan a practical integration path'] },
  { id: 'presence', label: 'Customers cannot find or understand us online', world: 'digital-presence', route: 'Digital presence review', path: ['Clarify audience and offer', 'Shape a clear digital front door', 'Make the next customer action visible'] }
];

export function BusinessDiagnostic() {
  const [selectedId, setSelectedId] = useState('systems');
  const selected = businessSignals.find((signal) => signal.id === selectedId) || businessSignals[0];

  return (
    <div className="business-diagnostic">
      <div className="diagnostic-choices" role="group" aria-label="Choose a business challenge">
        {businessSignals.map((signal, index) => <button type="button" key={signal.id} className={selectedId === signal.id ? 'is-active' : ''} aria-pressed={selectedId === signal.id} onClick={() => setSelectedId(signal.id)}><span>0{index + 1}</span>{signal.label}<Icon name="ArrowUpRight" size={14} /></button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="diagnostic-result" key={selected.id} initial={{ opacity: 0, x: 9 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}>
          <div className="diagnostic-result-head"><span className="micro-label">A POSSIBLE STARTING POINT</span><span className="diagnostic-path-icon"><Icon name="Compass" size={17} /></span></div>
          <h3>{selected.route}</h3>
          <div className="diagnostic-steps">{selected.path.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div>
          <p className="simulation-disclaimer"><Icon name="Info" size={13} /> This is a discovery suggestion, not an automated diagnosis. The right scope depends on context.</p>
          <Link className="text-link" to={`/start-a-project?service=${selected.world}`}>Talk through this challenge <Icon name="ArrowUpRight" size={14} /></Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const customerJourney = [
  { label: 'Business', icon: 'Store', detail: 'Start with what the business offers, who it serves, and what a visitor should understand first.' },
  { label: 'Digital identity', icon: 'Fingerprint', detail: 'Create a consistent, recognizable presence so a visitor can tell they are in the right place.' },
  { label: 'Website', icon: 'Globe2', detail: 'Make the offer, essential information, and useful next action easy to find.' },
  { label: 'Discovery', icon: 'Search', detail: 'Help relevant people discover the business through clear content and search-friendly foundations.' },
  { label: 'Conversation', icon: 'MessageCircle', detail: 'Make it easy to ask a question, request information, or begin a useful conversation.' },
  { label: 'Next action', icon: 'ArrowRight', detail: 'Give the visitor a clear, accessible step—without pretending that a click is a sale.' }
];

export function CustomerJourney() {
  const [active, setActive] = useState(0);
  const step = customerJourney[active];
  return (
    <div className="customer-journey">
      <div className="customer-journey-flow" role="group" aria-label="Explore the digital customer journey">
        {customerJourney.map((item, index) => <button type="button" key={item.label} className={`customer-journey-node ${active === index ? 'is-active' : ''}`} aria-pressed={active === index} onClick={() => setActive(index)}><span><Icon name={item.icon} size={17} /></span><small>0{index + 1}</small><strong>{item.label}</strong>{index < customerJourney.length - 1 && <i aria-hidden="true"><Icon name="ArrowRight" size={13} /></i>}</button>)}
      </div>
      <AnimatePresence mode="wait"><motion.div className="customer-journey-inspector" key={step.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}><div><span className="micro-label">JOURNEY NODE / 0{active + 1}</span><h3>{step.label}</h3><p>{step.detail}</p></div><span className="journey-inspector-icon"><Icon name={step.icon} size={20} /></span></motion.div></AnimatePresence>
      <p className="simulation-disclaimer"><Icon name="Info" size={13} /> Illustrative customer journey; not a claim about a specific deployed client project.</p>
    </div>
  );
}

function SoftwareArchitectureDemo() {
  const items = [
    { label: 'People', detail: 'The users and roles a system exists to serve.', icon: 'UsersRound' },
    { label: 'Interface', detail: 'The screens and interactions that make a task understandable.', icon: 'PanelsTopLeft' },
    { label: 'Application logic', detail: 'Rules, permissions, and workflows that shape the system.', icon: 'Workflow' },
    { label: 'Data & services', detail: 'Information and integrations that support the experience.', icon: 'Database' }
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="software-map">
      <div className="software-map-nodes" role="group" aria-label="Explore software architecture layers">
        {items.map((item, index) => <button type="button" key={item.label} className={active === index ? 'is-active' : ''} aria-pressed={active === index} onClick={() => setActive(index)}><span><Icon name={item.icon} size={17} /></span><small>0{index + 1}</small><strong>{item.label}</strong>{index < items.length - 1 && <i aria-hidden="true"><Icon name="ArrowDown" size={13} /></i>}</button>)}
      </div>
      <div className="software-map-inspector"><span className="micro-label">SYSTEM LAYER / 0{active + 1}</span><h3>{items[active].label}</h3><p>{items[active].detail}</p><div><Icon name="Info" size={13} /> Conceptual architecture—not a record of a particular deployment.</div></div>
    </div>
  );
}

export default function WorldExperience({ world, relatedProjects }) {
  if (world.slug === 'cybersecurity') return <WarRoom />;
  if (world.slug === 'infrastructure') return <NetworkForge />;
  if (world.slug === 'software') return relatedProjects?.length ? <ArchitectureExplorer project={relatedProjects[0]} compact /> : <SoftwareArchitectureDemo />;
  if (world.slug === 'ai-automation') return <WorkflowEngine />;
  if (world.slug === 'digital-business') return <BusinessDiagnostic />;
  if (world.slug === 'education') return <TeachingLab />;
  if (world.slug === 'data-analytics') return <DataConstellation />;
  if (world.slug === 'digital-presence') return <CustomerJourney />;
  return <p className="small-note">An interactive experience for this world is being prepared.</p>;
}
