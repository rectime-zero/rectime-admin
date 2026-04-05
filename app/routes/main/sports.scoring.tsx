import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Scoring Rules | recwatch" }];
}

export default function SportsScoringRoute() {
  return <AdminPlaceholderPage {...pageContent.sportsScoring} />;
}
