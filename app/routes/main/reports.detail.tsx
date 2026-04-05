import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Detail | recwatch" }];
}

export default function ReportsDetailRoute() {
  return <AdminPlaceholderPage {...pageContent.reportsDetail} />;
}
