import { createPortal } from "react-dom";

import { SearchBackdrop } from "~/features/frame/main-header/search/components/SearchBackdrop";
import { SearchFlexContainer } from "~/features/frame/main-header/search/components/SearchFlexContainer";
import { SearchPositionContainer } from "~/features/frame/main-header/search/components/SearchPositionContainer";
import { SearchShell } from "~/features/frame/main-header/search/components/SearchShell";
import { SearchSurface } from "~/features/frame/main-header/search/components/SearchSurface";
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
      <SearchFlexContainer>
        <div ref={anchorRef} className="h-full w-full">
          {isClosed ? (
            <SearchSurface
              inputRef={inputRef}
              isOpen={false}
              query={query}
              onChange={setQuery}
              onClose={close}
              onOpen={open}
            />
          ) : null}
        </div>
      </SearchFlexContainer>

      {typeof document !== "undefined" && isFloating
        ? createPortal(
            <>
              {/* 黒背景 */}
              <SearchBackdrop
                isActive={isOpen}
                isVisible={isFloating}
                onClose={close}
              />
              <SearchPositionContainer
                isOpen={isOpen}
                left={frame.left}
                top={frame.top}
                width={frame.width}
                transform={frame.closedTransform}
              >
                <SearchShell>
                  <SearchSurface
                    inputRef={inputRef}
                    isOpen={isOpen}
                    query={query}
                    onChange={setQuery}
                    onClose={close}
                    onOpen={open}
                  />
                </SearchShell>
              </SearchPositionContainer>
            </>,
            document.body
          )
        : null}
    </>
  );
}
