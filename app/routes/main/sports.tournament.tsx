import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Tournament | recwatch" }];
}

export default function SportsTournamentRoute() {
  return <AdminPlaceholderPage {...pageContent.sportsTournament} />;
}
