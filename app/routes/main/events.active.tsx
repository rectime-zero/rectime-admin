import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Active Events | recwatch" }];
}

export default function EventsActiveRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsActive} />;
}
