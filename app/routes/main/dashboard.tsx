import { AdminScreenPage } from "~/components/admin-frame/pages/AdminScreenPage";
import { dashboardContent } from "~/components/admin-frame/pages/dashboard-content";

export function meta() {
  return [{ title: "Dashboard | recwatch" }];
}

export default function DashboardRoute() {
  return <AdminScreenPage {...dashboardContent} />;
}
