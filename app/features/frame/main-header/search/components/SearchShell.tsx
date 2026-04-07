import type { ReactNode, Ref } from "react";

type SearchShellProps = {
  children: ReactNode;
  rootRef?: Ref<HTMLDivElement>;
};

export function SearchShell({ children, rootRef }: SearchShellProps) {
  return (
    <div
      ref={rootRef}
      className="app-rounded overflow-hidden border border-(--border-2) bg-(--surface-overlay-strong) shadow-(--shadow-soft)"
    >
      {children}
    </div>
  );
}
