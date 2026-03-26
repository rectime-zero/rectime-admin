import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Import | Rectime Admin" }];
}

export default function MembersImportRoute() {
  return <AdminPlaceholderPage {...pageContent.membersImport} />;
}
