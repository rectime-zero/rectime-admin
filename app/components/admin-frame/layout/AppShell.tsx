import { Outlet } from "react-router";

import { useNavState } from "~/hooks/useNavState";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppSidebarBrand } from "./AppSidebarBrand";

export function AppShell() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div className="app-shell" data-nav-open={isOpen}>
      <div className="app-shell__nav-column">
        <AppSidebarBrand />
        <AppSidebar />
      </div>
      <div className="app-shell__content">
        <AppHeader />
        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
