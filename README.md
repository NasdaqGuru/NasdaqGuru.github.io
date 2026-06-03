# FAS CFO Command Dashboard

This is the GitHub Pages-ready version of the CFO dashboard, reorganized to reduce scrolling and group the operating content by CFO reporting unit.

## Structure

- `index.html` - compact executive overview, priority queue, and actionable CFO Command Board.
- `command-center.html` - compact command center for response queue, data automation, priority sorting, deadline routing, and briefing-studio controls.
- `reports-library.html` - modern reports route that keeps the suite visual system and treats old legacy files as archive references.
- `interactive.html` - single-file interactive dashboard preview with embedded CSS and JavaScript.
- `pages/` - one page per CFO reporting unit.
- `assets/styles.css` - shared institutional dashboard styling.
- `assets/app.js` - shared unit and signal data model.
- `legacy/` - original full dashboard, command center, and Apps Script files from the supplied package.

## Publish To GitHub Pages

1. Copy the contents of this folder into the root of the `NasdaqGuru.github.io` repository.
2. Commit and push to the default branch.
3. In GitHub, confirm Pages is enabled for the repository root.
4. Open `https://NasdaqGuru.github.io/`.

Use `index.html` as the GitHub Pages homepage. Use `interactive.html` only when you need a one-file preview; the full folder is still the correct repository structure because it includes unit pages and legacy references.

Use `command-center.html` for the CFO action board and `reports-library.html` for report navigation. The original files under `legacy/` are retained for audit/reference and are no longer the primary user-facing route.

## Editing The Dashboard

Most content lives in `assets/app.js`.

Update the `units` array to change CFO reporting-unit summaries, owner routes, metrics, and controls. Update the `signals` array to change individual work items, due dates, status, materiality, or next action.

The homepage command board keeps the original response-command pattern from the source suite:

- Owner response status is logged locally by stable Signal ID.
- CFO notes are saved separately from financial source facts.
- Contact Team generates a clean owner-response card and mail draft.
- Data Automation preserves the rule that source refreshes update facts only; owner comments, evidence, email attempts, and response history remain separate records.

The command center adds CFO-specific versions of the requested options:

- Offline Response Queue for local-first notes, responses, evidence, and email attempts.
- Sync & Governance Status to keep source facts and owner-response records separate.
- Deterministic Priority Engine sorted by impact, due date, status, and response state.
- Calendar & Deadline Routing for owner follow-up timing.
- Interactive System Report with a 90-second CFO briefing script.
- Briefing / Video Studio for storyboard, assets, preview, and render-readiness tracking.
