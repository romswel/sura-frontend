# Sura feature and workflow research

Historical pre-rebuild research snapshot. The status table records that starting point. PROJECT_MEMORY.md describes the implemented concepts, brief, and personal project desk; the wider private-workspace proposals remain future work.

Reviewed 2026-11-17 (Asia/Manila). The owner clarified that the reference study covers functionality and features as well as theme/design. Read this alongside `DESIGN_RESEARCH.md` and `DESIGN.md`.

This is a feature inventory and an implementation guide for future work. It does not add those features to Sura or select its database/auth providers. Proposed priorities below are recommendations, not a commitment to build every reference feature.

## Research coverage

Inspected current frontend routes/components and representative backend routes, services, authorization checks, and persistence code across all three references, with the most attention on Stayblz. Existing test sources were inspected where useful; their suites were not executed in this pass. No production accounts, private records, or credentials were accessed.

“Present in source” below means there is implementation evidence beyond a navigation label. It does not mean the complete feature has been audited, works in production, or has been tested with real users. The earlier local Stayblz fixture renders establish a narrower visual baseline, not live delivery or permission coverage. Ugnexa has pre-existing uncommitted work; some observed features may not be released.

## Stayblz: personal tools, shared work, and recoverable actions

### Features present in the inspected source

- Accounts have profile/security/preferences surfaces, email confirmation/recovery, and a two-step-login gate. Platform administration and optional stable membership are separate concepts.
- Personal follows, private notes, and personal messages do not require stable membership. Team messages, inventory, and tracking use the selected stable and its membership checks.
- Chat includes direct/group conversations, message requests, replies, reactions, edits, pins, forwarding, search, attachments, and voice/video support. Read/delivered state and typing/presence have distinct code paths.
- Unsent text uses an account-scoped outbox. A failed send remains retryable; retries reuse the client request ID. File previews remain in memory, so their recovery behavior differs from text. These differences matter to the user-facing states.
- Paddock has scheduling, guest admission, room joining, and a browser-call engine. Guest passes and team access are separate from a general signed-in session. Live room state is kept in server memory; relay configuration and real-network behavior need their own verification.
- Notification preferences, in-app alerts, device subscriptions, and a push test path exist. The API reports whether push configuration is available; having a bell does not establish closed-app delivery.
- Published racing records and admin publishing tools are distinct. Admins can maintain draft records before publishing, with audit events. Search/details and private notes are meaningful product functions, not decorative dashboard content.
- Updates has public/member content and management tools inside that feature. Marketplace listings and media have their own routes. Subscription and report-cart pages explicitly say payments/checkout are unavailable.

### Lessons to adapt to Sura

Keep account identity separate from project/team membership. A client should access only their assigned project material; joining Sura's internal team should not be required. Public visitors should be able to assess the offer and examples without an account.

Make recovery part of feature design: preserve typing where appropriate, show pending/failed/saved states, allow retry without duplicating a record, and retain useful content when refresh fails. A local draft is a convenience copy, not the authoritative client record. Sura's current brief remains memory-only until a deliberate storage change is implemented and explained.

Distinguish a personal action from a shared one: archiving a conversation for yourself, removing a teammate, deleting a shared file, and deleting a project have different consequences and permissions. A small team still needs these distinctions when clients are invited.

Do not inherit racing accounts, stable inventories, media subscriptions, or marketplace features as Sura requirements. Adapt their useful patterns: scoped collaboration, searchable records, deliberate publishing, clear limits, and recoverable work.

### Evidence pointers

Within `C:\Users\Romswel\stayblz`:

- Product rules: `CLAUDE.md`, `.claude/skills/stayblz-product-design/SKILL.md`, `.claude/skills/sb/SKILL.md`.
- Navigation and scope: `stayblz-frontend/src/App.tsx`, `src/components/ui/BackButton.tsx`; backend `src/routes/personalMessages.ts`, `memberMessages.ts`, `workspaces.ts`, `myRacing.ts`.
- Sending/recovery: frontend `src/components/messenger/useOutbox.ts`, `src/components/ui/useDraft.ts`; backend `src/routes/chat.ts`, `migrations/202611110001_messenger.sql`.
- Meetings/alerts: backend `src/routes/paddock.ts`, `src/lib/paddock.ts`, `paddockRooms.ts`, `src/routes/notifications.ts`.
- Publishing and honest availability: backend `src/routes/adminRacing.ts`, `admin.ts`; frontend `src/pages/Subscription.tsx`, `src/components/pps/CartReview.tsx`.
- Existing regression examples inspected: backend `tests/accounts.test.cjs`, `messenger.test.cjs`, `workspaces.test.cjs`.

## Ugnexa Catalyst: assigning and delivering work

### Features present in the inspected source

