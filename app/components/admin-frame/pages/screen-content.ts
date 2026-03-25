import type { ComponentProps } from "react";

import type { AdminScreenPage } from "./AdminScreenPage";

type ScreenContent = ComponentProps<typeof AdminScreenPage>;

export const screenContent: Record<string, ScreenContent> = {
  dashboard: {
    eyebrow: "Control Room",
    title: "Live operations without losing the event-wide picture.",
    description:
      "Monitor active events, timing issues, staff load, and unresolved reports from one place. The frame stays narrow, explicit, and optimized for fast context switching.",
    metrics: [
      {
        label: "Active events",
        value: "03",
        meta: "2 on-site / 1 remote venue",
      },
      {
        label: "Pending checks",
        value: "14",
        meta: "Score sync and lane readiness",
      },
      {
        label: "Response SLA",
        value: "06m",
        meta: "Median operator reaction time",
      },
    ],
    activityTitle: "Recent operations",
    activityHint: "Updated a few seconds ago",
    activities: [
      {
        name: "Lane 4 timing offset adjusted",
        meta: "Spring Cup 2026",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Volunteer import completed",
        meta: "146 rows normalized",
        tone: "green",
        status: "Done",
      },
      {
        name: "Report export queued",
        meta: "Summary package for directors",
        tone: "blue",
        status: "Queued",
      },
    ],
    panelTitle: "Shift readiness",
    panelHint: "Today",
    checklist: [
      {
        name: "Head judge assignment",
        meta: "Main arena",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Backup timer device",
        meta: "Warm-up court",
        tone: "orange",
        status: "Check",
      },
      {
        name: "Guest access pass",
        meta: "Media desk",
        tone: "red",
        status: "Hold",
      },
    ],
  },
  eventsActive: {
    eyebrow: "Events",
    title: "Active events are grouped around operational risk first.",
    description:
      "Surface timing drift, staffing gaps, and category congestion before they become scoreboard issues. This screen is optimized for intervention, not presentation.",
    metrics: [
      { label: "Open sessions", value: "11", meta: "Across 3 venues" },
      { label: "Alerts", value: "05", meta: "2 critical / 3 warning" },
      { label: "Avg. recovery", value: "09m", meta: "Last 24 hours" },
    ],
    activityTitle: "Hot items",
    activityHint: "Needs confirmation",
    activities: [
      {
        name: "Junior relay heat delayed",
        meta: "Call room congestion",
        tone: "red",
        status: "Critical",
      },
      {
        name: "Swimming finals queue stabilized",
        meta: "Warm-up lane reopened",
        tone: "green",
        status: "Stable",
      },
      {
        name: "Event brief updated",
        meta: "Shared with field operators",
        tone: "blue",
        status: "Synced",
      },
    ],
    panelTitle: "Operator checklist",
    panelHint: "Before next rotation",
    checklist: [
      {
        name: "Broadcast standby",
        meta: "Court A",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Medical desk routing",
        meta: "Hall C",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Gate overflow fallback",
        meta: "East entrance",
        tone: "blue",
        status: "Prepared",
      },
    ],
  },
  eventsPast: {
    eyebrow: "Events Archive",
    title:
      "Past events remain readable through normalized operational summaries.",
    description:
      "Archived events should preserve decisions, exceptions, and exported results without leaking transport-specific formats back into the UI model.",
    metrics: [
      { label: "Archived events", value: "42", meta: "Last 12 months" },
      { label: "Missing reports", value: "02", meta: "Awaiting finance close" },
      {
        label: "Retention health",
        value: "99%",
        meta: "Structured summaries stored",
      },
    ],
    activityTitle: "Latest archive actions",
    activityHint: "Read-only",
    activities: [
      {
        name: "Winter Classic package sealed",
        meta: "Audit trail attached",
        tone: "green",
        status: "Closed",
      },
      {
        name: "March regional export reissued",
        meta: "Fixed organizer metadata",
        tone: "blue",
        status: "Updated",
      },
      {
        name: "Legacy CSV import flagged",
        meta: "Boundary cleanup needed",
        tone: "orange",
        status: "Flagged",
      },
    ],
    panelTitle: "Archive quality",
    panelHint: "Weekly review",
    checklist: [
      {
        name: "Result checksum",
        meta: "42/42 complete",
        tone: "green",
        status: "Pass",
      },
      {
        name: "Manual notes migration",
        meta: "3 events remain",
        tone: "orange",
        status: "Queue",
      },
      {
        name: "Venue ownership tags",
        meta: "Backfill incomplete",
        tone: "red",
        status: "Gap",
      },
    ],
  },
  eventsNew: {
    eyebrow: "Event Setup",
    title: "Create events from explicit, replaceable setup blocks.",
    description:
      "The creation flow should stay narrow: define scope, assign ownership, and stage operational defaults before any downstream schedule data exists.",
    metrics: [
      { label: "Drafts", value: "04", meta: "Not yet published" },
      { label: "Templates", value: "07", meta: "Reusable event blueprints" },
      {
        label: "Approval time",
        value: "18m",
        meta: "Average coordinator sign-off",
      },
    ],
    activityTitle: "Template activity",
    activityHint: "Recent changes",
    activities: [
      {
        name: "School league blueprint updated",
        meta: "Safety staffing defaults revised",
        tone: "blue",
        status: "Updated",
      },
      {
        name: "Sprint cup draft created",
        meta: "Organizing committee assigned",
        tone: "green",
        status: "Draft",
      },
      {
        name: "Legacy import blocked",
        meta: "Unmapped category values",
        tone: "red",
        status: "Blocked",
      },
    ],
    panelTitle: "Creation checklist",
    panelHint: "Required before publish",
    checklist: [
      {
        name: "Venue contract",
        meta: "Attached PDF validated",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Volunteer pool",
        meta: "Needs roster sync",
        tone: "orange",
        status: "Pending",
      },
      {
        name: "Insurance proof",
        meta: "Awaiting upload",
        tone: "red",
        status: "Missing",
      },
    ],
  },
  members: {
    eyebrow: "Members",
    title: "Member operations focus on normalized roster ownership.",
    description:
      "Roster editing, team assignment, and import tracking are kept distinct so transport formats never define how the domain sees a participant.",
    metrics: [
      {
        label: "Registered members",
        value: "4,812",
        meta: "Across 19 organizations",
      },
      {
        label: "Pending approvals",
        value: "27",
        meta: "Awaiting identity checks",
      },
      { label: "Import errors", value: "03", meta: "Last sync batch" },
    ],
    activityTitle: "Roster changes",
    activityHint: "Newest first",
    activities: [
      {
        name: "Team captain reassigned",
        meta: "U18 relay",
        tone: "blue",
        status: "Updated",
      },
      {
        name: "Membership renewal synced",
        meta: "East district schools",
        tone: "green",
        status: "Synced",
      },
      {
        name: "Duplicate profile detected",
        meta: "Manual merge required",
        tone: "orange",
        status: "Review",
      },
    ],
    panelTitle: "Identity checks",
    panelHint: "Ops queue",
    checklist: [
      {
        name: "Coach documents",
        meta: "14 files uploaded",
        tone: "green",
        status: "Good",
      },
      {
        name: "Minor consent forms",
        meta: "5 waiting",
        tone: "orange",
        status: "Review",
      },
      {
        name: "International IDs",
        meta: "2 invalid scans",
        tone: "red",
        status: "Fix",
      },
    ],
  },
  membersTeams: {
    eyebrow: "Teams",
    title: "Team structures stay visible as contracts, not ad-hoc lists.",
    description:
      "Use explicit team ownership and affiliation metadata so future provider swaps do not force a rewrite of internal coordination logic.",
    metrics: [
      { label: "Active teams", value: "188", meta: "Event-ready groups" },
      {
        label: "Incomplete teams",
        value: "12",
        meta: "Missing role assignments",
      },
      {
        label: "Cross-event reuse",
        value: "64%",
        meta: "Teams reused from templates",
      },
    ],
    activityTitle: "Team updates",
    activityHint: "Shared roster activity",
    activities: [
      {
        name: "Venue crew merged",
        meta: "North and East halls",
        tone: "blue",
        status: "Merged",
      },
      {
        name: "Referee squad approved",
        meta: "Finals staffing",
        tone: "green",
        status: "Approved",
      },
      {
        name: "Medical support rotation",
        meta: "Coverage gap on Sunday",
        tone: "red",
        status: "Gap",
      },
    ],
    panelTitle: "Assignment risks",
    panelHint: "Next 48h",
    checklist: [
      {
        name: "Transport liaison",
        meta: "Bus arrival window",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Scoring desk handoff",
        meta: "Backup assigned",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Volunteer check-in lead",
        meta: "Still unassigned",
        tone: "red",
        status: "Open",
      },
    ],
  },
  membersImport: {
    eyebrow: "Member Import",
    title:
      "Import pipelines must normalize before the data touches the roster model.",
    description:
      "This queue surfaces shape mismatches, invalid codes, and ownership gaps early so the member domain stays insulated from spreadsheet conventions.",
    metrics: [
      { label: "Rows processed", value: "12,404", meta: "Today" },
      {
        label: "Normalization warnings",
        value: "38",
        meta: "Need field mapping review",
      },
      {
        label: "Rejected rows",
        value: "09",
        meta: "Manual correction required",
      },
    ],
    activityTitle: "Import batches",
    activityHint: "Latest uploader activity",
    activities: [
      {
        name: "High school sync",
        meta: "4,210 rows / 2 warnings",
        tone: "green",
        status: "Applied",
      },
      {
        name: "Regional federation file",
        meta: "Column mismatch on team code",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Guest list upload",
        meta: "Invalid birth date format",
        tone: "red",
        status: "Rejected",
      },
    ],
    panelTitle: "Boundary checks",
    panelHint: "Required mappings",
    checklist: [
      {
        name: "Role code translation",
        meta: "7 aliases defined",
        tone: "green",
        status: "Mapped",
      },
      {
        name: "Gender enum drift",
        meta: "1 new external value",
        tone: "orange",
        status: "Check",
      },
      {
        name: "Affiliation source",
        meta: "Provider ID missing",
        tone: "red",
        status: "Missing",
      },
    ],
  },
  timing: {
    eyebrow: "Timing Control",
    title:
      "Timing operations prioritize precision, rollback visibility, and manual override paths.",
    description:
      "Latency, device status, and operator actions are grouped in one view so intervention remains explicit even under live pressure.",
    metrics: [
      {
        label: "Connected devices",
        value: "26",
        meta: "24 healthy / 2 degraded",
      },
      { label: "Avg. sync drift", value: "0.18s", meta: "Below threshold" },
      {
        label: "Manual overrides",
        value: "03",
        meta: "Current competition day",
      },
    ],
    activityTitle: "Timing incidents",
    activityHint: "Live",
    activities: [
      {
        name: "Track sensor battery low",
        meta: "Lane 6 backup armed",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Pool touchpad calibration",
        meta: "Re-run accepted",
        tone: "green",
        status: "Resolved",
      },
      {
        name: "Warm-up clock desync",
        meta: "No external impact",
        tone: "blue",
        status: "Logged",
      },
    ],
    panelTitle: "Operational gates",
    panelHint: "Before finals",
    checklist: [
      {
        name: "Primary timer lock",
        meta: "All venues",
        tone: "green",
        status: "Done",
      },
      {
        name: "Fallback scripts",
        meta: "Need test on Court B",
        tone: "orange",
        status: "Check",
      },
      {
        name: "Manual paper slips",
        meta: "Insufficient stock",
        tone: "red",
        status: "Restock",
      },
    ],
  },
  sports: {
    eyebrow: "Sports Setup",
    title:
      "Sport definitions are explicit contracts for scoring and schedule behavior.",
    description:
      "Keep rules, tournament options, and scoring defaults visible so new categories can be introduced without leaking provider-specific values upstream.",
    metrics: [
      {
        label: "Configured sports",
        value: "21",
        meta: "17 active this season",
      },
      {
        label: "Rule variants",
        value: "08",
        meta: "Shared across tournaments",
      },
      {
        label: "Pending review",
        value: "02",
        meta: "Awaiting federation approval",
      },
    ],
    activityTitle: "Configuration updates",
    activityHint: "Recent edits",
    activities: [
      {
        name: "Indoor relay added",
        meta: "Derived from athletics template",
        tone: "green",
        status: "Created",
      },
      {
        name: "Penalty rule proposal",
        meta: "Needs review by judges",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Legacy code mapping",
        meta: "Backward compatibility note",
        tone: "blue",
        status: "Tracked",
      },
    ],
    panelTitle: "Release gates",
    panelHint: "Before publish",
    checklist: [
      {
        name: "Score schema",
        meta: "Versioned",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Official docs",
        meta: "One PDF outdated",
        tone: "orange",
        status: "Update",
      },
      {
        name: "Venue constraints",
        meta: "Missing climbing wall data",
        tone: "red",
        status: "Gap",
      },
    ],
  },
  sportsTournament: {
    eyebrow: "Tournament Rules",
    title:
      "Tournament setup must stay readable as a set of replaceable decisions.",
    description:
      "Bracket rules, seeding, and tie-break logic are represented explicitly so operators can reason about change without tracing framework behavior.",
    metrics: [
      {
        label: "Bracket templates",
        value: "12",
        meta: "Single and double elimination",
      },
      {
        label: "Seed exceptions",
        value: "05",
        meta: "Manual overrides this week",
      },
      { label: "Rule conflicts", value: "01", meta: "Needs owner decision" },
    ],
    activityTitle: "Tournament changes",
    activityHint: "Reviewed this morning",
    activities: [
      {
        name: "Seeding override applied",
        meta: "Regional finals",
        tone: "blue",
        status: "Applied",
      },
      {
        name: "Tie-break matrix approved",
        meta: "Junior cup",
        tone: "green",
        status: "Approved",
      },
      {
        name: "Wildcard slot undefined",
        meta: "Missing organizer rule",
        tone: "red",
        status: "Open",
      },
    ],
    panelTitle: "Validation focus",
    panelHint: "Before bracket release",
    checklist: [
      { name: "Match count", meta: "Balanced", tone: "green", status: "OK" },
      {
        name: "Venue turn time",
        meta: "Could overrun",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Reserve path",
        meta: "No fallback round",
        tone: "red",
        status: "Risk",
      },
    ],
  },
  sportsScoring: {
    eyebrow: "Scoring Rules",
    title:
      "Scoring stays isolated from display concerns and external feed shapes.",
    description:
      "Points, deductions, and aggregation paths are presented as normalized internal definitions so replacing providers does not rewrite operator logic.",
    metrics: [
      { label: "Scoring profiles", value: "16", meta: "Shared across sports" },
      { label: "Override events", value: "07", meta: "This month" },
      {
        label: "Audit coverage",
        value: "100%",
        meta: "Every change versioned",
      },
    ],
    activityTitle: "Rule adjustments",
    activityHint: "Needs communication",
    activities: [
      {
        name: "Penalty floor changed",
        meta: "Gymnastics trial rule",
        tone: "orange",
        status: "Notice",
      },
      {
        name: "Team aggregate formula",
        meta: "Now aligned across venues",
        tone: "green",
        status: "Aligned",
      },
      {
        name: "Legacy decimal score import",
        meta: "Parser retained for archive only",
        tone: "blue",
        status: "Contained",
      },
    ],
    panelTitle: "Audit checklist",
    panelHint: "Before activation",
    checklist: [
      { name: "Version note", meta: "Attached", tone: "green", status: "Done" },
      {
        name: "Judge briefing",
        meta: "Pending translation",
        tone: "orange",
        status: "Pending",
      },
      {
        name: "External feed contract",
        meta: "Not signed",
        tone: "red",
        status: "Blocked",
      },
    ],
  },
  reportsSummary: {
    eyebrow: "Reports",
    title:
      "Summary reporting compresses operational truth without hiding anomalies.",
    description:
      "Use summary output for decision-making while keeping anomalies explicit and traceable back to normalized source records.",
    metrics: [
      { label: "Daily summaries", value: "09", meta: "Generated today" },
      {
        label: "Variance alerts",
        value: "04",
        meta: "Across revenue and attendance",
      },
      { label: "Export latency", value: "22s", meta: "Median render time" },
    ],
    activityTitle: "Summary queue",
    activityHint: "Auto-refreshing",
    activities: [
      {
        name: "Director snapshot generated",
        meta: "Spring Cup 2026",
        tone: "green",
        status: "Ready",
      },
      {
        name: "Staffing delta highlighted",
        meta: "Volunteer shortage by 6",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Archive bundle linked",
        meta: "Yesterday's finals",
        tone: "blue",
        status: "Attached",
      },
    ],
    panelTitle: "Confidence checks",
    panelHint: "For publish",
    checklist: [
      {
        name: "Attendance totals",
        meta: "Cross-source match",
        tone: "green",
        status: "Pass",
      },
      {
        name: "Expense feed",
        meta: "One late sync",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Sponsor credits",
        meta: "Missing secondary logo",
        tone: "red",
        status: "Fix",
      },
    ],
  },
  reportsDetail: {
    eyebrow: "Detailed Reports",
    title:
      "Detailed reporting stays navigable by domain-focused slices, not raw payloads.",
    description:
      "The operator should be able to inspect segments, corrections, and variance reasons without exposure to provider-specific response shapes.",
    metrics: [
      { label: "Line items", value: "18,204", meta: "Queryable slices" },
      { label: "Drilldown paths", value: "27", meta: "Per report package" },
      { label: "Manual edits", value: "13", meta: "Flagged for audit" },
    ],
    activityTitle: "Detailed review queue",
    activityHint: "Analyst workspace",
    activities: [
      {
        name: "Attendance segment reopened",
        meta: "Need venue split",
        tone: "orange",
        status: "Open",
      },
      {
        name: "Finance row corrected",
        meta: "Mapped to normalized account",
        tone: "green",
        status: "Corrected",
      },
      {
        name: "Legacy importer isolated",
        meta: "No spread beyond report boundary",
        tone: "blue",
        status: "Contained",
      },
    ],
    panelTitle: "Analyst notes",
    panelHint: "Shared internally",
    checklist: [
      {
        name: "Variance explanations",
        meta: "8/8 attached",
        tone: "green",
        status: "Done",
      },
      {
        name: "Currency rounding",
        meta: "One manual check",
        tone: "orange",
        status: "Check",
      },
      {
        name: "Partner settlement",
        meta: "Pending source file",
        tone: "red",
        status: "Blocked",
      },
    ],
  },
  reportsExport: {
    eyebrow: "Exports",
    title:
      "Export surfaces should treat file generation as infrastructure, not UI truth.",
    description:
      "Generated files are outputs of normalized report models. Their format should remain replaceable without shifting how the admin screen behaves.",
    metrics: [
      { label: "Queued exports", value: "06", meta: "3 PDF / 3 CSV" },
      { label: "Success rate", value: "98.7%", meta: "Past 30 days" },
      { label: "Retries", value: "11", meta: "Mostly large bundles" },
    ],
    activityTitle: "Export jobs",
    activityHint: "Worker status",
    activities: [
      {
        name: "Director PDF bundle",
        meta: "122 pages",
        tone: "blue",
        status: "Rendering",
      },
      {
        name: "Finance CSV delivered",
        meta: "Shared to secure bucket",
        tone: "green",
        status: "Delivered",
      },
      {
        name: "Judge packet retry",
        meta: "Font subset issue",
        tone: "orange",
        status: "Retrying",
      },
    ],
    panelTitle: "Contract status",
    panelHint: "Output adapters",
    checklist: [
      {
        name: "PDF theme pack",
        meta: "Current",
        tone: "green",
        status: "Ready",
      },
      {
        name: "CSV schema version",
        meta: "v2 draft pending",
        tone: "orange",
        status: "Pending",
      },
      {
        name: "Webhook confirmation",
        meta: "Partner endpoint silent",
        tone: "red",
        status: "Error",
      },
    ],
  },
  schedule: {
    eyebrow: "Schedule",
    title:
      "Schedules must stay explicit about ownership, constraints, and downstream impact.",
    description:
      "This view keeps venue timing, staffing, and progression constraints visible so edits remain evolvable rather than implicit in calendar widgets.",
    metrics: [
      { label: "Scheduled blocks", value: "126", meta: "Across 5 spaces" },
      { label: "Conflict warnings", value: "07", meta: "Travel and turnover" },
      {
        label: "Auto placements",
        value: "63%",
        meta: "Remaining manually tuned",
      },
    ],
    activityTitle: "Schedule changes",
    activityHint: "Current planning cycle",
    activities: [
      {
        name: "Finals lane swap",
        meta: "Travel distance reduced",
        tone: "green",
        status: "Applied",
      },
      {
        name: "Warm-up overlap",
        meta: "Volunteer escort needed",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Award ceremony insert",
        meta: "Main stage availability confirmed",
        tone: "blue",
        status: "Added",
      },
    ],
    panelTitle: "Constraint watch",
    panelHint: "Before publish",
    checklist: [
      {
        name: "Venue turnover",
        meta: "Enough margin",
        tone: "green",
        status: "Clear",
      },
      {
        name: "Transport windows",
        meta: "Tight on Sunday",
        tone: "orange",
        status: "Watch",
      },
      {
        name: "Broadcast lock",
        meta: "Final slot not approved",
        tone: "red",
        status: "Hold",
      },
    ],
  },
  settings: {
    eyebrow: "Settings",
    title:
      "System settings should expose replaceable contracts, not hidden coupling.",
    description:
      "Provider keys, feature flags, and operational defaults belong to explicit settings surfaces so future infrastructure changes remain local and reviewable.",
    metrics: [
      {
        label: "Configured adapters",
        value: "08",
        meta: "Email, storage, export, auth",
      },
      { label: "Flags enabled", value: "12", meta: "4 experimental" },
      { label: "Access changes", value: "03", meta: "Past 24 hours" },
    ],
    activityTitle: "Recent setting changes",
    activityHint: "Audited",
    activities: [
      {
        name: "Storage region switched",
        meta: "Backup path retained",
        tone: "blue",
        status: "Changed",
      },
      {
        name: "Feature flag enabled",
        meta: "Event archive v2",
        tone: "green",
        status: "Enabled",
      },
      {
        name: "Email provider key missing",
        meta: "Delivery test blocked",
        tone: "red",
        status: "Error",
      },
    ],
    panelTitle: "Review queue",
    panelHint: "Admin only",
    checklist: [
      { name: "Operator roles", meta: "Synced", tone: "green", status: "OK" },
      {
        name: "Webhook retry limits",
        meta: "Awaiting sign-off",
        tone: "orange",
        status: "Review",
      },
      {
        name: "Disaster fallback",
        meta: "Runbook outdated",
        tone: "red",
        status: "Fix",
      },
    ],
  },
};
