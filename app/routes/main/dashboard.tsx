import { AdminScreenPage } from "~/components/auth/pages/AdminScreenPage";
import { dashboardContent } from "~/components/auth/pages/dashboard-content";

export function meta() {
  return [{ title: "Dashboard | recwatch" }];
}

export default function DashboardRoute() {
  return <AdminScreenPage {...dashboardContent} />;
}
