import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Tournament | recwatch" }];
}

export default function SportsTournamentRoute() {
  return <AdminPlaceholderPage {...pageContent.sportsTournament} />;
}