- Organizations, platform administration, provisioned accounts, roles, and project membership provide different access scopes. Developers can be assigned across organizations; organization oversight and platform oversight are checked separately.
- Projects have board/list/report/settings destinations and configurable stages. Tasks carry assignees, priority, dates, labels, subtasks, checklists, comments, attachments, time estimates, and tracked time.
- My Tasks brings assigned work together. Reports include workload, overdue work, and completion. The mobile board uses stage selection and an explicit move action, making task movement possible without desktop drag-and-drop.
- Project membership changes also update related communication access. Task assignment and project membership can create notifications.
- Catalyst Space includes direct/group messaging, replies, read state, attachments, search, pins, reactions, forwarding, scheduled sends, polls, and events/RSVPs. Search/navigation also includes a keyboard-accessible workspace search.
- Timeproof, attendance, leave requests, and daily progress are separate operational modules.

### Lessons to adapt to Sura

Use one real project as the container for the brief, agreed scope, tasks, discussion, and files. Give work an owner, a status, and a next action. Provide both “this project” and “my assigned work” views when the team needs them.

For a two-person team, begin with a simple task model. Add time tracking, workload reporting, configurable role builders, cross-organization provisioning, and workforce tools when an actual workflow justifies them. The useful reference is how work connects; copying every administration screen would create overhead.

Server access must follow membership consistently, including when someone is removed. An assigned developer's access to one client's project must not imply access to every project belonging to that client.

### Evidence pointers

Within `C:\Users\Romswel\ugnexa`:

- Frontend project/task modules: `uctg-frontend/src/app/(dashboard)/projects/`, `src/components/task/TaskDetailSheet.tsx`, `src/components/board/KanbanBoardMobile.tsx`, `src/components/reports/`, `src/components/layout/WorkspaceSearch.tsx`.
- Backend contract/persistence: `uctg-backend/src/routes/project.route.ts`, `task.route.ts`, `platform.route.ts`; `src/models/Project.model.ts`, `Task.model.ts`; `src/services/project.service.ts`, `task.service.ts`.
- Communication: backend `src/routes/channel.route.ts`, `message.route.ts`, `src/services/channel.service.ts`, `message.service.ts`; frontend chat modules.
- Operations: backend `src/routes/timeLog.route.ts`, `accomplishment.route.ts`, and frontend Timeproof/attendance/leaves destinations.

## Suprah: keeping customer context connected

### Features present in the inspected source

- Inquiry/lead routes support assignment, notes, contact updates, conversation history, appointments, and unread/pending states. Deals have create/update, offer, and list/detail paths.
- Customer records combine a profile, timeline, purchases, feedback, and support requests. This illustrates continuity after a sale, not just lead acquisition.
- Project management groups work into sections/folders/tasks, with assignments, status, dates, attachments, comments, mentions, notifications, My Tasks, and Completed Tasks. The inspected controller checks organization and group membership.
- SupraSpace exposes authenticated conversation, presence, search, and file paths. Meetings distinguish guest admission from signed-in meeting management, with waiting-room and participant controls.
- Calendar includes events, a personal schedule, calendar export, and summaries for upcoming/overdue work. Other modules cover the dealership's domain-specific operations.

### Lessons to adapt to Sura

Keep the inquiry, person/business, project scope, decisions, and later support connected. A prospective client's context should survive the move into delivery. A useful CRM record needs an owner and follow-up, not just a contact card.

Keep private team notes and client-visible updates explicitly separate. Let the right person open the relevant project/task/conversation from a notification. A calendar can help with deadlines and scheduled reviews without requiring Sura to build video calls immediately.

The research found building blocks for CRM, projects, and communication. It did not establish an automatic deal-to-project conversion or a ready-made client approval workflow; those are Sura proposals to design, not existing Suprah behavior to claim.

### Evidence pointers

Within `C:\Users\Romswel\suprah`:

- Customer work: `suprah-backend/src/routes/lead.route.ts`, `crmDeal.routes.ts`, `crmCustomerRecords.routes.ts`; frontend `src/app/(dashboard)/crm/deals/page.tsx` and customer-record components.
- Projects: backend `src/routes/projectManagement.route.ts`, `src/controllers/projectManagement.controller.ts`; frontend `src/app/(dashboard)/project/page.tsx` and `src/components/project/`.
- Communication/scheduling: backend `src/routes/supraspace.route.ts`, `suprahMeet.route.ts`, `calendar.routes.ts`; frontend `src/app/(dashboard)/crm/suprah-calendar/page.tsx` and shared sidebar destinations.

## Apply the research to both parts of Sura

The public website must demonstrate useful interactions and help a business take the next step. The future private workspace must support the work behind that promise. These are connected product goals with different access and data requirements.

