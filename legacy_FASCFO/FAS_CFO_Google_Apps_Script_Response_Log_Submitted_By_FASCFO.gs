/**
 * @fileoverview FAS CFO Command Center - Response Log Processing Engine
 * @version     1.3.0
 * @component   Data Pipeline Monitor Suite
 * @domain      FAS Office of Finance | Business Systems & Data Analytics
 * @governance  Validates data integrity, reconciles submission records,
 *              detects anomalous latency and freshness SLA breaches,
 *              maintains tamper-evident response hashes, maps steward
 *              ownership routes, and links inputs to $1.6B budget schemas.
 *
 * Handoff standard:
 * - Configuration values are isolated in Config and Script Properties.
 * - Execution logic does not hardcode spreadsheet IDs, SLA thresholds,
 *   staging table handles, or downstream system identifiers.
 * - CFO-facing impact summaries are generated deterministically on success
 *   and failure paths for leadership-ready escalation.
 */

const Config = Object.freeze({
  // Default demo fallback only. In production set Script Properties:
  // FAS_CFO_SPREADSHEET_ID, FAS_CFO_ORACLE_STAGING_TABLE,
  // FAS_CFO_ANAPLAN_MODEL_KEY, FAS_CFO_TARGET_FOLDER_ID.
  DEMO_SPREADSHEET_ID: '1mSSEQ7MjLxomY3GKuOJAVE5dyD5mbqNCLRpwD7MZooA',
  RESPONSE_LOG_SHEET: 'Response_Log',
  ERROR_LOG_SHEET: 'Error_Log',
  AUDIT_LEDGER_SHEET: 'Audit_Ledger',
  SCHEMA_VERSION: 'fas-cfo-response-log-v1.3.0',
  PROPERTIES: {
    spreadsheetId: 'FAS_CFO_SPREADSHEET_ID',
    oracleStagingTable: 'FAS_CFO_ORACLE_STAGING_TABLE',
    anaplanModelKey: 'FAS_CFO_ANAPLAN_MODEL_KEY',
    targetFolderId: 'FAS_CFO_TARGET_FOLDER_ID',
    digestRecipient: 'FAS_CFO_MONDAY_DIGEST_RECIPIENT'
  },
  SYSTEM_HANDLES: {
    oracleStagingTableFallback: 'ORACLE_FAS_FINANCE_STG.RESPONSE_LOG',
    anaplanModelFallback: 'ANAPLAN_FAS_FORECAST_MODEL',
    targetFolderFallback: 'FAS_CFO_COMMAND_CENTER_OUTPUTS'
  },
  LATENCY_BASELINES_SECONDS: {
    FAS_Forecast_Rollup: 1.2,
    Dept_Budget_Submissions: 1.8,
    ICR_Recovery_Aging: 2.2,
    Personnel_Comp_Model: 2.5,
    default: 2.0
  },
  LATENCY_P95_SECONDS: {
    FAS_Forecast_Rollup: 2.4,
    Dept_Budget_Submissions: 3.1,
    ICR_Recovery_Aging: 4.4,
    Personnel_Comp_Model: 5.0,
    default: 4.0
  },
  DATA_FRESHNESS_SLA_HOURS: {
    standard_monitoring: 24,
    mid_year_forecast: 12,
    active_close: 6
  },
  FINANCIAL_CALENDAR: {
    fiscalYearCloseMonth: 5,       // June, zero-indexed month
    fiscalYearCloseDay: 30,
    fiscalYearOpenMonth: 6,        // July, zero-indexed month
    fiscalYearOpenDay: 1,
    activeCloseLookbackDays: 21,
    activeCloseLookaheadDays: 10,
    midYearForecastMonths: [10, 11, 0, 1] // Nov-Feb planning/forecast window
  },
  MONDAY_DIGEST: {
    weekday: 1,                    // Monday, Apps Script Date.getDay()
    deliveryHour: 8,
    deliveryMinute: 0,
    lookbackHours: 72,
    defaultRecipient: 'fas-cfo-leadership-queue@harvard.edu'
  },
  STEWARD_ROUTES: {
    FAS_Forecast_Rollup: { data_steward: 'Budget & Planning Analyst', escalation_path: 'FAS Finance Systems Team → Controller / Close', backup_owner: 'FAS CFO / FP&A' },
    Dept_Budget_Submissions: { data_steward: 'Divisional Finance Steward', escalation_path: 'Budget Office / Divisional Finance', backup_owner: 'FAS Finance Systems Team' },
    ICR_Recovery_Aging: { data_steward: 'Sponsored Finance / ICR Analyst', escalation_path: 'Sponsored Finance Lead → FAS CFO FP&A', backup_owner: 'Controller / Close' },
    Personnel_Comp_Model: { data_steward: 'HR Finance / Fringe Steward', escalation_path: 'HR Finance → Budget Office', backup_owner: 'FAS CFO / FP&A' },
    default: { data_steward: 'FAS Finance Systems Team', escalation_path: 'FAS CFO / FP&A → Controller / Close', backup_owner: 'Data / AI Governance' }
  }
});

