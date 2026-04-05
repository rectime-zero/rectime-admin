import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Settings | recwatch" }];
}

export default function SettingsRoute() {
  return <AdminPlaceholderPage {...pageContent.settings} />;
}
