import { BellIcon, PanelLeftOpenIcon, SearchIcon } from "lucide-react";

import { useNavState } from "~/hooks/useNavState";

import { AccountButton } from "./AccountButton";
import { EventSwitcher } from "./EventSwitcher";

export function AppHeader() {
  const toggle = useNavState((state) => state.toggle);

  return (
    <header className="app-header">
      <button
        type="button"
        className="toolbar-button app-header__menu"
        onClick={toggle}
        aria-label="Toggle navigation"
      >
        <PanelLeftOpenIcon size={15} strokeWidth={1.8} />
      </button>
      <div className="app-header__brand">
        <span className="app-header__brand-mark">R</span>
        <span className="app-header__brand-text">
          rec<em className="app-header__brand-accent">time</em>
        </span>
      </div>
      <div className="app-header__event">
        <EventSwitcher />
      </div>
      <div className="app-header__actions">
        <button type="button" className="toolbar-button search-button">
          <SearchIcon size={13} strokeWidth={1.8} />
          <span className="search-button__label">Search...</span>
          <span className="search-button__kbd">Ctrl K</span>
        </button>
        <button
          type="button"
          className="toolbar-button icon-button"
          aria-label="Notifications"
        >
          <BellIcon size={15} strokeWidth={1.8} />
          <span className="icon-button__dot" />
        </button>
        <AccountButton name="Yuki Sato" role="operator" />
      </div>
    </header>
  );
}
