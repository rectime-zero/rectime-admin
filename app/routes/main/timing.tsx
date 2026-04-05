import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Timing Control | recwatch" }];
}

export default function TimingRoute() {
  return <AdminPlaceholderPage {...pageContent.timing} />;
}
