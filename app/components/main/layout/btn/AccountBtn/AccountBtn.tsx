import { AccountMenuBtn } from "~/components/main/layout/btn/AccountBtn/AccountMenuBtn";
import { AccountMenuPanel } from "~/components/main/layout/btn/AccountBtn/AccountMenuPanel";
import { getAccountBtnData } from "~/components/main/layout/btn/AccountBtn/account-btn-data";
import { useAccountBtn } from "~/components/main/layout/btn/AccountBtn/useAccountBtn";

type AccountBtnProps = {
  onLogout?: () => void;
};

export function AccountBtn({ onLogout }: AccountBtnProps) {
  const account = getAccountBtnData();
  const { close, isOpen, rootRef, toggle } = useAccountBtn();

  return (
    <div className="relative" ref={rootRef}>
      <AccountMenuBtn account={account} isOpen={isOpen} onToggle={toggle} />
      {isOpen ? (
        <AccountMenuPanel
          account={account}
          onClose={close}
          onLogout={onLogout}
        />
      ) : null}
    </div>
  );
}
