# Sura design research

Historical pre-rebuild research snapshot. The subsequent implementation is described in PROJECT_MEMORY.md and the current DESIGN.md. Observations about the old page below describe the baseline that was replaced.

Reviewed 2026-11-17 (Asia/Manila). This is a research handoff for the next design pass; the website has not been redesigned in this pass.

The owner subsequently clarified that the study also covers functionality and features. `PRODUCT_RESEARCH.md` expands the research into frontend/backend workflows, permissions, recovery, and recommendations for Sura. Use both documents for future product work.

## The owner's brief

The owner rejected Sura's current design/theme as feeling AI-made and requested a study of their other projects. Prioritize Stayblz, including its Claude skills and memory. Ugnexa is the inspiration for starting this team; Suprah is the owner's first project, where they worked heavily on design with other developers.

Sura still needs to win its first client on a zero budget. Take lessons in craft, structure, and usability while developing Sura's own identity. Work on another company's product does not make that product a Sura client or authorize publishing its screenshots, branding, private records, or claims of ownership.

## Evidence and limits

All three projects were read as references. No reference source files were edited. Ugnexa already has substantial uncommitted work; preserve it.

| Reference        | Material inspected                                                                                                                                                                                                                     | Coverage                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Stayblz, primary | Root `CLAUDE.md`; `.claude/skills/stayblz-product-design/SKILL.md`; `.claude/skills/sb/SKILL.md`; Claude's glass-theme and UX memories; frontend `Layout.tsx`, `layout-glass.css`, messenger styles, `theme.ts`, shared UI/dialog code | Source plus fresh local v0.15 chat renders at 1440px and 390px, light and dark, using the project's existing in-memory API test fixture |
| Ugnexa Catalyst  | Frontend `AGENTS.md`, `src/app/globals.css`, root layout, `Sidebar.tsx`, `PageHeader.tsx`, `AuthFrame.tsx`, login page                                                                                                                 | Source review of the team application; no authenticated runtime inspection or review of a public Ugnexa marketing site                  |
| Suprah           | Frontend `src/app/globals.css`, root layout, `app-sidebar.tsx`, `AuthSplitLayout.tsx`, auth theme, `AppMain.tsx`                                                                                                                       | Source review; no authenticated runtime inspection                                                                                      |
| Sura             | `src/App.tsx`, content, main/concept CSS, current design docs                                                                                                                                                                          | Fresh local desktop/mobile screenshots, computed layout measurements, mobile menu opening                                               |

Roots are `C:\Users\Romswel\stayblz`, `C:\Users\Romswel\ugnexa`, and `C:\Users\Romswel\suprah`. Stayblz's design memories are in `C:\Users\Romswel\.claude\projects\c--Users-Romswel-stayblz\memory\stayblz-glass-theme.md` and `stayblz-ux-rules.md`. These locations are research pointers; Sura's rules remain self-contained in this repository.

Screenshots and test identities are local research evidence, not portfolio assets or proof of real accounts, message delivery, or production behavior. Fresh captures are under `.artifacts/design-research-20261117/` in this repository, ignored by Git. Older Stayblz theme-review screenshots were also inspected, but the fresh captures and current source take precedence.

## Stayblz: the strongest reference

### Use the current direction

The current Claude skill and glass-theme memory explicitly retire the old cream/green/gold theme on 2026-11-17. The older Codex-installed Stayblz skill still describes that previous palette. Some legacy public-page CSS and older tests also reference it. Do not use those leftovers as the desired direction.

The current application uses `--gx-*` tokens in `src/components/layout-glass.css`:

- Light: cool slate background, translucent white surfaces, dark ink, emerald/blue/violet accents.
- Dark: deep forest background, dark translucent surfaces, light text, mint/teal accents.
- Shared material: thin borders, inset highlights, controlled shadows, approximately 20px panel radii, 14px shell gaps, and consistent sans typography using Archivo.
- A recognizable ink horse crest, coordinated navigation, and shared controls carry the identity across pages.

The useful lesson is how these decisions work together. Glass and gradients are legitimate tools here; removing every effect would miss the reference. For Sura, adapt the same discipline to its charcoal/gray/white identity. Do not import the horse crest, green palette, fonts, or CSS as a ready-made Sura theme.

### Design the whole interaction

The local renders show compact desktop navigation and separate chat panels. On a phone, the active conversation becomes the primary surface with Back and composer controls in reach. It does not shrink the entire desktop arrangement into a miniature.

The shared guidance also makes these qualities repeatable:

