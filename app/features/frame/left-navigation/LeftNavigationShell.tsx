import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { AppSidebar } from "~/features/frame/left-navigation/components/AppSidebar";
import { SidebarBrand } from "~/features/frame/left-navigation/header-logo/SidebarBrand";
import { BottomBtn } from "~/features/frame/left-navigation/bottom-area/BottomBtn";

export function LeftNavigationShell() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div
      className={cn(
        "relative z-99 overflow-visible transition-[width] duration-200 ease-in-out",
        isOpen ? "left-navigation-open-width" : "left-navigation-close-width"
      )}
    >
      <div
        className={cn(
          "left-navigation-expandable absolute z-99 flex h-full flex-col border-r bg-(--surface-overlay) backdrop-blur-xl transition-[width] duration-200 ease-in-out",
          "border-(--border-1)",
          isOpen ? "left-navigation-open-width" : "left-navigation-close-width"
        )}
      >
        <div className="sidebar-hover-area contents">
          <SidebarBrand />
          <AppSidebar />
        </div>
        <BottomBtn />
      </div>
    </div>
  );
}
