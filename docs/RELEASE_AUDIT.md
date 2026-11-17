# Rebuild release audit — 2026-11-17

Scope: both existing Sura repositories on main. Reference projects are read-only inspiration and were not modified. Release requested by the owners, including fixes, a public Updates history, and a push without creating a branch.

## Reviewed and corrected

- Public studio rebuild, all four concept demos, shared draft/checklist model, exports, explicit storage, themes, original assets, navigation, responsive CSS, configuration, tests, and maintained instructions/documentation.
- Skip and top links preserve public routes. Shop Saved resets stale filters and reports filtered empty results accurately.
- Checklist tabs preserve pending text and Undo. Clearing also resets temporary filters/input/Undo. Removed steps cannot be restored after a project reset.
- Detail/back navigation, repeat concept selection, and checklist transitions retain useful keyboard focus.
- Save/restore limits match, including JSON control-character expansion. Draft restoration rejects impossible options, duplicate selections, and empty task records; extra properties are not restored.
- Invalid API requests now receive the same no-store, nosniff, and referrer headers as normal responses. Shared HTTP transport tests cover real sockets, query routing, HEAD, 405, 404, and malformed URL handling.
- Public release notes at #/updates cover additions, design changes, fixes, and remaining unconnected features. Contact details remain blank.

## Validation

- Frontend: ESLint, strict TypeScript, production build, desktop/mobile Playwright, responsive layout matrix at 320/768/1024/2560 in both themes, and production CSP exercise.
- Backend: Node and Worker type checks, four passing API tests, Node build, formatting, Wrangler bundle dry run, and local Worker HTTP probes (health/query 200, HEAD empty 200, health POST 405, inquiry POST 404).
- Dependency audits: zero reported vulnerabilities in both repositories, including development dependencies, on the audit date.
- Source release excludes local environment values, credentials, generated builds, browser artifacts, local Worker state, and node_modules. Existing histories and origins are preserved.

- Final full Playwright suite: 45 passed, 1 skipped in 22.6 seconds. The skipped mobile duplicate of the viewport matrix is covered by the desktop project.
- Fresh 390px and 1440px home/Updates screenshots were inspected in both themes. Updates text, release groups, navigation, footer, and project-desk link remain readable and contained. Earlier rebuild screenshots cover the concept dialog, brief, and desk in both themes.

Git/GitHub remain the evidence for current commit and remote validation status.

## Release boundary

The owner requested pushing while URLs were not set. Both existing main branches were pushed without force or a new branch. Rebuild source commit: 538a03eb8737e890e99e689c078c0c45c50eda80. Backend runtime/test commit: f42c3937e925fb3eeaba9ab30ed72d5b39c67b4e. Remote hashes matched.

Cloudflare then reported successful Pages and Workers builds. Its Pages result supplied the assigned preview URL, allowing direct public verification:

- Production: https://sura-frontend-3wf.pages.dev.
- Commit preview: https://d6e707b9.sura-frontend-3wf.pages.dev.
- Both returned 200, expected CSP/nosniff headers, the release script path, and JavaScript whose SHA-256 matched the local production bundle.
- Fresh browser checks at 390px and 1440px exercised home → Updates → project desk → add/complete a local checklist step, with no page errors or horizontal overflow. Only browser-local state was changed.
- Backend GitHub Actions run 44029292651 completed successfully. The Cloudflare Workers build for f42c393 also succeeded. No public API endpoint was available to probe.
- Frontend GitHub Actions had no observed run for 538a03e, despite its workflow being active. Local build and 45 browser tests passed, and the Cloudflare Pages deployment succeeded; remote browser CI is not claimed.

Physical-device behavior, email delivery, accounts, payments, a database, and private workflows remain outside this release's verified functionality. Local Wrangler and build success do not prove public API health.
