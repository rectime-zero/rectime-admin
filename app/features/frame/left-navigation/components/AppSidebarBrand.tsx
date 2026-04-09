import { useNavState } from "~/hooks/useNavState";
import { cn } from "~/lib/cn";

export function AppSidebarBrand() {
  const isOpen = useNavState((state) => state.isOpen);

  return (
    <div className="main-header-height hidden items-center gap-3 border-b border-(--border-1) px-4 md:flex">
      <a href="/" className="flex cursor-pointer items-center gap-2 py-2">
        <img src="/recwatch-logo.svg" alt="recwatch" className="h-6 w-6" />
        <span
          className={cn(
            "overflow-hidden text-base font-semibold tracking-[0.02em] whitespace-nowrap transition-[max-width,opacity] duration-200",
            isOpen ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
          )}
        >
          rec<em className="text-(--brand-1) not-italic">watch</em>
        </span>
      </a>
    </div>
  );
}
