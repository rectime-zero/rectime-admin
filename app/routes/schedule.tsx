import { AdminScreenPage } from "~/components/admin-frame/pages/AdminScreenPage";
import { screenContent } from "~/components/admin-frame/pages/screen-content";

export default function ScheduleRoute() {
  return <AdminScreenPage {...screenContent.schedule} />;
}
