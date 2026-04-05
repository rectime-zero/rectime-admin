import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Timing Control | recwatch" }];
}

export default function TimingRoute() {
  return <AdminPlaceholderPage {...pageContent.timing} />;
}
