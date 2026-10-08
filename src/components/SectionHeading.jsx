import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <motion.div
      className={`section-heading ${align === 'center' ? 'section-heading--center' : ''} ${light ? 'section-heading--light' : ''}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && <div className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
