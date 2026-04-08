import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/cn";
import { SearchIcon } from "lucide-react";

type SearchBarContentProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  query: string;
  onChange: (value: string) => void;
  onOpen: () => void;
};

type SearchShortcutLabel = "Ctrl + K" | "ESC";

const SEARCH_SHORTCUT_FADE_DURATION_MS = 160;
const SEARCH_SHORTCUT_WIDTH_DURATION_MS = 220;
const SEARCH_SHORTCUT_FALLBACK_WIDTH_PX = 56;

export function SearchBarContent({
  inputRef,
  isOpen,
  query,
  onChange,
  onOpen,
}: SearchBarContentProps) {
  const nextShortcutLabel: SearchShortcutLabel = isOpen ? "ESC" : "Ctrl + K";
  const [shortcutLabel, setShortcutLabel] = useState(nextShortcutLabel);
  const [isShortcutVisible, setIsShortcutVisible] = useState(true);
  const ctrlShortcutRef = useRef<HTMLSpanElement>(null);
  const escShortcutRef = useRef<HTMLSpanElement>(null);
  const [shortcutWidths, setShortcutWidths] = useState<
    Record<SearchShortcutLabel, number>
  >({
    "Ctrl + K": SEARCH_SHORTCUT_FALLBACK_WIDTH_PX,
    ESC: SEARCH_SHORTCUT_FALLBACK_WIDTH_PX,
  });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const ctrlWidth = ctrlShortcutRef.current?.getBoundingClientRect().width;
      const escWidth = escShortcutRef.current?.getBoundingClientRect().width;

      if (!ctrlWidth || !escWidth) {
        return;
      }

      setShortcutWidths({
        "Ctrl + K": ctrlWidth,
        ESC: escWidth,
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (shortcutLabel === nextShortcutLabel) {
      const frameId = window.requestAnimationFrame(() => {
        setIsShortcutVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const hideFrameId = window.requestAnimationFrame(() => {
      setIsShortcutVisible(false);
    });

    const swapTimeoutId = window.setTimeout(() => {
      setShortcutLabel(nextShortcutLabel);
    }, SEARCH_SHORTCUT_FADE_DURATION_MS);

    const showTimeoutId = window.setTimeout(() => {
      setIsShortcutVisible(true);
    }, SEARCH_SHORTCUT_FADE_DURATION_MS + SEARCH_SHORTCUT_WIDTH_DURATION_MS);

    return () => {
      window.cancelAnimationFrame(hideFrameId);
      window.clearTimeout(swapTimeoutId);
      window.clearTimeout(showTimeoutId);
    };
  }, [nextShortcutLabel, shortcutLabel]);

  const shortcutWidth = shortcutWidths[shortcutLabel];

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
    <>
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
          <span className="ml-auto inline-flex shrink-0 items-center rounded-md border border-(--border-1) py-px font-['DM_Mono'] text-[11px] text-(--text-3)">
            <span
              className="app-text-small relative mb-1 inline-flex h-[1.2em] items-center justify-center overflow-hidden whitespace-nowrap opacity-100! transition-[width] duration-200 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ width: `${shortcutWidth}px` }}
            >
              <span
                className={cn(
                  "absolute inset-0 px-2 text-center transition-opacity duration-150 ease-[cubic-bezier(.22,1,.36,1)]",
                  isShortcutVisible ? "opacity-100" : "opacity-0"
                )}
              >
                {shortcutLabel}
              </span>
            </span>
          </span>
          <span
            className="pointer-events-none absolute opacity-0"
            aria-hidden="true"
          >
            <span
              ref={ctrlShortcutRef}
              className="app-text-small px-2 font-['DM_Mono']"
            >
              Ctrl + K
            </span>
            <span
              ref={escShortcutRef}
              className="app-text-small px-2 font-['DM_Mono']"
            >
              ESC
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
