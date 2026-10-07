import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from './Icons.jsx';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="project-card"
      style={{ '--project-color': project.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="project-card-top">
        <span className="project-glyph" aria-hidden="true">{project.symbol}</span>
        <span className="project-status"><span />{project.status}</span>
      </div>
      <div className="project-card-copy">
        <span className="micro-label">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
      </div>
      <div className="project-tags" aria-label="Project themes">
        {project.focus.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
      </div>
      <Link className="text-link" to={`/projects/${project.slug}`} aria-label={`Explore the ${project.title} project profile`}>
        Explore profile <Icon name="ArrowUpRight" size={16} />
      </Link>
      <div className="project-card-orbit" aria-hidden="true" />
    </motion.article>
  );
}
