import type { ReactNode } from "react";

export type NavChildDef = {
  id: string;
  label: string;
  to: string;
  badge?: string;
};

export type NavItemDef = {
  id: string;
  label: string;
  icon: ReactNode;
  to?: string;
  badge?: number | string;
  children?: NavChildDef[];
};

export type NavSectionDef = {
  label: string;
  items: NavItemDef[];
};
