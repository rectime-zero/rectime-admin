import { SearchIcon } from "lucide-react";

type SearchBarContentProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  onChange: (value: string) => void;
  onOpen: () => void;
};

export function SearchBarContent({
  inputRef,
  query,
  onChange,
  onOpen,
}: SearchBarContentProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="app-rounded flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 border border-(--border-2) bg-transparent px-2.5 text-left transition-[border-color,background-color,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-(--border-strong) hover:bg-(--surface-2) hover:text-(--text-1)"
    >
      <SearchIcon
        size={13}
        strokeWidth={1.8}
        className="shrink-0 text-(--text-2)"
      />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onOpen}
          placeholder="Search..."
          className="pointer-events-none min-w-0 flex-1 bg-transparent text-[12.5px] text-(--text-3) outline-none placeholder:text-(--text-3)"
          readOnly
        />
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
          <span className="app-text-small whitespace-nowrap">Ctrl + K</span>
        </span>
      </div>
    </button>
  );
}
