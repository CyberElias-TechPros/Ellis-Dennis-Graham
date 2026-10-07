# Ellis // Digital Universe — Build Contract

**Purpose:** Convert the North Star creative brief into an implementable, testable engineering contract. Use this alongside [`PRODUCT_BLUEPRINT.md`](./PRODUCT_BLUEPRINT.md); the blueprint explains *why*, this contract defines *how*.

**Current baseline:** React + Vite SPA; React Router; Framer Motion; Lucide icons; custom CSS; static content in `src/content.js`; no backend, CMS, analytics, or WebGL requirement. Preserve and extend the working application incrementally. Do not throw it away and regenerate a template.

**Selected public nickname:** **Cyber Elias** (selected by the owner). Keep **Ellis Dennis Graham** as the canonical name. Use Cyber Elias as a supporting moniker, not a replacement for the professional name. Do not use Lord Elias unless the owner later changes this decision.

---

## 1. Delivery objective

Build an original, production-conscious digital portfolio whose spatial metaphor is also its navigation model:

- Ellis is the Core/Sun.
- Capability areas are Worlds.
- Projects and verified achievements are artifacts/relics.
- Work history and evidence live in the Archive.
- Unfinished work lives in the Lab.
- Practical interactive demonstrations live in the War Room and world-specific experiences.
- Services and project discovery form the Engage layer.

The product must work as a credible portfolio when motion, canvas, and any optional 3D layer are unavailable. It must not depend on visitors accepting a cinematic intro or learning an unfamiliar control system.

### Non-goals for the first production pass

- Do not make all content live inside a WebGL scene.
- Do not build a CMS before static content becomes a demonstrated maintenance problem.
- Do not build a multi-tenant product or generalized portfolio platform.
- Do not add login, billing, chat, a database, or a third-party analytics SDK without an approved use case.
- Do not fabricate biography, dates, clients, credentials, live status, results, endorsements, or project implementation details.
- Do not deliver all worlds as the same template with only a new accent color.

---

## 2. Fixed product decisions

1. **Canonical identity:** Ellis Dennis Graham.
2. **Professional positioning:** Technology Systems Architect.
3. **Core line:** “I build, secure, connect, automate, and teach digital systems.”
4. **Visual states:** Celestial (dark) and Ascension (light), with separate atmospheric treatments.
5. **Eight primary Worlds:** Cybersecurity, Infrastructure, Software, AI & Automation, Digital Business, Education, Data & Analytics, Digital Presence.
6. **Portfolio truth labels:** `CONCEPT`, `IDEA`, `EXPERIMENT`, `PROTOTYPE`, `BUILDING`, `BUILT`, `DEPLOYED`, `ASSESSED`, `TAUGHT`, `DESIGNED`, `CONSULTED`, `LIVE`. A label describes evidence/status, not visual decoration.
7. **Contact privacy:** Without an approved integration, an enquiry stays in browser memory and can be copied; do not claim that it was sent.
8. **The Core visual:** Use an approved portrait/identity asset if Ellis supplies one. Until then, the current monogram is an honest placeholder—not an invented likeness.
9. **Alias:** Use the owner-selected public nickname **Cyber Elias** in supporting identity placements; preserve Ellis Dennis Graham as the canonical identity.

---

## 3. Repository and stack contract

### Keep for the current MVP

- React and Vite.
- React Router for shareable routes.
- Framer Motion for restrained motion, wrapped by `MotionConfig reducedMotion="user"`.
- Explicit named Lucide icon imports only; never import the entire icon namespace.
- Custom CSS tokens and semantic HTML for the product UI.
- Static, reviewable content data until a CMS is justified.

### Add only when the next phase requires them

