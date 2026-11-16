# Sura shared project memory

Last updated: 2026-11-17 (Asia/Manila).

This file is the current project state for human and AI collaborators. It is checked into Git. Assistants must read it; it is not automatic synchronization between AI products. The owners explicitly requested shared memory and reusable instructions. Keep durable facts and useful decisions here, not complete chat transcripts or secrets.

## Confirmed owner intent

- Two friends are starting a company/team from zero, with free tools and no starting budget.
- First priority: attract and win the first website client. Help visitors imagine their own business online through multiple original business categories.
- Longer-term: an all-in-one team and client workspace, including CRM, contact/inquiries, accounts, projects, tasks, and conversations. These should grow in stages, not be presented as already working.
- Sura is the current working brand, based on the existing repository names. Final legal/company identity has not been confirmed.
- Brand direction: dark/black, gray, white, subtle gradients and shadows. The owners delegated the initial logo and detailed theme.
- Contact details must remain blank: the owners will add their own later. Do not infer public contact information from Git author metadata.
- The owners are separately researching third-party database, backend, and related providers. No provider is selected yet.

## Workspace and Git

- Parent: `C:\Users\Romswel\sura`; two independent repositories, each on `main`.
- Frontend origin: `https://github.com/romswel/sura-frontend.git`.
- Backend origin: `https://github.com/romswel/sura-backend.git`.
- No parent Git repository. `sura.code-workspace` and the parent `AGENTS.md` are local conveniences; repository instructions travel with each repository.
- Preserve existing remote URLs/history. Never add Co-authored-by trailers.

## Implementation

- Frontend: React + TypeScript + Vite, Node 24, npm. Plain CSS, system fonts, code-drawn illustrations, original SVG S mark. No paid assets, analytics, external font requests, or third-party runtime services.
- Public page: offer/services, filterable original concept gallery, native dialog concept details, process, two-person team story, FAQ, and project-brief preparation.
- Four fictional concepts: Morrow (food & drink), Forma (services), Offday (shops), Alex Morgan (personal brands). They are design explorations, not client deliveries or operational storefronts.
- Brief data remains in React memory. Users can copy or download a text brief. No inquiry submission API or database write exists. Reloading clears the in-page brief. Downloads/clipboard are user-controlled copies.
- `VITE_CONTACT_EMAIL` is blank. A valid public email enables an explicit mail-app handoff after rebuild; it does not create automatic delivery. No public phone, address, or social account is set.
- `#/team` is a public planning page. It has no authentication, private records, login form, or demo accounts.
- Backend: minimal transport-independent TypeScript handler plus Node HTTP adapter. `GET`/`HEAD /api/health` only. Health reports database/auth/inquiries as not configured. No production host, CORS integration, persistent records, email, auth, or chat service is connected.
- GitHub CI files validate each repository; there is no automatic deployment workflow.

## Next useful work

1. Owners review brand/copy and supply real contact information. Enable a usable contact channel before advertising the site publicly.
2. Owners choose a free hosting/provider plan after reviewing `docs/SETUP.md`. Connect a public free subdomain and confirm contact delivery on that host.
3. Add durable inquiry storage and abuse protection, then an authenticated team inquiry view. Establish authorization, privacy/retention, and backups with the selected provider.
4. Add project/task records, then scoped client access and persistent messaging when actual workflows call for them.

## Verification

Initial setup evidence:

- Frontend `npm run check`: ESLint, strict TypeScript, and Vite production build passed.
- `npm run test:e2e`: 10 Chromium checks passed across desktop and emulated mobile, including 320px layout, navigation, concept filters/dialogs, focus restoration, clipboard copy, downloads, Unicode/literal text preservation, and no inquiry network submission.
- Desktop and mobile full-page screenshots were visually inspected. Local artifacts: `.artifacts/desktop-home.png` and `.artifacts/mobile-home.png` (ignored by Git).
- Backend `npm run check`: strict types, three behavioral tests, and compilation passed. Real local HTTP smoke check: health 200 with no-store; unsupported inquiry POST 404.
- Dependency audits reported zero known vulnerabilities at setup time.
- The Sura skill passed the bundled skill-creator validator. GitHub workflows are prepared but have not run remotely. Repository origins and existing remote main hashes were checked.
- Work remains local; no remote push, public deployment, paid account, or provider provisioning occurred.

Do not equate local checks with deployed service verification. Database, email delivery, authenticated access, real client messaging, and production hosting remain unverified because they are not connected. Mobile checks are browser emulation, not a physical-device test.

## How to maintain memory

After meaningful work, update current facts and open items here, add material architectural/product choices to `DECISIONS.md`, and record the commands and actual results. Keep one canonical fact rather than duplicate histories. If another assistant cannot load repository files automatically, tell it: “Read AGENTS.md and docs/PROJECT_MEMORY.md before working.” Never put credentials, real customer records, or unrelated projects' details in memory.
