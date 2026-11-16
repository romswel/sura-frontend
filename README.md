# Sura frontend

The public website for a two-person web team starting from zero. React, TypeScript, Vite, plain CSS, and original SVG/CSS artwork. Node 24 and npm; no service accounts are required to run locally.

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. Run `npm run check` for lint/types/build. Install the browser with `npx playwright install chromium`, then use `npm run test:e2e` for desktop/mobile interaction checks.

Start with [AGENTS.md](AGENTS.md) and [shared project memory](docs/PROJECT_MEMORY.md). See [setup and free-service options](docs/SETUP.md), [design foundation](docs/DESIGN.md), and [decisions](docs/DECISIONS.md).

The public site includes a filterable concept gallery and local project-brief preparation. Examples are fictional design concepts. Contacts are intentionally blank; optional public email configuration is in `.env.example`. No inquiry is sent to a backend. The team page is public planning information, with accounts, CRM, and chat reserved for later implementation.

The independent API repository is [sura-backend](https://github.com/romswel/sura-backend). Neither service is deployed by this scaffold.
