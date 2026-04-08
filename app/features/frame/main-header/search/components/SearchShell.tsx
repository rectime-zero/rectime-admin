import type { ReactNode, Ref } from "react";

type SearchShellProps = {
  children: ReactNode;
  rootRef?: Ref<HTMLDivElement>;
};

export function SearchShell({ children, rootRef }: SearchShellProps) {
  return (
    <div
      ref={rootRef}
      className="app-rounded h-full overflow-hidden shadow-(--shadow-soft)"
    >
      {children}
    </div>
  );
}
