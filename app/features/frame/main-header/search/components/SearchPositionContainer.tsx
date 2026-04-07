import type { ReactNode } from "react";

type SearchPositionContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  openLeft: number;
  openTop: number;
  closedWidth: number;
  width: number;
  closedTranslateX: number;
  closedTranslateY: number;
};

export function SearchPositionContainer({
  children,
  isOpen,
  openLeft,
  openTop,
  closedWidth,
  width,
  closedTranslateX,
  closedTranslateY,
}: SearchPositionContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-130 hidden md:block">
      <div
        className="pointer-events-auto absolute z-10 transition-[width,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          left: openLeft,
          top: openTop,
          width: isOpen ? width : closedWidth,
          transform: isOpen
            ? "translate3d(0,0,0)"
            : `translate3d(${closedTranslateX}px, ${closedTranslateY}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
