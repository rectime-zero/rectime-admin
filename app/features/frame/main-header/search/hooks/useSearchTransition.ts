import { useCallback, useEffect, useRef, useState } from "react";

type SearchFrame = {
  height: number;
  left: number;
  top: number | string;
  width: number;
  transform: string;
};

const SEARCH_OPEN_MAX_WIDTH = 720;
const SEARCH_VIEWPORT_GUTTER = 32;
const SEARCH_OPEN_FOCUS_DELAY_MS = 220;
const SEARCH_OPEN_HEIGHT_RATIO = 0.8;

function createDefaultFrame(): SearchFrame {
  return {
    height: 0,
    width: 0,
    left: 0,
    top: 0,
    transform: "translate3d(0,0,0)",
  };
}

export function useSearchTransition() {
  const [frame, setFrame] = useState<SearchFrame>(createDefaultFrame);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const anchorElementRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number | null>(null);

  const clearPendingFrames = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const getOpenWidth = useCallback((viewportWidth: number) => {
    return Math.min(
      viewportWidth - SEARCH_VIEWPORT_GUTTER,
      SEARCH_OPEN_MAX_WIDTH
    );
  }, []);

  const updateFrame = useCallback(
    (nextIsOpen: boolean) => {
      const anchor = anchorElementRef.current;

      if (!anchor || typeof window === "undefined") {
        return;
      }

      const rect = anchor.getBoundingClientRect();
      const openWidth = getOpenWidth(window.innerWidth);
      const openHeight = window.innerHeight * SEARCH_OPEN_HEIGHT_RATIO;
      const openLeft = (window.innerWidth - openWidth) / 2;
      const openTop = window.innerHeight / 2;

      const closedTranslateX = rect.left - openLeft;
      const closedTranslateY = rect.top - openTop;

      setFrame({
        height: nextIsOpen ? openHeight : rect.height,
        left: openLeft,
        top: nextIsOpen ? "50%" : openTop,
        width: nextIsOpen ? openWidth : rect.width,
        transform: nextIsOpen
          ? "translate3d(0,-50%,0)"
          : `translate3d(${closedTranslateX}px, ${closedTranslateY}px, 0)`,
      });
    },
    [getOpenWidth]
  );

  const anchorRef = useCallback(
    (node: HTMLDivElement | null) => {
      anchorElementRef.current = node;

      if (!node || typeof window === "undefined") {
        return;
      }

      setFrame((currentFrame) => {
        const rect = node.getBoundingClientRect();
        const openWidth = getOpenWidth(window.innerWidth);
        const openHeight = window.innerHeight * SEARCH_OPEN_HEIGHT_RATIO;
        const openLeft = (window.innerWidth - openWidth) / 2;
        const openTop = window.innerHeight / 2;
        const nextIsOpen = currentFrame.top === "50%";
        const closedTranslateX = rect.left - openLeft;
        const closedTranslateY = rect.top - openTop;

        return {
          height: nextIsOpen ? openHeight : rect.height,
          left: openLeft,
          top: nextIsOpen ? "50%" : openTop,
          width: nextIsOpen ? openWidth : rect.width,
          transform: nextIsOpen
            ? "translate3d(0,-50%,0)"
            : `translate3d(${closedTranslateX}px, ${closedTranslateY}px, 0)`,
        };
      });
    },
    [getOpenWidth]
  );

  const scheduleFrameUpdate = useCallback(() => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame(isOpen);
      frameRef.current = null;
    });
  }, [isOpen, updateFrame]);

  const open = useCallback(() => {
    clearPendingFrames();
    updateFrame(true);
    setIsOpen(true);
    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame(true);
      frameRef.current = null;
    });
  }, [clearPendingFrames, updateFrame]);

  const close = useCallback(() => {
    clearPendingFrames();
    setIsOpen(false);
    setQuery("");
    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame(false);
      frameRef.current = null;
    });
  }, [clearPendingFrames, updateFrame]);

  useEffect(() => {
    function handleViewportChange() {
      scheduleFrameUpdate();
    }

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange);
    };
  }, [scheduleFrameUpdate]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => inputRef.current?.focus(),
      SEARCH_OPEN_FOCUS_DELAY_MS
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    const previousDocumentOverflow = documentElement.style.overflow;
    const previousDocumentOverscrollBehavior =
      documentElement.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      documentElement.style.overflow = previousDocumentOverflow;
      documentElement.style.overscrollBehavior =
        previousDocumentOverscrollBehavior;
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }

      if (event.key === "Escape") {
        if (!isOpen) {
          return;
        }

        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isOpen, open]);

  useEffect(() => {
    return () => {
      clearPendingFrames();
    };
  }, [clearPendingFrames]);

  return {
    anchorRef,
    close,
    frame,
    inputRef,
    isOpen,
    query,
    setQuery,
    open,
  };
}
