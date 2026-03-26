import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Settings | Rectime Admin" }];
}

export default function SettingsRoute() {
  return <AdminPlaceholderPage {...pageContent.settings} />;
}
