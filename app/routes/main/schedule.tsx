import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Schedule | recwatch" }];
}

export default function ScheduleRoute() {
  return <AdminPlaceholderPage {...pageContent.schedule} />;
}