- **TypeScript:** migrate incrementally before introducing complex API contracts or an admin; do not perform an unrelated all-at-once rewrite.
- **Runtime validation:** validate external/API input at the server boundary. Static owner-authored content can use TypeScript types or a small schema validator.
- **3D:** only after a specific scene has a clear purpose, a static fallback, and a measured performance budget. If approved, use a dynamically imported React Three Fiber/Three.js experience, not a WebGL dependency for ordinary text or navigation.
- **Backend:** only for a real form, status feed, or protected editorial workflow. Choose a same-origin Cloudflare Worker/API when the actual deployment target and data-retention requirements are confirmed.
- **CMS:** only after content edits are frequent enough to justify authoring UI, authentication, schema validation, backups, and operating costs.

### Dependency policy

- Prefer browser APIs and existing dependencies.
- Before adding a dependency, record the feature it unlocks, bundle impact, maintenance status, accessibility implications, and fallback.
- Keep route modules code-split.
- Do not add MUI merely to satisfy a technology list; the current custom visual system does not use it.

---

## 4. Target source layout

Refactor only when it improves a specific implementation task. The intended end-state is:

```text
src/
  app/
    App.jsx
    routes.jsx
    routeMetadata.js
    scrollRestoration.js
  components/
    AmbientStars.jsx
    SiteHeader.jsx
    Footer.jsx
    SectionHeading.jsx
    WorldOrbitalMap.jsx
    EvidenceBadge.jsx
    ProjectCard.jsx
    ReducedMotionNotice.jsx
  features/
    worlds/
      WorldPage.jsx
      WorldPageSections.jsx
    projects/
      ProjectsPage.jsx
      ProjectPage.jsx
      ArchitectureExplorer.jsx
    lab/
      LabPage.jsx
      NetworkForge.jsx
      WarRoom.jsx
      WorkflowEngine.jsx
      TeachingLab.jsx
      DataConstellation.jsx
    intake/
      ProjectIntake.jsx
      serviceRouting.js
      intakeSchema.js
    archive/
      ArchivePage.jsx
      Timeline.jsx
    arsenal/
      ArsenalPage.jsx
  content/
    worlds.js
    projects.js
    services.js
    experiences.js
    evidence.js
    toolkit.js
  design/
    tokens.css
    shell.css
    components.css
    pages.css
    responsive.css
  lib/
    siteConfig.js
    safeExternalLink.js
  test/
    fixtures/
```

Do not split every small component into a file by default. Keep related UI together until it has independent behavior, tests, or reuse.

---

## 5. Route contract

Every destination below must work on direct load and refresh, have a unique document title, and be linkable without first visiting `/`.

| Route | Page responsibility |
|---|---|
| `/` | Introduction, Core, orbital map, selected work, demos, method, next step |
| `/about` | Human story, philosophy, current focus, beyond the stack |
| `/worlds` | Accessible directory of all eight Worlds |
| `/worlds/:slug` | Capability, offer, proof standard, tools, related work, CTA |
| `/projects` | Project index with explicit status labels |
| `/projects/:slug` | Case study: problem, role, design, build, evidence, outcomes, lessons |
| `/services` | Problem-led service menu |
| `/lab` | Experiments and demonstrations with status and safety notes |
| `/war-room` | Fictional interactive incident simulation |
| `/archive` | Verified career history, milestones, credentials, and documents |
| `/arsenal` | Tools and methods grouped by context, no percentage ratings |
| `/start-a-project` | Dynamic discovery/intake flow |
| `/contact` | Verified contact channels and professional links |

Aliases such as `/worlds/ai` may redirect to the canonical `/worlds/ai-automation`; avoid duplicate content paths. Unknown routes show a branded 404 with usable navigation.

### Navigation rules

- Keep a conventional, visible navigation path alongside spatial navigation.
- Every world can be opened with a normal anchor/link and keyboard activation.
- Back/return-to-orbit must be obvious from world pages.
- Hash navigation must wait for lazy-loaded target content and cancel cleanly on route change.
- Provide a skip link and semantic `header`, `nav`, `main`, and `footer` landmarks.

---

## 6. Content schemas

Use these shapes as the source-of-truth contract. In JavaScript, document them with JSDoc; when TypeScript is introduced, translate them to interfaces/unions and keep the public JSON shape stable.

