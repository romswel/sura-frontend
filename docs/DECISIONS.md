# Sura decisions

## 2026-11-17 — Start with the first client

The public website and a credible way to begin a conversation come first. The all-in-one vision is preserved as staged work: inquiries → team access/CRM → projects/tasks → client access/conversations. Do not build an entire operations suite before learning from real clients.

## 2026-11-17 — Preserve two repositories

The workspace already has separate frontend and backend Git histories and GitHub origins. Keep them. Shared product context lives in the frontend repository; each repository includes sufficient instructions to be worked on independently. No parent Git repository or monorepo migration is needed.

## 2026-11-17 — Free local foundation; providers pending

Use React/TypeScript/Vite for the website and a minimal Node/TypeScript API foundation, with Node 24 and npm lockfiles. Avoid a database/auth dependency until the owners finish provider selection. The API handler is transport-independent so a later Node host or serverless adapter can reuse it. An adapter may be needed for a future Worker host; the current Node server cannot be uploaded unchanged to Workers.

## 2026-11-17 — Blank contact details and honest handoff

The owner explicitly said to add no contact details yet. A browser-only project brief is useful without a delivery provider and does not pretend to send anything. Optional public email configuration can enable a mailto handoff later. A durable inquiry API will require validation, abuse controls, storage, an actual delivery/read path, and privacy text before collecting real inquiries.

## 2026-11-17 — Original monochrome identity

Use an original geometric S mark, lowercase Sura wordmark, charcoal/off-white surfaces, restrained shadows and gradients, large clean headings, and occasional italic serif emphasis. Industry concepts may use subdued colors to demonstrate range. All concept brands are fictional, labeled, and unconnected to commerce or booking services.

## 2026-11-17 — Portable project context

`AGENTS.md` and `docs/PROJECT_MEMORY.md` carry maintained context. `CLAUDE.md` and `.github/copilot-instructions.md` are short entry points. `.agents/skills/sura-product/SKILL.md` gives reusable, Sura-specific workflow guidance. These files require the assistant to read them; they cannot share hidden memories or chat histories between services.

## 2026-11-17 — Cloudflare selected by the owners

The owners selected Cloudflare Pages for the website and Workers for the API, superseding the initial hosting-provider research status. They now report that setup is complete. No public URLs or production responses were independently verified during design research. Database/auth remain undecided; hosting selection does not implement inquiry storage, delivery, or private access.

## 2026-11-17 — Research before replacing the initial visual execution

The owner rejected the initial theme/design as feeling AI-made and requested notes from their other projects, with the most attention on Stayblz. Record the current reference evidence in `docs/DESIGN_RESEARCH.md` and apply it through `docs/DESIGN.md`. The initial tagline, oversized type, repeated serif emphasis, decorative browser composition, and repetitive cards are open for revision. The charcoal/gray/white identity and original S mark remain the baseline; no new palette or logo was selected in this research pass.

Study systems, hierarchy, task-focused layouts, and interaction quality while preserving Sura's independent identity. The reference products are not Sura client deliveries. Keep the public first-client goal separate from future private team software. This pass records research and guidance; application redesign and release remain future work.

## 2026-11-17 — Reference research includes functionality and features

The owner clarified that the study of Stayblz, Ugnexa, and Suprah must cover functionality and features, not just theme/design. Keep `docs/PRODUCT_RESEARCH.md` alongside the visual research. Study complete workflows, permissions, persistence, notifications, failed-action recovery, and mobile interactions. Apply the lessons to both public examples/inquiry handoff and the longer-term team/client workspace.

The feature map and sequence are recommendations for Sura's needs, not authorization to copy entire products, select new providers, or present future functionality as implemented. Continue in useful complete stages, preserving the first-client goal and independent identity.

## 2026-11-17 — Rebuild the public studio and useful planning tools

The owner authorized the rebuild and delegated creative/implementation decisions. Replace the initial execution with a coordinated monochrome studio identity, both themes, local Manrope, and original generated concept photography. Preserve the S mark, independent repositories, selected Cloudflare setup, zero-budget approach, and blank contacts.

Build substantive public interactions: distinct shop/café/studio/portfolio demos; service/concept-to-brief context; a four-step brief; and a public personal desk with checklist operations and export. Private CRM/client/team work remains staged until storage/authentication exist. This rebuild introduces no new provider, paid service, real submission, account, or deployment.

## 2026-11-17 — Explicit local drafts, recovery, and export

Extend the earlier memory-only brief with optional explicit browser saving. The default stays in memory; typing does not autosave. The versioned localStorage entry holds a bounded brief/checklist schema with a 30-day read lifetime. Restoration is explained, malformed/expired entries fall back safely, and later edits need another save.

The personal desk is not account-scoped or collaborative. Copy/UTF-8 download retain failure fallbacks. Step removal offers Undo; clearing confirms before deleting the saved record. No state claims a server save, sent inquiry, payment, or private access.

## 2026-11-17 — Audit, public Updates, and direct-main release

The owner explicitly requested a full audit, fixes, release notes in Updates, and a push on the existing branches without creating a branch. Add a public source-managed release history at #/updates, with versioned entries in src/updates.ts. Describe working features and remaining boundaries together; do not imply planned server integrations exist.

The owner subsequently clarified that public Cloudflare URLs have not been set and requested continuing with a GitHub push for now. Validate both repositories and local Node/Worker behavior; verify remote commit identity and GitHub checks after pushing. Public Cloudflare deployment remains unverified until URLs are configured and available. Do not provision a replacement host.
