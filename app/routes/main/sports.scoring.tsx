import { AdminPlaceholderPage } from "~/components/admin-frame/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/admin-frame/pages/page-content";

export function meta() {
  return [{ title: "Scoring Rules | recwatch" }];
}

export default function SportsScoringRoute() {
  return <AdminPlaceholderPage {...pageContent.sportsScoring} />;
}