```ts
type EvidenceStatus =
  | 'concept' | 'idea' | 'experiment' | 'prototype' | 'building'
  | 'built' | 'deployed' | 'assessed' | 'taught' | 'designed'
  | 'consulted' | 'live';

type EvidenceArtifact = {
  id: string;
  label: string;
  status: EvidenceStatus;
  summary: string;
  url?: string;
  media?: { src: string; alt: string }[];
  safeToPublish: boolean;
  verifiedByOwner: boolean;
};

type CapabilityWorld = {
  slug: string;
  order: number;
  title: string;
  short: string;
  description: string;
  mission: string;
  visual: { accent: string; symbol: string; environmentKey: string };
  capabilities: string[];
  serviceIds: string[];
  technologyIds: string[];
  projectIds: string[];
  evidenceIds: string[];
  demoIds: string[];
  contentVerified: boolean;
};

type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: EvidenceStatus;
  featured: boolean;
  ownerRole?: string;
  problem?: string;
  objective?: string;
  users?: string[];
  architecture?: { name: string; purpose: string }[];
  implementation?: string[];
  decisions?: { question: string; decision: string; tradeoff?: string }[];
  outcome?: { description: string; measure?: string; evidenceId?: string };
  lessons?: string[];
  technologyIds: string[];
  worldIds: string[];
  artifacts: EvidenceArtifact[];
  liveUrl?: string;
  repositoryUrl?: string;
  verifiedByOwner: boolean;
  safeToPublish: boolean;
};

type ServiceOffering = {
  id: string;
  title: string;
  problemSignals: string[];
  discoveryQuestions: string[];
  possibleDeliverables: string[];
  worldId: string;
  projectIds: string[];
  ctaLabel: string;
};

type Experiment = {
  id: string;
  title: string;
  status: 'idea' | 'experiment' | 'prototype' | 'building' | 'live';
  question: string;
  summary: string;
  learnings: string[];
  lastUpdated?: string;
};
```

### Data rules

- Do not mark a project `live` or `deployed` because a card exists. Require an owner-verified status and an appropriate artifact.
- Only show a `liveUrl` when it is supplied and tested.
- Outcomes and measurements are optional; when present, they need evidence and a definition.
- Store only public-safe content in client bundles. Never place secrets in Vite environment variables.
- Seed the existing four named profiles as `prototype`/`concept` only if Ellis confirms that status; otherwise keep `status: 'idea'` or hide the entry until the owner decides.
- No certification record can be added without issuing body, date, and owner confirmation.

---

## 7. UI and visual contract

### Desktop Core/orbit

- The Core is the visual anchor; orbit nodes are distributed on deliberate paths with enough room for readable names and clear hit targets.
- Orbital motion is slow and subtle. It may not rotate labels out of view or change their hit area.
- Every orb is an actual link to a world route.
- Node hover/focus may reveal a short summary, but the name and destination are always visible.

### Mobile orbital map

- Replace the desktop composition with a deterministic two-column/radial directory.
- Keep the Core visible and the world list easy to scan.
- Do not rely on hover, drag, precise gesture, or WebGL.
- Verify at 320, 360, 390, and 430 CSS-pixel widths.

### World visual grammar

Worlds share the same underlying page structure but differ through controlled art direction: accent, symbol, background treatment, spatial diagram, and one purposeful interaction. Do not create eight unrelated applications or eight recolored card grids.

### Copy and evidence

- Put the visitor’s question before internal technology vocabulary.
- Keep an executive overview visible and technical depth progressively disclosed.
- Distinguish service direction from experience already delivered.
- Avoid fake counts, fake testimonials, fake live indicators, skill percentages, and filler copy.

---

## 8. Motion and scene state machines

Model transitions explicitly; do not derive core scene state from a collection of unrelated booleans.

### Intro controller

```text
idle → void → identity → ignition → orbit-ready
                       ↘ skip → orbit-ready
```

