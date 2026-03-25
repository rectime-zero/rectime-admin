import { PanelLeftCloseIcon } from "lucide-react";

import { useNavState } from "~/hooks/useNavState";

import { settingsItem, NAV_SECTIONS } from "../nav/nav-config";
import { NavItem } from "../nav/NavItem";
import { NavSection } from "../nav/NavSection";

export function AppSidebar() {
  const isOpen = useNavState((state) => state.isOpen);
  const toggle = useNavState((state) => state.toggle);

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__scroll">
        {NAV_SECTIONS.map((section) => (
          <NavSection key={section.label} def={section} />
        ))}
      </div>
      <div className="app-sidebar__bottom">
        <NavItem def={settingsItem} />
        <button
          type="button"
          className="nav-toggle"
          data-open={isOpen}
          onClick={toggle}
        >
          <span className="nav-item__icon">
            <PanelLeftCloseIcon size={15} strokeWidth={1.8} />
          </span>
          <span className="nav-item__text">
            {isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          </span>
        </button>
      </div>
    </aside>
  );
}
