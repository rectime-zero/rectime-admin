import { AdminScreenPage } from "~/components/admin-frame/pages/AdminScreenPage";
import { screenContent } from "~/components/admin-frame/pages/screen-content";

export default function MembersTeamsRoute() {
  return <AdminScreenPage {...screenContent.membersTeams} />;
}
