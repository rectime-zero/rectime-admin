import type { ReactNode } from "react";

type AccountMenuActionButtonProps = {
  content: ReactNode;
  onClick: () => void;
};

export function AccountMenuActionButton({
  content,
  onClick,
}: AccountMenuActionButtonProps) {
  return (
    <button
      type="button"
      className="flex h-8.5 w-full cursor-pointer items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-(--text-1) transition hover:bg-(--surface-2)"
      onClick={onClick}
    >
      {content}
    </button>
  );
}
