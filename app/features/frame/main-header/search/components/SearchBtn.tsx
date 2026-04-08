import { createPortal } from "react-dom";

import { SearchAnchor } from "~/features/frame/main-header/search/components/SearchAnchor";
import { SearchBackdrop } from "~/features/frame/main-header/search/components/SearchBackdrop";
import { SearchBarContent } from "~/features/frame/main-header/search/components/SearchBarContent";
import { SearchPositionContainer } from "~/features/frame/main-header/search/components/SearchPositionContainer";
import { SearchResultsPanel } from "~/features/frame/main-header/search/components/SearchResultsPanel";
import { SearchShell } from "~/features/frame/main-header/search/components/SearchShell";
import { useSearchTransition } from "~/features/frame/main-header/search/hooks/useSearchTransition";
import { SearchFooter } from "~/features/frame/main-header/search/components/SearchFooter";

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
              <SearchBackdrop isActive={isOpen} onClose={close} />
              <SearchPositionContainer
                height={frame.height}
                left={frame.left}
                top={frame.top}
                width={frame.width}
                transform={frame.transform}
              >
                <SearchShell isOpen={isOpen}>
                  <SearchBarContent
                    inputRef={inputRef}
                    isOpen={isOpen}
                    query={query}
                    onChange={setQuery}
                    onOpen={open}
                  />
                  <SearchResultsPanel />
                  <SearchFooter />
                </SearchShell>
              </SearchPositionContainer>
            </>,
            document.body
          )
        : null}
    </>
  );
}
