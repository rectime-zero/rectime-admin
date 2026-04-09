import { PanelLeftCloseIcon } from "lucide-react";

import { currentUser } from "~/config/permissions";
import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { getVisibleNavSections } from "~/features/frame/left-navigation/model/nav-config";
import { NavSection } from "~/features/frame/left-navigation/components/NavSection";

export function AppSidebar() {
  const isOpen = useNavState((state) => state.isOpen);
  const toggle = useNavState((state) => state.toggle);
  const sections = getVisibleNavSections(currentUser.role);

  return (
    <aside className="flex min-h-0 flex-1 flex-col overflow-visible">
      {/* navigation表示area */}
      <div className="flex-1 overflow-x-visible overflow-y-auto overscroll-y-contain px-2 py-3">
        {sections.map((section) => (
          <NavSection key={section.label} def={section} />
        ))}
      </div>

      {/* 下のnavigation開閉ボタン */}
      <div className="main-footer-height flex border-t border-(--border-1) p-1 pl-3">
        <button
          type="button"
          className={cn(
            "app-rounded relative flex aspect-square h-full cursor-pointer items-center justify-center bg-transparent p-1 text-(--text-2) transition",
            "hover:bg-(--surface-2) hover:text-(--text-1)"
          )}
          onClick={toggle}
        >
          <PanelLeftCloseIcon
            className={cn(
              "transition-transform duration-200",
              !isOpen ? "scale-x-[-1]" : ""
            )}
          />
        </button>
      </div>
    </aside>
  );
}
