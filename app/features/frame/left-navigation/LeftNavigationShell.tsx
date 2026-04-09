import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { AppSidebar } from "~/features/frame/left-navigation/components/AppSidebar";
import { AppSidebarBrand } from "~/features/frame/left-navigation/header-logo/AppSidebarBrand";

export function LeftNavigationShell() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div
      className={cn(
        "fixed inset-y-13 left-0 z-40 flex -translate-x-56 cursor-grab flex-col overflow-visible border-r bg-(--surface-overlay) backdrop-blur-xl transition-[width,min-width,transform] duration-200 ease-in-out md:static md:h-dvh md:translate-x-0",
        "border-(--border-1)",
        isOpen ? "w-56 min-w-56" : "w-15 min-w-15",
        isOpen ? "translate-x-0" : ""
      )}
    >
      <AppSidebarBrand />
      <AppSidebar />
    </div>
  );
}
