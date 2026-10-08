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
  ...projects.map((project) => ({ url: `/projects/${project.slug}`, route: '/projects/:slug', module: 'detail', exportName: 'ProjectPage' })),
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
    }
  } finally {
    await vite.close();
  }
});
