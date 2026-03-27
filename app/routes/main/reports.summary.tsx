import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Summary | Rectime Admin" }];
}

export default function ReportsSummaryRoute() {
  return <AdminPlaceholderPage {...pageContent.reportsSummary} />;
}
