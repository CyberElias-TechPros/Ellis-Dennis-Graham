import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { serviceOptions } from '../content.js';
import { siteConfig } from '../siteConfig.js';

const servicePrompts = {
  infrastructure: 'What is happening with the network or IT environment?',
  security: 'What would you like to assess, protect, or improve?',
  software: 'What should the software help someone do?',
  automation: 'Which repeated task or workflow would you like to simplify?',
  business: 'Which business process or system needs attention?',
  training: 'Who is the learning for, and what should they be able to do?',
  data: 'What decision or question should the data help answer?',
  presence: 'What should your website or digital presence make easier?',
  consulting: 'What decision, system, or technical direction would you like help thinking through?',
  unsure: 'What is happening today, and what would a better outcome look like?'
};

const contextPrompts = {
  infrastructure: 'What have you already tried, and what constraints should be considered?',
  security: 'What prompted this review, and what must remain protected?',
  software: 'Who will use the tool, and what are they doing today?',
  automation: 'Which steps need a human decision or exception path?',
  business: 'Which people or teams touch this process?',
  training: 'What experience does the audience already have?',
  data: 'Where does the information come from, and who needs to act on it?',
  presence: 'Who is the primary visitor, and what next step should be easiest?',
  consulting: 'Which decision or technical direction is currently blocked?',
  unsure: 'Who is affected, and what have you already tried?'
};

export default function ProjectIntake() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialOption = serviceOptions.find((option) => option.world === params.get('service'))?.value || '';
  const [form, setForm] = useState({ name: '', email: '', category: initialOption, challenge: '', context: '', timeline: '' });
  const [preparedBrief, setPreparedBrief] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    if (initialOption) setForm((current) => ({ ...current, category: initialOption }));
  }, [initialOption]);
  const selectedService = serviceOptions.find((option) => option.value === form.category);
  const prompt = servicePrompts[form.category] || 'Tell me what you are hoping to solve.';
  const contextPrompt = contextPrompts[form.category] || 'What else would help frame the problem?';

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === 'category' ? { context: '' } : {})
    }));
    setPreparedBrief('');
    setCopyStatus('');
  };

  const buildBrief = () => {
    const lines = [
      'PROJECT ENQUIRY — ELLIS DIGITAL UNIVERSE',
      `Name: ${form.name.trim() || 'Not provided'}`,
      `Reply email: ${form.email.trim() || 'Not provided'}`,
      `Area: ${selectedService?.label || 'Not selected'}`,
      `Timing: ${form.timeline || 'To be discussed'}`,
      '',
      'CHALLENGE',
      form.challenge.trim()
    ];
    if (form.context.trim()) lines.push('', 'ADDITIONAL CONTEXT', form.context.trim());
    lines.push('', `Suggested starting point: ${selectedService?.recommendation || 'Discovery conversation'}`);
    return lines.join('\n');
  };

  const submit = (event) => {
    event.preventDefault();
    const brief = buildBrief();
    if (siteConfig.email) {
      const subject = encodeURIComponent(`Project enquiry — ${selectedService?.label || 'new opportunity'}`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(brief)}`;
      setPreparedBrief(brief);
      setCopyStatus('Your email app should open with the brief ready. Nothing is sent until you choose to send it.');
      return;
    }
    setPreparedBrief(brief);
    setCopyStatus('Your brief is ready. Nothing has been sent or stored; copy it to share when a contact channel is available.');
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(preparedBrief);
      setCopyStatus('Brief copied to your clipboard.');
    } catch {
      setCopyStatus('Select and copy the brief below.');
    }
  };

  return (
    <div className="intake-layout">
      <div className="intake-intro">
        <div className="intake-orb"><Icon name="MessageSquareText" size={24} /></div>
        <span className="micro-label">START WITH THE PROBLEM</span>
        <h3>Bring the messy version.</h3>
        <p>You do not need a perfect brief or a solution already picked out. A clear description of what is happening is a good place to start.</p>
        <div className="intake-promise"><Icon name="LockKeyhole" size={16} /><span>Your draft stays in this page’s memory only. Nothing is sent or saved automatically.</span></div>
        {selectedService && (
          <div className="recommended-route">
            <span className="micro-label">A POSSIBLE STARTING POINT</span>
            <strong>{selectedService.recommendation}</strong>
            <span className="route-dots"><i /><i /><i /></span>
          </div>
        )}
      </div>

      <form className="intake-form" onSubmit={submit}>
        <div className="form-heading"><span>01 / DISCOVER</span><span>NO AUTO-SEND</span></div>
        <label className="field-label" htmlFor="project-category">What are you trying to accomplish?</label>
        <select id="project-category" required value={form.category} onChange={(event) => update('category', event.target.value)}>
          <option value="" disabled>Choose a starting point</option>
          {serviceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>

        <label className="field-label" htmlFor="project-challenge">{prompt}</label>
        <textarea id="project-challenge" required minLength={12} maxLength={1200} rows={5} value={form.challenge} onChange={(event) => update('challenge', event.target.value)} placeholder="A few sentences is enough. What is happening, who is affected, and what would better look like?" />
        <div className="field-footnote field-footnote--count"><span>Avoid passwords, confidential data, and sensitive personal information.</span><span>{form.challenge.length} / 1200</span></div>

        {form.category && <>
          <label className="field-label" htmlFor="project-context">{contextPrompt} <small>OPTIONAL</small></label>
          <textarea id="project-context" maxLength={600} rows={3} value={form.context} onChange={(event) => update('context', event.target.value)} placeholder="Share only the context that is safe and useful." />
          <div className="field-footnote field-footnote--count"><span>This context is included only in the brief you choose to share.</span><span>{form.context.length} / 600</span></div>
        </>}

        <div className="form-row">
          <label className="field-group"><span className="field-label">Your name <small>OPTIONAL</small></span><input maxLength={80} value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="How should I address you?" autoComplete="name" /></label>
          <label className="field-group"><span className="field-label">Reply email <small>OPTIONAL</small></span><input type="email" maxLength={254} value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" autoComplete="email" /></label>
        </div>
        <label className="field-label" htmlFor="project-timeline">Timing <small>OPTIONAL</small></label>
        <select id="project-timeline" value={form.timeline} onChange={(event) => update('timeline', event.target.value)}>
          <option value="">No fixed timeline</option>
          <option>As soon as practical</option>
          <option>Within 1–3 months</option>
          <option>Exploring for later</option>
        </select>

        <button className="button-primary intake-submit" type="submit">{siteConfig.email ? 'Prepare an email' : 'Build my project brief'} <Icon name="ArrowUpRight" size={17} /></button>
        {!siteConfig.email && <p className="form-config-note"><Icon name="Info" size={14} /> Direct submission is not connected yet. Add a verified contact email before launch.</p>}

        {preparedBrief && (
          <div className="prepared-brief" role="status">
            <div className="prepared-brief-title"><span><Icon name="FileCheck2" size={17} /> BRIEF PREPARED</span><button type="button" onClick={copyBrief}><Icon name="Copy" size={14} /> Copy</button></div>
            <p>{copyStatus}</p>
            <textarea value={preparedBrief} readOnly rows={7} aria-label="Prepared project brief" />
          </div>
        )}
      </form>
    </div>
  );
}
