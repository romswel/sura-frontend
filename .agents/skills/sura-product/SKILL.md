---
name: sura-product
description: Build and refine Sura's public web-team website and its staged path toward a private team workspace. Use for Sura product, design, content, and frontend/backend integration work.
---

# Build Sura

Read the repository `AGENTS.md` and `docs/PROJECT_MEMORY.md` first. The goal at this stage is to help a two-person team get its first client on a zero budget. Make the business offer understandable, let visitors picture their business online, and provide an honest next step.

## Choose the smallest useful stage

Improve the public site, original business concepts, accessibility, performance, or the project-brief journey when these meet the request. Accounts, CRM, persistent inquiries, team chat, client messaging, and payments are future stages until their real storage, authorization, and delivery paths exist. Cloudflare Pages/Workers are selected; consult `docs/DECISIONS.md` before choosing the still-undecided data/auth providers.

Treat public marketing, private team work, and client access as distinct access boundaries. In a future integration, prove who may read and modify each record on the server, including membership checks for chats and project files. Do not use browser state as an access control or as the permanent home for client data.

## Design and content

Read `docs/DESIGN.md` when changing visual work. Use charcoal/black, gray, off-white, restrained gradients, and soft shadows; preserve the original geometric S mark. Give each industry concept its own composition within the shared gallery. Business concepts may use muted colors internally, while Sura's identity stays monochrome.

Keep the voice clear, personal, and honest about the small team. Do not invent client work, success numbers, testimonials, guarantees, service integrations, prices, or contact details. The current owner instruction is to leave contacts blank for manual configuration later.

## Implement and close the loop

Trace the relevant content, component, and behavior before editing. Keep content in `src/content.ts`, public contact configuration in `.env.example`, and reusable visual components in `src/components`. Avoid new runtime dependencies when browser/CSS capabilities suffice.

Use `docs/SETUP.md` for commands. Validate changed behavior at desktop and mobile sizes and report evidence precisely. Preserve the two Git repositories. Update `docs/PROJECT_MEMORY.md` with current state, remaining gaps, and verification; append a decision only when it changes future work. Never imply that reading these files recovers conversations from another assistant.
