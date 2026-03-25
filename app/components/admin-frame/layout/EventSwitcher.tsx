import { CalendarClockIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const events = [
  { id: "spring-cup", label: "Spring Cup 2026", meta: "Tokyo Dome" },
  { id: "summer-league", label: "Summer League", meta: "Yokohama Arena" },
  { id: "autumn-finals", label: "Autumn Finals", meta: "Saitama Super Arena" },
];

export function EventSwitcher() {
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
    <div className="switcher" ref={rootRef}>
      <button
        type="button"
        className="switcher__button"
        data-open={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <CalendarClockIcon size={14} strokeWidth={1.8} />
        <span>{selectedEvent.label}</span>
        <ChevronDownIcon size={14} strokeWidth={1.8} />
      </button>
      {isOpen ? (
        <div className="switcher__menu">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              className="switcher__item"
              onClick={() => {
                setSelectedId(event.id);
                setIsOpen(false);
              }}
            >
              <span>{event.label}</span>
              <span className="switcher__item-meta">{event.meta}</span>
            </button>
          ))}
          <div className="menu-divider" />
          <button
            type="button"
            className="switcher__item"
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