- Skip is always visible and keyboard-accessible.
- Persist “intro already seen” only if the owner approves; provide a replay control.
- On reduced-motion or low-capability fallback, show a short fade/static identity and go directly to a usable orbit.

### World transition

```text
orbit → world-entering(slug) → world-active(slug)
world-active(slug) → world-exiting(slug) → orbit
```

- URL changes to the selected world route.
- Browser Back returns to the prior route/state.
- Focus moves to the new page heading after route navigation.
- Cancel or finish any transition when a route changes again.

### Motion/render preferences

```text
motion = full | reduced | off
render = enhanced | standard | fallback
```

- `prefers-reduced-motion` is a hard input.
- Standard/fallback mode retains the same content and navigation.
- Never block primary content waiting for a renderer or GPU capability check.

### Demonstration state

- Every simulated workflow has `idle`, `in-progress`, `complete`, and `reset` states.
- Every wrong/alternate path provides a calm explanation and a route forward.
- Every demo states whether it is illustrative, synthetic, or tied to verified real work.

---

## 9. World/page behavior contract

Each world page exposes this order:

1. World identity, short benefit, and route back.
2. Capability overview in business-understandable language.
3. Optional technical depth and architecture diagram.
4. Services/engagement paths, labelled as offers rather than completed work.
5. Owner-verified evidence and related case studies; otherwise a clear, non-deceptive empty state.
6. Tools/standards with context and no implied certifications.
7. Relevant demo or lab experience.
8. A world-specific CTA to project discovery.

Each page must retain semantic headings and usable anchor destinations when motion is off.

---

## 10. Project and proof behavior

Project index cards display title, category, truthful status, and a short purpose. They do not display “live” unless a working URL has been tested.

Each project detail route must answer:

- What problem existed?
- Who was affected?
- What did Ellis personally do?
- What was designed, built, assessed, or taught?
- What trade-offs mattered?
- What changed, and how is that known?
- What is safe to share?
- What remains unfinished?

Use synthetic data for visual demos and label it. Never expose client topology, personal data, credentials, incident specifics, or confidential screenshots.

---

## 11. Interactive experience contracts

### Network Forge

- Diagram: upstream → firewall → core/distribution → logically separated access/service groups.
- Every node is a keyboard-operable button with `aria-pressed`, concise inspector heading, and explanation.
- The diagram is illustrative—not represented as an actual customer deployment.
- Use SVG/HTML/CSS before 3D; preserve a linear text equivalent.

### War Room / Security Lab

- Fictional, defensive, non-destructive scenario only.
- No real scanning, payloads, live targets, credentials, or instructions to compromise systems.
- Teach observation, scope, controlled diagnosis, verification, documentation, and prevention.
- Explain uncertainty; do not imply a single symptom always has one root cause.

### Automation Engine

- Show trigger → validation → human review → action → audit/exception path.
- Include a human approval step for high-impact actions.
- No external AI calls or personal data in the MVP.

### Teaching Lab

- Use concise, selectable micro-lessons with explicit learning outcome and a practical example.
- Keyboard and screen-reader users can reach all choices and lesson steps.

### Data Constellation

- All initial figures are synthetic, labelled illustrative, and not attributed to a client.
- Chart has an accessible summary/table or equivalent text.
- Avoid causal claims from a visual trend alone.

### Architecture Explorer

- Switch among user, business, architect, and technical views.
- Keep the same verified system model underneath all views.
- Start as data-driven HTML/SVG; add WebGL only if it measurably improves comprehension.

### Business Diagnostic

- Treat output as suggested discovery paths, not automated professional advice or an AI diagnosis.
- Explain why a service path is suggested and allow the visitor to choose a different one.
- Do not send free-text to third-party models without informed, explicit consent.

---

## 12. Project intake and backend/API contract

### Current frontend-only mode

- Form state remains in memory; do not store names, emails, or problem text in local storage, analytics, logs, or URLs.
- If no approved contact channel is configured, generate a copyable brief and state clearly that no submission occurred.
- If an approved public email is configured, use an explicit mailto draft and tell the visitor their email client opens; the visitor chooses whether to send.

