import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Detail | recwatch" }];
}

export default function ReportsDetailRoute() {
  return <AdminPlaceholderPage {...pageContent.reportsDetail} />;
}
