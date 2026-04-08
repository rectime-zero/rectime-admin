export function SearchResultsPanel() {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-(--border-1) bg-(--surface-1)">
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-4">
        <div className="text-[11px] font-semibold tracking-[0.08em] text-(--text-3) uppercase">
          Search Area
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-[8px] border border-dashed border-(--border-2) bg-transparent px-4 py-6 text-center text-sm text-(--text-3)">
          Search results, recent items, or suggestions can be rendered here.
        </div>
      </div>
    </section>
  );
}
