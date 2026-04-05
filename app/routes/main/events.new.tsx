import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Create Event | recwatch" }];
}

export default function EventsNewRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsNew} />;
}
