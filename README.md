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
- A shared editorial design system across all routes: consistent page introductions, typography, surfaces, hierarchy, focus states, and light/dark treatment, with dedicated mobile layouts.
- Eight responsive world pages, each with capabilities, service directions, proof guidance, relevant tools, an interactive system view, and a project pathway.
- A skippable opening sequence that respects reduced-motion preferences, does not persist a visit, and can be replayed from the footer.
- Project profiles for TechPros, Cyber Elias Academy, CyberShop, and FreeGameplay. They are visibly marked **Profile in progress** until exact role, implementation status, live URLs, and outcomes are confirmed.
- Interactive demonstrations: Network Forge, a multi-step incident-response War Room, workflow automation examples, a teaching micro-lesson, an illustrative data chart, a business discovery diagnostic, customer journey map, and conceptual software architecture view.
- Four-lens Project Architecture Explorer (User, Business, Architect, Technical) with unverified implementation details explicitly withheld.
- Systems-thinking method, Core/About, Archive, Technology Arsenal, Services, Contact, and client-side project-intake pages.
- Celestial (dark) and Ascension (light) themes, a mobile orbital-map fallback, reduced-motion support, and keyboard/focus states.
- Client-side project brief. Until a verified email is configured, the brief is not transmitted or stored; visitors can copy it.

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
- `src/components/PageIntro.jsx` and `src/visual-system.css` — reusable route framing and the shared cross-site visual system.
- `src/components/ArchitectureExplorer.jsx` — four-lens, evidence-conscious project system view.
- `src/components/WorldExperiences.jsx` and `src/components/LabExperiences.jsx` — interactive world and Lab demonstrations.
- `tests/content.test.js` and `tests/pages-render.test.js` — built-in Node tests for world/project records, routes, contact configuration, intro controls, and server-rendered route landmarks.
- `public/_redirects` — SPA fallback for supported static hosts.
- `docs/PRODUCT_BLUEPRINT.md` — full product and application specification, roadmap, and launch gates.

## Content integrity

The app intentionally does not invent dates, client logos, certifications, client results, deployment claims, testimonials, or proficiency percentages. Project names and the technology list came from the supplied brief and still need Ellis’s confirmation. Keep prototype, experiment, built, and deployed work clearly distinguished. Replace draft copy with verified details before launch.