### Future same-origin API, only if approved

Candidate routes:

```text
POST /api/intake
GET  /api/system-status/:slug   # only for real status sources
```

`POST /api/intake` requirements:

- JSON request with a versioned schema.
- Server-side validation, length limits, safe output encoding, content-type checks, and generic errors.
- Rate limit by an appropriate combination of IP/session and add bot protection if abuse appears.
- Do not log message bodies or email addresses by default.
- Explicit privacy and retention notice before submission.
- Store only if a retention period, access policy, deletion process, and data location are approved.
- Return an opaque reference ID, not the visitor’s submitted content.
- Never expose API secrets in the client.

Do not create `/api/status` by polling invented values. If no real system health endpoint exists, omit live status indicators entirely.

### Future admin, only as a separate approved phase

- Separate admin routes from the public client.
- Authenticated and authorized editorial actions, strong session controls, audit trail, backups, and safe media handling.
- Public `VITE_*` configuration must contain public values only.

---

## 13. WebGL and progressive enhancement contract

WebGL is **not a prerequisite** for the first production release.

If added later:

1. Load renderer code only on the relevant route/experience.
2. Show the HTML route immediately; never block on shader compilation.
3. Preserve a static Canvas/SVG/DOM fallback with identical labels and links.
4. Check WebGL availability and handle context loss.
5. Respect reduced motion, battery/device constraints, visibility, and page lifecycle.
6. Clamp pixel ratio and particle/object counts; avoid unbounded per-frame allocations.
7. Pause animation when the tab is hidden and clean up event listeners/resources.
8. Make all interactive scene objects available via synchronized semantic DOM controls.
9. Test GPU fallback, failed dynamic import, WebGL context loss, and touch interaction.

Use 3D for spatial understanding and emotional scale—not to render headings, paragraphs, buttons, forms, or ordinary icons.

---

## 14. Security, privacy, and external-link contract

- Production deploy must set security headers: CSP, HSTS where HTTPS is guaranteed, `X-Content-Type-Options`, `Referrer-Policy`, and a suitable `Permissions-Policy`.
- Start with a restrictive CSP; explicitly enumerate required font, image, and analytics origins. Avoid `unsafe-eval`; avoid inline script allowances unless a documented requirement exists.
- Use `rel="noopener noreferrer"` for new-tab external links.
- Sanitize/encode any content that later becomes HTML; prefer React text nodes.
- Validate external URLs in admin/content tooling; allow only expected schemes (`https`, `mailto`, or approved local paths).
- Store no secrets in source control or the browser bundle.
- Third-party fonts are optional; provide local/system fallbacks and do not block content on them.
- No analytics until purpose, provider, consent/privacy requirements, and retention are defined.
- Use least privilege for deployment credentials and admin/API access.

---

## 15. SEO and route rendering contract

- Use a unique title and description for each route.
- Provide canonical URL, Open Graph and social metadata, favicon, `robots.txt`, sitemap, and a designed share image before launch.
- Keep primary copy in semantic HTML and meaningful anchor links.
- Direct route requests must return a successful document and survive refresh.
- Configure the host’s history fallback.
- Before launch, prerender or server-render high-value routes if crawler-visible initial HTML is required; verify the delivered HTML rather than assuming client-side React alone is sufficient.
- Do not place critical content exclusively in canvas, generated textures, or hover labels.

---

## 16. Accessibility requirements

Target WCAG 2.2 AA for public routes.

- Semantic landmarks and logical heading hierarchy.
- All actions keyboard-operable with visible focus and no keyboard trap.
- Focus management after navigation/dialog/state changes.
- Text and UI contrast checked in both themes.
- Motion alternatives for every spatial transition; reduce/disable animation when requested.
- Accessible labels for icon-only controls; decorative icons hidden from assistive technology.
- Do not convey status by color alone.
- Form labels, hints, errors, and success messages programmatically associated.
- Charts have text alternatives; diagrams have linear explanations.
- Screen-reader test the mobile menu, orbit, dialogs, and demos.
- Automated axe checks supplement—but do not replace—manual keyboard/screen-reader review.

