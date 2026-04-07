import type { ReactNode } from "react";

type SearchLayerProps = {
  children: ReactNode;
};

export function SearchLayer({ children }: SearchLayerProps) {
  return <div className="fixed inset-0 z-130 hidden md:block">{children}</div>;
}
