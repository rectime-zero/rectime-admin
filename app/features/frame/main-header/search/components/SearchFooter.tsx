export function SearchFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-(--border-1) px-4 py-3 text-[11px] text-(--text-3)">
      <div className="flex items-center gap-2">
        <kbd className="rounded border border-(--border-1) px-1.5 py-px font-['DM_Mono']">
          ↑↓
        </kbd>
        <span>navigate</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="rounded border border-(--border-1) px-1.5 py-px font-['DM_Mono']">
          Enter
        </kbd>
        <span>select</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="rounded border border-(--border-1) px-1.5 py-px font-['DM_Mono']">
          Esc
        </kbd>
        <span>close</span>
      </div>
    </footer>
  );
}
