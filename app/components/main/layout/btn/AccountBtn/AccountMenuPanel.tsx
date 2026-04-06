import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";

import type { AccountBtnData } from "~/components/main/layout/btn/AccountBtn/account-btn-data";

type AccountMenuPanelProps = {
  account: AccountBtnData;
  onClose: () => void;
  onLogout?: () => void;
};

export function AccountMenuPanel({
  account,
  onClose,
  onLogout,
}: AccountMenuPanelProps) {
  return (
    <div className="absolute top-[calc(100%+6px)] right-0 z-140 min-w-[220px] rounded-xl border border-(--border-2) bg-(--surface-overlay-strong) p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className="border-b border-(--border-1) px-2 pt-1 pb-2.5">
        <div className="text-[13px] font-semibold">{account.name}</div>
        <div
          className="mt-2 inline-flex items-center justify-center rounded-full border px-[7px] py-[3px] text-[11px] font-bold tracking-[0.04em]"
          style={{
            color: account.textColor,
            background: account.bgColor,
            borderColor: account.borderColor,
          }}
        >
          {account.role}
        </div>
      </div>
      <div className="pt-2">
        <button
          type="button"
          className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-(--text-1) transition hover:bg-(--surface-2)"
          onClick={onClose}
        >
          <User2Icon size={14} strokeWidth={1.8} />
          <span>Profile</span>
        </button>
        <button
          type="button"
          className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-(--text-1) transition hover:bg-(--surface-2)"
          onClick={onClose}
        >
          <SettingsIcon size={14} strokeWidth={1.8} />
          <span>Preferences</span>
        </button>
        <div className="mx-1 my-1.5 h-px bg-(--border-1)" />
        <button
          type="button"
          className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-(--text-1) transition hover:bg-(--surface-2)"
          onClick={() => {
            onClose();
            onLogout?.();
          }}
        >
          <LogOutIcon size={14} strokeWidth={1.8} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
