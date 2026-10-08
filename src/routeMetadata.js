import { projects, worlds } from './content.js';

function decodeLastSegment(pathname) {
  try { return decodeURIComponent(pathname.split('/').filter(Boolean).at(-1) || ''); } catch { return ''; }
}

export function metadataFor(pathname = '/') {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { title: 'Ellis Dennis Graham — Digital Universe', description: 'Enter the digital universe of Ellis Dennis Graham: infrastructure, cybersecurity, software, automation, education, and systems thinking.' };
  if (path === '/worlds') return { title: 'Explore the Worlds — Cyber Elias', description: 'Explore eight connected technology worlds: cybersecurity, infrastructure, software, automation, digital business, education, data, and digital presence.' };
  if (path === '/projects') return { title: 'Project Constellation — Cyber Elias', description: 'Explore transparent project profiles, architecture perspectives, and evidence from the Ellis Dennis Graham portfolio.' };
  if (path === '/services') return { title: 'Technology Services — Cyber Elias', description: 'Explore problem-led technology services across infrastructure, cybersecurity, software, automation, education, data, and digital presence.' };
  if (path === '/about') return { title: 'About Ellis — Cyber Elias', description: 'Meet Ellis Dennis Graham, known as Cyber Elias: a systems-first technology architect focused on building, securing, connecting, automating, and teaching digital systems.' };
  if (path === '/contact') return { title: 'Contact Ellis — Cyber Elias', description: 'Start a conversation with Ellis Dennis Graham about a technology problem, service, project, or training opportunity.' };
  if (path === '/start-a-project') return { title: 'Start a Project — Cyber Elias', description: 'Describe the challenge you are trying to solve and prepare a structured project brief for Ellis Dennis Graham.' };
  if (path === '/lab') return { title: 'The Lab — Cyber Elias', description: 'Explore interactive demonstrations in networking, incident response, automation, teaching, and data.' };
  if (path === '/war-room') return { title: 'The War Room — Cyber Elias', description: 'Work through a fictional incident-response scenario by following the evidence and verifying recovery.' };
  if (path === '/archive') return { title: 'The Archive — Cyber Elias', description: 'Explore the evidence framework, professional record, and systems-thinking journey behind the Ellis Dennis Graham portfolio.' };
  if (path === '/arsenal') return { title: 'Technology Arsenal — Cyber Elias', description: 'Explore the technologies, frameworks, and tools that inform Ellis Dennis Graham’s systems practice.' };
  const slug = decodeLastSegment(path);
  const world = path.match(/^\/worlds\/[^/]+$/) && worlds.find((item) => item.slug === slug);
  if (world) return { title: `${world.title} — Cyber Elias`, description: world.description };
  const project = path.match(/^\/projects\/[^/]+$/) && projects.find((item) => item.slug === slug);
  if (project) return { title: `${project.title} — Project Profile`, description: project.description };
  return { title: 'Lost Signal — Cyber Elias', description: 'This path is not in the Ellis Dennis Graham digital universe. Return to the orbital map.' };
}
