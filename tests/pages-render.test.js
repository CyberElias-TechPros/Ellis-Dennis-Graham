import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';
import { projects, worlds } from '../src/content.js';

const routeCases = [
  { url: '/', route: '/', module: 'home', exportName: 'default' },
  { url: '/worlds', route: '/worlds', module: 'directory', exportName: 'WorldsIndexPage' },
  { url: '/projects', route: '/projects', module: 'detail', exportName: 'ProjectsPage' },
  { url: '/about', route: '/about', module: 'detail', exportName: 'AboutPage' },
  { url: '/archive', route: '/archive', module: 'detail', exportName: 'ArchivePage' },
  { url: '/arsenal', route: '/arsenal', module: 'detail', exportName: 'ArsenalPage' },
  { url: '/lab', route: '/lab', module: 'detail', exportName: 'LabPage' },
  { url: '/war-room', route: '/war-room', module: 'detail', exportName: 'WarRoomPage' },
  { url: '/start-a-project', route: '/start-a-project', module: 'detail', exportName: 'StartProjectPage' },
  { url: '/services', route: '/services', module: 'detail', exportName: 'ServicesPage' },
  { url: '/contact', route: '/contact', module: 'directory', exportName: 'ContactPage' },
  ...worlds.map((world) => ({ url: `/worlds/${world.slug}`, route: '/worlds/:slug', module: 'detail', exportName: 'WorldPage', world })),
  ...projects.map((project) => ({ url: `/projects/${project.slug}`, route: '/projects/:slug', module: 'detail', exportName: 'ProjectPage', project })),
  { url: '/this-route-does-not-exist', route: '*', module: 'detail', exportName: 'NotFound' }
];

test('every direct route renders a semantic main landmark and primary heading', async () => {
  const vite = await createServer({
    configFile: './vite.config.js',
    server: { middlewareMode: true },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: 'custom',
    logLevel: 'error'
  });

  try {
    const [home, detail, directory] = await Promise.all([
      vite.ssrLoadModule('/src/pages/HomePage.jsx'),
      vite.ssrLoadModule('/src/pages/DetailPages.jsx'),
      vite.ssrLoadModule('/src/pages/DirectoryPages.jsx')
    ]);
    const modules = { home, detail, directory };

    for (const item of routeCases) {
      const Component = modules[item.module][item.exportName];
      const routeTree = React.createElement(
        MemoryRouter,
        { initialEntries: [item.url] },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: item.route, element: React.createElement(Component) })
        )
      );
      const html = renderToString(routeTree);
      assert.match(html, /<main\b/, `${item.url} should render a main landmark`);
      assert.match(html, /<h1\b/, `${item.url} should render a primary heading`);
      if (item.world) assert.ok(html.includes(`world-environment--${item.world.environment}`), `${item.url} should render its world-specific field study`);
      if (item.project) {
        assert.ok(html.includes('project-evidence-ledger'), `${item.url} should render a proof ledger`);
        assert.ok(html.includes('No owner-verified evidence attached'), `${item.url} should disclose its empty evidence state`);
        assert.ok(html.includes('CONCEPTUAL PROJECT MAP'), `${item.url} should label unverified views as conceptual`);
      }
    }

    const { default: ProjectEvidenceLedger } = await vite.ssrLoadModule('/src/components/ProjectEvidenceLedger.jsx');
    const confidentialHtml = renderToString(React.createElement(ProjectEvidenceLedger, {
      project: {
        slug: 'confidential-example',
        proof: {
          ownerVerified: true,
          disclosureStatus: 'withheld',
          claims: [{ id: 'secret-claim', label: 'Sensitive segment name', statement: 'Private subnet layout', verifiedByOwner: true, evidenceIds: ['secret'] }],
          artifacts: [{ id: 'secret', label: 'Sensitive topology', summary: 'Private network map', verifiedByOwner: true, safeToPublish: true }]
        }
      }
    }));
    assert.ok(confidentialHtml.includes('Evidence intentionally withheld'));
    assert.ok(!confidentialHtml.includes('Private network map'), 'withheld artifacts must remain hidden even when individually marked publishable');
    assert.ok(!confidentialHtml.includes('Private subnet layout'));
    assert.ok(!confidentialHtml.includes('Sensitive segment name'));
  } finally {
    await vite.close();
  }
});
