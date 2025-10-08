# Copilot Instructions — Yahtzee ScoreSync

> Purpose: Build **Yahtzee ScoreSync**, a mobile-friendly digital scorecard to replace paper scorecards. Target: fast prototype in under an hour.

## Project Context
- **Product:** Yahtzee digital scorecard web app
- **Target Users:** Friends and families playing Yahtzee together
- **Core Goal:** Replace paper scorecards with instant, error-free digital tracking
- **Tech Stack:** React + Vite single-page app, no backend required
- **Platform:** Mobile-first web app (works on phones/tablets)

## MVP Features to Build
- **Game Setup:** Add player names, start new game
- **Score Entry:** Tap cells to enter scores per Yahtzee category  
- **Auto-Calculate:** Totals update automatically (upper section bonus, grand total)
- **Live Updates:** All players see score changes instantly
- **Mobile-Friendly:** Touch-optimized interface, readable on phones

## Technical Guardrails
- **No backend:** Pure frontend, use React state + localStorage for persistence
- **Minimal dependencies:** Stick to React + Vite, avoid heavy libraries
- **Single-page app:** No routing required, keep it simple
- **Mobile-first:** Design for touch interaction, responsive layout
- **Performance:** Fast loading, smooth on mobile browsers

## Build Flow (ask the user step-by-step)
1. **Confirm the MVP goal** in one sentence.
2. **Create game setup UI** (add players, start game button).
3. **Build scorecard table** (Yahtzee categories, player columns, input cells).
4. **Add scoring logic** (auto-calculate totals, upper section bonus).
5. **Test & polish** (mobile responsiveness, basic validation).

## Yahtzee-Specific Prompts
- "Create a Yahtzee scorecard table with all 13 categories and auto-calculating totals."
- "Build a player setup screen where users can add/remove player names."
- "Implement Yahtzee scoring rules: upper section bonus at 63+ points."
- "Make the scorecard mobile-friendly with touch-optimized input cells."
- "Add localStorage to persist game state across browser refreshes."
- "Create a simple game summary screen showing final scores and winner."

## Prompts to Use with Me (copy/paste)
- "Given this idea: <idea>, propose a *one-hour MVP* with 3–5 steps and exactly one core user action."
- "Generate the minimal JSX + state to implement that action. No extra files unless needed."
- "Refactor my App.jsx to make the code clearer, without adding libraries."
- "Create a tiny fake data source (an array or JSON) and show how to render it and filter it."
- "Add a simple result screen summarizing what the user did, without routing."
- "Suggest the smallest possible accessibility improvements for this UI."
- "Write a 3–5 bullet README snippet telling someone how to run and use this MVP."

## Quality Bar
- Works locally with `npm run dev` and builds with `npm run build`.
- No runtime errors in the console.
- Keep the bundle minimal.

## Stretch (only after MVP)
- Add routing (react-router-dom) if multiple views are essential.
- Add a small chart or animation *only if* it clarifies the outcome.
