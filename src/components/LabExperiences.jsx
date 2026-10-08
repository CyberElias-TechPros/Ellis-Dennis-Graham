import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons.jsx';

const networkNodes = [
  { id: 'internet', name: 'Internet', kind: 'UPSTREAM', icon: 'Globe2', detail: 'The outside connection. Record provider handoffs and test upstream reachability before diagnosing the local network.' },
  { id: 'firewall', name: 'Edge firewall', kind: 'BOUNDARY', icon: 'Shield', detail: 'Defines the perimeter: routing, policy, VPN, and visibility. Keep the rules understandable and the management plane protected.' },
  { id: 'core', name: 'Core switch', kind: 'DISTRIBUTION', icon: 'Network', detail: 'The central connection point between network segments. Redundancy, uplink health, and clear port documentation matter here.' },
  { id: 'staff', name: 'Staff VLAN', kind: 'SEGMENT 01', icon: 'UsersRound', detail: 'A distinct user segment with intentional access to the services staff need—and no more than they need.' },
  { id: 'wifi', name: 'Wi-Fi', kind: 'SEGMENT 02', icon: 'Wifi', detail: 'Wireless coverage is a design problem as much as a signal problem: placement, channel planning, authentication, and roaming all matter.' },
  { id: 'servers', name: 'Services', kind: 'SEGMENT 03', icon: 'Server', detail: 'Shared services should be discoverable, monitored, backed up, and separated from ordinary user traffic where appropriate.' }
];

