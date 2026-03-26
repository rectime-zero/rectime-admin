import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Tournament | Rectime Admin" }];
}

export default function SportsTournamentRoute() {
  return <AdminPlaceholderPage {...pageContent.sportsTournament} />;
}
