import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { worlds } from '../content.js';
import { Icon } from '../components/Icons.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { siteConfig } from '../siteConfig.js';

export function WorldsIndexPage() {
  return (
    <main className="inner-page worlds-index-page">
      <div className="detail-container">
        <div className="route-intro">
          <Link to="/" className="back-to-orbit"><Icon name="ArrowLeft" size={15} /> Back to orbit</Link>
          <div className="route-intro-emblem"><Icon name="Orbit" size={23} /></div>
          <span className="micro-label">THE ORBITAL MAP / ALL WORLDS</span>
          <h1>Choose a world.<br /><em>Follow the problem.</em></h1>
          <p>Eight connected domains, each with its own capabilities, service paths, evidence standard, and interactive system view.</p>
        </div>
        <SectionHeading eyebrow="CAPABILITY CONSTELLATION" title="Enter through any door." description="The universe is spatial, but every world also has a clear, shareable page and a conventional route back." />
        <div className="world-grid worlds-index-grid">
          {worlds.map((world, index) => <motion.div key={world.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }}><Link className="world-card" to={`/worlds/${world.slug}`} style={{ '--world-color': world.color }}><div className="world-card-top"><span className="world-card-icon"><Icon name={world.icon} size={20} /></span><span>{world.number} / 08</span></div><h3>{world.title}</h3><p>{world.short}</p><div className="world-card-foot"><span>ENTER WORLD</span><Icon name="ArrowUpRight" size={16} /></div><span className="world-card-orbit" aria-hidden="true" /></Link></motion.div>)}
        </div>
        <div className="world-directory-cta"><span className="micro-label">NOT SURE WHERE TO BEGIN?</span><p>Describe what is happening. The project intake can help map a practical starting point.</p><Link className="button-primary" to="/start-a-project">Give me a problem <Icon name="ArrowUpRight" size={16} /></Link></div>
      </div>
    </main>
  );
}

export function ContactPage() {
  const channels = [
    siteConfig.email && { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: 'Mail' },
    siteConfig.phone && { label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: 'Phone' },
    siteConfig.whatsapp && { label: 'WhatsApp', value: 'Start a WhatsApp conversation', href: siteConfig.whatsapp, icon: 'MessageCircle' },
    siteConfig.linkedin && { label: 'LinkedIn', value: 'Professional profile', href: siteConfig.linkedin, icon: 'Linkedin' },
    siteConfig.github && { label: 'GitHub', value: 'Code and technical work', href: siteConfig.github, icon: 'Github' }
  ].filter(Boolean);

  return (
    <main className="inner-page contact-page">
      <div className="detail-container">
        <div className="route-intro">
          <Link to="/" className="back-to-orbit"><Icon name="ArrowLeft" size={15} /> Back to orbit</Link>
          <div className="route-intro-emblem"><Icon name="MessageSquareText" size={23} /></div>
          <span className="micro-label">ENGAGE / CONTACT ELLIS</span>
          <h1>Bring me a problem.<br /><em>Let’s map a way forward.</em></h1>
          <p>Share what is happening, what you want to change, and what a better outcome would look like. The first conversation can start before the solution is clear.</p>
        </div>
        <div className="contact-actions-grid">
          <section className="contact-primary-card"><span className="micro-label">START WITH THE CHALLENGE</span><span className="contact-primary-symbol"><Icon name="Compass" size={23} /></span><h2>Not sure which service fits?</h2><p>Use a short, problem-led intake. It routes the brief toward a possible world and gives you a copyable summary.</p><Link className="button-primary" to="/start-a-project">Start a project brief <Icon name="ArrowUpRight" size={16} /></Link></section>
          <section className="contact-channels"><span className="micro-label">VERIFIED CONTACT CHANNELS</span><h2>Choose how to connect.</h2>{channels.length ? <div className="contact-channel-list">{channels.map((channel) => <a href={channel.href} key={channel.label} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}><span><Icon name={channel.icon} size={17} /></span><div><strong>{channel.label}</strong><small>{channel.value}</small></div><Icon name="ArrowUpRight" size={15} /></a>)}</div> : <div className="contact-not-configured"><Icon name="Info" size={16} /><p>Direct contact channels have not been connected yet. Use the project brief to prepare a summary; it stays in this browser until you choose to share it.</p></div>}</section>
        </div>
        <div className="contact-footer-note"><Icon name="ShieldCheck" size={16} /><p>No contact details are invented here. Only channels configured by Ellis appear on this page.</p></div>
      </div>
    </main>
  );
}
