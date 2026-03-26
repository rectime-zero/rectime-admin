import type { NavSectionDef } from "~/types/nav";
import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { NavItem } from "./NavItem";

type NavSectionProps = {
  def: NavSectionDef;
};

export function NavSection({ def }: NavSectionProps) {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <section className="mt-[18px] first:mt-0">
      <div
        className={cn(
          "overflow-hidden whitespace-nowrap px-2.5 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--text-3)] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      >
        {def.label}
      </div>
      <div>
        {def.items.map((item) => (
          <NavItem key={item.id} def={item} />
        ))}
      </div>
    </section>
  );
}