---

## 17. Performance budgets

Measure production builds and representative mobile hardware. Initial targets:

- Initial compressed JavaScript transferred: **≤ 180 KB gzip** before optional world/3D chunks.
- Any single route chunk: **≤ 120 KB gzip**, excluding separately loaded media/3D assets.
- Initial CSS: **≤ 100 KB gzip**.
- LCP: **≤ 2.5 s** on a representative mid-tier mobile profile when hosting permits.
- CLS: **≤ 0.1**.
- INP: **≤ 200 ms** target for primary interactions.
- No layout shift from font loading, orbit hydration, or scene fallback.
- Defer non-critical worlds, images, demos, and 3D.
- Provide compressed, responsive media with explicit dimensions.

If a requirement cannot meet budget, document the trade-off and reduce complexity before raising the budget. Current bundle measurements are baseline data, not permanent exemptions.

---

## 18. Testing contract

Introduce test tooling in a dedicated implementation phase, then require it for later changes.

### Unit/component tests

- World/project/service schemas and status rules.
- Service routing from intake selections.
- Incident scenario progression, wrong choice, completion, reset.
- Theme persistence with storage unavailable.
- Hash scroll retry/cancellation.
- All public links and route data resolve.

### Integration/e2e tests

Use Playwright (or equivalent) for:

- Homepage → each world → return path.
- Direct world/project route load and refresh.
- Desktop and mobile navigation.
- Theme switch and reload persistence.
- Reduced-motion preference.
- World selection by keyboard.
- Network Forge node inspection.
- War Room full path and reset.
- Automation, lesson, and data toggles.
- Intake validation, no-email copy-brief mode, and configured mailto mode without sending.
- Broken-link and console-error checks.
- WebGL unavailable/context-loss fallback if 3D is added.

### Visual/accessibility checks

- Viewports: 320×700, 390×844, 768×1024, 1024×768, 1440×900.
- Celestial and Ascension themes.
- Reduced motion on/off.
- Automated axe scan plus manual keyboard, zoom/reflow, and screen-reader review.
- Screenshot baselines should be deterministic: disable random stars/animations in test mode.

### Release gates

```text
npm run build              # required
npm test                   # Node content/route/configuration checks are configured
npm run test:e2e            # required before public launch; not configured yet
npm run lint                # required once configured
```

No release with console errors, broken route refresh, unlabelled interactive controls, or unverified public claims.

---

## 19. Implementation sequence (small, reviewable increments)

### Contract step 0 — Owner content decisions

- Confirm the preferred placements and styling for the selected alias Cyber Elias; the alias choice itself is settled.
- Confirm public contact email, LinkedIn, GitHub, CV, portrait permission, and country/region-specific contact details.
- Confirm the exact status, role, scope, links, and evidence for each named project.
- Confirm toolkit/standard references and intended service scope.

### Step 1 — Stabilize the current MVP

- Add route/content tests and accessibility smoke tests.
- Consolidate any duplicated styles/content without changing the established art direction.
- Fix route title/description handling and direct-refresh deployment configuration.
- Add proper project index and world directory routes where currently missing.

### Step 2 — Evidence-ready content model

- Move static data into feature-oriented content modules.
- Add explicit evidence/status/owner-verification fields.
- Gate public status claims on verified content.
- Add owner-supplied actual project artifacts.

### Step 3 — Core scene director

- Add a skippable intro as a progressive enhancement.
- Implement explicit intro and world transition state machines.
- Keep route/focus/back behavior deterministic.
- Compare no-motion and mobile fallbacks against full experience.

### Step 4 — Distinct world environments

- Create one art-direction brief and interaction contract per world.
- Implement at least one meaningful diagram/interaction in each selected world.
- Avoid repeating the same grid, reveal, and card pattern everywhere.

### Step 5 — Project Architecture Explorer and proof engine

