import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "~/lib/cn";

type SearchFloatingProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

export function SearchFloating({
  inputRef,
  isOpen,
  query,
  onChange,
  onClose,
}: SearchFloatingProps) {
  return (
    <div className="flex h-14 items-center gap-3 border-b border-(--border-1) px-3">
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "flex items-center justify-center rounded-xl border bg-(--surface-2) text-(--text-2) transition-all duration-500 hover:bg-(--surface-3) hover:text-(--text-1)",
          isOpen
            ? "h-9 w-9 border-(--border-2) opacity-100"
            : "pointer-events-none h-0 w-0 border-transparent opacity-0"
        )}
        aria-label="Close search"
      >
        <XIcon size={14} strokeWidth={1.8} />
      </button>

      <div className="flex h-full flex-1 items-center gap-3 rounded-2xl border border-(--border-2) bg-(--surface-2) px-4 text-left transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]">
        <SearchIcon
          size={14}
          strokeWidth={1.8}
          className="shrink-0 text-(--text-2)"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-(--text-1) outline-none placeholder:text-(--text-3)"
        />
        <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
          ESC
        </span>
      </div>
    </div>
  );
}
