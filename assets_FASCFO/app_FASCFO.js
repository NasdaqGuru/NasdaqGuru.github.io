(function () {
  "use strict";

  const units = [
    {
      slug: "controller-close",
      title: "Accounting, Controller & Close",
      short: "Accounting",
      icon: "CC",
      href: "pages_FASCFO/controller-close_FASCFO.html",
      status: "At risk",
      owner: "Accounting / Controller + Budgeting",
      due: "Jun 4, 2026",
      materiality: "$24M timing exposure",
      summary: "Accounting and Controller controls own the release gate for the FY26 close packet, unresolved accruals, open commitments, Controller stamp, and the $20M timing shield.",
      decision: "Do not release the favorable timing narrative until CE-01 / CE-02 evidence is cleared and Controller source rows are attached.",
      metrics: [
        ["Close completion", "68/70", "Two exception packets open"],
        ["Release exposure", "$24M", "Open commitment and accrual risk"],
        ["Package due", "Jul 15", "FY26 close deck and guidance base"]
      ],
      controls: [
        "Confirm open PO, accrual aging, and late reforecast rows.",
        "Attach HART GL source row, period, reviewer, and timestamp.",
        "Stamp management forecast values before board or provost publication.",
        "Keep timing favorability centrally held through June cutoff testing."
      ]
    },
    {
      slug: "budget-planning",
      title: "Budgeting & FP&A",
      short: "Budgeting",
      icon: "BP",
      href: "pages_FASCFO/budget-planning_FASCFO.html",
      status: "At risk",
      owner: "Budgeting / FP&A + Dean Offices",
      due: "Jun 15, 2026",
      materiality: "$420M forecast inputs",
      summary: "Budgeting and FP&A own unit reforecast discipline, hard caps for unfavorable variance, FY27 guidance, and policy validation for late-unit enforcement.",
      decision: "Move late units into a documented penalty validation queue and require corrective plans for recurring unfavorable variances.",
      metrics: [
        ["Late units", "9", "Policy gate before penalty"],
        ["Physics overrun", "$3.2M", "Third-year unfavorable pattern"],
        ["Forecast scope", "$420M", "Affiliated tub forecast inputs"]
      ],
      controls: [
        "Validate authority, notice path, appeal path, and timestamp evidence before applying a 0.5% central tax.",
        "Require object-code driver plans for departments over 5% unfavorable.",
        "Tie FY27 guidance to Controller-stamped close results.",
        "Escalate recurring overruns through divisional finance partner and dean route."
      ]
    },
    {
      slug: "treasury-liquidity",
      title: "Treasury & Liquidity",
      short: "Treasury",
      icon: "TL",
      href: "pages_FASCFO/treasury-liquidity_FASCFO.html",
      status: "On track",
      owner: "CFO + Treasury",
      due: "Jun 10, 2026",
      materiality: "$191M reserve pool",
      summary: "Treasury owns the liquidity lens, central cash preservation, reserve draw rules, and the 60-day planning floor used by capital and donor-fund decisions.",
      decision: "Hold favorable variance centrally and block discretionary reserve draws while cash runway remains below 60 days.",
      metrics: [
        ["Cash runway", "43 days", "Below 60-day planning floor"],
        ["Reserve lens", "$191M", "Liquidity and reserve pool"],
        ["Release rule", "Hold", "No discretionary release while under floor"]
      ],
      controls: [
        "Retain favorable timing variance until close testing clears.",
        "Require CFO approval for any discretionary reserve release.",
        "Keep Tier 3 and Tier 4 capital draws frozen while cash is below threshold.",
        "Pair donor unlock claims with legal and spendability evidence before liquidity modeling."
      ]
    },
    {
      slug: "sponsored-research-icr",
      title: "Sponsored Research ICR",
      short: "ICR",
      icon: "SR",
      href: "pages_FASCFO/sponsored-research-icr_FASCFO.html",
      status: "At risk",
      owner: "Sponsored Research Director",
      due: "Jun 15, 2026",
      materiality: "$16.2M ICR gap",
      summary: "Sponsored Research Finance owns the recovery desk, award timing evidence, monthly ICR collection floor, and bridge-pool circuit breaker.",
      decision: "Run weekly recovery desk and freeze bridge draws if collections fall below $12M per month or the four evidence gates are incomplete.",
      metrics: [
        ["ICR gap", "$16.2M", "Recovery exposure"],
        ["Cash floor", "$12M/mo", "Bridge draw breaker"],
        ["War room", "Weekly", "Started Jun 1, 2026"]
      ],
      controls: [
        "Refresh HART aging extract before leadership briefings.",
        "Verify delayed-award reason codes and sponsor follow-up status.",
        "Block bridge access unless source, owner, timing, and recovery plan gates are complete.",
        "Report weekly until FY26 close and FY27 Q1 cash bridge risk is stable."
      ]
    },
    {
      slug: "gift-endowment",
      title: "Gifts & Endowments",
      short: "Gifts",
      icon: "GE",
      href: "pages_FASCFO/gift-endowment_FASCFO.html",
      status: "Human review",
      owner: "Gift Accounting + OGC + Development",
      due: "Jul 1, 2026",
      materiality: "$48.2M opportunity",
      summary: "Gift and endowment stakeholders own donor-intent classification, ASC 958 treatment, legal pathway, expected cash date, and spendability limits.",
      decision: "Prioritize low-risk Tier A funds first. Do not count Tier D dormant program balances until legal approval is complete.",
      metrics: [
        ["Unlock pool", "$48.2M", "Donor-intent sprint"],
        ["Tier A", "$4.2M", "Lowest-risk sequence"],
        ["Tier D", "$14.8M", "Do not count until legal approval"]
      ],
      controls: [
        "Attach gift instrument, donor terms, legal status, and expected cash date.",
        "Separate opportunity sizing from official unrestricted liquidity.",
        "Route high-risk restrictions through OGC before operating use is modeled.",
        "Prepare audit-safe classification notes before release."
      ]
    },
    {
      slug: "capital-facilities",
      title: "Capital & Facilities",
      short: "Capital",
      icon: "CF",
      href: "pages_FASCFO/capital-facilities_FASCFO.html",
      status: "On track",
      owner: "Facilities Finance + CFO",
      due: "Jun 12, 2026",
      materiality: "$842M backlog",
      summary: "Capital and Facilities owns deferred-maintenance triage, project tiering, reserve draw discipline, escalation penalty, and board packet readiness.",
      decision: "Rank projects by life safety, mission continuity, escalation penalty, and reserve impact; freeze discretionary Tier 3 / Tier 4 draws.",
      metrics: [
        ["Backlog", "$842M", "Deferred maintenance context"],
        ["Escalation", "$18.9M", "Approximate 6-month delay pressure"],
        ["Draw rule", "Freeze", "Tier 3 / Tier 4 while liquidity is low"]
      ],
      controls: [
        "Separate life-safety work from discretionary or timing-sensitive projects.",
        "Attach tier, cash timing, reserve source, and board packet status.",
        "Coordinate with Treasury before any reserve draw request.",
        "Use the backlog narrative to explain risk, not to authorize unmanaged spending."
      ]
    },
    {
      slug: "academic-revenue",
      title: "Revenue, Aid & Net Yield",
      short: "Revenue",
      icon: "RA",
      href: "pages_FASCFO/academic-revenue_FASCFO.html",
      status: "At risk",
      owner: "College + GSAS + Budget",
      due: "Jun 14, 2026",
      materiality: "$12.2M aid variance",
      summary: "Revenue and aid owners manage financial-aid variance, net tuition yield, HES contribution, and restricted-aid offset assumptions.",
      decision: "Require every tuition or growth proposal to show gross revenue, aid demand, discount rate, net yield, and eligible restricted offsets.",
      metrics: [
        ["Aid variance", "$12.2M", "Demand-driven pressure"],
        ["Discount rate", "58.3%", "Net-yield gate"],
        ["HES lens", "$12M", "Separate gross from net margin"]
      ],
      controls: [
        "Do not accept gross tuition as gap-closing evidence without aid offset.",
        "Pair aid-restricted endowment use with donor-purpose limits.",
        "Separate HES topline growth from delivery, platform, and overhead costs.",
        "Route FY28 revenue proposals through the net-yield formula."
      ]
    },
    {
      slug: "finance-operations",
      title: "Finance Administration & Operations",
      short: "Finance Admin",
      icon: "FO",
      href: "pages_FASCFO/finance-operations_FASCFO.html",
      status: "On track",
      owner: "Finance Administration + Procurement + HR Finance",
      due: "Jun 24, 2026",
      materiality: "$941M personnel base",
      summary: "Finance Administration and Operations own procurement pressure, AP and PO gates, payroll/personnel assumptions, system-access handoffs, position-control offsets, and recurring operating controls.",
      decision: "Add vendor pooling, PO gates, and recurring salary/fringe offset requirements before FY27 assumptions lock.",
      metrics: [
        ["Personnel base", "$941M", "FY27 comp and fringe exposure"],
        ["Supply pressure", "$3.5M", "Tariff and lab input watch"],
        ["Personnel share", "53.4%", "Breach without controls"]
      ],
      controls: [
        "Pool vendors and track tariff-sensitive inputs before they enter base budgets.",
        "Require recurring offsets for new positions.",
        "Monitor fringe escalation and reclassification exposure.",
        "Route procurement and AP blockers through owner-response cards."
      ]
    },
    {
      slug: "audit-governance",
      title: "Financial Intelligence & Governance",
      short: "Intel/Gov",
      icon: "AG",
      href: "pages_FASCFO/audit-governance_FASCFO.html",
      status: "Human review",
      owner: "Financial Intelligence & Analytics + Controller + CFO Office",
      due: "Jun 8, 2026",
      materiality: "9 non-green alerts",
      summary: "Financial Intelligence and Governance own the alert register, source labels, dual-ledger bridge, human review gate, analytics boundary, and AI support boundary.",
      decision: "Use the nine-alert register as the CFO agenda and attach owner, deadline, source row, decision, and consequence to each signal.",
      metrics: [
        ["Alert register", "9", "Non-green signals"],
        ["Source stamp", "Required", "Before publication"],
        ["Automation rule", "Assist only", "No automated financial approvals"]
      ],
      controls: [
        "Classify each value as actual, forecast, scenario, synthetic, or source-system target.",
        "Preserve owner responses separately from financial source refreshes.",
        "Require named reviewer disposition before action or publication.",
        "Move production workflow behind SSO, role claims, and audit logging."
      ]
    }
  ];

  const signals = [
    { id: "CFO-001", title: "FY25 deficit baseline and FY27 stabilization path", unit: "audit-governance", owner: "FAS CFO Office", due: "Jun 7, 2026", status: "At risk", priority: "P1", impact: "$7.7M", source: "Executive_KPIs; Macro_Reconciliation", action: "Frame FY25 result as the structural baseline and approve the FY27 gated surplus path." },
    { id: "CFO-002", title: "68/70 close checks - CE-01 / CE-02 clearance", unit: "controller-close", owner: "Accounting / Controller + Budgeting", due: "Jun 4, 2026", status: "At risk", priority: "P1", impact: "$24M", source: "Monthly_Close; Post_Audit_Correction_Log", action: "Clear open PO/accrual aging and late reforecast rows before releasing timing favorability." },
    { id: "CFO-003", title: "ICR Recovery Desk and bridge-pool circuit breaker", unit: "sponsored-research-icr", owner: "Sponsored Research Director", due: "Jun 15, 2026", status: "At risk", priority: "P1", impact: "$16.2M", source: "ICR_Recovery_Desk; Research_Bridge_Gates", action: "Run weekly recovery desk and freeze bridge draws if collection gates fail." },
    { id: "CFO-004", title: "Nine-alert CFO register ownership and disposition", unit: "audit-governance", owner: "FAS CFO Office", due: "Jun 7, 2026", status: "Human review", priority: "P1", impact: "Agenda", source: "Risk_Register; KPI_Tracker", action: "Assign owner, deadline, source row, decision, and consequence to each alert." },
    { id: "CFO-005", title: "43-day cash runway and reserve draw freeze", unit: "treasury-liquidity", owner: "CFO + Treasury", due: "Jun 10, 2026", status: "On track", priority: "P2", impact: "$191M", source: "Executive_KPIs; Multi_Year_Liquidity", action: "Preserve cash and block Tier 3 / Tier 4 capital draws while under 60 days." },
    { id: "CFO-006", title: "Donor-intent unlock sprint with ASC 958 guardrails", unit: "gift-endowment", owner: "Gift Accounting + OGC + Development", due: "Jul 1, 2026", status: "Human review", priority: "P2", impact: "$48.2M", source: "Restricted_Fund_Risk; Donor_Unlock_Phases", action: "Prioritize Tier A first and hold Tier D until legal approval is complete." },
    { id: "CFO-007", title: "Capital backlog triage and Tier 3 / 4 freeze", unit: "capital-facilities", owner: "Facilities Finance + CFO", due: "Jun 12, 2026", status: "On track", priority: "P2", impact: "$842M", source: "Capital_Tiers; Capital_Escalation", action: "Rank projects by life safety, mission continuity, escalation penalty, and reserve impact." },
    { id: "CFO-008", title: "Financial aid variance and net tuition yield gate", unit: "academic-revenue", owner: "College + GSAS + Budget", due: "Jun 14, 2026", status: "At risk", priority: "P2", impact: "$12.2M", source: "Net_Yield_FY28; Departments", action: "Require every tuition-rate proposal to show gross, aid demand, discount rate, and net yield." },
    { id: "CFO-009", title: "Physics intervention and +5% overrun hard cap", unit: "budget-planning", owner: "Science Dean + Chair + DA", due: "Jun 21, 2026", status: "At risk", priority: "P2", impact: "$3.2M", source: "Physics_Intervention; Department_Layer_Report", action: "Require corrective action plan and isolate object-code drivers within 14 business days." },
    { id: "CFO-010", title: "CCB lab supply and tariff pressure control", unit: "finance-operations", owner: "Procurement + Science Finance", due: "Jun 21, 2026", status: "On track", priority: "P3", impact: "$3.5M", source: "Department_Layer_Report; Finance_Ops_Register", action: "Pool vendors, add PO gates, and track tariff-sensitive inputs before FY27 lock." },
    { id: "CFO-011", title: "Fringe escalation and position-control offset gate", unit: "finance-operations", owner: "HR Finance + Budgeting", due: "Jun 24, 2026", status: "On track", priority: "P3", impact: "$941M", source: "Fringe_Escalation; Finance_Ops_KPIs", action: "Require recurring salary and fringe offsets for new positions." },
    { id: "CFO-012", title: "HES net margin and revenue growth governance", unit: "academic-revenue", owner: "HES + FAS Finance", due: "Jun 28, 2026", status: "On track", priority: "P3", impact: "$12M", source: "HES_Net_Margin; Business_Builders", action: "Separate gross HES revenue from net contribution through governance gates." },
    { id: "CFO-013", title: "Late reforecast penalty validation for nine units", unit: "budget-planning", owner: "Budget Office + Dean Offices", due: "Jun 15, 2026", status: "Human review", priority: "P2", impact: "9 units", source: "Enforcement_Controls; Finance_Ops_KPIs", action: "Validate policy authority, notice, appeal path, and timestamps before penalty." },
    { id: "CFO-014", title: "Dual-ledger bridge and source-row publication stamp", unit: "audit-governance", owner: "Financial Intelligence & Analytics + Controller", due: "Jun 8, 2026", status: "On track", priority: "P2", impact: "Publish gate", source: "Dual_Ledger_Bridge; Data_Dictionary", action: "Attach source type, system row, owner, period, and Controller review status." },
    { id: "CFO-015", title: "FY26 close package and FY27 guidance deliverables", unit: "controller-close", owner: "Accounting / Controller + Budgeting", due: "Jul 15, 2026", status: "On track", priority: "P1", impact: "Close deck", source: "Deliverable_Log; Roadmap", action: "Link close package, FY27 guidance, ICR dashboard, benchmark pack, and capital packet." }
  ];

  const conceptUnitSlugs = [
    "controller-close",
    "budget-planning",
    "treasury-liquidity",
    "sponsored-research-icr",
    "capital-facilities",
    "finance-operations"
  ];

  const conceptKpis = [
    {
      label: "Close Progress",
      value: "68/70",
      sub: "Close",
      target: "Target: 70/70",
      delta: "+2 from last week",
      tone: "red",
      signalId: "CFO-002",
      spark: "progress"
    },
    {
      label: "Cash & Liquidity",
      value: "43",
      sub: "Days Cash",
      target: "Target: >= 35 Days",
      delta: "+3 from last week",
      tone: "navy",
      signalId: "CFO-005",
      spark: "navy"
    },
    {
      label: "Sponsored Research ICR",
      value: "$16.2M",
      sub: "ICR Gap",
      target: "Target: <= $10M",
      delta: "-$2.3M from last week",
      tone: "red",
      signalId: "CFO-003",
      spark: "red"
    },
    {
      label: "Capital & Facilities",
      value: "$842M",
      sub: "Capital Backlog",
      target: "Target: <= $800M",
      delta: "+$18M from last month",
      tone: "navy",
      signalId: "CFO-007",
      spark: "navy"
    }
  ];

  const pageSlug = document.body.dataset.page || "overview";
  const rootPages = ["overview", "command-center", "reports-library", "intelligence-suite"];
  const nestedPath = /\/(?:pages_FASCFO|legacy_FASCFO)\//.test(location.pathname.replace(/\\/g, "/"));
  const basePath = nestedPath ? "../" : rootPages.includes(pageSlug) ? "" : "../";
  const responseEndpoint = "https://script.google.com/macros/s/AKfycbzf-MiH3fxdbYT4d_4jwKnBfy-rJ1n6whpHYpABGxDCXCU-FJP1jNN--o7a53_m5WB3/exec";
  const responseLogKey = "fas-cfo-owner-response-log-v1";
  const noteLogKey = "fas-cfo-note-log-v1";
  const automationLogKey = "fas-cfo-automation-log-v1";
  const responseChoices = ["On track", "At risk", "Need time", "Blocked", "Reassign", "Revise"];
  const dataSeparationRule = "Financial source data and owner response data must remain separate controlled records. Financial source refreshes update signal metrics, severity, deadlines, and source timestamps only. Owner responses, comments, evidence, email attempts, and accountability history are never overwritten; they are linked by stable Signal ID.";
  const ownerContact = {
    "controller-close": { email: "controller@fas.harvard.edu", team: "Accounting, Controller and Close Team" },
    "budget-planning": { email: "budget.office@fas.harvard.edu", team: "Budgeting and FP&A Team" },
    "treasury-liquidity": { email: "treasury@fas.harvard.edu", team: "Treasury and Liquidity Team" },
    "sponsored-research-icr": { email: "srfinance@fas.harvard.edu", team: "Sponsored Research Finance Team" },
    "capital-facilities": { email: "facilitiesfinance@fas.harvard.edu", team: "Capital and Facilities Finance Team" },
    "finance-operations": { email: "financeoperations@fas.harvard.edu", team: "Finance Administration and Operations Team" },
    "audit-governance": { email: "fas.cfo@fas.harvard.edu", team: "Financial Intelligence and Governance Team" },
    "academic-revenue": { email: "fas.finance@fas.harvard.edu", team: "Revenue, Aid, and Net Yield Team" },
    "gift-endowment": { email: "giftaccounting@fas.harvard.edu", team: "Gifts and Endowments Team" }
  };
  const commandCenterOptions = [
    {
      id: "offline-sync",
      icon: "OS",
      title: "Offline Response Queue",
      status: "Ready",
      metric: "Local first",
      text: "CFO notes, owner responses, evidence references, and email attempts are captured locally first, then synchronized by stable Signal ID.",
      actions: ["Save CFO note", "Queue owner response", "Retain evidence link"]
    },
    {
      id: "sync-governance",
      icon: "SG",
      title: "Sync & Governance Status",
      status: "Controlled",
      metric: "No overwrites",
      text: "Financial source refreshes update metrics and timestamps only. Comments, response history, and accountability records remain separate.",
      actions: ["Run sync check", "Copy data rule", "Open response log"]
    },
    {
      id: "priority-engine",
      icon: "PE",
      title: "Deterministic Priority Engine",
      status: "Actionable",
      metric: "Impact + due date",
      text: "Signals are sorted from materiality, due date, status, and owner response state instead of visual order on the page.",
      actions: ["Sort by score", "Open top blocker", "Contact owner"]
    },
    {
      id: "calendar-routing",
      icon: "CR",
      title: "Calendar & Deadline Routing",
      status: "Queued",
      metric: "Next 30 days",
      text: "The CFO can see deadline pressure as a timeline and route owner follow-ups without leaving the command center.",
      actions: ["Review dates", "Email team", "Copy owner card"]
    },
    {
      id: "briefing-report",
      icon: "BR",
      title: "Interactive System Report",
      status: "Draftable",
      metric: "90 sec brief",
      text: "Report narrative is structured into a concise executive walkthrough covering architecture, action queue, sync, and notifications.",
      actions: ["Copy script", "Open dashboard", "Export queue"]
    },
    {
      id: "briefing-studio",
      icon: "VS",
      title: "Briefing / Video Studio",
      status: "Storyboard",
      metric: "4 scenes",
      text: "A compact studio panel organizes dashboard assets, preview script, transition markers, and render readiness for CFO briefings.",
      actions: ["Preview script", "Review assets", "Mark ready"]
    }
  ];
  const suiteGroups = [
    {
      key: "internal",
      title: "Internal CFO Operating Units",
      label: "FAS Finance Office operating controls",
      summary: "Core finance lanes owned inside the CFO operating model: accounting/close, budgeting, treasury, finance administration, payroll/system access controls, and financial intelligence.",
      units: ["controller-close", "budget-planning", "treasury-liquidity", "finance-operations", "audit-governance"]
    },
    {
      key: "external",
      title: "External & Partner-Facing Units",
      label: "FAS stakeholder and University partner lanes",
      summary: "CFO-facing units that depend on schools, divisions, donors, research administration, facilities partners, and central University offices.",
      units: ["sponsored-research-icr", "gift-endowment", "capital-facilities", "academic-revenue"]
    }
  ];
  const governanceLibrary = [
    ["Stable Signal ID", "Every owner response, CFO note, evidence link, and email attempt attaches to the Signal ID instead of overwriting source facts."],
    ["Source Separation", "Financial refreshes update metrics, severity, deadlines, and source timestamps only."],
    ["Evidence Packet", "Each action keeps owner route, due date, materiality, source row, decision, and consequence."],
    ["Human Review Gate", "Automation supports triage; financial approvals require named human disposition."]
  ];
  const fasOfficeLens = [
    ["Accounting", "Close, Controller review, accounting policy, and publication-ready source validation."],
    ["Budgeting", "Forecasts, annual planning, variance intervention, and unit target discipline."],
    ["Gifts & Endowments", "Donor restrictions, spendability, endowment treatment, and legal handoff."],
    ["Finance Administration", "Procurement, operations controls, payroll/personnel routing, and system access handoffs."],
    ["Financial Intelligence & Analytics", "Dashboards, source labels, analytics governance, and executive decision support."]
  ];

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function unitFor(slug) {
    return units.find(function (unit) { return unit.slug === slug; });
  }

  function signalFor(id) {
    return signals.find(function (signal) { return signal.id === id; });
  }

  function statusClass(status) {
    return String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function loadLog(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveLog(key, rows) {
    try {
      localStorage.setItem(key, JSON.stringify(rows.slice(0, 200)));
    } catch (error) {
      // Local files may be opened in restricted contexts; the dashboard should still render.
    }
  }

  function timestamp() {
    return new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function contactForSignal(signal) {
    return ownerContact[signal.unit] || { email: "fas.cfo@fas.harvard.edu", team: signal.owner || "FAS CFO team" };
  }

  function responseLog() {
    return loadLog(responseLogKey);
  }

  function noteLog() {
    return loadLog(noteLogKey);
  }

  function automationLog() {
    const rows = loadLog(automationLogKey);
    if (rows.length) return rows;
    return [
      { time: timestamp(), level: "READY", text: "Command board loaded. Source facts and owner responses remain separate by Signal ID." },
      { time: timestamp(), level: "DATA", text: "Financial source refresh is available as a controlled command, not an overwrite of response history." }
    ];
  }

  function latestResponse(signalId) {
    return responseLog().find(function (row) { return row.signalId === signalId; });
  }

  function noteCountFor(signalId) {
    return noteLog().filter(function (row) { return row.signalId === signalId; }).length;
  }

  function appendAutomation(level, text) {
    const rows = automationLog();
    rows.unshift({ time: timestamp(), level: level, text: text });
    saveLog(automationLogKey, rows);
    renderCommandBoard();
    renderCommandCenter();
  }

  function responseUrl(signal, choice) {
    const contact = contactForSignal(signal);
    const url = new URL(responseEndpoint);
    url.searchParams.set("action", "respond");
    url.searchParams.set("signal_id", signal.id);
    url.searchParams.set("signal_name", signal.title);
    url.searchParams.set("owner_team", contact.team);
    url.searchParams.set("owner_email", contact.email);
    url.searchParams.set("response", choice || "On track");
    url.searchParams.set("deadline", signal.due);
    url.searchParams.set("source", "NasdaqGuru.github.io CFO dashboard");
    return url.toString();
  }

  function ownerCardText(signal, choice) {
    const unit = unitFor(signal.unit);
    const contact = contactForSignal(signal);
    return [
      "FAS CFO owner response card",
      "Signal: " + signal.id + " - " + signal.title,
      "Unit: " + (unit ? unit.title : signal.unit),
      "Owner route: " + signal.owner,
      "Team contact: " + contact.team + " <" + contact.email + ">",
      "Due: " + signal.due,
      "Status requested: " + (choice || "Owner response required"),
      "Prompt survey: On track | At risk | Need time | Blocked | Reassign | Revise",
      "Required action: " + signal.action,
      "Source evidence: " + signal.source,
      "",
      "Reply fields:",
      "- Current status",
      "- Blocker or CFO decision needed",
      "- Progress percent",
      "- Evidence link or source row",
      "",
      "Use the stable Signal ID above so source facts and owner responses remain separate records."
    ].join("\n");
  }

  function mailtoForSignal(signal, choice) {
    const contact = contactForSignal(signal);
    const subject = "FAS CFO response requested: " + signal.id + " - " + signal.title;
    const body = ownerCardText(signal, choice);
    return "mailto:" + encodeURIComponent(contact.email) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function saveOwnerResponse(signalId) {
    const signal = signalFor(signalId);
    if (!signal) return;
    const choice = document.getElementById("responseChoice")?.value || "On track";
    const submittedBy = document.getElementById("responseSubmittedBy")?.value.trim() || "Owner/team response user";
    const comment = document.getElementById("responseComment")?.value.trim() || "No comment entered.";
    const progress = document.getElementById("responseProgress")?.value || "50";
    const evidence = document.getElementById("responseEvidence")?.value.trim();
    const rows = responseLog();
    rows.unshift({
      id: "RESP-" + Date.now(),
      signalId: signal.id,
      signalTitle: signal.title,
      unit: signal.unit,
      owner: signal.owner,
      choice: choice,
      submittedBy: submittedBy,
      comment: comment,
      progress: progress,
      evidence: evidence,
      timestamp: timestamp(),
      endpoint: responseUrl(signal, choice)
    });
    saveLog(responseLogKey, rows);
    appendAutomation("RESPONSE", "Logged " + choice + " response for " + signal.id + " without changing source facts.");
    renderCommandBoard();
    toast("Owner response logged for " + signal.id + ".");
  }

  function saveCfoNote() {
    const select = document.getElementById("cfoNoteSignal");
    const text = document.getElementById("cfoNoteText");
    if (!select || !text) return;
    const value = text.value.trim();
    if (!value) {
      toast("Add a note before saving.");
      return;
    }
    const signal = signalFor(select.value) || signals[0];
    const rows = noteLog();
    rows.unshift({
      id: "NOTE-" + Date.now(),
      signalId: signal.id,
      signalTitle: signal.title,
      text: value,
      timestamp: timestamp()
    });
    saveLog(noteLogKey, rows);
    text.value = "";
    appendAutomation("NOTE", "CFO note attached to " + signal.id + ".");
    renderCommandBoard();
    toast("CFO note saved for " + signal.id + ".");
  }

  function renderNav() {
    const nav = document.getElementById("sideNav");
    if (!nav) return;
    const overviewActive = pageSlug === "overview" ? " active" : "";
    const intelligenceActive = pageSlug === "intelligence-suite" ? " active" : "";
    const commandActive = pageSlug === "command-center" ? " active" : "";
    const reportsActive = pageSlug === "reports-library" ? " active" : "";
    const unitLinks = suiteGroups.map(function (group) {
      const links = group.units.map(unitFor).filter(Boolean).map(function (unit) {
        const active = pageSlug === unit.slug ? " active" : "";
        return `<a class="nav-link${active}" href="${basePath}${unit.href}"><span class="nav-icon">${esc(unit.icon)}</span><span>${esc(unit.title)}</span></a>`;
      }).join("");
      return `<div class="nav-group-label">${esc(group.key === "internal" ? "Internal" : "External")}</div>${links}`;
    }).join("");
    const referenceActive = pageSlug === "technical-reference" ? " active" : "";
    nav.innerHTML = `
      <a class="nav-link${intelligenceActive}" href="${basePath}FAS_CFO_Dashboard.html"><span class="nav-icon">IS</span><span>Intelligence Suite</span></a>
      <a class="nav-link${overviewActive}" href="${basePath}dashboard_FASCFO.html"><span class="nav-icon">EX</span><span>Executive Dashboard</span></a>
      <a class="nav-link${commandActive}" href="${basePath}command-center_FASCFO.html"><span class="nav-icon">CC</span><span>Command Center</span></a>
      ${unitLinks}
      <div class="nav-spacer"></div>
      <a class="nav-link${reportsActive}" href="${basePath}reports-library_FASCFO.html"><span class="nav-icon">DL</span><span>Reports Library</span></a>
      <a class="nav-link${referenceActive}" href="${basePath}pages_FASCFO/technical-reference_FASCFO.html"><span class="nav-icon">ST</span><span>Settings</span></a>
      <a class="nav-link" href="${basePath}README_FASCFO.md"><span class="nav-icon">?</span><span>Help</span></a>`;
  }

  function sparkline(tone) {
    if (tone === "progress") {
      return `<div class="progress-line"><i></i></div>`;
    }
    const color = tone === "red" ? "#a51c30" : "#0b2540";
    return `<svg class="sparkline" viewBox="0 0 220 52" aria-hidden="true">
      <polyline points="2,38 18,34 32,25 46,28 60,19 75,30 90,35 105,43 121,41 138,29 154,24 169,28 184,22 199,29 218,31" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <line x1="2" y1="45" x2="218" y2="45" stroke="#d8e0eb" stroke-dasharray="4 5"></line>
    </svg>`;
  }

  function conceptIcon(unitOrTone) {
    const key = typeof unitOrTone === "string" ? unitOrTone : unitOrTone.slug;
    const map = {
      red: "OK",
      navy: "UP",
      "controller-close": "CC",
      "budget-planning": "BP",
      "treasury-liquidity": "TL",
      "sponsored-research-icr": "SR",
      "capital-facilities": "CF",
      "finance-operations": "FO",
      "gift-endowment": "GE",
      "academic-revenue": "RA",
      "audit-governance": "AG"
    };
    return map[key] || "..";
  }

  function renderKpiCards() {
    const container = document.getElementById("kpiCards");
    if (!container) return;
    container.innerHTML = conceptKpis.map(function (kpi) {
      return `<button class="kpi-card ${esc(kpi.tone)}" type="button" data-signal-id="${esc(kpi.signalId)}">
        <div class="kpi-top"><span class="kpi-icon">${esc(conceptIcon(kpi.tone))}</span><span>${esc(kpi.label)}</span></div>
        <strong>${esc(kpi.value)}</strong>
        <em>${esc(kpi.sub)}</em>
        ${sparkline(kpi.spark)}
        <div class="kpi-foot"><span>${esc(kpi.target)}</span><b>${esc(kpi.delta)}</b></div>
      </button>`;
    }).join("");
  }

  function unitMetric(unit) {
    const map = {
      "controller-close": ["68/70 Close", "-2", "Complete accruals and reclasses"],
      "budget-planning": ["FY26 Plan $1.87B", "--", "Finalize unit targets and consolidations"],
      "treasury-liquidity": ["43 Days Cash", "+3", "Optimize cash ladder and investments"],
      "sponsored-research-icr": ["$16.2M ICR Gap", "-$2.3M", "Reduce gap and improve recovery"],
      "capital-facilities": ["$842M Backlog", "+$18M", "Advance critical capital projects"],
      "finance-operations": ["96% On-Time Tasks", "+4%", "Automate reconciliations and controls"],
      "gift-endowment": ["$48.2M Unlock Pool", "Review", "Sequence donor-intent and legal approvals"],
      "academic-revenue": ["$12.2M Aid Variance", "-$1.1M", "Gate revenue proposals through net yield"],
      "audit-governance": ["9 Alerts", "Review", "Assign owner, source row, and consequence"]
    };
    return map[unit.slug] || [unit.materiality, "--", unit.decision];
  }

  function conceptStatus(unit) {
    if (unit.slug === "budget-planning" || unit.slug === "treasury-liquidity" || unit.slug === "finance-operations") return "On Track";
    return "At Risk";
  }

  function renderUnitPerformance() {
    const body = document.getElementById("unitPerformanceBody");
    if (!body) return;
    body.innerHTML = conceptUnitSlugs.map(unitFor).filter(Boolean).map(function (unit) {
      const metric = unitMetric(unit);
      const status = conceptStatus(unit);
      return `<tr class="concept-row" tabindex="0" data-open-unit="${esc(unit.slug)}">
        <td><span class="unit-round ${esc(unit.slug)}">${esc(conceptIcon(unit))}</span><strong>${esc(unit.title)}</strong></td>
        <td><span class="status-pill ${status === "At Risk" ? "risk" : "good"}">${esc(status)}</span></td>
        <td>${esc(metric[0])}</td>
        <td><span class="${/^-/.test(metric[1]) ? "negative" : /^\+/.test(metric[1]) ? "positive" : "neutral"}">${esc(metric[1])}</span></td>
        <td>${esc(metric[2])}</td>
      </tr>`;
    }).join("");
  }

  function executiveQueueItems() {
    return [
      { signal: signalFor("CFO-002"), priority: "High", action: "Resolve open reclasses before final close", owner: "Controller", due: "May 16, 2025", unitIcon: "controller-close" },
      { signal: signalFor("CFO-003"), priority: "High", action: "Deploy plan to reduce ICR gap to <= $10M", owner: "SR Finance", due: "May 30, 2025", unitIcon: "sponsored-research-icr" },
      { signal: signalFor("CFO-005"), priority: "Medium", action: "Approve cash investment strategy update", owner: "Treasury", due: "May 23, 2025", unitIcon: "treasury-liquidity" },
      { signal: signalFor("CFO-013"), priority: "Medium", action: "Validate FY26 unit target submissions", owner: "Budgeting", due: "May 20, 2025", unitIcon: "budget-planning" },
      { signal: signalFor("CFO-007"), priority: "Low", action: "Review top 10 capital project risks", owner: "Capital Facilities", due: "May 27, 2025", unitIcon: "capital-facilities" }
    ].filter(function (item) { return item.signal; });
  }

  function renderExecutiveQueue() {
    const body = document.getElementById("executiveQueueBody");
    if (!body) return;
    body.innerHTML = executiveQueueItems().map(function (item) {
      return `<tr class="concept-row" tabindex="0" data-signal-id="${esc(item.signal.id)}">
        <td><span class="priority-tag ${esc(item.priority.toLowerCase())}">${esc(item.priority)}</span></td>
        <td>${esc(item.action)}</td>
        <td>${esc(item.owner)}</td>
        <td class="due-date">${esc(item.due)}</td>
        <td><span class="unit-round ${esc(item.unitIcon)}">${esc(conceptIcon(item.unitIcon))}</span></td>
      </tr>`;
    }).join("");
  }

  function signalOption(signal) {
    return `<option value="${esc(signal.id)}">${esc(signal.id)} - ${esc(signal.title)}</option>`;
  }

  function renderCommandBoard() {
    const board = document.getElementById("commandBoard");
    if (!board) return;
    const responses = responseLog();
    const notes = noteLog();
    const cfoSelect = document.getElementById("cfoNoteSignal");
    const contactSelect = document.getElementById("contactSignalSelect");
    if (cfoSelect && !cfoSelect.options.length) cfoSelect.innerHTML = signals.map(signalOption).join("");
    if (contactSelect && !contactSelect.options.length) {
      contactSelect.innerHTML = executiveQueueItems().map(function (item) { return signalOption(item.signal); }).join("");
      contactSelect.addEventListener("change", updateContactMini);
    }
    const count = document.getElementById("responseCount");
    if (count) count.textContent = responses.length + " logged";
    const mini = document.getElementById("responseStatusMini");
    if (mini) {
      mini.textContent = responses.length
        ? responses[0].signalId + " - " + responses[0].choice + " by " + responses[0].submittedBy + " (" + responses[0].timestamp + ")"
        : "No owner response has been logged in this local dashboard session.";
    }
    const stream = document.getElementById("automationStream");
    if (stream) {
      stream.innerHTML = automationLog().slice(0, 4).map(function (row) {
        return `<div><span>${esc(row.level)}</span><p>${esc(row.text)}</p><em>${esc(row.time)}</em></div>`;
      }).join("");
    }
    const noteStatus = document.getElementById("cfoNoteText");
    if (noteStatus && notes[0]) noteStatus.placeholder = "Latest note: " + notes[0].signalId + " - " + notes[0].text;
    updateContactMini();
  }

  function updateContactMini() {
    const select = document.getElementById("contactSignalSelect");
    const mini = document.getElementById("contactRouteMini");
    if (!select || !mini) return;
    const signal = signalFor(select.value) || executiveQueueItems()[0]?.signal;
    if (!signal) return;
    const contact = contactForSignal(signal);
    mini.textContent = contact.team + " | " + contact.email + " | " + signal.due;
  }

  function responseStatusCard(signal) {
    const latest = latestResponse(signal.id);
    const notes = noteCountFor(signal.id);
    if (!latest && !notes) {
      return `<section class="modal-section response-state empty"><h3>Response status</h3><p>No owner response or CFO note has been logged yet. Use Response Command to capture status, comment, progress, and evidence.</p></section>`;
    }
    return `<section class="modal-section response-state"><h3>Response status</h3>
      ${latest ? `<div class="response-summary"><span>${esc(latest.choice)}</span><strong>${esc(latest.submittedBy)}</strong><p>${esc(latest.comment)}</p><em>${esc(latest.timestamp)} | Progress ${esc(latest.progress)}%</em></div>` : `<p>No owner response logged yet.</p>`}
      <p>${esc(notes)} CFO note(s) attached to this Signal ID.</p>
    </section>`;
  }

  function openResponseCenter() {
    const rows = signals.map(function (signal) {
      const latest = latestResponse(signal.id);
      const unit = unitFor(signal.unit);
      return `<tr>
        <td><strong>${esc(signal.id)}</strong><br><span>${esc(signal.title)}</span></td>
        <td>${esc(unit ? unit.title : signal.unit)}</td>
        <td>${esc(signal.owner)}</td>
        <td>${esc(signal.due)}</td>
        <td>${latest ? `<span class="response-chip">${esc(latest.choice)}</span><small>${esc(latest.timestamp)}</small>` : `<span class="response-chip pending">No response</span>`}</td>
        <td><button class="mini-command" type="button" data-response-command="${esc(signal.id)}">Respond</button><button class="mini-command" type="button" data-contact-command="${esc(signal.id)}">Contact</button></td>
      </tr>`;
    }).join("");
    const body = `
      <section class="modal-section"><h3>Response Center</h3><p>Use this as the CFO action log. It follows the original suite pattern: owner responses are separate records linked by stable Signal ID.</p></section>
      <div class="response-table-wrap"><table class="response-table">
        <thead><tr><th>Signal</th><th>Unit</th><th>Owner</th><th>Due</th><th>Latest response</th><th>Command</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <section class="modal-section data-rule"><h3>Production data rule</h3><p>${esc(dataSeparationRule)}</p></section>`;
    const foot = `<button class="ghost-button" type="button" id="copyDataRuleFromModal">Copy data rule</button><button class="ghost-button" type="button" id="exportSignalsBtn">Export CSV</button>`;
    openModal("Response command", "CFO Response Center", body, foot);
  }

  function openResponseCommand(signalId, preset) {
    const signal = signalFor(signalId);
    if (!signal) return;
    const latest = latestResponse(signal.id);
    const choices = responseChoices.map(function (choice) {
      const selected = choice === (preset || latest?.choice || "On track") ? " selected" : "";
      return `<option value="${esc(choice)}"${selected}>${esc(choice)}</option>`;
    }).join("");
    const body = `
      ${metaGrid([["Signal ID", signal.id], ["Owner", signal.owner], ["Due", signal.due], ["Impact", signal.impact]])}
      <section class="modal-section"><h3>Response command</h3><p>${esc(signal.action)}</p></section>
      <div class="response-form">
        <label for="responseChoice">Owner status</label>
        <select id="responseChoice">${choices}</select>
        <label for="responseSubmittedBy">Submitted by owner/team</label>
        <input id="responseSubmittedBy" type="text" value="${esc(latest?.submittedBy || "")}" placeholder="Owner name, HarvardKey, team, or role">
        <label for="responseComment">Comment / blocker / decision needed</label>
        <textarea id="responseComment" placeholder="Example: Evidence is attached; one vendor item remains open; can meet Friday deadline if AP confirms aging list by noon.">${esc(latest?.comment || "")}</textarea>
        <label for="responseProgress">Progress %</label>
        <input id="responseProgress" type="range" min="0" max="100" value="${esc(latest?.progress || "50")}">
        <label for="responseEvidence">Evidence link or source row</label>
        <input id="responseEvidence" type="text" value="${esc(latest?.evidence || "")}" placeholder="Paste evidence link, source row, packet, or response log reference">
      </div>
      <section class="modal-section data-rule"><h3>Data automation rule</h3><p>${esc(dataSeparationRule)}</p></section>`;
    const foot = `<button class="ghost-button" type="button" data-contact-command="${esc(signal.id)}">Contact owner team</button><a class="ghost-button" href="${esc(responseUrl(signal, preset || "On track"))}" target="_blank" rel="noopener">Open Apps Script link</a><button class="primary-button" type="button" data-submit-response="${esc(signal.id)}">Submit owner response</button>`;
    openModal("Owner response", signal.id + " - " + signal.title, body, foot);
    updateHash("respond", signal.id);
  }

  function openContactTeam(signalId) {
    const signal = signalFor(signalId);
    if (!signal) return;
    const contact = contactForSignal(signal);
    const unit = unitFor(signal.unit);
    const latest = latestResponse(signal.id);
    const body = `
      ${metaGrid([["Team", contact.team], ["Email", contact.email], ["Signal", signal.id], ["Due", signal.due]])}
      <section class="modal-section owner-command-panel">
        <div class="owner-command-head">
          <div><h3>Owner response command card</h3><p>Use this scan card for email, team follow-up, or local response capture.</p></div>
          <span class="status-chip ${statusClass(signal.status)}">${esc(signal.status)}</span>
        </div>
        <div class="owner-action-grid">
          <article><span>Unit</span><strong>${esc(unit ? unit.title : signal.unit)}</strong><p>${esc(unit ? unit.materiality : signal.impact)}</p></article>
          <article><span>Owner route</span><strong>${esc(signal.owner)}</strong><p>${esc(contact.team)}</p></article>
          <article><span>CFO ask</span><strong>${esc(signal.priority)}</strong><p>${esc(signal.action)}</p></article>
          <article><span>Evidence needed</span><strong>Source row</strong><p>${esc(signal.source)}</p></article>
          <article><span>Current response</span><strong>${esc(latest ? latest.choice : "Pending")}</strong><p>${esc(latest ? latest.timestamp : "No owner response logged")}</p></article>
          <article><span>Due date</span><strong>${esc(signal.due)}</strong><p>${esc(signal.impact)}</p></article>
        </div>
      </section>
      <section class="modal-section email-command-panel">
        <div class="owner-email-head">
          <h3>Email command packet</h3>
          <span>Prompt + submit workflow</span>
        </div>
        <div class="email-command-grid">
          <article class="email-command-main">
            <span>To / route</span>
            <strong>${esc(contact.team)}</strong>
            <p>${esc(contact.email)}</p>
            <div class="email-command-actions">
              <button class="command-primary" type="button" data-response-command="${esc(signal.id)}">Submit owner response</button>
              <a class="command-secondary" href="${esc(mailtoForSignal(signal))}">Open email draft</a>
            </div>
          </article>
          <article><span>Subject</span><strong>FAS CFO response requested: ${esc(signal.id)}</strong><p>${esc(signal.title)}</p></article>
          <article><span>CFO ask</span><strong>${esc(signal.priority)}</strong><p>${esc(signal.action)}</p></article>
          <article><span>Evidence request</span><strong>Source row / packet</strong><p>${esc(signal.source)}</p></article>
        </div>
      </section>
      <section class="modal-section"><h3>Click-to-submit prompt survey</h3><p class="modal-help">Choose an owner status below. The button opens the Response Command form with that status selected, then the owner/team can add name, blocker, progress, and evidence before submitting.</p><div class="prompt-survey-grid">${responseChoices.map(function (choice) {
        return `<button type="button" data-response-command="${esc(signal.id)}" data-response-preset="${esc(choice)}"><b>Submit: ${esc(choice)}</b><span>${esc(surveyHelp(choice))}</span></button>`;
      }).join("")}</div></section>
      <section class="modal-section"><h3>Control response checklist</h3><div class="control-response-grid">
        <article><b>1</b><span>Status</span><p>Select the owner condition above.</p></article>
        <article><b>2</b><span>Blocker</span><p>Name the CFO decision, dependency, or risk.</p></article>
        <article><b>3</b><span>Progress</span><p>Add percent complete or next checkpoint.</p></article>
        <article><b>4</b><span>Evidence</span><p>Attach source row, packet, or link.</p></article>
      </div></section>
      <section class="modal-section owner-email-preview">
        <div class="owner-email-head">
          <h3>Email response infographic</h3>
          <span>Scan before sending</span>
        </div>
        <div class="owner-email-grid">
          <article><b>1. Review ask</b><span>${esc(signal.action)}</span></article>
          <article><b>2. Pick status</b><span>${esc(responseChoices.join(" | "))}</span></article>
          <article><b>3. Submit response</b><span>Use the prompt button to log owner/team status by Signal ID.</span></article>
          <article><b>4. Attach evidence</b><span>${esc(signal.source)}</span></article>
          <article><b>5. Email route</b><span>${esc(contact.email)} | due ${esc(signal.due)}</span></article>
          <article><b>6. Preserve controls</b><span>Source facts and owner responses stay separate.</span></article>
        </div>
      </section>`;
    const foot = `<button class="ghost-button" type="button" data-copy-owner-card="${esc(signal.id)}">Copy email packet</button><button class="primary-button" type="button" data-response-command="${esc(signal.id)}">Submit owner response</button><a class="ghost-button" href="${esc(mailtoForSignal(signal))}">Open email draft</a>`;
    openModal("Contact team", "Contact " + contact.team, body, foot);
    updateHash("contact", signal.id);
  }

  function previewOwnerCard() {
    const select = document.getElementById("contactSignalSelect");
    const signal = signalFor(select?.value) || executiveQueueItems()[0]?.signal || signals[0];
    if (signal) openContactTeam(signal.id);
  }

  function syncOwnerResponses() {
    const rows = responseLog();
    appendAutomation("SYNC", "Checked owner-response log. " + rows.length + " local response record(s) retained; source facts unchanged.");
    toast("Owner response sync check complete.");
  }

  function dueDays(due) {
    const value = new Date(due + " 12:00");
    if (Number.isNaN(value.getTime())) return 999;
    return Math.max(0, Math.ceil((value.getTime() - Date.now()) / 86400000));
  }

  function impactScore(impact) {
    const value = String(impact || "");
    const match = value.match(/\$?([\d.]+)\s*([BM])?/i);
    if (!match) return /agenda|publish|deck/i.test(value) ? 18 : 8;
    const amount = Number(match[1]);
    if (!Number.isFinite(amount)) return 8;
    return match[2] && match[2].toUpperCase() === "B" ? Math.min(55, amount * 12) : Math.min(45, amount / 12);
  }

  function priorityScore(signal) {
    const priority = { P1: 32, P2: 22, P3: 12 }[signal.priority] || 8;
    const status = { "At risk": 34, "Human review": 26, "On track": 10 }[signal.status] || 12;
    const urgency = Math.max(0, 28 - dueDays(signal.due));
    const latest = latestResponse(signal.id);
    const response = latest
      ? ({ Blocked: 18, "At risk": 12, "Need time": 10, Reassign: 8, Revise: 6, "On track": -8 }[latest.choice] || 0)
      : 9;
    return Math.max(0, Math.round(priority + status + urgency + impactScore(signal.impact) + response));
  }

  function commandSignalRows() {
    return signals.map(function (signal) {
      return { signal: signal, score: priorityScore(signal), days: dueDays(signal.due), latest: latestResponse(signal.id) };
    }).sort(function (a, b) {
      return b.score - a.score || a.days - b.days;
    });
  }

  function briefingScript() {
    const top = commandSignalRows().slice(0, 3).map(function (item) {
      return item.signal.id + ": " + item.signal.title + " | " + item.signal.action;
    }).join("\n");
    return [
      "FAS CFO 90-second system report",
      "0:00-0:15 | Architecture: source facts, local CFO notes, and owner responses stay in separate controlled records.",
      "0:15-0:45 | Priority queue: the command center sorts by impact, due date, status, and owner response condition.",
      "0:45-1:15 | Sync and routing: owner cards, evidence links, and comments are logged by stable Signal ID.",
      "1:15-1:30 | Notification close: route blockers to the owner team and confirm the next CFO decision.",
      "",
      "Top current signals:",
      top
    ].join("\n");
  }

  function commandTimeline() {
    return [
      ["0:00", "Architecture", "Separate source facts from CFO notes and owner response records."],
      ["0:15", "Priority Sort", "Show top risks by materiality, deadline pressure, and response state."],
      ["0:45", "Owner Routing", "Open response commands and clean contact cards for accountable teams."],
      ["1:15", "Decision Close", "Copy report script or export queue for the CFO briefing packet."]
    ];
  }

  function renderCommandCenter() {
    const root = document.getElementById("commandCenterRoot");
    if (!root) return;
    const rows = commandSignalRows();
    const top = rows[0];
    const responses = responseLog();
    const notes = noteLog();
    const automation = automationLog();
    root.innerHTML = `
      <section class="cc-hero">
        <div class="cc-hero-copy">
          <p class="section-kicker">Actionable CFO workspace</p>
          <h2>Command Center</h2>
          <p>Offline response capture, deterministic priority sorting, owner routing, data automation, and report-studio controls in one screen-fit board.</p>
        </div>
        <div class="cc-hero-actions">
          <button class="primary-button" type="button" id="openResponseFromCommand">Open Response Center</button>
          <button class="ghost-button" type="button" id="runCommandSync">Sync Owner Responses</button>
          <a class="ghost-button" href="dashboard_FASCFO.html">Open Dashboard</a>
        </div>
      </section>

      <section class="cc-metrics" aria-label="Command center status">
        <article><span>Top Score</span><strong>${esc(top ? top.score : 0)}</strong><p>${esc(top ? top.signal.id : "None")} priority engine output</p></article>
        <article><span>Owner Responses</span><strong>${esc(responses.length)}</strong><p>Local-first response records</p></article>
        <article><span>CFO Notes</span><strong>${esc(notes.length)}</strong><p>Attached by stable Signal ID</p></article>
        <article><span>Sync Mode</span><strong>${navigator.onLine ? "Online" : "Offline"}</strong><p>Local queue remains available</p></article>
      </section>

      <section class="cc-grid">
        <article class="cc-panel cc-options-panel">
          <div class="cc-panel-head">
            <div><h3>Command Options</h3><p>Revised from the pasted architecture into CFO-specific controls.</p></div>
            <button class="cc-text-button" type="button" data-command-run="data-rule">Copy data rule</button>
          </div>
          <div class="cc-option-grid">
            ${commandCenterOptions.map(function (option) {
              return `<button class="cc-option" type="button" data-command-option="${esc(option.id)}">
                <span class="cc-option-icon">${esc(option.icon)}</span>
                <b>${esc(option.title)}</b>
                <em class="${esc(statusClass(option.status))}">${esc(option.status)}</em>
                <p>${esc(option.text)}</p>
              </button>`;
            }).join("")}
          </div>
        </article>

        <aside class="cc-panel">
          <div class="cc-panel-head">
            <div><h3>CFO Quick Note</h3><p>Capture a decision, blocker, or follow-up without changing source facts.</p></div>
          </div>
          <div class="cc-note-box">
            <select class="command-input" id="cfoNoteSignal" aria-label="Select signal for CFO note">${signals.map(signalOption).join("")}</select>
            <textarea class="command-textarea compact" id="cfoNoteText" placeholder="Add CFO note, decision, blocker, or follow-up instruction."></textarea>
            <button class="command-primary full" type="button" id="saveCfoNoteBtn">Save Note</button>
          </div>
          <div class="cc-mini-log">
            ${automation.slice(0, 3).map(function (row) {
              return `<div><b>${esc(row.level)}</b><span>${esc(row.text)}</span></div>`;
            }).join("")}
          </div>
        </aside>
      </section>

      <section class="cc-lower-grid">
        <article class="cc-panel cc-priority-panel">
          <div class="cc-panel-head">
            <div><h3>Deterministic Priority Queue</h3><p>Score = priority + status + due date + materiality + response state.</p></div>
            <button class="cc-text-button" type="button" id="openTopPriorityBtn">Open top signal</button>
          </div>
          <div class="cc-table-wrap">
            <table class="cc-table">
              <thead><tr><th>Score</th><th>Signal</th><th>Owner</th><th>Due</th><th>Command</th></tr></thead>
              <tbody>${rows.slice(0, 6).map(function (item) {
                const signal = item.signal;
                return `<tr data-signal-id="${esc(signal.id)}">
                  <td><strong>${esc(item.score)}</strong></td>
                  <td><b>${esc(signal.id)}</b><span>${esc(signal.title)}</span></td>
                  <td>${esc(signal.owner)}</td>
                  <td>${esc(signal.due)}</td>
                  <td><button class="mini-command" type="button" data-response-command="${esc(signal.id)}">Respond</button><button class="mini-command" type="button" data-contact-command="${esc(signal.id)}">Contact</button></td>
                </tr>`;
              }).join("")}</tbody>
            </table>
          </div>
        </article>

        <article class="cc-panel">
          <div class="cc-panel-head"><div><h3>Report Timeline</h3><p>Compact executive walkthrough for the dashboard.</p></div></div>
          <div class="cc-timeline">
            ${commandTimeline().map(function (row) {
              return `<div><time>${esc(row[0])}</time><b>${esc(row[1])}</b><span>${esc(row[2])}</span></div>`;
            }).join("")}
          </div>
          <button class="command-secondary full" type="button" id="copyBriefingScriptBtn">Copy 90-sec script</button>
        </article>

        <article class="cc-panel">
          <div class="cc-panel-head"><div><h3>Briefing Studio</h3><p>Resource monitor, preview, and timeline readiness.</p></div></div>
          <div class="cc-studio">
            <div><b>Assets</b><span>Dashboard, response card, data rule, priority queue</span></div>
            <div><b>Preview</b><span>90-second CFO system report</span></div>
            <div><b>Timeline</b><span>4 scenes with owner-routing close</span></div>
            <div><b>Render State</b><span>Storyboard ready</span></div>
          </div>
          <button class="command-secondary full" type="button" data-command-run="studio-ready">Mark studio ready</button>
        </article>
      </section>`;
  }

  function topSignalForUnit(slug) {
    const scored = commandSignalRows().find(function (item) { return item.signal.unit === slug; });
    return scored ? scored.signal : signals.find(function (signal) { return signal.unit === slug; });
  }

  function suiteUnitCard(unit, groupKey) {
    const primarySignal = topSignalForUnit(unit.slug);
    const count = signals.filter(function (signal) { return signal.unit === unit.slug; }).length;
    const metric = unitMetric(unit);
    return `<article class="intel-unit-card ${esc(groupKey)}">
      <div class="intel-unit-top">
        <span class="unit-round ${esc(unit.slug)}">${esc(conceptIcon(unit))}</span>
        <div>
          <h3>${esc(unit.title)}</h3>
          <p>${esc(unit.summary)}</p>
        </div>
        <span class="status-chip ${statusClass(unit.status)}">${esc(unit.status)}</span>
      </div>
      <div class="intel-unit-stats">
        <div><span>Key metric</span><strong>${esc(metric[0])}</strong><em>${esc(metric[2])}</em></div>
        <div><span>Signals</span><strong>${esc(count)}</strong><em>${esc(primarySignal ? primarySignal.priority : "None")}</em></div>
        <div><span>Materiality</span><strong>${esc(unit.materiality)}</strong><em>${esc(unit.due)}</em></div>
      </div>
      <div class="intel-decision"><span>Next CFO decision</span><p>${esc(unit.decision)}</p></div>
      <div class="intel-unit-actions">
        <button class="mini-command" type="button" data-open-unit="${esc(unit.slug)}">Unit brief</button>
        ${primarySignal ? `<button class="mini-command" type="button" data-response-command="${esc(primarySignal.id)}">Respond</button><button class="mini-command" type="button" data-contact-command="${esc(primarySignal.id)}">Contact</button>` : ""}
        <a class="mini-command link" href="${esc(unit.href)}">Page</a>
      </div>
    </article>`;
  }

  function intelligenceQueueRow(item) {
    const signal = item.signal;
    const unit = unitFor(signal.unit);
    return `<tr data-signal-id="${esc(signal.id)}">
      <td><strong>${esc(item.score)}</strong><span>${esc(signal.priority)}</span></td>
      <td><b>${esc(signal.id)}</b><span>${esc(signal.title)}</span></td>
      <td>${esc(unit ? unit.title : signal.unit)}</td>
      <td>${esc(signal.owner)}</td>
      <td>${esc(signal.due)}</td>
      <td><button class="mini-command" type="button" data-response-command="${esc(signal.id)}">Respond</button><button class="mini-command" type="button" data-contact-command="${esc(signal.id)}">Contact</button></td>
    </tr>`;
  }

  function surveyHelp(choice) {
    const map = {
      "On track": "Confirm no CFO intervention needed",
      "At risk": "Name the risk and mitigation path",
      "Need time": "Request date change with reason",
      Blocked: "Identify blocker and decision owner",
      Reassign: "Route to a different accountable owner",
      Revise: "Update action, evidence, or scope"
    };
    return map[choice] || "Log response";
  }

  function intelligenceCommandBoardHtml() {
    return `
      <section class="command-board intel-command-board" id="commandBoard" aria-labelledby="commandBoardTitle">
        <div class="command-board-head">
          <div>
            <h3 id="commandBoardTitle">CFO Action Command Board</h3>
            <p>Log owner responses, add CFO notes, contact the accountable team, and keep data automation separate from source facts.</p>
          </div>
          <div class="command-board-actions">
            <button class="command-primary" type="button" id="openResponseCenterBtn">Open Response Center</button>
            <button class="command-secondary" type="button" id="syncOwnerResponsesBtn">Sync Owner Responses</button>
          </div>
        </div>

        <div class="command-grid">
          <article class="command-card">
            <span class="command-label">Owner Response Status</span>
            <strong id="responseCount">0 logged</strong>
            <p id="responseStatusMini">No owner response has been logged in this local dashboard session.</p>
            <button class="command-link" type="button" id="previewOwnerCardBtn">Preview owner response card</button>
          </article>

          <article class="command-card">
            <span class="command-label">Add CFO Note</span>
            <select class="command-input" id="cfoNoteSignal" aria-label="Select signal for CFO note"></select>
            <textarea class="command-textarea" id="cfoNoteText" placeholder="Add CFO note, blocker, decision, or follow-up instruction."></textarea>
            <button class="command-primary full" type="button" id="saveCfoNoteBtn">Save Note</button>
          </article>

          <article class="command-card">
            <span class="command-label">Contact Team</span>
            <select class="command-input" id="contactSignalSelect" aria-label="Select signal for team contact"></select>
            <p id="contactRouteMini">Select a signal to generate a clean owner-response card.</p>
            <div class="command-pair">
              <button class="command-secondary" type="button" id="contactTeamBtn">Email Team</button>
              <button class="command-secondary" type="button" id="copyOwnerCardBtn">Copy Card</button>
            </div>
          </article>

          <article class="command-card automation-card">
            <span class="command-label">Data Automation</span>
            <div class="automation-stream" id="automationStream"></div>
            <p class="automation-rule"><strong>Data rule:</strong> source refresh updates facts only; comments, evidence, email attempts, and owner responses stay separate by Signal ID.</p>
            <button class="command-link" type="button" id="copyDataRuleBtn">Copy data rule</button>
          </article>
        </div>
      </section>`;
  }

  function renderIntelligenceSuite() {
    const root = document.getElementById("intelligenceSuiteRoot");
    if (!root) return;
    const rows = commandSignalRows();
    const top = rows[0];
    const responses = responseLog();
    const externalUnits = suiteGroups.find(function (group) { return group.key === "external"; })?.units || [];
    const externalExposure = signals.filter(function (signal) { return externalUnits.includes(signal.unit) && signal.status !== "On track"; }).length;
    root.innerHTML = `
      <section class="intel-hero">
        <div>
          <h2>FAS CFO Intelligence Suite</h2>
          <p>Action report organized into internal CFO operating units and external or partner-facing lanes. Use this page to scan risk, route work, capture owner response, and keep evidence controls out of the CFO first-read path.</p>
        </div>
        <div class="intel-hero-actions">
          <button class="primary-button" type="button" id="openResponseFromCommand">Open Response Center</button>
          <button class="ghost-button" type="button" id="openTopPriorityBtn">Open Top Signal</button>
          <a class="ghost-button" href="dashboard_FASCFO.html">Compact Dashboard</a>
          <a class="ghost-button" href="#control-library">Control Library</a>
        </div>
      </section>

      <section class="intel-kpis" aria-label="Intelligence suite status">
        <article><span>Top Score</span><strong>${esc(top ? top.score : 0)}</strong><p>${esc(top ? top.signal.id + " - " + top.signal.title : "No open signals")}</p></article>
        <article><span>At Risk</span><strong>${esc(signals.filter(function (signal) { return signal.status === "At risk"; }).length)}</strong><p>Owner response or CFO decision required</p></article>
        <article><span>External Exposure</span><strong>${esc(externalExposure)}</strong><p>Research, donor, capital, or revenue lanes</p></article>
        <article><span>Response Records</span><strong>${esc(responses.length)}</strong><p>Local records attached by Signal ID</p></article>
      </section>

      ${intelligenceCommandBoardHtml()}

      <section class="intel-layout">
        <div class="intel-main">
          ${suiteGroups.map(function (group) {
            return `<section class="intel-section" aria-label="${esc(group.title)}">
              <div class="intel-section-head">
                <div><h3>${esc(group.title)}</h3><p>${esc(group.summary)}</p></div>
                <span>${esc(group.label)}</span>
              </div>
              <div class="intel-unit-grid">${group.units.map(unitFor).filter(Boolean).map(function (unit) { return suiteUnitCard(unit, group.key); }).join("")}</div>
            </section>`;
          }).join("")}
        </div>

        <aside class="intel-rail">
          <article class="intel-rail-card">
            <h3>FAS Finance Office Lens</h3>
            <p>FAS Finance service language emphasizes financial integrity, safeguarded assets, optimal resource use, and informed decisions. This page translates that into CFO routing lanes.</p>
            <div class="fas-lens-list">
              ${fasOfficeLens.map(function (item) { return `<div><b>${esc(item[0])}</b><span>${esc(item[1])}</span></div>`; }).join("")}
            </div>
            <a class="link-button" href="https://finance.fas.harvard.edu/pages/services" target="_blank" rel="noopener">Official FAS Finance services</a>
          </article>
          <article class="intel-rail-card archive-card">
            <h3>Source Intelligence Archive</h3>
            <p>The original full dashboard file is retained as the archive record. This homepage is the daily action surface for the CFO.</p>
            <a class="command-secondary full" href="legacy_FASCFO/FAS_CFO_Dashboard_Data_Pipeline_Monitor_FASCFO.html">Open archive file</a>
          </article>
          <article class="intel-rail-card data-rule">
            <h3>Data Automation Rule</h3>
            <p>${esc(dataSeparationRule)}</p>
            <button class="command-secondary full" type="button" data-command-run="data-rule">Copy data rule</button>
          </article>
          <article class="intel-rail-card">
            <h3>Quick Response Prompt</h3>
            <div class="prompt-survey-grid compact">${responseChoices.map(function (choice) {
              const signal = top ? top.signal : signals[0];
              return `<button type="button" data-response-command="${esc(signal.id)}" data-response-preset="${esc(choice)}"><b>${esc(choice)}</b><span>${esc(surveyHelp(choice))}</span></button>`;
            }).join("")}</div>
          </article>
        </aside>
      </section>

      <section class="intel-decision-panel">
        <div class="intel-section-head">
          <div><h3>Decision Queue</h3><p>Sorted by materiality, due date, status, priority, and response state.</p></div>
          <button class="cc-text-button" type="button" id="exportSignalsBtn">Export CSV</button>
        </div>
        <div class="cc-table-wrap">
          <table class="cc-table intel-table">
            <thead><tr><th>Score</th><th>Signal</th><th>Unit</th><th>Owner</th><th>Due</th><th>Command</th></tr></thead>
            <tbody>${rows.slice(0, 8).map(intelligenceQueueRow).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="control-library" id="control-library">
        <details>
          <summary>
            <span>
              <b>Control Library</b>
              <em>Unit-record rules live here instead of being repeated on every unit page.</em>
            </span>
          </summary>
          <div class="control-library-toolbar"><a class="cc-text-button" href="pages_FASCFO/technical-reference_FASCFO.html">Open Data Dictionary</a></div>
          <div class="control-library-grid">
            ${governanceLibrary.map(function (item) { return `<article><span>Suite rule</span><h4>${esc(item[0])}</h4><p>${esc(item[1])}</p></article>`; }).join("")}
            ${units.map(function (unit) {
              return `<article><span>${esc(unit.short)}</span><h4>${esc(unit.title)}</h4><p>${esc(unit.controls.join(" "))}</p></article>`;
            }).join("")}
          </div>
        </details>
      </section>`;
  }

  function openCommandOption(optionId) {
    const option = commandCenterOptions.find(function (item) { return item.id === optionId; });
    if (!option) return;
    const topRows = commandSignalRows().slice(0, 4);
    const detail = option.id === "priority-engine"
      ? `<div class="response-table-wrap"><table class="response-table"><thead><tr><th>Score</th><th>Signal</th><th>Owner</th><th>Command</th></tr></thead><tbody>${topRows.map(function (item) {
          return `<tr><td>${esc(item.score)}</td><td><strong>${esc(item.signal.id)}</strong><br>${esc(item.signal.title)}</td><td>${esc(item.signal.owner)}</td><td><button class="mini-command" type="button" data-response-command="${esc(item.signal.id)}">Respond</button></td></tr>`;
        }).join("")}</tbody></table></div>`
      : `<section class="modal-section"><h3>Action pattern</h3><ul class="evidence-list">${option.actions.map(function (action) { return `<li>${esc(action)}</li>`; }).join("")}</ul></section>`;
    const body = `
      ${metaGrid([["Status", option.status], ["Mode", option.metric], ["Records", responseLog().length + " responses"], ["Notes", noteLog().length + " CFO notes"]])}
      <section class="modal-section"><h3>${esc(option.title)}</h3><p>${esc(option.text)}</p></section>
      ${detail}
      <section class="modal-section data-rule"><h3>Data automation rule</h3><p>${esc(dataSeparationRule)}</p></section>`;
    const foot = `<button class="ghost-button" type="button" data-command-run="sync">Run sync check</button><button class="ghost-button" type="button" data-command-run="briefing">Copy report script</button><button class="primary-button" type="button" data-command-run="response">Open Response Center</button>`;
    openModal("Command option", option.title, body, foot);
  }

  function runCommandAction(action) {
    if (action === "sync") {
      syncOwnerResponses();
      return;
    }
    if (action === "data-rule") {
      copyText(dataSeparationRule);
      return;
    }
    if (action === "briefing") {
      copyText(briefingScript());
      return;
    }
    if (action === "response") {
      openResponseCenter();
      return;
    }
    if (action === "studio-ready") {
      appendAutomation("STUDIO", "Briefing studio storyboard marked ready for CFO report packaging.");
      toast("Briefing studio marked ready.");
    }
  }

  function metricCards() {
    const metrics = [
      ["Active signals", signals.length, "Grouped into unit pages, not one long scroll."],
      ["At-risk signals", signals.filter(function (s) { return s.status === "At risk"; }).length, "Require CFO attention or owner escalation."],
      ["Human review", signals.filter(function (s) { return s.status === "Human review"; }).length, "Need named reviewer disposition."],
      ["Reporting units", units.length, "CFO organization map for navigation."]
    ];
    const strip = document.getElementById("metricStrip");
    if (!strip) return;
    strip.innerHTML = metrics.map(function (metric) {
      const key = metric[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return `<button class="metric-card" type="button" data-metric="${esc(key)}"><span>${esc(metric[0])}</span><strong>${esc(metric[1])}</strong><p>${esc(metric[2])}</p></button>`;
    }).join("");
  }

  function unitCard(unit) {
    return `<article class="unit-card" role="button" tabindex="0" data-unit="${esc(unit.slug)}" data-search="${esc([unit.title, unit.owner, unit.materiality, unit.summary, unit.status].join(" ").toLowerCase())}">
      <div class="unit-card-head">
        <div><h3>${esc(unit.title)}</h3><p>${esc(unit.summary)}</p></div>
        <span class="status-chip ${statusClass(unit.status)}">${esc(unit.status)}</span>
      </div>
      <div class="unit-microgrid">
        <div><span>Owner route</span><strong>${esc(unit.owner)}</strong></div>
        <div><span>Due</span><strong>${esc(unit.due)}</strong></div>
        <div><span>Materiality</span><strong>${esc(unit.materiality)}</strong></div>
      </div>
      <div class="unit-card-actions">
        <button class="small-button" type="button" data-open-unit="${esc(unit.slug)}">Drill down</button>
        <a class="link-button" href="${esc(unit.href)}">Open ${esc(unit.short)} page</a>
      </div>
    </article>`;
  }

  function renderUnitGrid() {
    const grid = document.getElementById("unitGrid");
    if (!grid) return;
    grid.innerHTML = units.map(unitCard).join("");
  }

  function signalRow(signal, showUnit) {
    const unit = unitFor(signal.unit);
    const unitCell = unit ? `<a class="link-button" href="${esc(unit.href)}">${esc(unit.short)}</a>` : "";
    return `<tr class="signal-row" tabindex="0" data-signal-id="${esc(signal.id)}" data-status="${esc(signal.status)}" data-search="${esc([signal.title, signal.owner, signal.status, signal.action, signal.source, unit && unit.title].join(" ").toLowerCase())}">
      <td><div class="signal-title">${esc(signal.title)}</div><div class="signal-sub">${esc(signal.id)} | ${esc(signal.impact)} | ${esc(signal.source)}</div></td>
      ${showUnit ? `<td>${unitCell}</td>` : ""}
      <td>${esc(signal.owner)}</td>
      <td>${esc(signal.due)}</td>
      <td><span class="status-chip ${statusClass(signal.status)}">${esc(signal.status)}</span></td>
      <td>${esc(signal.action)}</td>
    </tr>`;
  }

  function renderOverviewQueue() {
    const queue = document.getElementById("overviewQueue");
    if (!queue) return;
    const statusFilter = document.getElementById("statusFilter");
    const search = document.getElementById("overviewSearch");
    const apply = function () {
      const status = statusFilter ? statusFilter.value : "";
      const term = search ? search.value.trim().toLowerCase() : "";
      const rows = signals.filter(function (signal) {
        const unit = unitFor(signal.unit);
        const haystack = [signal.title, signal.owner, signal.status, signal.action, signal.source, unit && unit.title].join(" ").toLowerCase();
        return (!status || signal.status === status) && (!term || haystack.includes(term));
      });
      queue.innerHTML = rows.length ? rows.map(function (signal) { return signalRow(signal, true); }).join("") : `<tr><td colspan="6">No matching signals.</td></tr>`;
      filterUnitCards(term);
    };
    if (statusFilter) statusFilter.addEventListener("change", apply);
    if (search) search.addEventListener("input", apply);
    apply();
  }

  function filterUnitCards(term) {
    document.querySelectorAll(".unit-card").forEach(function (card) {
      const ok = !term || card.dataset.search.includes(term);
      card.style.display = ok ? "" : "none";
    });
  }

  function modalShell() {
    let modal = document.getElementById("detailModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "detailModal";
    modal.className = "modal-bg";
    modal.innerHTML = `
      <section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detailModalTitle">
        <div class="detail-modal-head">
          <div>
            <p class="modal-tag" id="detailModalTag">Detail</p>
            <h2 id="detailModalTitle">Dashboard detail</h2>
          </div>
          <button class="modal-close" type="button" data-close-modal aria-label="Close detail">Close</button>
        </div>
        <div class="detail-modal-body" id="detailModalBody"></div>
        <div class="detail-modal-foot" id="detailModalFoot"></div>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest("[data-close-modal]")) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
    return modal;
  }

  function openModal(tag, title, body, foot) {
    const modal = modalShell();
    document.getElementById("detailModalTag").textContent = tag;
    document.getElementById("detailModalTitle").textContent = title;
    document.getElementById("detailModalBody").innerHTML = body;
    document.getElementById("detailModalFoot").innerHTML = foot || "";
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    const close = modal.querySelector("[data-close-modal]");
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById("detailModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    clearHash();
  }

  function signalListForUnit(slug) {
    return signals.filter(function (signal) { return signal.unit === slug; });
  }

  function metaGrid(rows) {
    return `<div class="modal-meta-grid">${rows.map(function (row) {
      return `<div><span>${esc(row[0])}</span><strong>${esc(row[1])}</strong></div>`;
    }).join("")}</div>`;
  }

  function openUnitDetail(slug) {
    const unit = unitFor(slug);
    if (!unit) return;
    const unitSignals = signalListForUnit(unit.slug);
    const body = `
      ${metaGrid([["Status", unit.status], ["Owner route", unit.owner], ["Due", unit.due], ["Materiality", unit.materiality]])}
      <section class="modal-section"><h3>Decision</h3><p>${esc(unit.decision)}</p></section>
      <section class="modal-section"><h3>Metrics</h3><div class="modal-metrics">${unit.metrics.map(function (metric) {
        return `<div><span>${esc(metric[0])}</span><strong>${esc(metric[1])}</strong><small>${esc(metric[2])}</small></div>`;
      }).join("")}</div></section>
      <section class="modal-section"><h3>Open Signals</h3><div class="modal-signal-list">${unitSignals.map(function (signal) {
        return `<button type="button" data-signal-id="${esc(signal.id)}"><b>${esc(signal.id)} - ${esc(signal.title)}</b><span>${esc(signal.action)}</span></button>`;
      }).join("")}</div></section>
      <section class="modal-section"><h3>Controls</h3><ul>${unit.controls.map(function (control) { return `<li>${esc(control)}</li>`; }).join("")}</ul></section>`;
    const foot = `<button class="ghost-button" type="button" data-copy-unit="${esc(unit.slug)}">Copy unit brief</button><a class="primary-button" href="${esc(basePath + unit.href)}">Open full unit page</a>`;
    openModal("CFO reporting unit", unit.title, body, foot);
    updateHash("unit", unit.slug);
  }

  function openSignalDetail(id) {
    const signal = signalFor(id);
    if (!signal) return;
    const unit = unitFor(signal.unit);
    const body = `
      ${metaGrid([["Status", signal.status], ["Priority", signal.priority], ["Impact", signal.impact], ["Due", signal.due]])}
      <section class="modal-section"><h3>Owner route</h3><p>${esc(signal.owner)}</p></section>
      <section class="modal-section"><h3>Required action</h3><p>${esc(signal.action)}</p></section>
      <section class="modal-section"><h3>Source evidence</h3><p>${esc(signal.source)}</p></section>
      ${responseStatusCard(signal)}
      <section class="modal-section command-actions-modal"><h3>CFO commands</h3><div>
        <button type="button" data-response-command="${esc(signal.id)}">Response command</button>
        <button type="button" data-contact-command="${esc(signal.id)}">Contact owner team</button>
        <button type="button" data-copy-owner-card="${esc(signal.id)}">Copy owner card</button>
      </div></section>
      ${unit ? `<section class="modal-section"><h3>Reporting unit context</h3><p>${esc(unit.summary)}</p></section>` : ""}`;
    const foot = `${unit ? `<button class="ghost-button" type="button" data-open-unit="${esc(unit.slug)}">Open ${esc(unit.short)} drilldown</button><a class="ghost-button" href="${esc(basePath + unit.href)}">Full unit page</a>` : ""}<button class="primary-button" type="button" data-response-command="${esc(signal.id)}">Respond</button>`;
    openModal("Signal detail", signal.id + " - " + signal.title, body, foot);
    updateHash("signal", signal.id);
  }

  function openMetricDetail(metric) {
    const statusMap = {
      "at-risk-signals": "At risk",
      "human-review": "Human review"
    };
    if (statusMap[metric]) {
      const filter = document.getElementById("statusFilter");
      if (filter) {
        filter.value = statusMap[metric];
        filter.dispatchEvent(new Event("change"));
      }
      document.getElementById("overviewQueue")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Queue filtered to " + statusMap[metric] + ".");
      return;
    }
    const body = `
      ${metaGrid([["Signals", signals.length], ["Units", units.length], ["At risk", signals.filter(function (s) { return s.status === "At risk"; }).length], ["Human review", signals.filter(function (s) { return s.status === "Human review"; }).length]])}
      <section class="modal-section"><h3>How to use this dashboard</h3><p>Use the unit cards for CFO reporting-unit ownership, then use signal rows for owner, due date, source evidence, and required action. Search and status filters update the queue without leaving the page.</p></section>`;
    openModal("Portfolio summary", "FAS CFO interactive dashboard", body, `<button class="ghost-button" type="button" id="resetFiltersFromModal">Reset filters</button>`);
  }

  function openAllUnitsDetail() {
    const body = `<div class="modal-signal-list">${units.map(function (unit) {
      return `<button type="button" data-open-unit="${esc(unit.slug)}"><b>${esc(unit.title)} - ${esc(unit.status)}</b><span>${esc(unit.summary)}</span></button>`;
    }).join("")}</div>`;
    openModal("Reporting units", "All CFO reporting-unit pages", body, `<a class="primary-button" href="${esc(basePath)}pages_FASCFO/technical-reference_FASCFO.html">Technical reference</a>`);
  }

  function openQueueDetail() {
    const body = `<div class="modal-signal-list">${signals.map(function (signal) {
      const unit = unitFor(signal.unit);
      return `<button type="button" data-signal-id="${esc(signal.id)}"><b>${esc(signal.id)} - ${esc(signal.title)}</b><span>${esc(signal.status)} - ${esc(unit ? unit.title : signal.unit)} - ${esc(signal.action)}</span></button>`;
    }).join("")}</div>`;
    openModal("Action queue", "Full CFO action queue", body, `<button class="ghost-button" type="button" id="exportSignalsBtn">Export CSV</button>`);
  }

  function exportSignalsCsv() {
    const fields = ["id", "title", "unit", "owner", "due", "status", "priority", "impact", "source", "action"];
    const rows = [fields.join(",")].concat(signals.map(function (signal) {
      return fields.map(function (field) {
        return '"' + String(signal[field] == null ? "" : signal[field]).replace(/"/g, '""') + '"';
      }).join(",");
    }));
    const blob = new Blob([rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fas-cfo-interactive-signals.csv";
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 1000);
    toast("Signal CSV exported.");
  }

  function updateHash(kind, value) {
    if (!history.replaceState) return;
    history.replaceState(null, "", "#" + encodeURIComponent(kind) + "=" + encodeURIComponent(value));
  }

  function clearHash() {
    if (!history.replaceState || !location.hash) return;
    history.replaceState(null, "", location.pathname + location.search);
  }

  function openHashTarget() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    const parts = hash.split("=");
    if (parts.length !== 2) return;
    if (parts[0] === "signal") openSignalDetail(parts[1]);
    if (parts[0] === "unit") openUnitDetail(parts[1]);
    if (parts[0] === "respond") openResponseCommand(parts[1]);
    if (parts[0] === "contact") openContactTeam(parts[1]);
  }

  function renderUnitPage() {
    const main = document.querySelector(".unit-content");
    if (!main) return;
    const unit = unitFor(pageSlug);
    if (!unit) return;
    const title = document.getElementById("pageTitle");
    if (title) title.textContent = unit.title;
    const unitSignals = signals.filter(function (signal) { return signal.unit === unit.slug; });
    main.innerHTML = `
      <section class="unit-hero">
        <div>
          <p class="section-kicker">CFO Reporting Unit</p>
          <h2>${esc(unit.title)}</h2>
          <p>${esc(unit.summary)}</p>
        </div>
        <div class="unit-scorecard">
          ${unit.metrics.map(function (metric) { return `<div><span>${esc(metric[0])}</span><strong>${esc(metric[1])}</strong><p>${esc(metric[2])}</p></div>`; }).join("")}
        </div>
      </section>

      <section class="unit-page-grid">
        <article class="unit-section">
          <p class="section-kicker">Decision Summary</p>
          <h2>What the CFO needs to decide</h2>
          <p>${esc(unit.decision)}</p>
          <div class="action-list">
            ${unitSignals.map(function (signal) {
              return `<div class="action-item"><span class="priority-pill">${esc(signal.priority)}</span><div><b>${esc(signal.title)}</b><span>${esc(signal.action)}</span></div></div>`;
            }).join("")}
          </div>
        </article>
        <aside class="unit-section">
          <p class="section-kicker">Owner Route</p>
          <h2>${esc(unit.owner)}</h2>
          <ul class="evidence-list">
            <li><strong>Deadline:</strong> ${esc(unit.due)}</li>
            <li><strong>Status:</strong> ${esc(unit.status)}</li>
            <li><strong>Materiality:</strong> ${esc(unit.materiality)}</li>
            <li><strong>Publication gate:</strong> Source evidence and reviewer disposition required before release.</li>
          </ul>
        </aside>
      </section>

      <section class="dashboard-section">
        <div class="section-heading compact">
          <div><p class="section-kicker">Unit Action Queue</p><h2>Signals on this page</h2></div>
        </div>
        <div class="table-wrap">
          <table class="signal-table">
            <thead><tr><th>Signal</th><th>Owner</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>${unitSignals.map(function (signal) { return signalRow(signal, false); }).join("")}</tbody>
          </table>
        </div>
      </section>`;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast("Brief copied to clipboard.");
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    toast("Brief copied to clipboard.");
  }

  function briefFor(slug) {
    if (slug === "overview") {
      const active = signals.filter(function (signal) { return signal.status !== "Closed"; }).length;
      const risk = signals.filter(function (signal) { return signal.status === "At risk"; }).length;
      return [
        "FAS CFO Command Dashboard",
        "Active signals: " + active,
        "At-risk signals: " + risk,
        "Immediate watch: 68/70 close, 43 days cash, $16.2M ICR gap, $842M capital backlog.",
        "Use unit pages for owner route, due date, materiality, source evidence, and next action."
      ].join("\n");
    }
    if (slug === "intelligence-suite") {
      const top = commandSignalRows()[0];
      return [
        "FAS CFO Intelligence Suite",
        "Internal lanes: Accounting/Controller/Close, Budgeting & FP&A, Treasury & Liquidity, Finance Administration & Operations, Financial Intelligence & Governance.",
        "External lanes: Sponsored Research ICR, Gifts & Endowments, Capital & Facilities, Revenue/Aid/Net Yield.",
        "Top signal: " + (top ? top.signal.id + " - " + top.signal.title + " | score " + top.score : "No open signal"),
        "Control library: source facts, owner responses, CFO notes, evidence links, and email attempts stay separated by stable Signal ID.",
        "Use the response prompt survey for quick status, blocker, progress, and evidence capture."
      ].join("\n");
    }
    const unit = unitFor(slug);
    if (!unit) return "FAS CFO Command Dashboard";
    const unitSignals = signals.filter(function (signal) { return signal.unit === unit.slug; });
    return [
      unit.title,
      "Status: " + unit.status,
      "Owner route: " + unit.owner,
      "Due: " + unit.due,
      "Materiality: " + unit.materiality,
      "Decision: " + unit.decision,
      "Signals:",
      unitSignals.map(function (signal) { return "- " + signal.id + ": " + signal.title + " | " + signal.action; }).join("\n")
    ].join("\n");
  }

  function wireActions() {
    const menu = document.getElementById("menuButton");
    if (menu) {
      menu.addEventListener("click", function () {
        const open = document.body.classList.toggle("nav-open");
        menu.setAttribute("aria-expanded", String(open));
      });
    }
    document.querySelectorAll("[data-print]").forEach(function (button) {
      button.addEventListener("click", function () { window.print(); });
    });
    document.querySelectorAll("[data-copy-brief]").forEach(function (button) {
      button.addEventListener("click", function () {
        const target = button.getAttribute("data-copy-brief") || pageSlug;
        copyText(briefFor(target));
      });
    });
    document.addEventListener("click", function (event) {
      const commandOption = event.target.closest("[data-command-option]");
      if (commandOption) {
        event.preventDefault();
        openCommandOption(commandOption.getAttribute("data-command-option"));
        return;
      }
      const commandRun = event.target.closest("[data-command-run]");
      if (commandRun) {
        event.preventDefault();
        runCommandAction(commandRun.getAttribute("data-command-run"));
        return;
      }
      if (event.target.id === "openResponseFromCommand") {
        openResponseCenter();
        return;
      }
      if (event.target.id === "runCommandSync") {
        syncOwnerResponses();
        return;
      }
      if (event.target.id === "openTopPriorityBtn") {
        const top = commandSignalRows()[0];
        if (top) openSignalDetail(top.signal.id);
        return;
      }
      if (event.target.id === "copyBriefingScriptBtn") {
        copyText(briefingScript());
        return;
      }
      if (event.target.id === "openResponseCenterBtn") {
        openResponseCenter();
        return;
      }
      if (event.target.id === "syncOwnerResponsesBtn") {
        syncOwnerResponses();
        return;
      }
      if (event.target.id === "previewOwnerCardBtn") {
        previewOwnerCard();
        return;
      }
      if (event.target.id === "saveCfoNoteBtn") {
        saveCfoNote();
        return;
      }
      if (event.target.id === "contactTeamBtn") {
        const selected = document.getElementById("contactSignalSelect")?.value;
        if (selected) openContactTeam(selected);
        return;
      }
      if (event.target.id === "copyOwnerCardBtn") {
        const selected = document.getElementById("contactSignalSelect")?.value;
        const signal = signalFor(selected);
        if (signal) copyText(ownerCardText(signal));
        return;
      }
      if (event.target.id === "copyDataRuleBtn" || event.target.id === "copyDataRuleFromModal") {
        copyText(dataSeparationRule);
        return;
      }
      const responseCommand = event.target.closest("[data-response-command]");
      if (responseCommand) {
        event.preventDefault();
        event.stopPropagation();
        openResponseCommand(responseCommand.getAttribute("data-response-command"), responseCommand.getAttribute("data-response-preset"));
        return;
      }
      const contactCommand = event.target.closest("[data-contact-command]");
      if (contactCommand) {
        event.preventDefault();
        event.stopPropagation();
        openContactTeam(contactCommand.getAttribute("data-contact-command"));
        return;
      }
      const copyOwnerCard = event.target.closest("[data-copy-owner-card]");
      if (copyOwnerCard) {
        event.preventDefault();
        event.stopPropagation();
        const signal = signalFor(copyOwnerCard.getAttribute("data-copy-owner-card"));
        if (signal) copyText(ownerCardText(signal));
        return;
      }
      const submitResponse = event.target.closest("[data-submit-response]");
      if (submitResponse) {
        event.preventDefault();
        event.stopPropagation();
        saveOwnerResponse(submitResponse.getAttribute("data-submit-response"));
        return;
      }
      const unitButton = event.target.closest("[data-open-unit]");
      if (unitButton) {
        event.preventDefault();
        openUnitDetail(unitButton.getAttribute("data-open-unit"));
        return;
      }
      const unitCardNode = event.target.closest(".unit-card[data-unit]");
      if (unitCardNode && !event.target.closest("a,button")) {
        openUnitDetail(unitCardNode.getAttribute("data-unit"));
        return;
      }
      const signalNode = event.target.closest("[data-signal-id]");
      if (signalNode && !event.target.closest("a")) {
        event.preventDefault();
        openSignalDetail(signalNode.getAttribute("data-signal-id"));
        return;
      }
      const metricNode = event.target.closest("[data-metric]");
      if (metricNode) {
        openMetricDetail(metricNode.getAttribute("data-metric"));
        return;
      }
      const copyUnit = event.target.closest("[data-copy-unit]");
      if (copyUnit) {
        copyText(briefFor(copyUnit.getAttribute("data-copy-unit")));
        return;
      }
      if (event.target.id === "exportSignalsBtn") {
        exportSignalsCsv();
        return;
      }
      if (event.target.id === "viewAllUnitsBtn") {
        openAllUnitsDetail();
        return;
      }
      if (event.target.id === "viewQueueBtn") {
        openQueueDetail();
        return;
      }
      if (event.target.id === "resetFiltersFromModal") {
        const search = document.getElementById("overviewSearch");
        const filter = document.getElementById("statusFilter");
        if (search) search.value = "";
        if (filter) filter.value = "";
        search?.dispatchEvent(new Event("input"));
        filter?.dispatchEvent(new Event("change"));
        closeModal();
        toast("Filters reset.");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const unitCardNode = event.target.closest(".unit-card[data-unit]");
      const signalNode = event.target.closest(".signal-row[data-signal-id]");
      if (unitCardNode) {
        event.preventDefault();
        openUnitDetail(unitCardNode.getAttribute("data-unit"));
      } else if (signalNode) {
        event.preventDefault();
        openSignalDetail(signalNode.getAttribute("data-signal-id"));
      }
    });
    window.addEventListener("hashchange", openHashTarget);
  }

  function toast(message) {
    const node = document.getElementById("toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { node.classList.remove("show"); }, 2400);
  }

  renderNav();
  renderKpiCards();
  renderUnitPerformance();
  renderExecutiveQueue();
  renderIntelligenceSuite();
  renderCommandBoard();
  renderCommandCenter();
  renderUnitPage();
  wireActions();
  openHashTarget();
})();
