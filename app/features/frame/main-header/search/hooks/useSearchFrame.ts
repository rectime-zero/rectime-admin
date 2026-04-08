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

type UseSearchFrameParams = {
  isOpen: boolean;
};

export function useSearchFrame({ isOpen }: UseSearchFrameParams) {
  const [frame, setFrame] = useState<SearchFrame>(createDefaultFrame);
  const anchorElementRef = useRef<HTMLDivElement | null>(null);
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

  const transitionFrame = useCallback(
    (nextIsOpen: boolean) => {
      clearPendingFrames();
      updateFrame(nextIsOpen);
      frameRef.current = window.requestAnimationFrame(() => {
        updateFrame(nextIsOpen);
        frameRef.current = null;
      });
    },
    [clearPendingFrames, updateFrame]
  );

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
    return () => {
      clearPendingFrames();
    };
  }, [clearPendingFrames]);

  return {
    anchorRef,
    frame,
    transitionFrame,
  };
}
