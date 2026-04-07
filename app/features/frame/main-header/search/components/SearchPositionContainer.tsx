import type { ReactNode } from "react";

type SearchPositionContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  left: number;
  top: number;
  width: number;
  transform: string;
};

export function SearchPositionContainer({
  children,
  isOpen,
  left,
  top,
  width,
  transform,
}: SearchPositionContainerProps) {
  return (
    <div className="fixed inset-0 z-130 hidden md:block">
      <div
        className="absolute top-0 left-0 z-10 origin-top-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          left,
          top,
          width,
          transform: isOpen ? "translate3d(0,0,0) scale(1,1)" : transform,
        }}
      >
        {children}
      </div>
    </div>
  );
}