function getConfigValue_(propertyKey, fallback) {
  try {
    const value = PropertiesService.getScriptProperties().getProperty(propertyKey);
    return value || fallback;
  } catch (err) {
    return fallback;
  }
}

function getSpreadsheetId_() {
  return getConfigValue_(Config.PROPERTIES.spreadsheetId, Config.DEMO_SPREADSHEET_ID);
}

function getExternalSystemHandles_() {
  return {
    oracleStagingTable: getConfigValue_(Config.PROPERTIES.oracleStagingTable, Config.SYSTEM_HANDLES.oracleStagingTableFallback),
    anaplanModelKey: getConfigValue_(Config.PROPERTIES.anaplanModelKey, Config.SYSTEM_HANDLES.anaplanModelFallback),
    targetFolderId: getConfigValue_(Config.PROPERTIES.targetFolderId, Config.SYSTEM_HANDLES.targetFolderFallback)
  };
}

const REQUIRED_RESPONSE_HEADERS = [
  'timestamp',
  'method',
  'signal_id',
  'signal_name',
  'assignment_id',
  'owner_team',
  'owner_email',
  'submitted_by',
  'response_status',
  'decision',
  'progress',
  'comment',
  'evidence_link',
  'source',
  'financial_scope',
  'downstream_budget_impact',
  'business_process_fed',
  'reconciliation_status',
  'record_variance',
  'closing_deadline',
  'time_to_closing_deadline',
  'next_action_required',
  'impact_summary',
  'error_class',
  'urgency_rank',
  'estimated_effort',
  'calendar_alignment',
  'target_timeline',
  'sequencing_rationale',
  'latency_baseline_seconds',
  'latency_current_seconds',
  'latency_ratio',
  'latency_status',
  'data_freshness_age_hours',
  'freshness_sla_hours',
  'freshness_status',
  'financial_cycle_phase',
  'oracle_staging_table',
  'anaplan_model_key',
  'target_folder_id',
  'schema_version',
  'data_steward',
  'escalation_path',
  'backup_owner',
  'audit_status',
  'audit_exception_reason',
  'record_hash',
  'previous_hash',
  'structural_hash',
  'hash_algorithm',
  'monday_digest_flag',
  'monday_digest_window',
  'monday_digest_delivery_target',
  'weekend_processing_ledger_status'
];

function doGet(e) {
  return routeRequest_(e || {}, 'GET');
}

function doPost(e) {
  e = e || {};
  let data = {};
  try {
    if (e.postData && e.postData.contents) data = JSON.parse(e.postData.contents || '{}');
  } catch (err) {
    data = { error_class: 'JSON_PARSE_ERROR', comment: 'Could not parse submitted JSON: ' + err.message };
  }
  if (!data || Object.keys(data).length === 0) data = e.parameter || {};
  return routeRequest_({ parameter: data }, 'POST');
}

function routeRequest_(e, method) {
  const params = (e && e.parameter) || {};
  try {
    if (params.action === 'read') return readResponses_();
    if (params.action === 'impact') return readImpactSummary_();
    return saveResponse_(params, method);
  } catch (err) {
    return handleDeterministicFailure_(params, method, err);
  }
}

function testSaveResponse() {
  return saveResponse_({
    signal_id: 'FAS_Forecast_Rollup',
    signal_name: 'FAS Forecast Rollup',
    assignment_id: 'TEST-ENTERED-BY-001-AP',
    owner_team: 'Budget & Planning',
    owner_email: 'demo@example.com',
    submitted_by: 'Narissa Demo User',
    response_status: 'Failed',
    decision: 'Escalate',
    progress: '35',
    comment: 'Demo test with submitted-by attribution and CFO impact summary.',
    evidence_link: '',
    records_missing: '12400',
    closing_deadline: nextMondayTen_(),
    source: 'Manual Apps Script test',
    latency_current_seconds: '8.5',
    data_freshness_age_hours: '18'
  }, 'TEST');
}


function getStewardRoute_(component) {
  const key = normalizeComponentKey_(component || 'default');
  return Config.STEWARD_ROUTES[key] || Config.STEWARD_ROUTES.default;
}

function getMondayDigestTarget_() {
  return getConfigValue_(Config.PROPERTIES.digestRecipient, Config.MONDAY_DIGEST.defaultRecipient);
}

function mondayDigestWindow_(dateLike) {
  const d = dateLike ? new Date(dateLike) : new Date();
  const next = new Date(d);
  const day = next.getDay();
  const add = (Config.MONDAY_DIGEST.weekday - day + 7) % 7;
  next.setDate(next.getDate() + add);
  next.setHours(Config.MONDAY_DIGEST.deliveryHour, Config.MONDAY_DIGEST.deliveryMinute, 0, 0);
  if (next.getTime() < d.getTime()) next.setDate(next.getDate() + 7);
  return Utilities.formatDate(next, Session.getScriptTimeZone(), 'EEE MMM dd, yyyy h:mm a');
}

