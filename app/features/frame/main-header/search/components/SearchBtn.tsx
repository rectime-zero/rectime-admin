import { createPortal } from "react-dom";

import { SearchBackdrop } from "~/features/frame/main-header/search/components/SearchBackdrop";
import { SearchLayer } from "~/features/frame/main-header/search/components/SearchLayer";
import { SearchFloating } from "~/features/frame/main-header/search/components/SearchFloating";
import { SearchTrigger } from "~/features/frame/main-header/search/components/SearchTrigger";
import { useSearchTransition } from "~/features/frame/main-header/search/hooks/useSearchTransition";

export function SearchBtn() {
  const {
    anchorRef,
    close,
    frame,
    inputRef,
    isClosed,
    isFloating,
    isOpen,
    open,
    query,
    setQuery,
  } = useSearchTransition();

  return (
    <>
      {/* domの場所確保用 */}
      <div ref={anchorRef} className="hidden h-full w-[155px] md:block">
        {isClosed ? <SearchTrigger onOpen={open} /> : null}
      </div>

      {typeof document !== "undefined" && isFloating
        ? createPortal(
            <SearchLayer>
              {/* 黒背景 */}
              <SearchBackdrop
                isActive={isOpen}
                isVisible={isFloating}
                onClose={close}
              />
              <div
                className={`absolute top-0 left-0 z-10 origin-top-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  isFloating
                    ? "overflow-hidden rounded-[22px] border border-(--border-2) bg-(--surface-overlay-strong) shadow-[var(--shadow-soft)]"
                    : "overflow-visible bg-transparent shadow-none"
                }`}
                style={{
                  left: frame.left,
                  top: frame.top,
                  width: frame.width,
                  transform: isOpen
                    ? "translate3d(0,0,0) scale(1,1)"
                    : frame.closedTransform,
                }}
              >
                <SearchFloating
                  inputRef={inputRef}
                  isOpen={isOpen}
                  query={query}
                  onChange={setQuery}
                  onClose={close}
                />
              </div>
            </SearchLayer>,
            document.body
          )
        : null}
    </>
  );
}
