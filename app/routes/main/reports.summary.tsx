import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Summary | recwatch" }];
}

export default function ReportsSummaryRoute() {
  return <AdminPlaceholderPage {...pageContent.reportsSummary} />;
}
