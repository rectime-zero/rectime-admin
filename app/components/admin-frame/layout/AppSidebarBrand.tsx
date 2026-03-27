import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

export function AppSidebarBrand() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div className="hidden min-h-[52px] items-center gap-3 border-b border-[color:var(--border-1)] px-4 md:flex">
      <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] font-['DM_Mono'] text-xs font-bold text-slate-950">
        R
      </span>
      <span
        className={cn(
          "overflow-hidden text-[15px] font-semibold tracking-[0.02em] whitespace-nowrap transition-[max-width,opacity] duration-200",
          isOpen ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
        )}
      >
        rec<em className="text-[color:var(--brand-1)] not-italic">time</em>
      </span>
    </div>
  );
}
