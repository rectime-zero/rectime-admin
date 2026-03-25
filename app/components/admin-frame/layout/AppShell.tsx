import { Outlet } from "react-router";

import { useNavState } from "~/hooks/useNavState";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppShell() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div className="app-shell" data-nav-open={isOpen}>
      <AppHeader />
      <div className="app-shell__body">
        <AppSidebar />
        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
