# Sura

An independent web studio website for a two-person team. React, TypeScript, Vite, plain CSS, local typography, and original concept imagery. Node 24 and npm. Cloudflare Pages is the selected frontend host; the independent API has a Cloudflare Workers adapter.

## Run locally

    npm ci
    npm run dev

Open http://127.0.0.1:5173. Validate with npm run check, then npm run test:e2e. Install Chromium with npx playwright install chromium if needed. Browser tests use the production build and start their own preview server.

## What works

- Responsive dark/light studio website, services, process, story, and FAQ.
- Four original interactive concepts: shop search/filter/favorites/details, café menu, studio project/approach, and portfolio stories.
- Four-step project brief with service/concept context, pages/features, validation, copy, and UTF-8 text download.
- Public project desk at #/planner: checklist, statuses, search/filter, progress, remove/Undo, browser saving, and full-plan export.
- Explicit saved drafts restore from a validated browser schema and expire after 30 days. Clearing confirms first. Typing does not autosave.
- #/team preserves the public future-workspace information.
- #/updates records the rebuild, new features, changes, fixes, and current product limits. Maintain release entries in src/updates.ts.

Concepts are fictional. Contacts stay blank until the owners add them. No inquiry is sent, payment collected, or private access implied.

## Project context

Start with [AGENTS.md](AGENTS.md) and [shared memory](docs/PROJECT_MEMORY.md). See [design](docs/DESIGN.md), [product research](docs/PRODUCT_RESEARCH.md), [setup](docs/SETUP.md), [decisions](docs/DECISIONS.md), and [asset provenance and prompts](docs/ASSETS.md).

The independent [sura-backend](https://github.com/romswel/sura-backend) currently provides process health only. Cloudflare is selected, but the owner confirmed that public URLs have not been set yet and requested a GitHub push for now. A successful push or CI run does not verify a live Cloudflare deployment. See [release audit](docs/RELEASE_AUDIT.md) for the validation scope.
