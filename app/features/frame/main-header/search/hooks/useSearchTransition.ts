import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type SearchFrame = {
  height: number;
  openLeft: number;
  openTop: number;
  closedWidth: number;
  width: number;
  closedTranslateX: number;
  closedTranslateY: number;
};

const SEARCH_OPEN_MAX_WIDTH = 720;
const SEARCH_VIEWPORT_GUTTER = 32;
const SEARCH_OPEN_TOP_MIN = 24;
const SEARCH_OPEN_TOP_RATIO = 0.14;
const SEARCH_OPEN_FOCUS_DELAY_MS = 220;

function createDefaultFrame(): SearchFrame {
  return {
    height: 0,
    openLeft: 0,
    openTop: 0,
    closedWidth: 0,
    width: 0,
    closedTranslateX: 0,
    closedTranslateY: 0,
  };
}

export function useSearchTransition() {
  const [frame, setFrame] = useState<SearchFrame>(createDefaultFrame);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const anchorRef = useRef<HTMLDivElement>(null);
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

  const updateFrame = useCallback(() => {
    const anchor = anchorRef.current;

    if (!anchor || typeof window === "undefined") {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const openWidth = getOpenWidth(window.innerWidth);
    const openLeft = (window.innerWidth - openWidth) / 2;
    const openTop = Math.max(
      SEARCH_OPEN_TOP_MIN,
      window.innerHeight * SEARCH_OPEN_TOP_RATIO
    );

    setFrame({
      height: rect.height,
      openLeft,
      openTop,
      closedWidth: rect.width,
      width: openWidth,
      closedTranslateX: rect.left - openLeft,
      closedTranslateY: rect.top - openTop,
    });
  }, [getOpenWidth]);

  const scheduleFrameUpdate = useCallback(() => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame();
      frameRef.current = null;
    });
  }, [updateFrame]);

  const open = useCallback(() => {
    clearPendingFrames();
    updateFrame();
    setIsOpen(true);
    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame();
      frameRef.current = null;
    });
  }, [clearPendingFrames, updateFrame]);

  const close = useCallback(() => {
    clearPendingFrames();
    setIsOpen(false);
    setQuery("");
    frameRef.current = window.requestAnimationFrame(() => {
      updateFrame();
      frameRef.current = null;
    });
  }, [clearPendingFrames, updateFrame]);

  useLayoutEffect(() => {
    updateFrame();
  }, [updateFrame]);

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
