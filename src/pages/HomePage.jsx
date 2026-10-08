import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { worlds, projects, thinkingSteps, labs } from '../content.js';
import { Icon } from '../components/Icons.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import WorldOrbitalMap from '../components/WorldOrbitalMap.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { NetworkForge, WarRoom } from '../components/LabExperiences.jsx';

function WorldGrid() {
  return (
    <div className="world-grid">
      {worlds.map((world, index) => (
        <motion.div key={world.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: (index % 4) * 0.07, duration: 0.5 }}>
          <Link className="world-card" to={`/worlds/${world.slug}`} style={{ '--world-color': world.color }}>
            <div className="world-card-top"><span className="world-card-icon"><Icon name={world.icon} size={20} /></span><span>{world.number} / 08</span></div>
            <h3>{world.title}</h3>
            <p>{world.short}</p>
            <div className="world-card-foot"><span>ENTER WORLD</span><Icon name="ArrowUpRight" size={16} /></div>
            <span className="world-card-orbit" aria-hidden="true" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <div className="eyebrow"><span className="eyebrow-mark" />PERSONAL TECHNOLOGY UNIVERSE <span className="eyebrow-divider">/</span> EDG-001</div>
            <p className="hero-nameplate"><span>ELLIS DENNIS GRAHAM</span><span className="hero-alias"><i />CYBER ELIAS</span></p>
            <h1 id="hero-title">I build the systems<br />that <em>connect everything.</em></h1>
            <p className="hero-role">Technology Systems Architect</p>
            <p className="hero-summary">Infrastructure. Security. Software. Automation. Education. I turn complex needs into digital systems people can understand, use, and build on.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/#worlds">Enter the universe <Icon name="ArrowDownRight" size={16} /></Link>
              <Link className="button-quiet" to="/start-a-project"><span className="button-quiet-icon"><Icon name="Orbit" size={15} /></span>Give me a problem</Link>
            </div>
            <div className="hero-proof-line"><span className="hero-proof-mark"><Icon name="Crosshair" size={15} /></span><span>A systems-first practice, built around <strong>real-world outcomes.</strong></span></div>
          </motion.div>
          <WorldOrbitalMap />
        </div>
        <div className="hero-bottomline"><span>IDENTITY / THE DIGITAL UNIVERSE</span><span>SELECT A WORLD <Icon name="ArrowDown" size={13} /></span><span className="hero-bottom-right">CAPABILITY → PROOF → POSSIBILITY</span></div>
        <div className="hero-scroll-cue" aria-hidden="true"><span />SCROLL TO EXPLORE</div>
      </section>

      <section className="worlds-section page-section" id="worlds">
        <div className="section-container">
          <SectionHeading eyebrow="THE ORBITAL MAP / 01—08" title={<>One core.<br /><em>Eight worlds to explore.</em></>} description="Each world is a way into the work: what can be solved, how the system fits together, and what evidence belongs behind the claim." />
          <WorldGrid />
          <div className="worlds-afterline"><span><Icon name="MoveRight" size={16} /> The tools are the means. The problem is the starting point.</span><Link to="/arsenal" className="text-link">Open the technology arsenal <Icon name="ArrowUpRight" size={15} /></Link></div>
        </div>
      </section>

      <section className="work-section page-section" id="work">
        <div className="section-container">
          <div className="work-heading-row">
            <SectionHeading eyebrow="THE ARCHIVE / SYSTEMS IN MOTION" title={<>Ideas made<br /><em>tangible.</em></>} description="A portfolio should show what exists—not just what sounds impressive. These project profiles are structured to make role, scope, and proof explicit." />
            <Link className="button-outline" to="/archive">Explore the archive <Icon name="ArrowUpRight" size={16} /></Link>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <div className="proof-integrity"><Icon name="ShieldCheck" size={16} /><span><strong>Proof, not theatre.</strong> Project pages distinguish verified work from details still to confirm—no invented metrics, client claims, or live status.</span></div>
        </div>
      </section>

      <section className="forge-section page-section" id="showcase">
        <div className="section-container">
          <div className="showcase-heading">
            <SectionHeading eyebrow="THE SHOWCASE / THINK IN SYSTEMS" title={<>Don’t take my word.<br /><em>Explore the logic.</em></>} description="Small, interactive demonstrations make the invisible visible: topology, diagnosis, workflow design, and learning." />
            <Link to="/lab" className="text-link">Enter the full Lab <Icon name="ArrowUpRight" size={15} /></Link>
          </div>
          <div className="showcase-grid">
            <article className="showcase-card showcase-card--wide">
              <div className="showcase-card-heading"><div><span className="micro-label">01 / INFRASTRUCTURE</span><h3>Network Forge</h3><p>Follow the path. Inspect the layers.</p></div><span className="showcase-glyph"><Icon name="Network" size={21} /></span></div>
              <NetworkForge />
            </article>
            <article className="showcase-card showcase-card--warroom">
              <div className="showcase-card-heading"><div><span className="micro-label">02 / INCIDENT THINKING</span><h3>The War Room</h3><p>A calm method for a noisy outage.</p></div><span className="showcase-glyph showcase-glyph--warm"><Icon name="ShieldAlert" size={21} /></span></div>
              <WarRoom />
            </article>
          </div>
          <div className="lab-link-row">
            {labs.slice(2).map((lab) => <Link key={lab.id} to={`/lab#${lab.id}`}><span><Icon name={lab.icon} size={16} /></span><strong>{lab.title}</strong><small>{lab.tag}</small><Icon name="ArrowUpRight" size={14} className="lab-link-arrow" /></Link>)}
          </div>
        </div>
      </section>

      <section className="method-section page-section" id="method">
        <div className="section-container method-layout">
          <div className="method-intro">
            <SectionHeading eyebrow="HOW I THINK / THE METHOD" title={<>Build with<br /><em>the whole system in view.</em></>} description="Tools change. A thoughtful process helps keep the work connected to people, goals, risk, and the real environment." />
            <Link className="text-link" to="/about">Meet the person behind the systems <Icon name="ArrowUpRight" size={15} /></Link>
            <div className="method-quote"><Icon name="Quote" size={18} /><p>Technology is only useful when it solves the right problem.</p></div>
          </div>
          <div className="method-steps">
            {thinkingSteps.map((step, index) => <motion.div className="method-step" key={step.number} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.07, duration: 0.45 }}>
              <span className="method-step-num">{step.number}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div><span className="method-step-orbit" aria-hidden="true" />
            </motion.div>)}
          </div>
        </div>
      </section>

      <section className="journey-section page-section">
        <div className="section-container journey-panel">
          <div className="journey-copy"><span className="micro-label">THE CORE / BEYOND THE STACK</span><h2>Many disciplines.<br /><em>One way of seeing.</em></h2><p>Connect infrastructure, security, software, business, data, and education—and look for the system that ties them together.</p><Link className="text-link" to="/about">Explore the Core <Icon name="ArrowUpRight" size={15} /></Link></div>
          <div className="journey-orbit" aria-label="A systems practice spanning connect, secure, build, teach, and improve">
            <div className="journey-orbit-ring journey-orbit-ring--one" /><div className="journey-orbit-ring journey-orbit-ring--two" />
            <span className="journey-core"><Icon name="Sparkles" size={20} /><small>SYSTEMS</small></span>
            <span className="journey-node journey-node--one">CONNECT</span><span className="journey-node journey-node--two">SECURE</span><span className="journey-node journey-node--three">BUILD</span><span className="journey-node journey-node--four">TEACH</span><span className="journey-node journey-node--five">IMPROVE</span>
          </div>
          <div className="journey-index"><span>01</span><span>05</span><i /></div>
        </div>
      </section>

      <section className="engage-section page-section">
        <div className="section-container engage-panel">
          <div className="engage-orb" aria-hidden="true"><span /><span /><span /></div>
          <div className="engage-copy"><div className="eyebrow"><span className="eyebrow-mark" />ENGAGE / YOUR NEXT MOVE</div><h2>Got a problem<br />without a neat label?</h2><p>Start with what is happening. We can map the system, find the right questions, and work out a practical next step together.</p></div>
          <div className="engage-actions"><Link className="button-primary" to="/start-a-project">Give me a problem <Icon name="ArrowUpRight" size={16} /></Link><Link className="button-quiet" to="/services">Explore services <Icon name="MoveRight" size={16} /></Link><span>No jargon required. No pressure to have it all figured out.</span></div>
        </div>
      </section>
    </main>
  );
}