| Feature or workflow         | Useful Sura adaptation                                                                                                                                              | Current Sura status                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Business examples           | Distinct, clearly labeled interactive concepts: browse a café menu, filter a product catalog, inspect a service/project, and carry the relevant choice into a brief | Four illustrative concepts, category filters, detail dialogs, and category-to-brief selection exist; the mini-sites are not functioning businesses |
| Inquiry handoff             | Explain what happens next, preserve the chosen context, and provide a real contact/delivery path                                                                    | Copy/download brief exists; contacts remain blank; no inquiry is submitted                                                                         |
| Inquiry inbox/CRM           | Retain a brief with business/contact context, owner, status, notes, and next follow-up                                                                              | Not implemented                                                                                                                                    |
| Projects and tasks          | Link agreed scope to a project; assign tasks and track due dates, checklists, comments, and completion                                                              | Public planning page only                                                                                                                          |
| Client workspace            | Invite a client to their project; show agreed milestones, review material, decisions, and handoff                                                                   | Not implemented; proposed Sura workflow                                                                                                            |
| Discussion                  | Start with project/task comments; consider persistent project/client chat when separate threads are useful                                                          | Not implemented                                                                                                                                    |
| Files and feedback          | Attach relevant material to its project/task/review; keep permissions, limits, and retry/delete states clear                                                        | Not implemented                                                                                                                                    |
| Notifications               | Begin with assignment, mention, review, and reply events linking to the exact record; add delivery channels deliberately                                            | Not implemented                                                                                                                                    |
| Search                      | Find permitted clients/projects/tasks/files; include usable filters and deep links                                                                                  | Public concept-category filtering only                                                                                                             |
| Accounts and administration | Separate identity, team membership, project access, and administrative operations                                                                                   | No authentication or private API                                                                                                                   |
| Calendar and meetings       | Track deadlines/reviews and attach an agreed meeting link; evaluate native calling separately                                                                       | Not implemented                                                                                                                                    |
| Updates and support         | Publish accurate work/release updates; connect later support to the delivered project                                                                               | Not implemented                                                                                                                                    |
| Quotes, invoices, payments  | Record agreed scope/quote and later connect the chosen commercial process when needed                                                                               | No pricing, quoting workflow, invoices, or payments connected                                                                                      |
| Mobile/PWA behavior         | Make task movement, Back, dialogs, typing, and record links usable on phones; evaluate installability against actual use                                            | Responsive public site exists; private workflows/PWA not implemented                                                                               |
| Time and workforce tools    | Add time tracking or team reporting when it helps actual delivery                                                                                                   | Not implemented; lower priority than winning/delivering the first project                                                                          |

## Recommended sequence

1. **Public offer and useful examples.** Improve design and functionality together: clear services, genuinely different concept interactions, and a usable brief journey. Avoid decorative mini-controls that promise unavailable actions. Contact details still come from the owners.
2. **One complete inquiry workflow.** After data/auth decisions, connect validated inquiry submission to durable storage and a protected two-person inbox with status and follow-up. Verify visitor receipt, team access, failures, and retry behavior together.
3. **One complete delivery workflow.** Link an accepted inquiry to its project, scope, tasks, ownership, comments, and files. Preserve inquiry context rather than copying it into disconnected screens. Start with the team's real first project.
4. **Client review and handoff.** Add scoped invitations, client-visible milestones, feedback/revision requests, explicit decisions, and delivery/support history. Keep internal notes private. Approval/version behavior is a Sura design requirement to work out, not an imported feature.
5. **Communication and convenience.** Expand chat, search, notifications, calendars, publishing, and installability as the preceding records and workflows become real. Evaluate video calling, workforce tools, and payment integrations against demand and running costs.

A representative future journey is: visitor explores an example → prepares/submits a brief → team follows up → agreed scope becomes a project → tasks and review material are shared with the right people → client feedback and decisions are recorded → site is handed over → support remains linked to that project. Most of this journey is not implemented in Sura today.

## Functional quality to carry forward

- Trace the whole action: entry point, validation, persistence, permission, resulting UI, and recovery. A working-looking screen is not a complete feature.
- Keep loading, empty, error, unavailable, and access-denied states distinct. Do not replace a failed real-data request with invented records or metrics.
- Scope every private read/write/file operation. Check direct URLs and removed-member behavior, not just navigation visibility.
- Show what is local, saved, sent, delivered, or published accurately. Design duplicate-safe retries and explicit clearing of drafts/outbox entries.
- Preserve literal text, files, and typed content. Keep spreadsheet/file attachments as files. Check edit, reply, paste, and phone paths when adding an editor.
- Prefer shared controls, Back behavior, focus management, contained dialogs, and mobile actions that do not depend on dragging or hovering.
- Test the most important journeys and failure paths with actual interactions; report separately what was verified locally, with test fixtures, on real accounts/devices, and on the deployment.

Application code, reference repositories, providers, accounts, and deployment were unchanged by this research. Only Sura's research and project guidance were expanded.