function isWeekendProcessingLedgerWindow_(dateLike) {
  const d = dateLike ? new Date(dateLike) : new Date();
  const day = d.getDay();
  // Friday through Monday morning gets routed into the Monday hybrid digest queue.
  return day === 5 || day === 6 || day === 0 || (day === 1 && d.getHours() <= Config.MONDAY_DIGEST.deliveryHour);
}

function canonicalizeForHash_(obj) {
  const keys = Object.keys(obj || {}).sort();
  return keys.map(k => k + '=' + String(obj[k] == null ? '' : obj[k])).join('|');
}

function sha256Hex_(value) {
  const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''), Utilities.Charset.UTF_8);
  return raw.map(b => ('0' + ((b < 0 ? b + 256 : b).toString(16))).slice(-2)).join('');
}

function latestHash_(sheet, headers) {
  try {
    const col = headers.indexOf('record_hash') + 1;
    if (!col || sheet.getLastRow() < 2) return 'GENESIS';
    const values = sheet.getRange(2, col, sheet.getLastRow() - 1, 1).getValues().map(r => String(r[0] || '')).filter(Boolean);
    return values.length ? values[values.length - 1] : 'GENESIS';
  } catch (err) {
    return 'GENESIS';
  }
}

function buildAuditFields_(sheet, headers, rowObj) {
  const previousHash = latestHash_(sheet, headers);
  const structuralPayload = {
    schema_version: Config.SCHEMA_VERSION,
    signal_id: rowObj.signal_id,
    timestamp: rowObj.timestamp,
    owner_team: rowObj.owner_team,
    submitted_by: rowObj.submitted_by,
    decision: rowObj.decision,
    financial_scope: rowObj.financial_scope,
    reconciliation_status: rowObj.reconciliation_status
  };
  const structuralHash = sha256Hex_(canonicalizeForHash_(structuralPayload));
  const recordPayload = Object.assign({}, rowObj, {
    previous_hash: previousHash,
    structural_hash: structuralHash,
    schema_version: Config.SCHEMA_VERSION
  });
  const required = ['signal_id', 'timestamp', 'owner_team', 'submitted_by', 'decision'];
  const missing = required.filter(k => !String(rowObj[k] || '').trim());
  return {
    schema_version: Config.SCHEMA_VERSION,
    previous_hash: previousHash,
    structural_hash: structuralHash,
    record_hash: sha256Hex_(canonicalizeForHash_(recordPayload)),
    hash_algorithm: 'SHA-256',
    audit_status: missing.length ? 'STRUCTURAL_EXCEPTION' : 'COMPLIANT',
    audit_exception_reason: missing.length ? 'Missing required fields: ' + missing.join(', ') : ''
  };
}

function appendAuditLedger_(ss, rowObj) {
  const sheet = ss.getSheetByName(Config.AUDIT_LEDGER_SHEET) || ss.insertSheet(Config.AUDIT_LEDGER_SHEET);
  const headers = ['timestamp','schema_version','signal_id','signal_name','owner_team','data_steward','escalation_path','audit_status','audit_exception_reason','record_hash','previous_hash','structural_hash','financial_scope','monday_digest_flag','weekend_processing_ledger_status'];
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  sheet.appendRow(headers.map(h => rowObj[h] !== undefined ? rowObj[h] : ''));
}

