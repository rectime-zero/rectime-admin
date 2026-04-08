import type { ReactNode, Ref } from "react";
import { cn } from "~/lib/cn";

type SearchShellProps = {
  children: ReactNode;
  rootRef?: Ref<HTMLDivElement>;
  isOpen: boolean;
};

export function SearchShell({ children, rootRef, isOpen }: SearchShellProps) {
  return (
    <div
      ref={rootRef}
      className={cn(
        "app-rounded flex h-full flex-col gap-4 overflow-hidden bg-(--bg-top) shadow-(--shadow-soft) transition-[padding] duration-5000 ease-[cubic-bezier(.22,1,.36,1)]",
        isOpen ? "p-4" : "p-0"
      )}
    >
      {children}
    </div>
  );
}
