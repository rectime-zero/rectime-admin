import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("login", "routes/auth.login.tsx"),
  route("login/email", "routes/auth.email.tsx"),
  route("/", "routes/frame.tsx", [
    index("routes/index.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("events/active", "routes/events.active.tsx"),
    route("events/past", "routes/events.past.tsx"),
    route("events/new", "routes/events.new.tsx"),
    route("members", "routes/members.tsx"),
    route("members/teams", "routes/members.teams.tsx"),
    route("members/import", "routes/members.import.tsx"),
    route("timing", "routes/timing.tsx"),
    route("sports", "routes/sports.tsx"),
    route("sports/tournament", "routes/sports.tournament.tsx"),
    route("sports/scoring", "routes/sports.scoring.tsx"),
    route("reports/summary", "routes/reports.summary.tsx"),
    route("reports/detail", "routes/reports.detail.tsx"),
    route("reports/export", "routes/reports.export.tsx"),
    route("schedule", "routes/schedule.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