export function NetworkForge() {
  const [activeNode, setActiveNode] = useState('firewall');
  const selected = networkNodes.find((node) => node.id === activeNode);

  return (
    <div className="forge-panel">
      <div className="forge-diagram" aria-label="Illustrative network topology">
        <div className="forge-spine" aria-hidden="true" />
        <div className="forge-route">
          {networkNodes.slice(0, 3).map((node, index) => (
            <div className="forge-route-step" key={node.id}>
              <button className={`forge-node ${activeNode === node.id ? 'is-selected' : ''}`} type="button" onClick={() => setActiveNode(node.id)} aria-pressed={activeNode === node.id}>
                <span className="forge-node-icon"><Icon name={node.icon} size={17} /></span>
                <span><small>{node.kind}</small><strong>{node.name}</strong></span>
                <Icon name="Plus" size={14} className="forge-node-plus" />
              </button>
              {index < 2 && <span className="forge-connector" aria-hidden="true"><Icon name="ArrowDown" size={15} /></span>}
            </div>
          ))}
        </div>
        <div className="forge-branch-label"><span />CORE DISTRIBUTION / SEGMENTED ACCESS</div>
        <div className="forge-branches">
          {networkNodes.slice(3).map((node) => (
            <button className={`forge-node forge-node--branch ${activeNode === node.id ? 'is-selected' : ''}`} key={node.id} type="button" onClick={() => setActiveNode(node.id)} aria-pressed={activeNode === node.id}>
              <span className="forge-node-icon"><Icon name={node.icon} size={17} /></span>
              <span><small>{node.kind}</small><strong>{node.name}</strong></span>
              <Icon name="Plus" size={14} className="forge-node-plus" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.aside className="forge-inspector" key={selected.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.2 }}>
          <div className="inspector-top">NODE INSPECTOR <span>/{selected.kind}</span></div>
          <div className="inspector-symbol"><Icon name={selected.icon} size={23} /></div>
          <h3>{selected.name}</h3>
          <p>{selected.detail}</p>
          <div className="inspector-note"><Icon name="Info" size={15} /> Illustrative architecture—not a live client network.</div>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}

const incidentStages = [
  {
    prompt: 'Where do you investigate first?',
    choices: [
      { id: 'dns', label: 'Assume DNS is the root cause', icon: 'Globe2' },
      { id: 'core', label: 'Check the core switch and its uplinks', icon: 'Network' },
      { id: 'restart', label: 'Restart every affected endpoint', icon: 'RefreshCw' }
    ],
    answer: 'core',
    explanation: 'The gateway responds, but the core is unreachable and multiple segments are affected. Start at the shared point of failure; avoid changing unrelated systems.'
  },
  {
    prompt: 'The core still cannot be reached. What is the next safe move?',
    choices: [
      { id: 'isolate', label: 'Verify power, uplinks, and recent changes; isolate the failure', icon: 'ScanSearch' },
      { id: 'replace', label: 'Replace the switch immediately', icon: 'Replace' },
      { id: 'rules', label: 'Rewrite the firewall policy', icon: 'Shield' }
    ],
    answer: 'isolate',
    explanation: 'Check the physical and logical path, equipment state, and recent changes. Preserve evidence, and make one controlled change at a time.'
  },
  {
    prompt: 'Connectivity returns. What closes the incident well?',
    choices: [
      { id: 'close', label: 'Close the ticket as soon as one device responds', icon: 'CircleCheck' },
      { id: 'verify', label: 'Validate key services, affected segments, and monitoring', icon: 'ListChecks' },
      { id: 'forget', label: 'Leave the configuration undocumented', icon: 'FileQuestion' }
    ],
    answer: 'verify',
    explanation: 'Verify representative clients, key services, and affected VLANs. Record the cause, changes, and follow-up actions so the fix is durable.'
  }
];

export function WarRoom() {
  const [stage, setStage] = useState(0);
  const [choice, setChoice] = useState(null);
  const [complete, setComplete] = useState(false);
  const current = incidentStages[stage];
  const correct = choice === current?.answer;

  const reset = () => { setStage(0); setChoice(null); setComplete(false); };
  const advance = () => {
    if (stage === incidentStages.length - 1) setComplete(true);
    else { setStage((value) => value + 1); setChoice(null); }
  };

  return (
    <div className="war-room">
      <div className="incident-brief">
        <div className="incident-alert"><span className="alert-pulse" /> SIMULATED INCIDENT <span>SEV 02</span></div>
        <h3>Multi-site connectivity loss</h3>
        <p>Three locations report an outage. The internet gateway responds, the core switch is unreachable, and 42 devices are offline.</p>
        <div className="incident-signals"><span><i className="signal-ok" /> Gateway responding</span><span><i className="signal-alert" /> Core unreachable</span><span><i className="signal-muted" /> 3 sites affected</span></div>
        <div className="incident-method"><span>DETECT</span><b>→</b><span>ISOLATE</span><b>→</b><span>RESTORE</span><b>→</b><span>VERIFY</span></div>
      </div>
      <div className="incident-console">
        {!complete ? (
          <>
            <div className="console-progress"><span>TRIAGE SEQUENCE</span><span>0{stage + 1} / 0{incidentStages.length}</span></div>
            <div className="console-progress-track"><span style={{ width: `${((stage + 1) / incidentStages.length) * 100}%` }} /></div>
            <h4>{current.prompt}</h4>
            <div className="incident-options">
              {current.choices.map((option) => (
                <button key={option.id} type="button" className={`incident-option ${choice === option.id ? (option.id === current.answer ? 'is-correct' : 'is-wrong') : ''}`} onClick={() => setChoice(option.id)} aria-pressed={choice === option.id}>
                  <Icon name={option.icon} size={17} /><span>{option.label}</span><Icon name={choice === option.id ? (option.id === current.answer ? 'Check' : 'X') : 'ArrowUpRight'} size={15} className="incident-option-arrow" />
                </button>
              ))}
            </div>
            <AnimatePresence>
              {choice && (
                <motion.div className={`incident-feedback ${correct ? 'is-correct' : 'is-wrong'}`} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <strong>{correct ? 'Good next step.' : 'Reconsider the signal.'}</strong>
                  <p>{correct ? current.explanation : 'Use the evidence in the incident brief. Prefer the least disruptive test that narrows the fault domain.'}</p>
                  {correct && <button className="text-link" type="button" onClick={advance}>{stage === incidentStages.length - 1 ? 'Complete scenario' : 'Continue triage'} <Icon name="ArrowRight" size={15} /></button>}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div className="incident-complete" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <span className="complete-emblem"><Icon name="ShieldCheck" size={24} /></span>
            <span className="micro-label">INCIDENT CONTAINED</span>
            <h4>Signal, isolate, verify.</h4>
            <p>You followed the evidence, chose controlled checks, and verified recovery. Good incident response is a repeatable method—not a lucky guess.</p>
            <button className="text-link" type="button" onClick={reset}>Run the scenario again <Icon name="RotateCcw" size={15} /></button>
          </motion.div>
        )}
        <p className="simulation-disclaimer"><Icon name="Info" size={13} /> Training simulation only; every real incident needs context-specific investigation.</p>
      </div>
    </div>
  );
}

const workflowMap = {
  sales: { label: 'Sales enquiry', steps: ['New enquiry', 'Triage & consent', 'Human review', 'CRM record', 'Follow-up task'] },
  support: { label: 'Customer support', steps: ['Support message', 'Classify request', 'Knowledge suggestion', 'Human response', 'Resolution note'] },
  reporting: { label: 'Weekly reporting', steps: ['Source data', 'Validate & clean', 'Generate summary', 'Owner review', 'Scheduled delivery'] }
};

export function WorkflowEngine() {
  const [workflow, setWorkflow] = useState('sales');
  const selected = workflowMap[workflow];
  return (
    <div className="workflow-panel">
      <div className="workflow-tabs" role="group" aria-label="Choose a workflow example">
        {Object.entries(workflowMap).map(([key, item]) => <button type="button" key={key} className={workflow === key ? 'is-active' : ''} onClick={() => setWorkflow(key)} aria-pressed={workflow === key}>{item.label}</button>)}
      </div>
      <div className="workflow-route" aria-label={`${selected.label} example steps`}>
        {selected.steps.map((step, index) => (
          <motion.div className="workflow-step" key={`${workflow}-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <span className="workflow-step-number">0{index + 1}</span>
            <span>{step}</span>
            {index < selected.steps.length - 1 && <Icon name="ArrowRight" size={15} className="workflow-arrow" />}
          </motion.div>
        ))}
      </div>
      <div className="workflow-human"><Icon name="UserRoundCheck" size={16} /> Human review stays in the loop before high-impact actions.</div>
      <p className="simulation-disclaimer"><Icon name="Info" size={13} /> Illustrative flow; systems and safeguards must be designed for each real process.</p>
    </div>
  );
}

const lessonMap = {
  networking: { label: 'Networking', phrase: 'A network is a set of paths with rules.', steps: ['Name the endpoints and the service.', 'Trace the path between them.', 'Check where the path stops—and what evidence proves it.'] },
  security: { label: 'Security', phrase: 'Security starts with context, not a product.', steps: ['Identify what matters and to whom.', 'Understand how it can be exposed or disrupted.', 'Choose a proportional control and verify it works.'] },
  systems: { label: 'Systems thinking', phrase: 'A symptom is not the same thing as a cause.', steps: ['Describe the observable symptom.', 'Map dependencies and recent changes.', 'Test one hypothesis at a time.'] }
};

export function TeachingLab() {
  const [topic, setTopic] = useState('networking');
  const lesson = lessonMap[topic];
  return (
    <div className="teaching-panel">
      <div className="teaching-picker" role="group" aria-label="Choose a mini lesson">
        {Object.entries(lessonMap).map(([key, value]) => <button type="button" key={key} className={topic === key ? 'is-active' : ''} onClick={() => setTopic(key)} aria-pressed={topic === key}>{value.label}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="lesson-card" key={topic} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
          <span className="lesson-sigil"><Icon name="BookOpenCheck" size={19} /></span>
          <span className="micro-label">A 30-SECOND IDEA</span>
          <h3>{lesson.phrase}</h3>
          <ol>{lesson.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const sampleMetrics = {
  service: { label: 'Service requests', unit: 'requests / week', values: [24, 31, 28, 39, 34, 45, 38], note: 'Illustrative volume: a trend is a prompt to ask why, not a diagnosis by itself.' },
  network: { label: 'Network latency', unit: 'relative signal', values: [20, 22, 26, 48, 42, 33, 24], note: 'Illustrative signal: check scope, timing, and measurement conditions before acting.' }
};

export function DataConstellation() {
  const [view, setView] = useState('service');
  const dataset = sampleMetrics[view];
  return (
    <div className="data-panel">
      <div className="data-panel-head">
        <div><span className="micro-label">SAMPLE SIGNAL / NOT CLIENT DATA</span><h3>{dataset.label}</h3></div>
        <div className="data-toggle" role="group" aria-label="Choose illustrative dataset">
          <button type="button" onClick={() => setView('service')} className={view === 'service' ? 'is-active' : ''} aria-pressed={view === 'service'}>Service</button>
          <button type="button" onClick={() => setView('network')} className={view === 'network' ? 'is-active' : ''} aria-pressed={view === 'network'}>Network</button>
        </div>
      </div>
      <div className="data-chart" role="img" aria-label={`${dataset.label}, seven illustrative data points`}>
        <div className="chart-gridline chart-gridline--top"><span>HIGH</span></div>
        <div className="chart-gridline chart-gridline--middle"><span>BASELINE</span></div>
        <div className="chart-gridline chart-gridline--bottom"><span>LOW</span></div>
        <div className="chart-bars">
          {dataset.values.map((value, index) => <div className="chart-bar-column" key={`${view}-${index}`}><motion.span className="chart-bar" initial={{ height: 0 }} animate={{ height: `${value}%` }} transition={{ duration: 0.55, delay: index * 0.04 }} style={{ '--bar-index': index }} /><small>0{index + 1}</small></div>)}
        </div>
      </div>
      <div className="data-chart-caption"><span>{dataset.unit}</span><p>{dataset.note}</p></div>
    </div>
  );
}
