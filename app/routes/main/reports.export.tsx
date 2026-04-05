import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Export | recwatch" }];
}

export default function ReportsExportRoute() {
  return <AdminPlaceholderPage {...pageContent.reportsExport} />;
}
