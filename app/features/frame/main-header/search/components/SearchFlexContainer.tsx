import type { ReactNode } from "react";

type SearchFlexContainerProps = {
  children: ReactNode;
};

export function SearchFlexContainer({ children }: SearchFlexContainerProps) {
  return <div className="hidden h-full w-40 md:block">{children}</div>;
}
