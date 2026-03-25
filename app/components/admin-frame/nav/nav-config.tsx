import {
  CalendarIcon,
  Clock3Icon,
  FileTextIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  TimerResetIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import type { NavItemDef, NavSectionDef } from "~/types/nav";

const iconSize = 15;

export const NAV_SECTIONS: NavSectionDef[] = [
  {
    label: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboardIcon size={iconSize} strokeWidth={1.8} />,
        to: "/dashboard",
      },
      {
        id: "events",
        label: "Events",
        icon: <CalendarIcon size={iconSize} strokeWidth={1.8} />,
        badge: 3,
        children: [
          { id: "events-active", label: "Active Events", to: "/events/active" },
          { id: "events-past", label: "Past Events", to: "/events/past" },
          {
            id: "events-new",
            label: "Create Event",
            to: "/events/new",
            badge: "Beta",
          },
        ],
      },
      {
        id: "members",
        label: "Members",
        icon: <UsersIcon size={iconSize} strokeWidth={1.8} />,
        badge: 128,
        children: [
          { id: "members-list", label: "Member List", to: "/members" },
          { id: "members-teams", label: "Teams", to: "/members/teams" },
          { id: "members-import", label: "Import", to: "/members/import" },
        ],
      },
      {
        id: "timing",
        label: "Timing Control",
        icon: <TimerResetIcon size={iconSize} strokeWidth={1.8} />,
        to: "/timing",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        id: "sports",
        label: "Sports Setup",
        icon: <TrophyIcon size={iconSize} strokeWidth={1.8} />,
        children: [
          { id: "sports-list", label: "Sports List", to: "/sports" },
          {
            id: "sports-tournament",
            label: "Tournament",
            to: "/sports/tournament",
          },
          {
            id: "sports-scoring",
            label: "Scoring Rules",
            to: "/sports/scoring",
          },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: <FileTextIcon size={iconSize} strokeWidth={1.8} />,
        children: [
          { id: "reports-summary", label: "Summary", to: "/reports/summary" },
          { id: "reports-detail", label: "Detail", to: "/reports/detail" },
          { id: "reports-export", label: "Export", to: "/reports/export" },
        ],
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: <Clock3Icon size={iconSize} strokeWidth={1.8} />,
        to: "/schedule",
      },
    ],
  },
];

export const settingsItem: NavItemDef = {
  id: "settings",
  label: "Settings",
  icon: <Settings2Icon size={iconSize} strokeWidth={1.8} />,
  to: "/settings",
};
