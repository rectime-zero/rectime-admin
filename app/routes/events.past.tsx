import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Past Events | Rectime Admin" }];
}

export default function EventsPastRoute() {
  return <AdminPlaceholderPage {...pageContent.eventsPast} />;
}
