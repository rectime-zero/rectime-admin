import { CommandIcon, SearchIcon } from "lucide-react";

import { cn } from "~/lib/cn";

type SearchTriggerProps = {
  onOpen: () => void;
};

export function SearchTrigger({ onOpen }: SearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "app-rounded flex h-full w-full items-center gap-2 border px-2.5 text-left transition",
        "border-(--border-2) bg-transparent text-(--text-2)",
        "hover:border-(--border-strong) hover:bg-(--surface-2) hover:text-(--text-1)"
      )}
    >
      <SearchIcon size={13} strokeWidth={1.8} />
      <span className="text-[12.5px] text-(--text-3)">Search...</span>
      <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
        <CommandIcon size={12} strokeWidth={1.8} />
        <span>K</span>
      </span>
    </button>
  );
}