function saveResponse_(data, method) {
  const ss = SpreadsheetApp.openById(getSpreadsheetId_());
  const sheet = ss.getSheetByName(Config.RESPONSE_LOG_SHEET) || ss.insertSheet(Config.RESPONSE_LOG_SHEET);
  const headers = ensureHeaders_(sheet);
  const submittedBy = data.submitted_by || data.entered_by || data.submittedBy || data.responder || data.who || data.owner_name || '';
  const impact = buildImpactSummary_(data, method, null);
  const governance = buildGovernanceSignals_(data, impact);
  const handles = getExternalSystemHandles_();
  const steward = getStewardRoute_(data.signal_id || impact.pipeline_component || data.signal_name || 'default');
  const mondayFlag = isWeekendProcessingLedgerWindow_(new Date()) ? 'MONDAY_DIGEST_QUEUE' : 'STANDARD_QUEUE';
  const mondayWindow = mondayDigestWindow_(new Date());

  const rowObj = {
    timestamp: new Date(),
    method: method || '',
    signal_id: data.signal_id || impact.pipeline_component || '',
    signal_name: data.signal_name || data.signal_id || impact.pipeline_component || '',
    assignment_id: data.assignment_id || '',
    owner_team: data.owner_team || '',
    owner_email: data.owner_email || '',
    submitted_by: submittedBy,
    response_status: data.response_status || data.status || impact.status || '',
    decision: data.decision || '',
    progress: data.progress || '',
    comment: data.comment || data.response_text || '',
    evidence_link: data.evidence_link || '',
    source: data.source || 'FAS CFO Response Center',
    financial_scope: impact.financial_scope,
    downstream_budget_impact: impact.downstream_budget_impact,
    business_process_fed: impact.business_process_fed,
    reconciliation_status: impact.reconciliation_status,
    record_variance: impact.record_variance,
    closing_deadline: impact.closing_deadline,
    time_to_closing_deadline: impact.time_to_closing_deadline,
    next_action_required: impact.next_action_required,
    impact_summary: impact.impact_summary,
    error_class: data.error_class || '',
    urgency_rank: impact.urgency_rank,
    estimated_effort: impact.estimated_effort,
    calendar_alignment: impact.calendar_alignment,
    target_timeline: impact.target_timeline,
    sequencing_rationale: impact.sequencing_rationale,
    latency_baseline_seconds: governance.latency_baseline_seconds,
    latency_current_seconds: governance.latency_current_seconds,
    latency_ratio: governance.latency_ratio,
    latency_status: governance.latency_status,
    data_freshness_age_hours: governance.data_freshness_age_hours,
    freshness_sla_hours: governance.freshness_sla_hours,
    freshness_status: governance.freshness_status,
    financial_cycle_phase: governance.financial_cycle_phase,
    oracle_staging_table: handles.oracleStagingTable,
    anaplan_model_key: handles.anaplanModelKey,
    target_folder_id: handles.targetFolderId,
    schema_version: Config.SCHEMA_VERSION,
    data_steward: data.data_steward || steward.data_steward,
    escalation_path: data.escalation_path || steward.escalation_path,
    backup_owner: data.backup_owner || steward.backup_owner,
    monday_digest_flag: mondayFlag,
    monday_digest_window: mondayWindow,
    monday_digest_delivery_target: getMondayDigestTarget_(),
    weekend_processing_ledger_status: mondayFlag === 'MONDAY_DIGEST_QUEUE' ? 'Include in Monday 8:00 AM Weekend Processing Ledger' : 'Standard operating queue'
  };

  Object.assign(rowObj, buildAuditFields_(sheet, headers, rowObj));

  sheet.appendRow(headers.map(h => rowObj[h] !== undefined ? rowObj[h] : ''));
  appendAuditLedger_(ss, rowObj);
  return impactHtmlOutput_('Response saved', 'Your response has been captured in the FAS CFO demo response log.', data, impact, true);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(REQUIRED_RESPONSE_HEADERS);
    return REQUIRED_RESPONSE_HEADERS.slice();
  }
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const current = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String).filter(Boolean);
  const missing = REQUIRED_RESPONSE_HEADERS.filter(h => current.indexOf(h) === -1);
  if (missing.length) {
    sheet.getRange(1, current.length + 1, 1, missing.length).setValues([missing]);
  }
  return current.concat(missing);
}

function readResponses_() {
  const ss = SpreadsheetApp.openById(getSpreadsheetId_());
  const sheet = ss.getSheetByName(Config.RESPONSE_LOG_SHEET);
  if (!sheet || sheet.getLastRow() < 2) {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, rows: [], impact: defaultImpactSummary_() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(String);
  const rows = values.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] instanceof Date ? row[i].toISOString() : row[i];
    });
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true, rows: rows, impact: latestImpactFromRows_(rows) }))
    .setMimeType(ContentService.MimeType.JSON);
}

function readImpactSummary_() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, impact: defaultImpactSummary_() }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleDeterministicFailure_(data, method, err) {
  const failureData = Object.assign({}, data || {}, {
    response_status: 'Failed',
    error_class: err && err.name ? err.name : 'SCRIPT_ERROR',
    comment: ((data && data.comment) ? data.comment + ' | ' : '') + 'Apps Script failure: ' + (err && err.message ? err.message : err)
  });
  const impact = buildImpactSummary_(failureData, method, err);
  try {
    const ss = SpreadsheetApp.openById(getSpreadsheetId_());
    const sheet = ss.getSheetByName(Config.ERROR_LOG_SHEET) || ss.insertSheet(Config.ERROR_LOG_SHEET);
    if (sheet.getLastRow() === 0) sheet.appendRow(['timestamp', 'method', 'signal_id', 'error_class', 'error_message', 'financial_scope', 'record_variance', 'latency_status', 'freshness_status', 'financial_cycle_phase', 'next_action_required', 'impact_summary']);
    sheet.appendRow([new Date(), method || '', failureData.signal_id || '', impact.error_class, err && err.message ? err.message : String(err), impact.financial_scope, impact.record_variance, impact.latency_status, impact.freshness_status, impact.financial_cycle_phase, impact.next_action_required, impact.impact_summary]);
  } catch (ignored) {}
  return impactHtmlOutput_('Submission blocked — impact summary generated', 'The script could not save the response, so it generated a deterministic CFO impact summary for the Command Center.', failureData, impact, false);
}

