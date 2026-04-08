import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

import { SearchAnchor } from "~/features/frame/main-header/search/components/SearchAnchor";
import { SearchBackdrop } from "~/features/frame/main-header/search/components/SearchBackdrop";
import { SearchBarContent } from "~/features/frame/main-header/search/components/SearchBarContent";
import { SearchPositionContainer } from "~/features/frame/main-header/search/components/SearchPositionContainer";
import { SearchResultsPanel } from "~/features/frame/main-header/search/components/SearchResultsPanel";
import { SearchShell } from "~/features/frame/main-header/search/components/SearchShell";
import { useSearchTransition } from "~/features/frame/main-header/search/hooks/useSearchTransition";
import { SearchFooter } from "~/features/frame/main-header/search/components/SearchFooter";
import { MOCK_SEARCH_RESULTS } from "~/features/frame/main-header/search/constants/mockSearchResults";

export function SearchBtn() {
  const { anchorRef, close, frame, inputRef, isOpen, open, query, setQuery } =
    useSearchTransition();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = useCallback(() => {
    setSelectedIndex(0);
    open();
  }, [open]);

  const handleClose = useCallback(() => {
    setSelectedIndex(0);
    close();
  }, [close]);

  const handleConfirmIndex = useCallback(
    (index: number) => {
      const selectedResult = MOCK_SEARCH_RESULTS[index];

      if (!selectedResult) {
        return;
      }

      console.info(`[Search] selected: ${selectedResult.title}`);
      handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (MOCK_SEARCH_RESULTS.length === 0 || event.isComposing) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex(
          (current) => (current + 1) % MOCK_SEARCH_RESULTS.length
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex(
          (current) =>
            (current - 1 + MOCK_SEARCH_RESULTS.length) %
            MOCK_SEARCH_RESULTS.length
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleConfirmIndex(selectedIndex);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleConfirmIndex, isOpen, selectedIndex]);

  return (
    <>
      {/* domの場所確保用 */}
      <SearchAnchor anchorRef={anchorRef} />

      {typeof document !== "undefined"
        ? createPortal(
            <>
              {/* 黒背景 */}
              <SearchBackdrop isActive={isOpen} onClose={handleClose} />
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
                    onOpen={handleOpen}
                  />
                  <SearchResultsPanel
                    selectedIndex={selectedIndex}
                    onSelectIndex={setSelectedIndex}
                    onConfirmIndex={handleConfirmIndex}
                  />
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
