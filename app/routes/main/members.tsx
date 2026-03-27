import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Member List | Rectime Admin" }];
}

export default function MembersRoute() {
  return <AdminPlaceholderPage {...pageContent.members} />;
}
