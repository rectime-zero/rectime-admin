import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Active Events | recwatch" }];
}

export default function EventsActiveRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsActive} />;
}
