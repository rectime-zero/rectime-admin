import type { ReactNode, Ref } from "react";

type SearchShellProps = {
  children: ReactNode;
  rootRef?: Ref<HTMLDivElement>;
};

export function SearchShell({ children, rootRef }: SearchShellProps) {
  return (
    <div
      ref={rootRef}
      className="app-rounded flex h-full flex-col gap-4 overflow-hidden"
    >
      {children}
    </div>
  );
}
