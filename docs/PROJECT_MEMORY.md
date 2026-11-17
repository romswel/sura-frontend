# Sura shared project memory

Last updated: 2026-11-17 (Asia/Manila).

Current facts for human and AI collaborators. Read this and AGENTS.md before working. These files do not automatically synchronize hidden conversations between assistants.

## Owner intent and boundaries

- Two friends are starting an independent web team with zero starting budget. Win and deliver the first client project before building a large operations platform.
- Sura is the working brand. The owner authorized the public rebuild and delegated creative/implementation decisions after requesting design AND feature research.
- Research informs craft, workflows, recovery, and access. Reference products are not Sura client deliveries or assets to copy.
- Main identity: charcoal/black, gray, white, restrained depth, original geometric S mark. Both light and dark themes now work.
- Contact details remain blank by explicit owner instruction. Do not derive them from Git identity or invent people, locations, clients, testimonials, metrics, or guarantees.
- Cloudflare Pages and Workers are selected. During the release audit the owner clarified that public URLs have not been set yet and requested pushing to GitHub for now. No live Cloudflare verification is claimed.
- Database/auth remain unselected. The private CRM/project/client/chat vision is staged future work. Browser state is never authentication.

## Workspace and Git

- Parent: C:\Users\Romswel\sura. It is not a Git repository.
- Independent frontend/backend repositories on their existing main branches.
- Frontend origin: https://github.com/romswel/sura-frontend.git.
- Backend origin: https://github.com/romswel/sura-backend.git.
- Preserve both histories and unrelated work. No Co-authored-by trailers.
- This rebuild changes frontend source, assets, tests, and documentation. The release audit also hardens backend error headers and tests its shared transport. Reference projects remain untouched.
- The owner explicitly authorized an audited push on the existing main branches, with no new branch. Verify current commit/push/CI status from Git and GitHub; source publication and a live deployment are separate outcomes.

## Current public product

React + TypeScript + Vite, Node 24, npm, plain CSS. No new runtime dependency or third-party runtime service.

- Rebuilt home: concrete websites/shops/web-app offer, interactive workbench, filtered gallery, expandable services, explorable process, two-person story, FAQ, four-step brief builder.
- Four fictional businesses have distinct compositions and interactions:
  - Offday Objects: product categories, search, favorites within the open preview, and product details.
  - Morrow Coffee: categorized sample menu and coffee shortcut.
  - Forma Studio: expandable project story and approach view.
  - Alex Morgan: selected-work list and concept stories.
- Concept/service selection prefills kind/features/reference while retaining existing business/idea text.
- Brief: project type → pages/features → name/business/idea/timeline/budget → review. Required details reject whitespace-only input. Literal text, internal line breaks, and Unicode are preserved.
- Clipboard copy and UTF-8 .txt download work. Copy failure leaves selectable text/download available. No inquiry is submitted.
- VITE_CONTACT_EMAIL stays blank. Configuring it later enables only an explicit mail-app handoff; the visitor sends the email there.
- #/planner is a public personal project desk sharing the brief. Its launch checklist supports adding steps, status, complete/reopen, search/filter, removal/Undo, progress, and full-plan export.
- #/team remains public planning information. No login form, demo credentials, private records, or fake successful authentication.
- Existing #showcase, #services, #approach, #about, and #start anchors remain usable.
- #/updates is the public release history, linked from navigation and footer. Add reviewed entries to src/updates.ts; no CMS or write endpoint is implied.

## Deliberate browser storage