function buildImpactSummary_(data, method, err) {
  data = data || {};
  const component = data.signal_id || data.signal_name || data.pipeline_component || 'FAS_Forecast_Rollup';
  const rule = impactRuleFor_(component, data);
  const status = data.response_status || data.status || (err ? 'Failed' : 'Submitted');
  const closingDeadline = data.closing_deadline || data.deadline || data.signal_deadline || nextMondayTen_();
  const recordVariance = data.record_variance || (data.records_missing ? data.records_missing + ' records missing' : '') || rule.record_variance || (String(status).toLowerCase().indexOf('fail') > -1 ? '12,400 records missing' : 'Balanced');
  const reconciliationStatus = data.reconciliation_status || rule.reconciliation_status || (String(recordVariance).toLowerCase().indexOf('missing') > -1 ? 'Mismatch' : 'Balanced');
  const nextAction = data.next_action_required || rule.next_action_required;
  const timeline = timelineRuleFor_(component, data, rule);
  const governance = buildGovernanceSignals_(data, { pipeline_component: component });
  const impactSummary = data.impact_summary || [
    component + ' is classified as ' + rule.downstream_budget_impact + ' impact.',
    'Financial scope: ' + rule.financial_scope + '.',
    'Business process fed: ' + rule.business_process_fed + '.',
    'Reconciliation: ' + reconciliationStatus + ' / ' + recordVariance + '.',
    'Next action: ' + nextAction,
    'Latency status: ' + governance.latency_status + ' (' + governance.latency_ratio + ' baseline).',
    'Freshness status: ' + governance.freshness_status + ' under ' + governance.financial_cycle_phase + ' SLA.'
  ].join(' ');
  return {
    ok: !err,
    method: method || '',
    pipeline_component: component,
    status: status,
    financial_scope: rule.financial_scope,
    downstream_budget_impact: rule.downstream_budget_impact,
    business_process_fed: rule.business_process_fed,
    reconciliation_status: reconciliationStatus,
    record_variance: recordVariance,
    closing_deadline: closingDeadline,
    time_to_closing_deadline: timeToDeadline_(closingDeadline),
    next_action_required: nextAction,
    impact_summary: impactSummary,
    error_class: err ? (err.name || 'SCRIPT_ERROR') : (data.error_class || ''),
    urgency_rank: timeline.urgency_rank,
    estimated_effort: timeline.estimated_effort,
    calendar_alignment: timeline.calendar_alignment,
    target_timeline: timeline.target_timeline,
    sequencing_rationale: timeline.sequencing_rationale,
    latency_baseline_seconds: governance.latency_baseline_seconds,
    latency_current_seconds: governance.latency_current_seconds,
    latency_ratio: governance.latency_ratio,
    latency_status: governance.latency_status,
    data_freshness_age_hours: governance.data_freshness_age_hours,
    freshness_sla_hours: governance.freshness_sla_hours,
    freshness_status: governance.freshness_status,
    financial_cycle_phase: governance.financial_cycle_phase
  };
}

function impactRuleFor_(component, data) {
  const key = String(component || '').toLowerCase();
  if (key.indexOf('forecast') > -1 || key.indexOf('rollup') > -1 || key.indexOf('fas-wide') > -1) {
    return {
      financial_scope: '$1.6B FAS-wide expense budget',
      downstream_budget_impact: 'High',
      business_process_fed: 'Quarterly management reporting package / multi-year planning ledger',
      reconciliation_status: 'Mismatch',
      record_variance: '12,400 records missing',
      next_action_required: 'Re-run PL/SQL stored procedure, refresh EPM export, and validate Oracle ⇄ EPM hash totals before publication.'
    };
  }
  if (key.indexOf('personnel') > -1 || key.indexOf('comp') > -1 || key.indexOf('fringe') > -1) {
    return {
      financial_scope: '$941M personnel cost base',
      downstream_budget_impact: 'High',
      business_process_fed: 'Compensation/fringe model and FY27 recurring expense planning',
      reconciliation_status: 'Balanced with assumption review',
      record_variance: '0 records missing; fringe assumption pending',
      next_action_required: 'Confirm benefit escalation assumption and recurring offset before budget lock.'
    };
  }
  if (key.indexOf('icr') > -1 || key.indexOf('sponsored') > -1 || key.indexOf('grant') > -1) {
    return {
      financial_scope: '$16.2M ICR recovery exposure',
      downstream_budget_impact: 'Medium',
      business_process_fed: 'ICR Recovery Desk, cash bridge gate, and sponsored research risk report',
      reconciliation_status: 'Review required',
      record_variance: '2.1% aging-bucket timing variance',
      next_action_required: 'Refresh HART aging extract and validate delayed-award reason codes with Sponsored Finance.'
    };
  }
  if (key.indexOf('dept') > -1 || key.indexOf('budget') > -1 || key.indexOf('submission') > -1) {
    return {
      financial_scope: '$420M affiliated tub forecast inputs',
      downstream_budget_impact: 'Medium',
      business_process_fed: 'Departmental mid-year forecast and budget-to-actual submissions',
      reconciliation_status: 'Balanced',
      record_variance: '0',
      next_action_required: 'No executive action; preserve owner-stamp audit history.'
    };
  }
  if (key.indexOf('capital') > -1 || key.indexOf('facilities') > -1 || key.indexOf('backlog') > -1) {
    return {
      financial_scope: '$842M capital backlog context',
      downstream_budget_impact: 'Medium',
      business_process_fed: 'Capital triage, reserve-draw gate, and board packet',
      reconciliation_status: 'Balanced snapshot',
      record_variance: '0 source-count variance',
      next_action_required: 'Update project tier, cash timing, and reserve implication before the next board packet.'
    };
  }
  return {
    financial_scope: data.financial_scope || 'Low-to-medium local reporting scope',
    downstream_budget_impact: data.downstream_budget_impact || 'Low',
    business_process_fed: data.business_process_fed || 'Ad-hoc local reporting table / diagnostic feed',
    reconciliation_status: data.reconciliation_status || 'Pending review',
    record_variance: data.record_variance || 'Pending',
    next_action_required: data.next_action_required || 'Classify financial materiality, then assign reconciliation owner.'
  };
}