- Add four audience views backed by the same verified project record.
- Link evidence to specific claims and status labels.
- Add empty and confidential-work states.

### Step 6 — Conversion and contact

- Improve problem diagnostic and conditional intake.
- Connect only an owner-approved contact mechanism.
- Add server API, storage, spam controls, privacy copy, and retention only if approved.

### Step 7 — Optional 3D and production hardening

- Prototype a single isolated scene behind dynamic import and a static fallback.
- Measure actual mobile performance before expanding it.
- Perform SEO, security headers, accessibility, responsive, route-refresh, and browser QA.

### Step 8 — CMS/analytics only if justified

- Define editorial roles, validation, backups, deletion, privacy, event taxonomy, and cost before implementation.

Each step should be delivered as a small, independently buildable change. Keep the dev server preview running while iterating; do not commit generated `dist/` or `node_modules/` artifacts.

### Implementation checkpoint — 2026-10-07

- **Owner decisions:** Cyber Elias is selected. Public email, phone, profile links, CV, and project-specific evidence remain unconfigured/unverified.
- **Routes and metadata:** `/worlds`, `/contact`, route-specific titles/descriptions, canonical URL support, and static-host SPA fallback are implemented. Browser-level navigation tests are still a launch task.
- **Evidence model:** Named projects explicitly carry `verificationStatus: unverified` and `evidenceStatus: in-progress`. Architecture flows are illustrative; they do not claim deployed implementation.
- **Core scene:** The opening sequence is skippable, suppressed on first load for reduced-motion users, never records a visit, and can be replayed from the footer. No WebGL dependency is used.
- **World experiences:** Each of the eight worlds routes to a focused interactive example. Existing demonstrations and new discovery, journey, and architecture tools identify themselves as simulations or conceptual views.
- **Project explorer:** User, Business, Architect, and Technical tabs are keyboard-operable; the Technical view stays empty until verified details are supplied.
- **Contact:** Verified channels render only when configured. The project brief remains client-side and is not represented as submitted or stored.
- **Verification:** `npm test`, `npm run build`, direct-route HTTP smoke checks against Vite, and `git diff --check` pass. Automated browser, screen-reader, and visual regression testing are not yet configured.
- **Still open:** owner review of content and contact details; browser/accessibility QA; production-host confirmation; measured performance and bundle budgets; security/privacy review before any backend; optional 3D only if later justified.

---

## 20. Acceptance checklist

### Experience

- [ ] A visitor can identify Ellis, his positioning, and the next action within the opening screen.
- [ ] The opening sequence is skippable and does not block useful content.
- [ ] Spatial and conventional navigation reach the same routes.
- [ ] Every world has an intentional, distinct interaction/visual identity.
- [ ] Back, browser history, direct links, and route refresh behave predictably.

### Truth and business

- [ ] Every public project/status/credential/client/outcome is owner-verified.
- [ ] Experiments, prototypes, and deployments are visually and semantically distinct.
- [ ] No fake live indicators, fake numbers, fake clients, fake testimonials, or skill bars.
- [ ] A client can discover relevant service and start a project without traversing the full universe.
- [ ] Contact behavior accurately describes what is and is not transmitted.

### Engineering

- [ ] App remains fully navigable with WebGL disabled or unavailable.
- [ ] Reduced-motion mode suppresses dramatic movement and preserves content.
- [ ] Mobile uses its own readable layout and touch controls.
- [ ] No secrets or unapproved personal data reach the client bundle.
- [ ] Unit/e2e/accessibility tests and production build pass.
- [ ] Bundle and Core Web Vitals budgets are measured and documented.
- [ ] Route metadata, crawler-visible content, and static-host rewrites are verified.

### Brand

- [ ] Canonical name stays Ellis Dennis Graham.
- [ ] Cyber Elias appears only as a supporting alias; Ellis Dennis Graham remains the canonical public name.
- [ ] The finished visual language is original, coherent, and recognizably Ellis’s.
- [ ] The experience ends with a clear invitation: **Bring me a problem. Let’s build the solution.**
