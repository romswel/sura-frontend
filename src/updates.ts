/** Public, source-reviewed release notes. Add the newest release first. */
export const releases = [
  {
    version: '0.2.0',
    date: '2026-11-17',
    dateLabel: 'November 17, 2026',
    label: 'THE REBUILD',
    title: 'A new home. And a useful place to start.',
    summary:
      'Sura has a new look and a more practical way to explore an idea, plan a website, and take the next step.',
    groups: [
      {
        title: 'New',
        items: [
          'A rebuilt studio website with an interactive workbench, a filterable concept gallery, expandable services, our working process, a two-person team story, and answers to common questions.',
          'Four original, fictional businesses to explore: Offday Objects with product search, categories, favorites, and details; Morrow Coffee with a sample menu; Forma Studio with project stories; and Alex Morgan with a creative portfolio.',
          'A four-step project brief covering project type, pages, features, your idea, timeline, and budget. Start from a concept or service to bring that direction into your brief.',
          'Your project desk: a personal brief and launch checklist with custom steps, status, completion, search, filters, progress, removal with Undo, and a full-plan text export.',
          'Copy your brief, download a UTF-8 text file, or explicitly save a draft in this browser. Saved drafts have a 30-day lifetime; later edits need another save.',
          'This Updates page, with a public record of additions, changes, and fixes.',
        ],
      },
      {
        title: 'Changed',
        items: [
          'A monochrome visual system with light and dark themes, clearer typography, responsive layouts, and a theme preference that stays with your browser.',
          'Locally hosted type and original concept imagery, with no external font or image requests.',
          'Clearer guidance about personal browser storage, saving, copying, and clearing a project. Unsaved briefs are never automatically submitted or saved.',
          'The future team workspace explains what is planned and links to the personal project desk. Existing section and team bookmarks still work.',
        ],
      },
      {
        title: 'Fixed',
        items: [
          'Skip navigation and Back to top keep you on the page you are using.',
          'Opening Saved in the shop concept clears older search and category filters, so favorites are easy to find. Filtered empty states now describe the actual results.',
          'Switching between the project brief and checklist keeps unfinished checklist text and Undo available. Clearing a project resets those temporary controls too.',
          'Keyboard focus follows product and portfolio details, returning to the selected item on Back. Concept-to-brief and checklist actions also keep the next step in focus.',
          'Long checklist drafts now use matching save and restore size limits. Invalid saved options, duplicate selections, and empty task records cannot break the planner.',
          'Whitespace-only required details are rejected. Literal text, line breaks, and Unicode survive copying and downloading, with fallback guidance if browser storage or clipboard access is unavailable.',
          'API error responses now keep the same cache and security headers as normal responses, with HTTP checks covering the shared Node and Workers transport.',
        ],
      },
      {
        title: 'What is still being built',
        items: [
          'Concept businesses are demonstrations. Products are not for sale; checkout, payments, orders, and bookings are not connected.',
          'Contact details are being prepared. A brief stays with you until you choose to share it; preparing or saving it does not send an inquiry to Sura.',
          'Accounts, a shared team workspace, client portals, messaging, and server-stored projects are future work. The personal project desk is stored only in your browser.',
        ],
      },
    ],
    link: { href: '#/planner', label: 'Try your project desk' },
  },
]
