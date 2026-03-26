import { PanelLeftCloseIcon } from "lucide-react";

import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { settingsItem, NAV_SECTIONS } from "../nav/nav-config";
import { NavItem } from "../nav/NavItem";
import { NavSection } from "../nav/NavSection";

export function AppSidebar() {
  const isOpen = useNavState((state) => state.isOpen);
  const toggle = useNavState((state) => state.toggle);

  return (
    <aside className="flex min-h-0 flex-1 flex-col overflow-visible">
      <div className="flex-1 overflow-y-auto overflow-x-visible px-2 py-3">
        {NAV_SECTIONS.map((section) => (
          <NavSection key={section.label} def={section} />
        ))}
      </div>
      <div className="border-t border-[color:var(--border-1)] p-2">
        <NavItem def={settingsItem} />
        <button
          type="button"
          className={cn(
            "relative flex min-h-[42px] w-full items-center gap-3 rounded-xl bg-transparent px-3 text-[color:var(--text-2)] transition",
            "hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
          )}
          onClick={toggle}
        >
          <span
            className={cn(
              "inline-flex w-4 min-w-4 items-center justify-center transition-transform duration-200",
              isOpen ? "scale-x-[-1]" : ""
            )}
          >
            <PanelLeftCloseIcon size={15} strokeWidth={1.8} />
          </span>
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap text-[13px] font-medium transition-[max-width,opacity] duration-200",
              isOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
            )}
          >
            {isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          </span>
        </button>
      </div>
    </aside>
  );
}