function timelineRuleFor_(component, data, rule) {
  const key = String(component || '').toLowerCase();
  if (key.indexOf('forecast') > -1 || key.indexOf('rollup') > -1 || key.indexOf('fas-wide') > -1) {
    return {
      urgency_rank: 'P0',
      estimated_effort: '1–2 business days',
      calendar_alignment: 'FY26 close window',
      target_timeline: 'Now → June 7, 2026',
      sequencing_rationale: 'Publication-blocking exception with $1.6B financial scope; fix before executive packet release.'
    };
  }
  if (key.indexOf('close') > -1 || key.indexOf('68') > -1 || key.indexOf('70') > -1) {
    return {
      urgency_rank: 'P0',
      estimated_effort: '2–5 business days',
      calendar_alignment: 'FY26 year-end close',
      target_timeline: 'June 3 → June 14, 2026',
      sequencing_rationale: 'Close integrity affects the final FY26 operating result narrative and should be resolved before downstream timeline work.'
    };
  }
  if (key.indexOf('icr') > -1 || key.indexOf('sponsored') > -1 || key.indexOf('grant') > -1) {
    return {
      urgency_rank: 'P1',
      estimated_effort: '1–2 weeks',
      calendar_alignment: 'FY26 close + FY27 Q1 cash bridge',
      target_timeline: 'June 3 → June 21, 2026',
      sequencing_rationale: 'ICR aging can reverse the liquidity signal and should stay on a weekly recovery-desk cadence.'
    };
  }
  if (key.indexOf('dept') > -1 || key.indexOf('budget') > -1 || key.indexOf('submission') > -1) {
    return {
      urgency_rank: 'P1',
      estimated_effort: '1 week',
      calendar_alignment: 'FY26 close / FY27 planning handoff',
      target_timeline: 'June 5 → June 15, 2026',
      sequencing_rationale: 'Submitted-by attribution and forecast inputs are needed before senior leadership reviews owner accountability.'
    };
  }
  if (key.indexOf('personnel') > -1 || key.indexOf('comp') > -1 || key.indexOf('fringe') > -1) {
    return {
      urgency_rank: 'P2',
      estimated_effort: '4–6 weeks',
      calendar_alignment: 'FY27 budget lock + AY2026–27 staffing prep',
      target_timeline: 'June 17 → July 31, 2026',
      sequencing_rationale: 'High dollar value but more assumption-driven; schedule after immediate close and reconciliation items.'
    };
  }
  if (key.indexOf('security') > -1 || key.indexOf('rls') > -1 || key.indexOf('access') > -1) {
    return {
      urgency_rank: 'P2',
      estimated_effort: '2–4 weeks',
      calendar_alignment: 'Summer rollout before AY2026–27',
      target_timeline: 'June 17 → July 17, 2026',
      sequencing_rationale: 'Role-level security is required before multi-tier executive rollout and fall reporting.'
    };
  }
  if (key.indexOf('capital') > -1 || key.indexOf('facilities') > -1 || key.indexOf('backlog') > -1) {
    return {
      urgency_rank: 'P3',
      estimated_effort: '6–8 weeks',
      calendar_alignment: 'CY2026 Q4 board / planning cycle',
      target_timeline: 'August 3 → October 9, 2026',
      sequencing_rationale: 'Important board-level decision layer, but less urgent than fiscal close and source reconciliation.'
    };
  }
  return {
    urgency_rank: data.urgency_rank || 'P3',
    estimated_effort: data.estimated_effort || '2–6 weeks after scoping',
    calendar_alignment: data.calendar_alignment || 'FY27 Q1/Q2 implementation window',
    target_timeline: data.target_timeline || 'July → October 2026, based on dependency review',
    sequencing_rationale: data.sequencing_rationale || 'Place after P0/P1 close and reconciliation work unless leadership identifies a new financial deadline.'
  };
}


