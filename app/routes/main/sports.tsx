import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Sports List | recwatch" }];
}

export default function SportsRoute() {
  return <AdminPlaceholderPage {...pageContent.sports} />;
}
