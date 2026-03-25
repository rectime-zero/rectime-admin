import type { NavSectionDef } from "~/types/nav";

import { NavItem } from "./NavItem";

type NavSectionProps = {
  def: NavSectionDef;
};

export function NavSection({ def }: NavSectionProps) {
  return (
    <section className="nav-section">
      <div className="nav-section__label">{def.label}</div>
      <div>
        {def.items.map((item) => (
          <NavItem key={item.id} def={item} />
        ))}
      </div>
    </section>
  );
}
