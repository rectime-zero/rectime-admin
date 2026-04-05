import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Teams | recwatch" }];
}

export default function MembersTeamsRoute() {
  return <AdminPlaceholderPage {...pageContent.membersTeams} />;
}
