import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects, worlds } from '../src/content.js';

const slugs = (items) => items.map((item) => item.slug);

test('the orbital map contains eight distinct, fully described capability worlds', () => {
  assert.equal(worlds.length, 8);
  assert.equal(new Set(slugs(worlds)).size, worlds.length);

  for (const world of worlds) {
    assert.ok(world.title, `${world.slug} has a title`);
    assert.ok(world.mission, `${world.slug} has a mission`);
    assert.ok(world.capabilities.length > 0, `${world.slug} has capabilities`);
    assert.ok(world.offers.length > 0, `${world.slug} has service paths`);
    assert.ok(world.evidence.length > 0, `${world.slug} has an evidence standard`);
  }
});

test('each capability world has a mapped interactive experience', async () => {
  const experiences = await readFile(new URL('../src/components/WorldExperiences.jsx', import.meta.url), 'utf8');
  for (const world of worlds) assert.ok(experiences.includes(`world.slug === '${world.slug}'`), `${world.title} needs an experience mapping`);
});

test('each world has a distinct field-study environment signature', async () => {
  const styles = await readFile(new URL('../src/world-environments.css', import.meta.url), 'utf8');
  const families = worlds.map((world) => world.environment);
  assert.equal(new Set(families).size, worlds.length, 'each world should use its own environmental grammar');
  for (const family of families) assert.ok(styles.includes(`.world-environment--${family}`), `${family} needs an art-direction treatment`);
});

test('named project records stay explicitly unverified and expose no unsupported technical details', () => {
  assert.deepEqual(new Set(slugs(projects)), new Set(['techpros', 'cyber-elias-academy', 'cybershop', 'freegameplay']));

  for (const project of projects) {
    assert.equal(project.status, 'Profile in progress');
    assert.equal(project.verificationStatus, 'unverified');
    assert.equal(project.evidenceStatus, 'in-progress');
    assert.ok(project.architecture.length > 0);
    assert.deepEqual(project.perspectives.technical, [], `${project.title} should not imply unverified implementation detail`);
  }
});

test('direct navigation routes cover the world directory, project profiles, and contact page', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8');
  for (const route of ['/worlds', '/worlds/:slug', '/projects', '/projects/:slug', '/contact', '/start-a-project']) {
    assert.ok(app.includes(`path="${route}"`), `missing route ${route}`);
  }
  assert.equal(redirects.trim(), '/* /index.html 200');
});

test('the cinematic opening can be skipped and replayed without storing a visit', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const intro = await readFile(new URL('../src/components/IntroExperience.jsx', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../src/components/Footer.jsx', import.meta.url), 'utf8');
  assert.match(intro, /Skip sequence/);
  assert.match(intro, /event\.key === 'Escape'/);
  assert.match(footer, /Replay the opening/);
  assert.doesNotMatch(app, /edg-intro-seen/);
});

test('the opening presents the five-beat sequence and navigable worlds before entry', async () => {
  const intro = await readFile(new URL('../src/components/IntroExperience.jsx', import.meta.url), 'utf8');
  const design = await readFile(new URL('../src/design-system.css', import.meta.url), 'utf8');
  for (const phase of ['void', 'first-light', 'identity', 'ignition', 'ready']) {
    assert.ok(intro.includes(`'${phase}'`), `the intro timeline includes ${phase}`);
    assert.ok(design.includes(`intro-experience--${phase}`), `the design system styles ${phase}`);
  }
  assert.match(intro, /className="intro-sigil"/);
  assert.match(intro, /className="intro-worlds"/);
  assert.match(intro, /className="intro-quick-nav"/);
  assert.match(design, /observatory-sigil-turn/);
  assert.match(intro, /Enter the universe/);
});

test('contact details are opt-in public configuration rather than invented defaults', async () => {
  const config = await readFile(new URL('../src/siteConfig.js', import.meta.url), 'utf8');
  const example = await readFile(new URL('../.env.example', import.meta.url), 'utf8');
  for (const key of ['VITE_CONTACT_EMAIL', 'VITE_PUBLIC_PHONE', 'VITE_WHATSAPP_URL', 'VITE_LINKEDIN_URL', 'VITE_GITHUB_URL', 'VITE_CV_URL', 'VITE_SITE_URL']) {
    assert.ok(config.includes(key), `${key} is read by the application`);
    assert.ok(example.includes(key), `${key} is documented for launch setup`);
  }
  assert.match(config, /VITE_CONTACT_EMAIL\?\.trim\(\) \|\| ''/);
});
