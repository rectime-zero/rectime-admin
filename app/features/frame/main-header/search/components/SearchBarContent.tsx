import { cn } from "~/lib/cn";
import { SearchIcon } from "lucide-react";

type SearchBarContentProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  query: string;
  onChange: (value: string) => void;
  onOpen: () => void;
};

export function SearchBarContent({
  inputRef,
  isOpen,
  query,
  onChange,
  onOpen,
}: SearchBarContentProps) {
  function handleClick() {
    onOpen();

    requestAnimationFrame(() => {
      const input = inputRef.current;

      if (!input) {
        return;
      }

      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "app-rounded flex h-full max-h-12 w-full min-w-0 items-center gap-2 border px-2.5 text-left",
        "border-(--border-2) bg-transparent",
        "transition-[border-color,background-color,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        isOpen ? "cursor-text" : "cursor-pointer",
        "hover:border-(--border-strong) hover:bg-(--surface-2) hover:text-(--text-1)"
      )}
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
          className={cn(
            "min-w-0 flex-1 bg-transparent text-[12.5px] text-(--text-3) outline-none placeholder:text-(--text-3)",
            isOpen ? "cursor-text" : "cursor-pointer"
          )}
        />
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-(--border-1) px-1.5 py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
          <span className="app-text-small whitespace-nowrap">Ctrl + K</span>
        </span>
      </div>
    </div>
  );
}
