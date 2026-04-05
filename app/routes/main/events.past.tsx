import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Past Events | recwatch" }];
}

export default function EventsPastRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsPast} />;
}
