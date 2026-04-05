import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Schedule | recwatch" }];
}

export default function ScheduleRoute() {
  return <AdminPlaceholderPage {...pageContent.schedule} />;
}
