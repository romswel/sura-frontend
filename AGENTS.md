# Working on Sura

Sura is a new web team of two friends starting from zero. The immediate goal is to earn the first client through a credible, useful public website. The longer-term goal is one place for client relationships, projects, tasks, team conversations, and client access. Build that in stages.

## Start here

- Read `docs/PROJECT_MEMORY.md` for current facts and open questions.
- Read `docs/DECISIONS.md` before changing architecture, scope, or providers.
- Read `.agents/skills/sura-product/SKILL.md` for Sura-specific product and implementation guidance.
- Use `docs/DESIGN.md` for visual work and `docs/SETUP.md` for commands/infrastructure.
- Read `docs/DESIGN_RESEARCH.md` before redesigning. It records the owner's feedback and lessons from the reference projects, with Stayblz given the most weight.
- Read `docs/PRODUCT_RESEARCH.md` for feature and workflow work. The reference study covers functionality, recovery, access, and client/team journeys as well as appearance.

## Boundaries that matter

- This is the frontend repository. The API is in the independent `../sura-backend` repository. Preserve both histories and unrelated changes. There is no parent Git repository.
- Default to free, open-source tools. The owners selected Cloudflare Pages for the frontend and Workers for the API and report that setup is complete. Database/auth remain undecided. Do not provision accounts, buy services/domains, or introduce a paid dependency without an explicit request.
- The user explicitly asked to leave public contact details blank for them to fill in later. Never derive contact details from Git identity or invent an address, phone, location, customer, testimonial, metric, or certification.
- Keep examples labeled as concepts. Do not imply that previews are delivered client projects, that a brief was sent, or that planned CRM/chat/auth already works.
- Public and private surfaces must stay separate. Never treat a hidden URL, frontend flag, or localStorage value as authentication. Future private operations need server authorization and account-scoped storage.
- `VITE_*` configuration is public. Credentials, customer records, real conversation content, and private tokens must not enter source, fixtures, logs, or this memory.
- Prefer small, complete improvements to the current stage. Avoid scaffolding speculative modules or silently replacing the owners' stack.

## Verification and handoff

- Node 24, npm, committed lockfile. Run `npm run check` for app changes; run `npm run test:e2e` for changed user journeys and responsive/navigation behavior.
- CI uses the same checks. A passing build does not verify a live provider, email delivery, authentication, or deployment.
- For material UI work, inspect desktop and narrow mobile behavior; support keyboard focus, dialog dismissal, reduced motion, and readable contrast.
- Inspect Git status before editing/staging. Stage reviewed files only. Never add `Co-authored-by:` trailers. Treat pushing and deployment as separate actions and report what actually happened.
- The owners requested persistent project memory: update `docs/PROJECT_MEMORY.md` after meaningful work and append material decisions to `docs/DECISIONS.md`. Keep current facts concise; replace stale status rather than accumulating contradictions. Cite evidence with filenames or commands. Do not claim automatic access to other AI conversations.
