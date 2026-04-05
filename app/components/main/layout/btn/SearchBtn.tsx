import { cn } from "~/lib/cn";
import { SearchIcon } from "lucide-react";

export function SearchBtn() {
  return (
    <button
      type="button"
      className={cn(
        "app-rounded hidden h-full w-[155px] items-center gap-2 border px-2.5 text-left transition md:inline-flex",
        "border-(--border-2) bg-transparent text-(--text-2)",
        "hover:border-(--border-strong) hover:bg-(--surface-2) hover:text-(--text-1)"
      )}
    >
      <SearchIcon size={13} strokeWidth={1.8} />
      <span className="text-[12.5px] text-(--text-3)">Search...</span>
      <span className="ml-auto rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
        Ctrl K
      </span>
    </button>
  );
}
