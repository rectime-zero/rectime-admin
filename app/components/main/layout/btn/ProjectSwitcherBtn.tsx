import { CalendarClockIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/cn";

const events = [
  { id: "spring-cup", label: "Spring Cup 2026", meta: "Tokyo Dome" },
  { id: "summer-league", label: "Summer League", meta: "Yokohama Arena" },
  { id: "autumn-finals", label: "Autumn Finals", meta: "Saitama Super Arena" },
];

export function ProjectSwitcherBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(events[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedEvent =
    events.find((event) => event.id === selectedId) ?? events[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={cn(
          "app-rounded inline-flex h-full items-center gap-[7px] border px-[11px] py-[5px] text-[12.5px] font-medium transition",
          "border-[color:var(--border-2)] bg-transparent text-[color:var(--text-1)]",
          "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)]",
          isOpen
            ? "border-[color:var(--border-strong)] bg-[color:var(--surface-2)]"
            : ""
        )}
        onClick={() => setIsOpen((value) => !value)}
      >
        <CalendarClockIcon size={14} strokeWidth={1.8} />
        <span>{selectedEvent.label}</span>
        <ChevronDownIcon
          size={14}
          strokeWidth={1.8}
          className="text-[color:var(--text-2)]"
        />
      </button>
      {isOpen ? (
        <div className="absolute top-[calc(100%+6px)] left-0 z-[120] min-w-[220px] rounded-xl border border-[color:var(--border-2)] bg-[color:var(--surface-overlay-strong)] p-1.5 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-[color:var(--text-1)] transition hover:bg-[color:var(--surface-2)]"
              onClick={() => {
                setSelectedId(event.id);
                setIsOpen(false);
              }}
            >
              <span>{event.label}</span>
              <span className="text-xs text-[color:var(--text-2)]">
                {event.meta}
              </span>
            </button>
          ))}
          <div className="mx-1 my-1.5 h-px bg-[color:var(--border-1)]" />
          <button
            type="button"
            className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-[color:var(--text-1)] transition hover:bg-[color:var(--surface-2)]"
            onClick={() => setIsOpen(false)}
          >
            <PlusIcon size={14} strokeWidth={1.8} />
            <span>Create new event</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
