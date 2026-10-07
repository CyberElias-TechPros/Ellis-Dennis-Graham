import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';

export default function PageIntro({
  eyebrow,
  title,
  description,
  lead,
  icon = 'Orbit',
  backTo = '/',
  backLabel = 'Back to the orbital map',
  status,
  accent,
  marker = 'SYSTEMS / FIELD NOTES',
  actions,
  className = '',
  children
}) {
  return (
    <header className={`page-intro ${className}`} style={accent ? { '--page-accent': accent } : undefined}>
      <div className="page-intro-utility">
        {backTo && <Link to={backTo} className="page-intro-back"><Icon name="ArrowLeft" size={15} />{backLabel}</Link>}
        {status && <span className="page-intro-status"><span aria-hidden="true" />{status}</span>}
      </div>
      <div className="page-intro-layout">
        <div className="page-intro-copy">
          <span className="page-intro-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
          <h1>{title}</h1>
          {lead && <p className="page-intro-lead">{lead}</p>}
          {description && <p className="page-intro-description">{description}</p>}
          {children && <div className="page-intro-extra">{children}</div>}
          {actions && <div className="page-intro-actions">{actions}</div>}
        </div>
        <div className="page-intro-emblem" aria-hidden="true">
          <div className="page-intro-emblem-orbit page-intro-emblem-orbit--one" />
          <div className="page-intro-emblem-orbit page-intro-emblem-orbit--two" />
          <span className="page-intro-emblem-core"><Icon name={icon} size={29} strokeWidth={1.45} /></span>
          <span className="page-intro-marker">{marker}</span>
        </div>
      </div>
      <div className="page-intro-rule" aria-hidden="true"><span /></div>
    </header>
  );
}
