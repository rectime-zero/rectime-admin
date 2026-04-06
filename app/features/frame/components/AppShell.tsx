import { Outlet } from "react-router";

import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { MainHeader } from "~/features/frame/main-header/components/MainHeader";
import { AppSidebar } from "~/features/frame/left-navigation/components/AppSidebar";
import { AppSidebarBrand } from "~/features/frame/left-navigation/components/AppSidebarBrand";

export function AppShell() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div className="flex min-h-dvh md:flex-row">
      <div
        className={cn(
          "fixed inset-y-[52px] left-0 z-40 flex translate-x-[-224px] flex-col overflow-visible border-r bg-[color:var(--surface-overlay)] backdrop-blur-xl transition-[width,min-width,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] md:static md:min-h-dvh md:translate-x-0",
          "border-[color:var(--border-1)]",
          isOpen ? "w-56 min-w-56" : "w-[60px] min-w-[60px]",
          isOpen ? "translate-x-0" : ""
        )}
      >
        <AppSidebarBrand />
        <AppSidebar />
      </div>
      {/* MainArea */}
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <MainHeader />
        <main className="flex-1 overflow-auto p-[18px] md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
