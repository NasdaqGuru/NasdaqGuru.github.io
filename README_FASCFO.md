# FAS CFO Intelligence Suite

This is the GitHub Pages-ready CFO Intelligence Suite, reorganized to reduce scrolling and group action content by CFO reporting unit.

## Structure

- `FAS_CFO_Dashboard.html` - main CFO Intelligence Suite for GitHub Pages, grouped into internal CFO operating units and external/partner-facing lanes.
- `dashboard_FASCFO.html` - compact executive overview, priority queue, and actionable CFO Command Board.
- `command-center_FASCFO.html` - compact command center for response queue, data automation, priority sorting, deadline routing, and briefing-studio controls.
- `reports-library_FASCFO.html` - modern reports route that keeps the suite visual system and treats old legacy files as archive references.
- `intelligence-suite_FASCFO.html` - compatibility copy of the main Intelligence Suite for older links.
- `interactive_FASCFO.html` - single-file interactive dashboard preview with embedded CSS and JavaScript.
- `pages_FASCFO/` - one page per CFO reporting unit.
- `assets_FASCFO/styles_FASCFO.css` - shared institutional dashboard styling.
- `assets_FASCFO/app_FASCFO.js` - shared unit and signal data model.
- `legacy_FASCFO/` - original full dashboard, command center, and Apps Script files from the supplied package.

## Publish To GitHub Pages

1. Copy only the `_FASCFO` files/folders plus `FAS_CFO_Dashboard.html` into the root of the `NasdaqGuru.github.io` repository.
2. Commit and push to the default branch.
3. In GitHub, confirm Pages is enabled for the repository root.
4. Open `https://NasdaqGuru.github.io/FAS_CFO_Dashboard.html`.

Use `FAS_CFO_Dashboard.html` as the GitHub Pages homepage. Use `interactive_FASCFO.html` only when you need a one-file preview; the full folder is still the correct repository structure because it includes unit pages and legacy references.

Use `dashboard_FASCFO.html` for the compact screen-fit dashboard, `command-center_FASCFO.html` for the CFO action board, and `reports-library_FASCFO.html` for report navigation. The original files under `legacy_FASCFO/` are retained as the Source Intelligence Archive and are no longer the primary user-facing route.

## Editing The Dashboard

Most content lives in `assets_FASCFO/app_FASCFO.js`.

Update the `units` array to change CFO reporting-unit summaries, owner routes, metrics, and controls. Update the `signals` array to change individual work items, due dates, status, materiality, or next action.

The Intelligence Suite and compact dashboard keep the original response-command pattern from the source suite:

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
