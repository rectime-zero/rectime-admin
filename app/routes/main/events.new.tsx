import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Create Event | recwatch" }];
}

export default function EventsNewRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsNew} />;
}
