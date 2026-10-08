import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { worlds, projects, toolkit, serviceOptions, thinkingSteps, labs } from '../content.js';
import { Icon } from '../components/Icons.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectEvidenceLedger from '../components/ProjectEvidenceLedger.jsx';
import ProjectIntake from '../components/ProjectIntake.jsx';
import { NetworkForge, WarRoom, WorkflowEngine, TeachingLab, DataConstellation } from '../components/LabExperiences.jsx';
import ArchitectureExplorer from '../components/ArchitectureExplorer.jsx';
import WorldExperience from '../components/WorldExperiences.jsx';
import WorldEnvironment from '../components/WorldEnvironment.jsx';
import { siteConfig } from '../siteConfig.js';

function RouteIntro({ eyebrow, title, description, icon = 'Orbit', back = true, tone = '' }) {
  return (
    <div className={`route-intro ${tone}`}>
      {back && <Link to="/" className="back-to-orbit"><Icon name="ArrowLeft" size={15} /> Back to orbit</Link>}
      <div className="route-intro-emblem"><Icon name={icon} size={23} /></div>
      <span className="micro-label">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function WorldPage() {
  const { slug } = useParams();
  const world = worlds.find((item) => item.slug === slug);
  if (!world) return <NotFound />;
  const relatedProjects = projects.filter((project) => project.world === world.slug);

  return (
    <main className={`inner-page world-detail world-detail--${world.slug}`} style={{ '--world-color': world.color }}>
      <div className="world-detail-backdrop" aria-hidden="true" />
      <div className="detail-container">
        <Link to="/worlds" className="back-to-orbit"><Icon name="ArrowLeft" size={15} /> All capability worlds</Link>
        <header className="world-detail-hero">
          <div className="world-detail-copy">
            <div className="world-detail-kicker"><span>{world.number}</span><i /><span>WORLD / 08</span><i /><span>FIELD GUIDE</span></div>
            <h1>{world.title}</h1>
            <p className="world-detail-short">{world.short}</p>
            <p className="world-detail-description">{world.description}</p>
            <div className="world-detail-actions"><Link className="button-primary" to={`/start-a-project?service=${world.slug}`}>Start a project brief <Icon name="ArrowUpRight" size={16} /></Link><a className="button-outline" href="#capabilities">Explore capabilities <Icon name="ArrowDown" size={15} /></a></div>
          </div>
          <WorldEnvironment world={world} />
        </header>

        <section className="world-mission-card">
          <div className="mission-planet"><Icon name={world.icon} size={23} /></div>
          <div><span className="micro-label">THE INTENT</span><p>{world.mission}</p></div>
          <span className="mission-number">{world.number}<i /></span>
        </section>

        <section className="detail-section world-experience-section">
          <SectionHeading eyebrow={`INTERACTIVE SYSTEM / ${world.number}`} title={world.demo || 'Explore the system'} description={`Enter the ${world.title} world through a small, inspectable demonstration. Interactive examples are labelled honestly and are not presented as live client deployments.`} />
          <WorldExperience world={world} relatedProjects={relatedProjects} />
        </section>

        <section className="detail-section" id="capabilities">
          <SectionHeading eyebrow="01 / CAPABILITY" title="What this world can make possible." description="A menu of practical directions—not a promise that every project needs every tool." />
          <div className="capability-grid">
            {world.capabilities.map((item, index) => <motion.div className="capability-item" key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}><span>0{index + 1}</span><strong>{item}</strong><Icon name="ArrowUpRight" size={15} /></motion.div>)}
          </div>
        </section>

        <section className="detail-section detail-section--offers">
          <SectionHeading eyebrow="02 / ENGAGEMENT" title="Ways to work in this world." description="The right starting point depends on context, constraints, and what success should look like." />
          <div className="offer-list">{world.offers.map((offer, index) => <div className="offer-row" key={offer}><span className="offer-number">0{index + 1}</span><p>{offer}</p><Icon name="MoveUpRight" size={16} /></div>)}</div>
        </section>

        <section className="detail-section world-evidence-section">
          <div className="evidence-heading"><div><span className="micro-label">03 / PROOF</span><h2>Evidence over adjectives.</h2></div><span className="evidence-seal"><Icon name="BadgeCheck" size={19} /> VERIFIED<br />WHEN PUBLISHED</span></div>
          <div className="evidence-layout"><p className="evidence-lead">A strong case study shows the context, the actual role, the decisions made, and what changed. No inflated numbers. No mystery about what was built.</p><div className="evidence-checklist">{world.evidence.map((item) => <div key={item}><Icon name="Check" size={15} />{item}</div>)}</div></div>
          <div className="evidence-note"><Icon name="Info" size={15} /><span>Evidence for this world will be added as specific work is verified and safe to share.</span></div>
        </section>

        <section className="detail-section world-tools-section">
          <div className="detail-section-heading-small"><div><span className="micro-label">04 / ARSENAL</span><h2>Tools serve the work.</h2></div><Link to="/arsenal" className="text-link">Full arsenal <Icon name="ArrowUpRight" size={14} /></Link></div>
          <div className="tool-chip-list">{world.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          <p className="small-note">Technology and framework references are subject to Ellis’s final review before publication. Tools are context—not skill scores.</p>
        </section>

        {relatedProjects.length > 0 && <section className="detail-section related-work-section"><SectionHeading eyebrow="05 / RELATED SYSTEMS" title="Connected work." description="Explore the related project profile and its current evidence record." /><div className="project-grid">{relatedProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></section>}

        <div className="world-endcap"><span className="micro-label">WHEN THE SYSTEM IS READY</span><h2>Let’s make a useful next move.</h2><Link className="button-primary" to={`/start-a-project?service=${world.slug}`}>Bring a {world.title.toLowerCase()} problem <Icon name="ArrowUpRight" size={16} /></Link></div>
      </div>
    </main>
  );
}

export function ProjectsPage() {
  return (
    <main className="inner-page projects-index-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE ARCHIVE / PROJECT CONSTELLATION" title={<>Ideas made<br /><em>tangible.</em></>} description="A collection of project profiles designed to make purpose, role, architecture, and evidence easy to inspect. Profiles remain marked in progress until their live status and details are verified." icon="PanelsTopLeft" />
        <div className="project-grid projects-index-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        <div className="proof-integrity"><Icon name="ShieldCheck" size={16} /><span><strong>Proof, not theatre.</strong> Each project distinguishes verified work from details still to confirm—no invented metrics, client claims, or live status.</span></div>
        <div className="projects-index-next"><span className="micro-label">ANOTHER KIND OF EVIDENCE</span><h2>Explore the systems, not just their summaries.</h2><Link to="/lab" className="button-outline">Enter the Lab <Icon name="ArrowUpRight" size={15} /></Link></div>
      </div>
    </main>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const world = worlds.find((item) => item.slug === project?.world);
  if (!project) return <NotFound />;
  const projectVerified = project.verificationStatus === 'owner-verified';

  return (
    <main className="inner-page project-detail" style={{ '--project-color': project.color }}>
      <div className="detail-container">
        <Link to="/#work" className="back-to-orbit"><Icon name="ArrowLeft" size={15} /> Back to systems in motion</Link>
        <header className="project-detail-hero">
          <div className="project-detail-top"><span className="project-glyph project-glyph--large">{project.symbol}</span><span className="project-status"><span />{project.status}</span></div>
          <span className="micro-label">{project.category} <span className="micro-divider">/</span> PROJECT PROFILE</span>
          <h1>{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p className="project-detail-description">{project.description}</p>
          <div className="project-tags">{project.focus.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="project-detail-actions"><Link className="button-primary" to={`/start-a-project${world ? `?service=${world.slug}` : ''}`}>Discuss a similar system <Icon name="ArrowUpRight" size={16} /></Link>{world && <Link className="button-quiet" to={`/worlds/${world.slug}`}>Explore {world.title} <Icon name="ArrowRight" size={15} /></Link>}</div>
        </header>

        <section className="project-explorer-section"><SectionHeading eyebrow="ARCHITECTURE EXPLORER / FOUR LENSES" title={projectVerified ? 'One verified system. Different perspectives.' : 'Explore the project direction through four lenses.'} description={projectVerified ? 'See the verified project record from a user, business, architecture, or technical perspective.' : 'These are illustrative perspectives on the supplied project brief—not claims about delivered features, a live workflow, or verified implementation.'} /><ArchitectureExplorer project={project} /></section>

        <div className="project-detail-grid">
          <section className="project-detail-card project-detail-card--story"><span className="micro-label">01 / THE OPPORTUNITY</span><h2>What needed to become easier?</h2><p>{project.description}</p><p>A complete case study will describe the people and workflow behind the brief, the constraints, and the outcome that mattered.</p></section>
          <section className="project-detail-card"><span className="micro-label">02 / FOCUS AREAS</span><h2>What this profile explores.</h2><ul>{project.focus.map((item) => <li key={item}><Icon name="Compass" size={14} />{item}</li>)}</ul></section>
          <section className="project-detail-card project-detail-card--full"><span className="micro-label">03 / EVIDENCE TO COMPLETE</span><h2>Make the work inspectable.</h2><div className="project-question-list">{project.questions.map((question, index) => <div key={question}><span>0{index + 1}</span><p>{question}</p></div>)}</div><div className="project-proof-note"><Icon name="Info" size={16} />{project.proofNote}</div></section>
        </div>
        <ProjectEvidenceLedger project={project} />
        <div className="project-next"><div><span className="micro-label">THE NEXT LAYER</span><h2>Build the full case study around the evidence.</h2></div><Link className="button-outline" to="/archive">Explore the Archive <Icon name="ArrowUpRight" size={16} /></Link></div>
      </div>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="inner-page about-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE CORE / WHO IS ELLIS" title={<>Technology is a tool.<br /><em>Understanding the system is the work.</em></>} description="Ellis Dennis Graham—known as Cyber Elias—is building a practice at the intersection of IT infrastructure, network security, software, digital systems, automation, and technology education." icon="Sun" />
        <div className="about-principle"><span className="principle-mark">“</span><p>I build, secure, connect, automate, and teach digital systems.</p><span className="micro-label">THE CENTER OF THE UNIVERSE</span></div>
        <section className="core-story">
          <div><span className="micro-label">THE THROUGHLINE</span><h2>Connect.<br /><em>Protect. Build. Teach.</em></h2></div>
          <div className="core-story-copy"><p>Infrastructure, security, software, business systems, and education can look like separate worlds. Systems thinking is the thread between them: understand the context, map the dependencies, make something useful, help people use it, then improve it.</p><div className="core-story-sequence"><span>INFRASTRUCTURE</span><i /><span>SECURITY</span><i /><span>SOFTWARE</span><i /><span>PEOPLE</span></div></div>
        </section>
        <section className="detail-section about-values">
          <SectionHeading eyebrow="THE OPERATING PHILOSOPHY" title="A wide field of view. A practical next step." description="The work is not about collecting disciplines. It is about seeing how they fit together and choosing a move that helps." />
          <div className="values-grid">
            {[
              { icon: 'Workflow', title: 'Systems before symptoms', text: 'Understand the people, dependencies, and constraints behind a technical request.' },
              { icon: 'Compass', title: 'Useful before impressive', text: 'Choose a solution that is understandable, supportable, and fit for its setting.' },
              { icon: 'BookOpenCheck', title: 'Build and explain', text: 'Make the reasoning legible so other people can operate, learn, and improve.' },
              { icon: 'Sparkles', title: 'Stay in motion', text: 'Keep room for experiments, new tools, honest unknowns, and better questions.' }
            ].map((value, index) => <motion.article className="value-card" key={value.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><span><Icon name={value.icon} size={20} /></span><h3>{value.title}</h3><p>{value.text}</p></motion.article>)}
          </div>
        </section>
        <section className="about-bridge">
          <div><span className="micro-label">BEYOND THE STACK</span><h2>Curiosity is part of the architecture.</h2><p>The Lab is a space for prototypes, technical experiments, teaching ideas, and questions that are not finished yet. Not every experiment is a service; not every idea is a deployed system.</p></div>
          <Link className="button-outline" to="/lab">Enter the Lab <Icon name="ArrowUpRight" size={16} /></Link>
        </section>
        <section className="things-learning"><div><span className="micro-label">THINGS I DON’T KNOW YET</span><h2>Unknown is a direction, not a weakness.</h2></div><p>Learning areas, new tools, and open questions will be named plainly—so curiosity stays honest and the portfolio can evolve with the work.</p></section>
        <div className="about-bottom-cta"><Link className="button-primary" to="/start-a-project">Start with a problem <Icon name="ArrowUpRight" size={16} /></Link><Link className="text-link" to="/archive">See the Archive <Icon name="ArrowRight" size={15} /></Link></div>
      </div>
    </main>
  );
}

const archiveLenses = [
  { title: 'BUILT', description: 'Applications, tools, and systems with a clearly stated role and status.', icon: 'PanelsTopLeft', color: '#ffb86c' },
  { title: 'DEPLOYED', description: 'Infrastructure or services that can be shown with safe, anonymized evidence.', icon: 'Network', color: '#5fe2d0' },
  { title: 'ASSESSED', description: 'Structured reviews, findings, and recommendations with sensitive details removed.', icon: 'ScanSearch', color: '#a992ff' },
  { title: 'TAUGHT', description: 'Training, workshops, learning materials, and practical assessment work.', icon: 'GraduationCap', color: '#8cc8ff' },
  { title: 'DESIGNED', description: 'Architecture, user journeys, and solution plans that shaped the build.', icon: 'DraftingCompass', color: '#f4ce6a' },
  { title: 'EXPERIMENTED', description: 'Prototypes and research clearly labelled as exploration—not shipped work.', icon: 'FlaskConical', color: '#ff7f9f' }
];

export function ArchivePage() {
  const milestones = ['SUPPORT', 'CONNECT', 'SECURE', 'BUILD', 'TEACH', 'AUTOMATE', 'IMPROVE'];
  return (
    <main className="inner-page archive-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE ARCHIVE / A LIVING RECORD" title={<>A career is more than<br /><em>a list of dates.</em></>} description="The Archive is the evidence vault: experience, projects, assessments, teaching, learning, and the path between them. The public record grows only with confirmed details." icon="Archive" />
        <section className="archive-journey"><div className="archive-journey-head"><div><span className="micro-label">AN EVOLVING SYSTEMS PRACTICE</span><h2>Different worlds.<br /><em>A connected way of working.</em></h2></div><p>A thematic map, not a dated résumé. Specific roles, dates, credentials, and outcomes belong here when verified.</p></div><div className="journey-rail">{milestones.map((milestone, index) => <div className="journey-rail-step" key={milestone}><span>{String(index + 1).padStart(2, '0')}</span><strong>{milestone}</strong>{index < milestones.length - 1 && <i />}</div>)}</div></section>
        <section className="detail-section archive-proof-section"><SectionHeading eyebrow="THE PROOF ENGINE" title="Every artifact says what it is." description="A clear evidence vocabulary separates deployed work from exploration and makes each claim easier to trust." /><div className="archive-lens-grid">{archiveLenses.map((lens, index) => <motion.article className="archive-lens-card" key={lens.title} style={{ '--lens-color': lens.color }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><span className="archive-lens-icon"><Icon name={lens.icon} size={19} /></span><span className="micro-label">{lens.title}</span><p>{lens.description}</p></motion.article>)}</div></section>
        <div className="archive-document-card"><div className="archive-document-icon"><Icon name="FileBadge" size={22} /></div><div><span className="micro-label">PROFESSIONAL MODE</span><h3>CV, credentials, and role history</h3><p>Downloadable documents and professional links can be attached from the launch configuration once their URLs and details are confirmed.</p></div>{siteConfig.cvUrl ? <a className="button-primary" href={siteConfig.cvUrl} target="_blank" rel="noreferrer">Open CV <Icon name="ArrowUpRight" size={15} /></a> : <span className="pending-pill"><Icon name="CircleDashed" size={14} /> CV link not configured</span>}</div>
        <section className="things-learning archive-learning"><span className="micro-label">A LIVING ARCHIVE</span><h2>Proof can grow without pretending to be finished.</h2><p>Case studies should make the problem, contribution, architecture, result, and lessons easy to find. Confidential work can still be explained through anonymized diagrams and careful descriptions.</p></section>
      </div>
    </main>
  );
}

export function ArsenalPage() {
  return (
    <main className="inner-page arsenal-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE ARSENAL / TOOLS IN CONTEXT" title={<>Tools are part of the story.<br /><em>They are not the hero.</em></>} description="A technology is useful when it fits the environment, the people, the risks, and the job the system needs to do." icon="Wrench" />
        <div className="arsenal-principle"><Icon name="Crosshair" size={18} /><p><strong>Lead with problem-solving.</strong> The toolkit is here as context—not as an unsupported proficiency score or a wall of badges.</p></div>
        <section className="arsenal-groups">{toolkit.map((group, index) => <motion.article className="arsenal-group" key={group.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><div className="arsenal-group-index">0{index + 1}</div><div className="arsenal-group-copy"><h2>{group.title}</h2><p>{group.description}</p></div><div className="arsenal-tools">{group.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>)}</section>
        <p className="small-note arsenal-note"><Icon name="Info" size={15} />Tool names and standards are a draft content set from the supplied portfolio brief. Confirm relevance, depth, and credential status before publication.</p>
        <div className="arsenal-footer"><span className="micro-label">THE BEST TOOL IS THE ONE THAT FITS.</span><Link to="/worlds/infrastructure" className="text-link">Explore the Infrastructure world <Icon name="ArrowUpRight" size={15} /></Link><Link to="/worlds/software" className="text-link">Explore the Software world <Icon name="ArrowUpRight" size={15} /></Link></div>
      </div>
    </main>
  );
}

export function LabPage() {
  return (
    <main className="inner-page lab-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE LAB / INTERACTIVE PROOF" title={<>Explore the thinking<br /><em>behind the systems.</em></>} description="The Lab turns ideas into small, inspectable experiences. These scenarios use simplified or illustrative data; they are demonstrations, not client deployments." icon="FlaskConical" />
        <nav className="lab-anchor-nav" aria-label="Lab experiences">{labs.map((lab) => <a href={`#${lab.id}`} key={lab.id}><Icon name={lab.icon} size={14} />{lab.title}</a>)}</nav>
        <section id="network-forge" className="lab-experience"><div className="lab-experience-heading"><div><span className="micro-label">01 / INFRASTRUCTURE</span><h2>Network Forge</h2><p>Inspect an illustrative network from upstream connection to segmented access.</p></div><span className="lab-index">01</span></div><NetworkForge /></section>
        <section id="war-room" className="lab-experience"><div className="lab-experience-heading"><div><span className="micro-label">02 / SECURITY & OPERATIONS</span><h2>The War Room</h2><p>Walk through a multi-site outage by following the evidence one decision at a time.</p></div><span className="lab-index">02</span></div><WarRoom /></section>
        <section id="automation-engine" className="lab-experience"><div className="lab-experience-heading"><div><span className="micro-label">03 / AI & AUTOMATION</span><h2>Automation Engine</h2><p>Choose a process and trace a human-in-the-loop workflow.</p></div><span className="lab-index">03</span></div><WorkflowEngine /></section>
        <section id="teaching-lab" className="lab-experience"><div className="lab-experience-heading"><div><span className="micro-label">04 / EDUCATION</span><h2>Teaching Lab</h2><p>A tiny lesson can reveal how a complex idea becomes practical.</p></div><span className="lab-index">04</span></div><TeachingLab /></section>
        <section id="data-constellation" className="lab-experience"><div className="lab-experience-heading"><div><span className="micro-label">05 / DATA & ANALYTICS</span><h2>Data Constellation</h2><p>Switch between illustrative signals and practice asking what a chart can—and cannot—tell you.</p></div><span className="lab-index">05</span></div><DataConstellation /></section>
        <div className="lab-bottom-note"><Icon name="Sparkles" size={17} /><p>Experiments are allowed to be unfinished. The Lab will always distinguish an idea, prototype, experiment, and live system.</p><Link to="/start-a-project">Build something real <Icon name="ArrowUpRight" size={14} /></Link></div>
      </div>
    </main>
  );
}

export function WarRoomPage() {
  return (
    <main className="inner-page war-room-page"><div className="detail-container"><RouteIntro eyebrow="THE WAR ROOM / INCIDENT SIMULATION" title={<>Stay calm.<br /><em>Follow the evidence.</em></>} description="A simplified incident-response scenario that demonstrates a structured approach: detect, isolate, restore, verify, and learn." icon="ShieldAlert" /><div className="war-room-page-note"><Icon name="Info" size={16} /><span>This is a teaching simulation, not operational advice or a representation of a real client incident.</span></div><WarRoom /></div></main>
  );
}

export function StartProjectPage() {
  return (
    <main className="inner-page start-project-page">
      <div className="detail-container">
        <RouteIntro eyebrow="ENGAGE / PROJECT DISCOVERY" title={<>Tell me what is happening.<br /><em>We’ll find the shape of it.</em></>} description="A lightweight project intake that helps turn an open-ended challenge into a useful first conversation." icon="MessageSquareText" />
        <ProjectIntake />
      </div>
    </main>
  );
}

export function ServicesPage() {
  return (
    <main className="inner-page services-page">
      <div className="detail-container">
        <RouteIntro eyebrow="THE SERVICE ENGINE / PRACTICAL WAYS TO WORK TOGETHER" title={<>A broad toolkit.<br /><em>A clear starting point.</em></>} description="Explore service directions by the problem you are trying to solve. Scope and delivery are shaped around the people, environment, and constraints involved." icon="Compass" />
        <div className="service-route-grid">{serviceOptions.map((option, index) => {
          const world = worlds.find((item) => item.slug === option.world);
          return <motion.article className="service-route-card" key={option.value} style={{ '--world-color': world?.color || '#d7bd83' }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 3) * 0.06 }}><span className="service-route-number">0{index + 1}</span><h2>{option.label}</h2><p>{option.recommendation}</p><div className="service-route-bottom"><Link to={`/worlds/${option.world}`}>Explore world <Icon name="ArrowUpRight" size={14} /></Link><Link to={`/start-a-project?service=${option.world}`} aria-label={`Start an enquiry about ${option.label}`}><Icon name="ArrowRight" size={16} /></Link></div></motion.article>;
        })}</div>
        <div className="service-ethic"><Icon name="Scale" size={18} /><p><strong>Good scope beats big promises.</strong> The first step is to understand the need, confirm fit, and agree on a clear outcome before work is committed.</p></div>
      </div>
    </main>
  );
}

export function NotFound() {
  const location = useLocation();
  return <main className="inner-page not-found"><div className="detail-container"><RouteIntro eyebrow="404 / LOST SIGNAL" title={<>This path is<br /><em>not in the map.</em></>} description={`No world exists at ${location.pathname}. Head back to the orbital map or explore a capability directly.`} icon="Radar" back={false} /><div className="not-found-links"><Link className="button-primary" to="/">Return to orbit <Icon name="ArrowUpRight" size={16} /></Link><Link className="button-outline" to="/services">Explore services <Icon name="ArrowUpRight" size={16} /></Link></div></div></main>;
}