function buildGovernanceSignals_(data, impact) {
  data = data || {};
  const component = data.signal_id || data.signal_name || data.pipeline_component || (impact && impact.pipeline_component) || 'default';
  const normalizedComponent = normalizeComponentKey_(component);
  const baseline = numberOrFallback_(data.latency_baseline_seconds || data.baseline_latency_seconds, Config.LATENCY_BASELINES_SECONDS[normalizedComponent] || Config.LATENCY_BASELINES_SECONDS.default);
  const current = numberOrFallback_(data.latency_current_seconds || data.processing_seconds || data.execution_seconds || data.elapsed_seconds, baseline);
  const p95 = numberOrFallback_(data.latency_p95_seconds || data.p95_latency_seconds, Config.LATENCY_P95_SECONDS[normalizedComponent] || Config.LATENCY_P95_SECONDS.default);
  const ratioNum = baseline > 0 ? current / baseline : 1;
  const latencyStatus = classifyLatency_(current, baseline, p95);
  const cyclePhase = determineFinancialCyclePhase_(data.as_of_date || data.timestamp);
  const freshnessAge = data.data_freshness_age_hours !== undefined
    ? numberOrFallback_(data.data_freshness_age_hours, 0)
    : data.last_success_timestamp
      ? ageHours_(data.last_success_timestamp)
      : 0;
  const freshnessSla = freshnessSlaForPhase_(cyclePhase.code);
  const freshnessStatus = classifyFreshness_(freshnessAge, freshnessSla);
  return {
    latency_baseline_seconds: roundOne_(baseline),
    latency_current_seconds: roundOne_(current),
    latency_ratio: roundOne_(ratioNum) + 'x',
    latency_status: latencyStatus,
    data_freshness_age_hours: roundOne_(freshnessAge),
    freshness_sla_hours: freshnessSla,
    freshness_status: freshnessStatus,
    financial_cycle_phase: cyclePhase.label
  };
}

function normalizeComponentKey_(component) {
  const key = String(component || '').toLowerCase();
  if (key.indexOf('forecast') > -1 || key.indexOf('rollup') > -1 || key.indexOf('fas-wide') > -1) return 'FAS_Forecast_Rollup';
  if (key.indexOf('dept') > -1 || key.indexOf('budget') > -1 || key.indexOf('submission') > -1) return 'Dept_Budget_Submissions';
  if (key.indexOf('icr') > -1 || key.indexOf('sponsored') > -1 || key.indexOf('grant') > -1) return 'ICR_Recovery_Aging';
  if (key.indexOf('personnel') > -1 || key.indexOf('comp') > -1 || key.indexOf('fringe') > -1) return 'Personnel_Comp_Model';
  return 'default';
}

function classifyLatency_(current, baseline, p95) {
  const ratio = baseline > 0 ? current / baseline : 1;
  if (current > p95 * 2 || ratio >= 5) return 'Red - anomalous degradation';
  if (current > p95 || ratio >= 2) return 'Amber - degradation watch';
  return 'Green - within velocity band';
}

function determineFinancialCyclePhase_(dateLike) {
  const d = dateLike ? new Date(dateLike) : new Date();
  const valid = isNaN(d.getTime()) ? new Date() : d;
  const y = valid.getFullYear();
  const close = new Date(y, Config.FINANCIAL_CALENDAR.fiscalYearCloseMonth, Config.FINANCIAL_CALENDAR.fiscalYearCloseDay, 23, 59, 59, 999);
  const lookback = new Date(close.getTime() - Config.FINANCIAL_CALENDAR.activeCloseLookbackDays * 86400000);
  const lookahead = new Date(close.getTime() + Config.FINANCIAL_CALENDAR.activeCloseLookaheadDays * 86400000);
  if (valid >= lookback && valid <= lookahead) return { code: 'active_close', label: 'Active year-end reporting cycle' };
  if (Config.FINANCIAL_CALENDAR.midYearForecastMonths.indexOf(valid.getMonth()) > -1) return { code: 'mid_year_forecast', label: 'Mid-year forecasting crunch' };
  return { code: 'standard_monitoring', label: 'Standard monitoring phase' };
}

function freshnessSlaForPhase_(phaseCode) {
  if (phaseCode === 'active_close') return Config.DATA_FRESHNESS_SLA_HOURS.active_close;
  if (phaseCode === 'mid_year_forecast') return Config.DATA_FRESHNESS_SLA_HOURS.mid_year_forecast;
  return Config.DATA_FRESHNESS_SLA_HOURS.standard_monitoring;
}

function classifyFreshness_(ageHours, slaHours) {
  if (ageHours > slaHours * 2) return 'Red - stale for financial cycle';
  if (ageHours > slaHours) return 'Amber - approaching stale threshold';
  return 'Green - current for financial cycle';
}

function ageHours_(timestamp) {
  const t = new Date(timestamp);
  if (isNaN(t.getTime())) return 0;
  return Math.max(0, (new Date().getTime() - t.getTime()) / 3600000);
}

function numberOrFallback_(value, fallback) {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}

