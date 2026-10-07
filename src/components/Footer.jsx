import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { siteConfig } from '../siteConfig.js';

export default function Footer({ onReplayIntro }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="footer-main">
        <div className="footer-identity">
          <span className="footer-mark"><Icon name="Orbit" size={20} /></span>
          <div><strong>ELLIS DENNIS GRAHAM</strong><span>{siteConfig.alias} · Technology Systems Architect</span></div>
        </div>
        <div className="footer-invite">
          <span className="micro-label">THE NEXT SYSTEM STARTS WITH A QUESTION</span>
          <h2>Bring me a problem.<br /><em>Let’s map a way forward.</em></h2>
          <Link className="button-primary" to="/start-a-project">Start a conversation <Icon name="ArrowUpRight" size={16} /></Link>
        </div>
        <div className="footer-links">
          <span className="micro-label">NAVIGATE</span>
          <Link to="/worlds">Explore worlds <Icon name="ArrowUpRight" size={13} /></Link>
          <Link to="/projects">Selected systems <Icon name="ArrowUpRight" size={13} /></Link>
          <Link to="/services">Services <Icon name="ArrowUpRight" size={13} /></Link>
          <Link to="/archive">The archive <Icon name="ArrowUpRight" size={13} /></Link>
          <Link to="/contact">Contact Ellis <Icon name="ArrowUpRight" size={13} /></Link>
        </div>
        <div className="footer-links footer-social">
          <span className="micro-label">ELSEWHERE</span>
          {siteConfig.linkedin && <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="ArrowUpRight" size={13} /></a>}
          {siteConfig.github && <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <Icon name="ArrowUpRight" size={13} /></a>}
          {siteConfig.cvUrl && <a href={siteConfig.cvUrl} target="_blank" rel="noreferrer">View CV <Icon name="ArrowUpRight" size={13} /></a>}
          {!siteConfig.linkedin && !siteConfig.github && !siteConfig.cvUrl && <span className="footer-pending">Profile links can be connected before launch.</span>}
          <button className="footer-replay" type="button" onClick={onReplayIntro}><Icon name="RotateCcw" size={13} /> Replay the opening</button>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ellis Dennis Graham</span><span><i /> A living map of work, learning, and possibility</span><Link to="/archive">THE ARCHIVE <Icon name="ArrowUpRight" size={12} /></Link></div>
    </footer>
  );
}
