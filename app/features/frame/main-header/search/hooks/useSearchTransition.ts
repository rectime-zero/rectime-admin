import { useEffect, useLayoutEffect, useRef, useState } from "react";

type SearchFrame = {
  left: number;
  top: number;
  width: number;
  closedTransform: string;
};

const OPEN_HEIGHT = 56;
const OPEN_MAX_WIDTH = 720;
const OPEN_SIDE_GUTTER = 32;
const TRANSITION_DURATION_MS = 500;

type SearchPhase = "closed" | "opening" | "open" | "closing";

function createDefaultFrame(): SearchFrame {
  return {
    left: 0,
    top: 0,
    width: OPEN_MAX_WIDTH,
    closedTransform: "translate3d(0,0,0) scale(1,1)",
  };
}

export function useSearchTransition() {
  const [frame, setFrame] = useState<SearchFrame>(createDefaultFrame);
  const [phase, setPhase] = useState<SearchPhase>("closed");
  const [query, setQuery] = useState("");
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openFrameRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const phaseRef = useRef<SearchPhase>("closed");

  const isClosed = phase === "closed";
  const isOpen = phase === "open";
  const isFloating = phase !== "closed";

  function clearPendingFrames() {
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function updateFrame() {
    const anchor = anchorRef.current;

    if (!anchor || typeof window === "undefined") {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const openWidth = Math.min(
      window.innerWidth - OPEN_SIDE_GUTTER,
      OPEN_MAX_WIDTH
    );
    const openLeft = (window.innerWidth - openWidth) / 2;
    const openTop = Math.max(24, window.innerHeight * 0.14);
    const translateX = rect.left - openLeft;
    const translateY = rect.top - openTop;
    const scaleX = rect.width / openWidth;
    const scaleY = rect.height / OPEN_HEIGHT;

    setFrame({
      left: openLeft,
      top: openTop,
      width: openWidth,
      closedTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
    });
  }

  function open() {
    clearPendingFrames();
    updateFrame();
    setPhase("opening");
    openFrameRef.current = window.requestAnimationFrame(() => {
      setPhase("open");
      openFrameRef.current = null;
    });
  }

  function close() {
    if (phaseRef.current === "closed") {
      return;
    }

    clearPendingFrames();
    setPhase("closing");
    setQuery("");
    closeTimerRef.current = window.setTimeout(() => {
      setPhase("closed");
      closeTimerRef.current = null;
    }, TRANSITION_DURATION_MS);
  }

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useLayoutEffect(() => {
    updateFrame();
  }, []);

  useEffect(() => {
    function handleResize() {
      updateFrame();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isFloating || typeof document === "undefined") {
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
  }, [isFloating]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        clearPendingFrames();
        updateFrame();
        setPhase("opening");
        openFrameRef.current = window.requestAnimationFrame(() => {
          setPhase("open");
          openFrameRef.current = null;
        });
      }

      if (event.key === "Escape") {
        if (phaseRef.current === "closed") {
          return;
        }

        clearPendingFrames();
        setPhase("closing");
        setQuery("");
        closeTimerRef.current = window.setTimeout(() => {
          setPhase("closed");
          closeTimerRef.current = null;
        }, TRANSITION_DURATION_MS);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearPendingFrames();
    };
  }, []);

  return {
    anchorRef,
    close,
    frame,
    inputRef,
    isClosed,
    isFloating,
    isOpen,
    query,
    setQuery,
    open,
  };
}
