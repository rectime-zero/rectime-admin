import { MoonStarIcon, SunMediumIcon } from "lucide-react";

import { useThemeMode } from "~/hooks/useThemeMode";
import { cn } from "~/lib/cn";

export function ThemeDevToggle() {
  const { theme, toggleTheme } = useThemeMode();

  if (!import.meta.env.DEV) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-xl border px-3 text-[12px] font-medium transition",
        "border-[color:var(--border-2)] bg-[color:var(--surface-overlay)] text-[color:var(--text-2)]",
        "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <MoonStarIcon size={14} strokeWidth={1.8} />
      ) : (
        <SunMediumIcon size={14} strokeWidth={1.8} />
      )}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
