import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type SearchPositionContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  height: number;
  left: number;
  top: number | string;
  width: number;
  transform: string;
};

export function SearchPositionContainer({
  children,
  isOpen,
  height,
  left,
  top,
  width,
  transform,
}: SearchPositionContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-130 hidden md:block">
      <div
        className={cn(
          "app-rounded pointer-events-auto absolute z-10 bg-white shadow-(--shadow-soft) transition-[width,height,transform,padding] duration-5000 ease-[cubic-bezier(.22,1,.36,1)]",
          isOpen ? "p-4" : "p-0"
        )}
        style={{
          left,
          top,
          height,
          width,
          transform,
        }}
      >
        {children}
      </div>
    </div>
  );
}
