import { BellIcon, PanelLeftOpenIcon, SearchIcon } from "lucide-react";

import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

import { AccountButton } from "./AccountButton";
import { EventSwitcher } from "./EventSwitcher";
import { ThemeDevToggle } from "./ThemeDevToggle";

export function AppHeader() {
  const toggle = useNavState((state) => state.toggle);

  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center border-b border-[color:var(--border-1)] bg-[color:var(--surface-overlay)]/95 backdrop-blur-xl">
      <button
        type="button"
        className={cn(
          "ml-3 mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border transition md:hidden",
          "border-[color:var(--border-2)] bg-transparent text-[color:var(--text-2)]",
          "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
        )}
        onClick={toggle}
        aria-label="Toggle navigation"
      >
        <PanelLeftOpenIcon size={15} strokeWidth={1.8} />
      </button>
      <div className="mr-3 flex h-full items-center gap-3 md:hidden">
        <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] font-['DM_Mono'] text-xs font-bold text-slate-950">
          R
        </span>
        <span className="whitespace-nowrap text-[15px] font-semibold tracking-[0.02em]">
          rec<em className="not-italic text-[color:var(--brand-1)]">time</em>
        </span>
      </div>
      <div className="ml-0 md:ml-3">
        <EventSwitcher />
      </div>
      <div className="ml-auto flex items-center gap-2 pr-3 md:pr-4">
        <ThemeDevToggle />
        <button
          type="button"
          className={cn(
            "hidden h-8 w-[155px] items-center gap-2 rounded-lg border px-2.5 text-left transition md:inline-flex",
            "border-[color:var(--border-2)] bg-transparent text-[color:var(--text-2)]",
            "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
          )}
        >
          <SearchIcon size={13} strokeWidth={1.8} />
          <span className="text-[12.5px] text-[color:var(--text-3)]">
            Search...
          </span>
          <span className="ml-auto rounded-md border border-[color:var(--border-1)] px-1.5 py-px font-['DM_Mono'] text-[11px] text-[color:var(--text-3)]">
            Ctrl K
          </span>
        </button>
        <button
          type="button"
          className={cn(
            "relative inline-flex h-8 w-8 items-center justify-center rounded-lg border transition",
            "border-[color:var(--border-2)] bg-transparent text-[color:var(--text-2)]",
            "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
          )}
          aria-label="Notifications"
        >
          <BellIcon size={15} strokeWidth={1.8} />
          <span className="absolute right-[7px] top-[6px] h-[7px] w-[7px] rounded-full border-[1.5px] border-[color:var(--surface-1)] bg-[color:var(--brand-1)]" />
        </button>
        <AccountButton name="Yuki Sato" role="operator" />
      </div>
    </header>
  );
}
