import { AdminPlaceholderPage } from "~/components/auth/pages/AdminPlaceholderPage";
import { pageContent } from "~/components/auth/pages/page-content";

export function meta() {
  return [{ title: "Member List | recwatch" }];
}

export default function MembersRoute() {
  return <AdminPlaceholderPage {...pageContent.members} />;
}
