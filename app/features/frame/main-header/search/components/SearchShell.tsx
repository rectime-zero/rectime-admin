import type { ReactNode } from "react";

type SearchShellProps = {
  children: ReactNode;
};

export function SearchShell({ children }: SearchShellProps) {
  return (
    <div className="app-rounded overflow-hidden border border-(--border-2) bg-(--surface-overlay-strong) shadow-(--shadow-soft)">
      {children}
    </div>
  );
}
