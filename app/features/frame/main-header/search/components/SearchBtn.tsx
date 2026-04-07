import { createPortal } from "react-dom";

import { SearchAnchor } from "~/features/frame/main-header/search/components/SearchAnchor";
import { SearchBackdrop } from "~/features/frame/main-header/search/components/SearchBackdrop";
import { SearchBarContent } from "~/features/frame/main-header/search/components/SearchBarContent";
import { SearchPositionContainer } from "~/features/frame/main-header/search/components/SearchPositionContainer";
import { SearchShell } from "~/features/frame/main-header/search/components/SearchShell";
import { useSearchTransition } from "~/features/frame/main-header/search/hooks/useSearchTransition";

export function SearchBtn() {
  const { anchorRef, close, frame, inputRef, isOpen, open, query, setQuery } =
    useSearchTransition();

  return (
    <>
      {/* domの場所確保用 */}
      <SearchAnchor anchorRef={anchorRef} />

      {typeof document !== "undefined"
        ? createPortal(
            <>
              {/* 黒背景 */}
              <SearchBackdrop
                isActive={isOpen}
                isVisible={isOpen}
                onClose={close}
              />
              <SearchPositionContainer
                isOpen={isOpen}
                openLeft={frame.openLeft}
                openTop={frame.openTop}
                closedWidth={frame.closedWidth}
                width={frame.width}
                closedTranslateX={frame.closedTranslateX}
                closedTranslateY={frame.closedTranslateY}
              >
                <SearchShell>
                  <SearchBarContent
                    inputRef={inputRef}
                    query={query}
                    onChange={setQuery}
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
