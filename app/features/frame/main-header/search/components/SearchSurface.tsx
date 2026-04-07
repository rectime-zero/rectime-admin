import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "~/lib/cn";

type SearchSurfaceProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onOpen: () => void;
};

export function SearchSurface({
  inputRef,
  isOpen,
  query,
  onChange,
  onClose,
  onOpen,
}: SearchSurfaceProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        isOpen ? "h-14 border-b border-(--border-1) px-3" : "h-8"
      )}
    >
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

      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 text-left transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          isOpen
            ? "h-full flex-1 rounded-2xl border border-(--border-2) bg-(--surface-2) px-4"
            : "app-rounded h-full w-full border border-(--border-2) bg-transparent px-2.5 hover:border-(--border-strong) hover:bg-(--surface-2) hover:text-(--text-1)"
        )}
      >
        <SearchIcon
          size={isOpen ? 14 : 13}
          strokeWidth={1.8}
          className="shrink-0 text-(--text-2)"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onOpen}
          placeholder="Search..."
          className={cn(
            "w-full bg-transparent transition-all duration-500 outline-none",
            isOpen
              ? "text-sm text-(--text-1) placeholder:text-(--text-3)"
              : "pointer-events-none text-[12.5px] text-(--text-3) placeholder:text-(--text-3)"
          )}
          readOnly={!isOpen}
        />
        <span className="ml-auto inline-flex w-fit items-center gap-1 rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
          {isOpen ? (
            "ESC"
          ) : (
            <span className="app-text-small whitespace-nowrap">Ctrl + K</span>
          )}
        </span>
      </button>
    </div>
  );
}
