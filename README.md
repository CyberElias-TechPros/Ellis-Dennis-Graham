# ELLIS // DIGITAL UNIVERSE

A cinematic, interactive portfolio for **Ellis Dennis Graham**—designed as an explorable technology universe rather than a conventional résumé page.

> **Positioning:** Technology Systems Architect
>
> **Public nickname:** Cyber Elias
>
> **Core statement:** I build, secure, connect, automate, and teach digital systems.

The visual experience is cosmic and artifact-inspired; the application beneath it remains semantic, responsive, keyboard accessible, and useful without WebGL.

## Run locally

```bash
npm install
npm test
npm run dev
```

Vite is configured to bind to `0.0.0.0` for hosted previews. Build and serve the production bundle with:

```bash
npm run build
npm run preview
```

## What is implemented

- An animated orbital map with Ellis at the core and eight linked capability worlds, plus a conventional, shareable `/worlds` directory.
- Eight responsive world pages, each with capabilities, service directions, proof guidance, relevant tools, an interactive system view, and a project pathway.
- Phase 3 world environments: eight distinct SVG field studies—security citadel, network topology, software layers, neural workflow, digital-business skyline, learning folio, data constellation, and digital-presence portal—paired with the existing world-specific interactions rather than a recolored card template.
- A skippable five-beat opening—Void → First Light → Identity → Ignition → Universe—with reduced-motion support, navigable world symbols and conventional links at readiness, no visit tracking, and footer replay.
- The approved “Celestial Observatory” direction: deep-space indigo, warm stellar light, restrained nebula accents, a sacred-geometry sun sigil, planetary world glyphs, editorial typography, shared tokens, and a distinct pearl-dawn Ascension theme. Phase 3 now carries this language into each capability world through different silhouettes, diagrams, and atmospheres.
- Project profiles for TechPros, Cyber Elias Academy, CyberShop, and FreeGameplay. They are visibly marked **Profile in progress** until exact role, implementation status, live URLs, and outcomes are confirmed.
- A claim-level evidence ledger on every project profile. Artifact publication requires both owner verification and explicit safe-to-publish approval; empty and withheld states are handled without inventing proof.
- Interactive demonstrations: Network Forge, a multi-step incident-response War Room, workflow automation examples, a teaching micro-lesson, an illustrative data chart, a business discovery diagnostic, customer journey map, and conceptual software architecture view.
- Four-lens Project Architecture Explorer (User, Business, Architect, Technical) with unverified implementation details explicitly withheld.
- Systems-thinking method, Core/About, Archive, Technology Arsenal, Services, Contact, and client-side project-intake pages.
- Celestial (dark) and Ascension (light) themes, a mobile orbital-map fallback, reduced-motion support, and keyboard/focus states.
- Problem-led project discovery with service-specific prompts and optional conditional context. Inputs are bounded and remain in page memory; no brief is sent or saved automatically. A verified email opens a user-controlled mail draft, otherwise visitors can copy the prepared brief.
- Static-host `_headers` security baseline (CSP, framing/referrer/content-type policies, and hashed-asset caching) plus route-specific title/description metadata.

## Configure before publishing

Copy `.env.example` to `.env` and add only verified, public contact/profile destinations:

```dotenv
VITE_CONTACT_EMAIL=your-public-inbox@example.com
VITE_PUBLIC_PHONE=replace-with-your-public-number
VITE_WHATSAPP_URL=replace-with-your-whatsapp-link
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-profile
VITE_GITHUB_URL=https://github.com/your-profile
VITE_CV_URL=/Ellis-Dennis-Graham-CV.pdf
VITE_SITE_URL=https://your-domain.example
```

The values above are placeholders: replace them only with owner-approved public details, or leave a variable empty to hide that channel. These values are public client configuration, never secrets. The email option opens the visitor’s mail application with a prepared message; it does not silently send or store form submissions. Add a server-backed, spam-protected form only if desired. Place a verified CV file in `public/` if using a local CV path.

## Where content lives

- `src/content.js` — capability worlds, project profiles, method, lab modules, toolkit, and intake options.
- `src/siteConfig.js` — environment-backed public contact/profile configuration.
- `src/pages/DetailPages.jsx` — world, project, lab, archive, service, and intake route views.
- `src/pages/DirectoryPages.jsx` — the worlds directory and configuration-backed contact page.
- `src/components/ArchitectureExplorer.jsx` — four-lens, conceptual/evidence-backed project system view.
- `src/components/ProjectEvidenceLedger.jsx`, `src/evidence.js`, and `src/project-evidence.css` — claim-to-artifact evidence gating, safe-link checks, and empty/confidential states.
- `src/components/WorldExperiences.jsx` and `src/components/LabExperiences.jsx` — interactive world and Lab demonstrations.
- `src/components/WorldEnvironment.jsx` and `src/world-environments.css` — data-mapped, decorative SVG field studies and responsive Phase 3 world art direction.
- `src/components/ProjectIntake.jsx` and `src/intake.css` — local-only discovery form, service-specific follow-ups, and responsive layout.
- `src/routeMetadata.js` — tested document titles and descriptions for shareable routes.
- `src/design-system.css` — shared tokens and the opening-sequence art direction.
- `tests/content.test.js` and `tests/pages-render.test.js` — built-in Node checks for evidence gating, route metadata, hosting headers, content integrity, opening phases, and semantic route rendering.
- `public/_redirects` and `public/_headers` — SPA fallback and static-host security/cache policy.
- `docs/PRODUCT_BLUEPRINT.md` — full product and application specification, roadmap, and launch gates.

## Content integrity

The app intentionally does not invent dates, client logos, certifications, client results, deployment claims, testimonials, or proficiency percentages. Project names and the technology list came from the supplied brief and still need Ellis’s confirmation. Project records currently contain no owner-verified artifacts; the evidence ledger hides anything that is not both verified and explicitly safe to publish. Keep prototype, experiment, built, and deployed work clearly distinguished. Replace draft copy with verified details before launch.