function roundOne_(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function latestImpactFromRows_(rows) {
  if (!rows || !rows.length) return defaultImpactSummary_();
  const last = rows[rows.length - 1];
  return {
    pipeline_component: last.signal_id || last.signal_name || '',
    status: last.response_status || '',
    financial_scope: last.financial_scope || '',
    downstream_budget_impact: last.downstream_budget_impact || '',
    business_process_fed: last.business_process_fed || '',
    reconciliation_status: last.reconciliation_status || '',
    record_variance: last.record_variance || '',
    closing_deadline: last.closing_deadline || '',
    time_to_closing_deadline: last.time_to_closing_deadline || '',
    next_action_required: last.next_action_required || '',
    impact_summary: last.impact_summary || '',
    urgency_rank: last.urgency_rank || '',
    estimated_effort: last.estimated_effort || '',
    calendar_alignment: last.calendar_alignment || '',
    target_timeline: last.target_timeline || '',
    sequencing_rationale: last.sequencing_rationale || '',
    latency_baseline_seconds: last.latency_baseline_seconds || '',
    latency_current_seconds: last.latency_current_seconds || '',
    latency_ratio: last.latency_ratio || '',
    latency_status: last.latency_status || '',
    data_freshness_age_hours: last.data_freshness_age_hours || '',
    freshness_sla_hours: last.freshness_sla_hours || '',
    freshness_status: last.freshness_status || '',
    financial_cycle_phase: last.financial_cycle_phase || ''
  };
}

function defaultImpactSummary_() {
  return buildImpactSummary_({ signal_id: 'FAS_Forecast_Rollup', response_status: 'Failed', records_missing: '12400' }, 'READ', null);
}

function nextMondayTen_() {
  const now = new Date();
  const day = now.getDay();
  let delta = (8 - day) % 7;
  if (delta === 0 && (now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() > 0))) delta = 7;
  const due = new Date(now.getFullYear(), now.getMonth(), now.getDate() + delta, 10, 0, 0, 0);
  return due.toISOString();
}

function timeToDeadline_(deadline) {
  if (!deadline) return 'No deadline provided';
  const due = new Date(deadline);
  if (isNaN(due.getTime())) return 'Deadline pending validation';
  const diff = due.getTime() - new Date().getTime();
  const overdue = diff < 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  return (overdue ? 'Overdue by ' : '') + days + 'd ' + hours + 'h ' + minutes + 'm';
}

function impactHtmlOutput_(title, message, data, impact, ok) {
  const payload = JSON.stringify(impact).replace(/</g, '\\u003c');
  const statusColor = ok ? '#1B6B42' : '#A51C30';
  const html = '<!doctype html><html><head><base target="_top"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' +
    'body{font-family:Arial,sans-serif;background:#f8fafc;color:#111827}.box{max-width:820px;margin:34px auto;background:#fff;border:1px solid #dbe3ee;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,.08);overflow:hidden}.head{padding:20px 22px;border-bottom:1px solid #e5e7eb;background:linear-gradient(135deg,#fff,#f8fbff)}h2{margin:0;color:' + statusColor + ';font:700 24px/1.15 Georgia,serif}p{line-height:1.55;color:#475569}.body{padding:18px 22px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.metric{background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px}.metric span{display:block;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:900}.metric b{display:block;margin-top:6px;color:#111827;font-size:16px}.impact{margin-top:14px;background:#fff7ed;border:1px solid #fed7aa;border-left:4px solid #B45309;border-radius:0 12px 12px 0;padding:12px;color:#7c2d12}.ok{background:#edf8f2;border-color:#bbdfc8;color:#1B6B42}.foot{padding:12px 22px;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px}@media(max-width:720px){.grid{grid-template-columns:1fr}.box{margin:14px}}' +
    '</style></head><body><div class="box"><div class="head"><h2>' + escapeHtml_(title) + '</h2><p>' + escapeHtml_(message) + '</p></div><div class="body"><div class="grid">' +
    metricHtml_('Pipeline', impact.pipeline_component) + metricHtml_('Financial scope', impact.financial_scope) + metricHtml_('Impact weight', impact.downstream_budget_impact) + metricHtml_('Reconciliation', impact.reconciliation_status) + metricHtml_('Variance', impact.record_variance) + metricHtml_('Time to deadline', impact.time_to_closing_deadline) + metricHtml_('Urgency rank', impact.urgency_rank) + metricHtml_('Estimated effort', impact.estimated_effort) + metricHtml_('Calendar alignment', impact.calendar_alignment) + metricHtml_('Latency status', impact.latency_status) + metricHtml_('Freshness status', impact.freshness_status) + metricHtml_('Cycle phase', impact.financial_cycle_phase) +
    '</div><div class="impact ' + (ok ? 'ok' : '') + '"><strong>Impact Summary</strong><br>' + escapeHtml_(impact.impact_summary) + '<br><br><strong>Next action:</strong> ' + escapeHtml_(impact.next_action_required) + '<br><br><strong>Timeline:</strong> ' + escapeHtml_(impact.target_timeline) + ' — ' + escapeHtml_(impact.sequencing_rationale) + '</div></div><div class="foot">This page writes a compact JSON impact summary to localStorage and can be consumed by the CFO Command Center HTML view.</div></div>' +
    '<script id="cfo-command-center-impact-json" type="application/json">' + payload + '</script><script>try{localStorage.setItem("fas-cfo-latest-impact-summary",document.getElementById("cfo-command-center-impact-json").textContent);if(window.opener){window.opener.postMessage({type:"FAS_CFO_IMPACT_SUMMARY",impact:JSON.parse(document.getElementById("cfo-command-center-impact-json").textContent)},"*");}}catch(e){}</script></body></html>';
  return HtmlService.createHtmlOutput(html);
}

function metricHtml_(label, value) {
  return '<div class="metric"><span>' + escapeHtml_(label) + '</span><b>' + escapeHtml_(value || '—') + '</b></div>';
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