- Controls share sizing and feedback; dialogs share headings, actions, and phone behavior.
- Secondary management tools stay inside their feature instead of growing the main navigation.
- Back navigation, visible focus, contained dialogs, and readable empty/error states are part of the design.
- Motion is short and respects reduced motion. Ambient effects remain behind the content.
- Draft retention is an explicit product behavior with scope and clearing rules. Sura's brief currently remains in memory; do not change its storage silently.
- Glass has implementation consequences: fixed overlays can be trapped by a backdrop-filter ancestor. Keep Sura's native dialog behavior when changing surfaces.

### Borrow the maintenance practice

Stayblz's `/sb` routine separates investigation, implementation, verification, release, and memory upkeep. Its current skill records concrete decisions and superseded styles. Sura should likewise keep one current design guide, distinguish recommendations from implemented behavior, inspect real browser results, and update stale decisions. Reading files gives access to those files, not to another assistant's hidden conversations.

## Ugnexa: a team with a practical identity

The local project is Catalyst, a team application. It uses cool neutral surfaces, cyan/blue primary accents, distinct navigation tones, clean sans typography, small radii, and shared page headers. Navigation groups work into Workspace, Operations, and Administration. Auth copy explains who can enter and how to get access.

For Sura, take the sense of an actual working team: concrete services, a clear process, direct language, and an understandable next action. The owner describing Ugnexa as a larger team is business context; it is not evidence that Sura has the same size, clients, permissions, or tools. A public first-client website needs a different information hierarchy from Catalyst's private console.

## Suprah: layouts shaped around the task

Suprah uses shared surface, text, border, status, and accent tokens in both themes. The inspected auth layout gives imagery and form different roles: a desktop split becomes a shorter visual area and a usable form surface on phones. Inputs, buttons, focus states, safe areas, and theme-aware autofill receive explicit treatment.

For Sura, take purposeful composition and attention to the states around the main action. Define what each section must communicate before choosing its visual treatment. Adapt layouts for the task at each width. Do not copy Suprah's dealership identity, external decorative assets, zoom restrictions, or large component architecture into Sura.

## Why the current Sura design misses

This is an assessment of the inspected page, not a claim that a font or effect is inherently AI-made.

| Observed issue                                 | Evidence in Sura                                                                                                  | Direction for the redesign                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| The slogan dominates the offer                 | 108px desktop H1; 72px at 390px; vague opening copy                                                               | State what the team builds and for whom; scale the heading around that message                       |
| Decorative layers compete for attention        | Tilted browser, floating note, asterisks, micro-captions, repeated arrows                                         | Give the opening one useful focal point and a clear action                                           |
| The page takes too long to establish substance | Hero is about 767px tall at 1440px and 1089px at 390px; full page about 5757px / 8538px in the captured viewports | Bring relevant examples and service information forward; remove repeated reassurance                 |
| Essential information is visually secondary    | Hero paragraph is 14px desktop / 13px mobile; desktop navigation 11px; many smaller labels                        | Increase readable supporting text and contrast rather than making everything dense through tiny type |
| The services feel interchangeable              | Three identical icon/title/paragraph/tag cards with broad titles                                                  | Name concrete deliverables and use a structure that helps compare them                               |
| The concepts share one skeleton                | `ConceptSite.tsx` and `concepts.css` reuse navigation, split hero, artwork, and footer across four categories     | Give concepts distinct information structures and customer tasks, beyond changing colors and objects |
| The tone keeps repeating the same idea         | "Next chapter", "new beginnings", "little possibility", "big little ideas", "good things start small"             | Use specific, natural language about business needs, scope, collaboration, and handoff               |
| Theme decisions are scattered                  | Neutral root tokens coexist with hard-coded olive form/menu colors                                                | Consolidate semantic Sura tokens when implementing the redesign                                      |

The desktop and mobile captures had no page-level horizontal overflow. The mobile menu opened. The problem is design quality and hierarchy; this research does not establish that all existing interactions are broken.

## Recommended next design pass

1. Rework the header, opening message, one prominent concept preview, and service summary as a coherent first section. Establish readable typography, spacing, surfaces, and controls there before applying them across the page.
2. Lead with a concrete offer. A possible working line is "Websites for businesses ready to get online." This is a copy candidate, not an approved tagline.
3. Make the chosen concept preview large enough to inspect and clearly label it as a concept. Give its detail view useful example content and an honest path into the existing brief.
4. Give the remaining concepts different customer journeys and compositions. Keep the useful category/filter behavior and truthful labels.
5. Tighten the remaining process, team story, FAQ, and brief around questions a prospective client actually needs answered. Preserve contact blanks and the existing copy/download behavior.
6. Inspect desktop and narrow mobile in a browser, then run Sura's existing app and journey checks when code changes. Judge the result by whether a visitor can understand the offer, assess the work, and take the next step.

The immediate deliverable from this research is the revised guidance in `DESIGN.md`. Application code, dependencies, backend behavior, and deployment were unchanged in this research pass. The proposed design choices are guidance for implementation, not a claim that a replacement has already been built or approved.
