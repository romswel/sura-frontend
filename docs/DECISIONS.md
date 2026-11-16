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
