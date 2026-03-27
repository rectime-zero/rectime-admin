import { env } from "~/config/env";
import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { AdminScreenPage } from "~/components/admin-frame/pages/AdminScreenPage";
import { dashboardContent } from "~/components/admin-frame/pages/dashboard-content";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Dashboard | Rectime Admin" }];
}

export default function DashboardRoute() {
  if (!env.useMock) {
    return <AdminPlaceholderPage {...pageContent.dashboard} />;
  }

  return <AdminScreenPage {...dashboardContent} />;
}
