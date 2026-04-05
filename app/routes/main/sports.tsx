import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Sports List | recwatch" }];
}

export default function SportsRoute() {
  return <AdminPlaceholderPage {...pageContent.sports} />;
}
