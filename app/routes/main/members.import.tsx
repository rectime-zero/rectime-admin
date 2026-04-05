import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Import | recwatch" }];
}

export default function MembersImportRoute() {
  return <AdminPlaceholderPage {...pageContent.membersImport} />;
}
