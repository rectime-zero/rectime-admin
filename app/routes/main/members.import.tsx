import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Import | recwatch" }];
}

export default function MembersImportRoute() {
  return <AdminPlaceholderPage {...pageContent.membersImport} />;
}
