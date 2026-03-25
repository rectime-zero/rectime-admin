import type { ReactNode } from "react";

type NavAccordionProps = {
  isOpen: boolean;
  children: ReactNode;
};

export function NavAccordion({ isOpen, children }: NavAccordionProps) {
  return (
    <div className="nav-accordion" data-open={isOpen}>
      {children}
    </div>
  );
}
