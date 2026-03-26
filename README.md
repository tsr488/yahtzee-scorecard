# 🎲 Yahtzee Scorecard

A mobile-friendly digital scorecard that replaces paper Yahtzee scorecards. Built for friends and families who want instant, error-free score tracking during game night.

**[Live App →](https://icy-pond-05f8b280f.2.azurestaticapps.net)**

## Features

- **Multi-player support** — Add any number of players and track everyone's scores
- **All 13 Yahtzee categories** — Upper section (Ones–Sixes) and Lower section (3/4 of a Kind, Full House, Straights, Yahtzee, Chance)
- **Auto-calculated totals** — Upper bonus (35 pts at 63+), section subtotals, and grand totals update in real time
- **Game persistence** — Scores are saved to localStorage so you can refresh without losing progress
- **Mobile-first design** — Touch-optimized inputs, responsive layout that works on phones and tablets
- **PWA-ready** — Installable as a standalone app on mobile devices

## Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework   | React 18                             |
| Build Tool  | Vite 5                               |
| Hosting     | Azure Static Web Apps (Free tier)    |
| CI/CD       | GitHub Actions                       |
| Backend     | None — pure client-side SPA          |
| Persistence | Browser localStorage                 |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── index.html                 # Entry point
├── src/
│   ├── main.jsx               # React root mount
│   └── App.jsx                # Scorecard app (setup, scoring, calculations)
├── public/
│   ├── favicon.svg            # App icon
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # Crawler rules
├── staticwebapp.config.json   # Azure SWA routing config
├── vite.config.js             # Vite config (relative base paths)
└── .github/workflows/         # Azure Static Web Apps CI/CD
```

## Deployment

Deployments are fully automated. Every push to `main` triggers the GitHub Actions workflow, which builds the app and deploys to Azure Static Web Apps. Pull requests get automatic preview environments.

## License

Private project.
