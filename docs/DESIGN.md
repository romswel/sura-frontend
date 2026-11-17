# Sura design and interaction system

Current implementation: 2026-11-17. The owner delegated the rebuild after rejecting the initial generic execution. Research supplies context; this document describes the resulting system.

## Identity

Sura is an independent two-person web team building websites, online shops, and useful web apps. The opening line is “Your business. Built for the web.” Explain the offer, show useful work, and help a visitor make a plan.

Preserve the original geometric S mark in public/sura-mark.svg and src/components/Brand.tsx. Keep Sura independent of its references. Do not imply registered trademarks, a large agency, clients, metrics, or results that have not been supplied.

## Materials, typography, and themes

- Dark defaults: canvas #151617, surface #1c1e1f, raised #232526, text #f1f1ec, secondary #a4aaa9. Light uses #f7f7f3, white surfaces, dark ink, and readable gray text.
- Semantic colors live in src/styles.css. Keep controls, focus, fields, borders, dialogs, and messages consistent across both themes.
- Manrope variable is served locally with its license and system-sans fallback. No external font request. Asset provenance is in docs/ASSETS.md.
- Headings respond to width. Keep instructions and meaningful copy readable; microtype carries only secondary context.
- Use aligned edges, restrained radii, borders, and subtle depth. Native dialogs use a quiet blurred backdrop. Reduced motion disables transitions/entrances.
- Concept palettes and typography remain scoped to their business surface.

## Page composition

The home progresses through offer → interactive examples → services → process → people → FAQ → brief.

- The hero workbench switches three concepts and opens the actual demo. No fake browser chrome or activity feed.
- The gallery has original compositions and category filters. Distinct concepts solve different visitor tasks.
- Services expand into scope details and prefill the planner.
- Process navigation reveals the relevant work/deliverables, without fabricated client activity.
- The two-person story explains direct collaboration without invented names, portraits, or client history.
- Contacts remain blank until the owners supply them. Prepared briefs are not submitted.

## Concepts and asset honesty

All four businesses, stories, and products are fictional concepts. The generated photographs are illustrative, not client deliveries.

- Offday Objects: browse/search/filter, save favorites within the open preview, inspect a product.
- Morrow Coffee: explore a categorized sample menu.
- Forma Studio: open the project story or approach.
- Alex Morgan: browse concept work and its stories.

Keep disclaimers clear. Do not imply checkout, booking, products for sale, actual locations, or opening hours. “Use this direction” transfers relevant context into Sura's brief.

## Project planning

The brief and public project desk are functional browser tools, not authenticated team software.

Preserve typed context across service/concept choices and in-app navigation. Saving is explicit. Show restoration, unsaved state, errors, and clear/export choices honestly. Validate stored data and retention. Do not silently turn local drafts into server records.

Checklist steps have clear statuses, mobile-friendly controls, progress, search/filter, and remove/Undo. Clearing the whole project confirms first. Preserve clipboard/download fallbacks and literal-text fidelity.

Team sign-in, shared files, CRM, submission, payments, and client access require actual backend dependencies before being presented as available.

## Interaction and accessibility

- Use native links, buttons, labels, validation, details, and dialog behavior. Each label describes a real action.
- Keyboard access, visible focus, skip-link focus, Escape, and dialog focus restoration are part of the system.
- Mobile navigation must work. Keep phone inputs at 16px, contain dialogs, wrap long text, and prevent page overflow.
- Support both themes and reduced motion. Do not depend only on hover, color, dragging, or animation.
- Keep saving, sending, delivery, publication, and local preparation distinct.

## Verification

Run npm run check and relevant Playwright journeys for app changes. Material UI work requires desktop/narrow-mobile inspection, including 320px, in both themes.

The rebuild has local lint/type/build, browser behavior checks, and inspected screenshots. Real accounts/devices, delivery, and deployed Cloudflare behavior need separate evidence.
