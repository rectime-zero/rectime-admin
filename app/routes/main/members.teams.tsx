import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Teams | Rectime Admin" }];
}

export default function MembersTeamsRoute() {
  return <AdminPlaceholderPage {...pageContent.membersTeams} />;
}