- Changes stay in React memory by default and survive navigation within the open app. Unsaved changes are lost on reload.
- Save buttons explicitly opt into localStorage under sura.project-draft.v1. Typing never autosaves.
- Saved drafts use a bounded schema and a 30-day read lifetime. Expired entries are discarded on load; malformed/unsupported data falls back safely. Later edits need another explicit save.
- Save/clipboard failures are explained. A save is labeled as saved in this browser, never saved to Sura.
- Clear project confirms before removing the saved record and resetting the brief/checklist. Individual step removal offers Undo.
- Brief/checklist tab switches retain pending step text and Undo. Successful Clear also resets pending text, filters, and Undo so a removed task cannot reappear after clearing.
- Save/read share a 128,000-character JSON limit, covering bounded fields even when control characters expand during serialization. Unsupported options, duplicate selections, and blank task identifiers/titles fall back safely. Unknown properties do not enter application state.
- This browser storage is personal, unshared, and not account-scoped or a CRM. The interface asks visitors to leave out sensitive information.
- Theme preference is separate (sura.theme), defaults to dark, and is applied before paint by public/theme-init.js.

## Source and assets

- Manrope variable is bundled locally with its upstream OFL license. No external font requests.
- Three original generated concept photographs are local WebP files, about 194 KB combined. docs/ASSETS.md records files, exact prompts, provenance, and sizes.
- Original S mark remains in Brand.tsx and public/sura-mark.svg.
- Semantic themes: src/styles.css. Fictional business styles: src/concepts.css. Planner/desk: src/planner.css.
- Data/copy: src/content.ts. Draft schema, validation, exports: src/project.ts. Save state: src/hooks/useProject.ts. Rendering stays in focused components.
- public/_headers retains the strict same-origin policy. No inline styling or external image/font service is required.

## API reality

The independent backend remains the health handler, Node server, and Cloudflare Workers adapter using httpServerHandler/nodejs_compat. GET/HEAD /api/health only; database/auth/inquiries report not-configured. The website does not call an inquiry API. Release hardening makes invalid-request responses retain the normal cache/security headers. Node/Worker types, four API tests, build, formatting, dependency audit, Worker bundle dry run, and local Worker HTTP probes pass.

## Verification

- npm run check passed: ESLint, strict TypeScript, Vite production build.
- Full release Playwright suite: 45 passed, 1 skipped. Details are in docs/RELEASE_AUDIT.md. The skipped mobile duplicate of the viewport matrix is exercised by the desktop project.
- Browser coverage: concept interactions, prefilled briefs, required/whitespace validation, clipboard/download fidelity, explicit save/restore, no autosave/submission, storage/clipboard failure, malformed/expired drafts, checklist/Undo/export, clear confirmation, theme persistence, skip-link focus, mobile menu/Escape, legacy team links, and production Content Security Policy.
- Layout matrix: 320/768/1024/2560px in both themes. Desktop Chrome and Pixel 7 browser emulation cover core journeys.
- Fresh desktop/390px screenshots were inspected in both themes for home, shop dialog, planner, and desk. Local artifacts: .artifacts/rebuild (ignored).
- Windows clipboard CRLF normalization is accounted for; downloaded UTF-8 content remains exact.
- Audit regressions cover route-preserving skip/top links, favorites hidden by stale filters, pending checklist/Undo across tabs and Clear, repeated concept-prefill focus, detail/back focus, large saved drafts, and the Updates page. Layout coverage now includes Updates.
- Targeted Prettier checks and git diff --check passed. No generated build/test output is included in the changes.
- No physical-device, real-account, authenticated backend, email-delivery, or live Cloudflare verification is claimed.

## Next useful work

1. Owners review the rebuilt site and supply real public contact details.
2. Verify frontend/API on their actual Cloudflare URLs when publishing this rebuild.
3. Choose data/auth and complete one inquiry flow: validated submission → durable storage → protected team inbox → follow-up.
4. Connect an accepted inquiry to a project, tasks, files, client review, and handoff. Keep internal notes and client-visible material separate.
5. Add chat, notifications, calendars, and team tools when supporting records and permissions are real.

## Keep context current

Read docs/DESIGN.md for current rules, docs/DECISIONS.md for decisions, docs/SETUP.md for commands. DESIGN_RESEARCH.md and PRODUCT_RESEARCH.md retain pre-rebuild observations and the wider feature map; their old status columns are historical.

After meaningful work replace stale facts here, record actual verification, and append material decisions. Keep credentials, customer records, and unrelated project internals out of this memory.
