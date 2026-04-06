import { useNavigate } from "react-router";

import { SearchBtn } from "~/components/main/layout/btn/SearchBtn";
import { NoticeBtn } from "~/components/main/layout/btn/NoticeBtn";
import { AccountBtn } from "~/components/main/layout/btn/AccountBtn/AccountBtn";
import { ProjectSwitcherBtn } from "~/components/main/layout/btn/ProjectSwitcherBtn";
import { ThemeDevToggle } from "./ThemeDevToggle";
import { MobileHamburgerMenuBtn } from "~/components/main/layout/btn/MobileHamburgerMenuBtn";

export function MainHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }

  return (
    <header className="header-height sticky top-0 z-30 flex items-center justify-between border-b border-(--border-1) bg-(--surface-overlay)/95 px-3 py-2.5 backdrop-blur-xl">
      <div className="flex h-full">
        <MobileHamburgerMenuBtn />
        <ProjectSwitcherBtn />
      </div>

      {/* 後で削除 */}
      <ThemeDevToggle />

      <div className="flex h-full gap-1">
        <SearchBtn />
        <NoticeBtn />
        <AccountBtn onLogout={handleLogout} />
      </div>
    </header>
  );
}
