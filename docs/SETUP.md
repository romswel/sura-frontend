# Start and grow Sura

## Run locally

Install Node.js 24 LTS and use npm. In `sura-frontend`:

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. To validate and preview the production output:

```powershell
npm run check
npx playwright install chromium
npm run test:e2e
npm run preview
```

Preview serves `dist` on `http://127.0.0.1:4173`. Stop a local server with Ctrl+C. Browser checks use the production build and start/stop their own server. Local checks need no paid account.

For the optional API, in the sibling `sura-backend` repository:

```powershell
npm ci
npm run check
npm run dev
```

Health: `http://127.0.0.1:4000/api/health`. The website currently runs independently; no API URL or provider credentials are needed.

## Add contact details yourself

Copy `.env.example` to `.env.local` and set `VITE_CONTACT_EMAIL` to your real public business email. Restart the dev server or rebuild/redeploy after changes. The email enables a mail-app handoff from a prepared brief. The visitor still has to send the email in their own app. The page does not report successful delivery.

Until an address is configured, the site explains that the contact channel is being prepared. Do not advertise the site as an operational contact channel yet. Add your actual phone/social links and privacy notice only when you choose those channels.

All `VITE_*` values are public build output. Never place a database password, privileged Supabase key, email-provider secret, or authentication secret in frontend environment variables. Environment files are ignored; `.env.example` documents only blank/public configuration.

## Personal project desk and drafts

The public #/planner route shares the brief builder and adds a launch checklist. Changes live in the open app by default. Explicit Save buttons write sura.project-draft.v1 to this browser's localStorage; later edits do not autosave. Saved drafts are validated on load and accepted for 30 days. Clear project removes them after confirmation.

This is a personal browser tool, not an account or team database. Copy/download work without storage. If saving is unavailable, the UI explains that and retains the in-memory plan. The separate sura.theme key stores appearance only.

## Git workflow

The repositories are already initialized and connected:

| Repository | Origin                                         | Branch |
| ---------- | ---------------------------------------------- | ------ |
| Frontend   | `https://github.com/romswel/sura-frontend.git` | `main` |
| Backend    | `https://github.com/romswel/sura-backend.git`  | `main` |

Open `../sura.code-workspace` in VS Code to see both folders locally. When cloning on another machine, clone both repositories as siblings. If the workspace file is absent, use File → Add Folder to Workspace. No parent `git init` is needed.

Before changing code, run `git status` and fetch the remote. Follow the owners' agreed branch workflow; for the November 17 rebuild release they explicitly requested the existing `main` branches with no new branch. Run that repository's checks, inspect `git diff`, stage only intended files, and use a plain descriptive commit message. Never commit `.env`, `node_modules`, generated output, credentials, or customer data. A push uploads code; it does not prove a production deployment succeeded.

GitHub Actions workflows validate pushes and pull requests. They do not provision services or publish this site. Branch protection, collaborators, GitHub organization ownership, and repository visibility are account settings and have not been changed by this local setup. Review the included pull-request template for each change.

## Earlier zero-budget research — hosting now selected

Current release status: the owner requested a GitHub push while URLs were not set. Cloudflare then supplied https://sura-frontend-3wf.pages.dev; the rebuilt frontend and deployed asset identity were verified there. Keep Pages build command `npm run build`, output `dist`, and Node 24. The Worker entry and local verification are maintained in the backend repository. Its build passed, but its public endpoint still needs verification.

Checked against official documentation on 2026-11-17. Free tiers have limits and can change; verify current terms and suitability before creating accounts. Cloudflare Pages and Workers have since been selected and the owner reports setup is complete. The table below is historical setup research; data/auth choices remain open.

| Need                      | Starting option                                                    | What to decide                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public website            | Cloudflare Pages free plan with its assigned `pages.dev` subdomain | Connect the frontend GitHub repository, build `npm run build`, output `dist`, Node 24. Set the real contact email as a public build variable when ready.                 |
| Database + accounts later | Supabase Free (Postgres/Auth)                                      | Confirm data region, access policies, backup/export process, and email delivery. Free projects can pause after low activity; automatic backups are not included on Free. |
| Backend later             | A selected Node host, or Cloudflare Workers with an adapter        | The present API is a Node server. Workers needs a fetch adapter and deployment configuration; no compatibility is claimed yet. Free Workers has request/CPU limits.      |
| Shared planning now       | Repository issues and pull requests                                | Enough for two people before an internal task system is worth building. Avoid duplicating client/private records in public issues.                                       |
| Business contact now      | An existing email inbox you choose                                 | Start with a mail link; add server-backed forms and notifications only when a reliable receipt/read path exists.                                                         |

Official references: [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Pages GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), [Vite static deployment](https://vite.dev/guide/static-deploy.html), [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Supabase pricing](https://supabase.com/pricing), [Supabase project pausing](https://supabase.com/docs/guides/platform/free-project-pausing).

A custom domain is optional and generally costs money. Use the host's free subdomain first. This setup has not created accounts, purchased anything, connected providers, or deployed the site.

## Build in a useful order

1. Review the website, replace the working name if needed, and add real contact details.
2. Publish to the selected Cloudflare setup and test the actual contact journey from a phone and desktop.
3. Use the site in direct outreach. Learn what the first potential clients ask for before adding categories or packages.
4. Add a real inquiry API and private team inbox using the selected database/auth provider. Validate input on the server, protect against abuse, define access rules and retention, and test that one account cannot access another's records.
5. Add projects/tasks from a real delivery workflow. Then scoped client accounts, files, and conversations. Keep message history and client records in durable storage; authenticate every read/write and subscription.

## Shared AI context

Keep `AGENTS.md`, `docs/PROJECT_MEMORY.md`, and `docs/DECISIONS.md` in version control. Other assistants may discover `CLAUDE.md` or `.github/copilot-instructions.md`; if they do not, explicitly ask them to read the maintained files. The Sura skill is repo-local at `.agents/skills/sura-product/SKILL.md`. No system can guarantee that every AI product automatically reads these paths or remembers other products' conversations.
