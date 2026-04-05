import { PanelLeftCloseIcon } from "lucide-react";

import { currentUser } from "~/config/permissions";
import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import {
  getVisibleNavSections,
  getVisibleSettingsItem,
} from "~/components/main/sidebar/nav-config";
import { NavItem } from "~/components/main/sidebar/NavItem";
import { NavSection } from "~/components/main/sidebar/NavSection";

export function AppSidebar() {
  const isOpen = useNavState((state) => state.isOpen);
  const toggle = useNavState((state) => state.toggle);
  const sections = getVisibleNavSections(currentUser.role);
  const settingsItem = getVisibleSettingsItem(currentUser.role);

  return (
    <aside className="flex min-h-0 flex-1 flex-col overflow-visible">
      <div className="flex-1 overflow-x-visible overflow-y-auto px-2 py-3">
        {sections.map((section) => (
          <NavSection key={section.label} def={section} />
        ))}
      </div>
      <div className="border-t border-[color:var(--border-1)] p-2">
        {settingsItem ? <NavItem def={settingsItem} /> : null}
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
              "overflow-hidden text-[13px] font-medium whitespace-nowrap transition-[max-width,opacity] duration-200",
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
