import {
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { AppRole } from "~/config/permissions";
import { cn } from "~/lib/cn";

type AccountButtonProps = {
  name: string;
  role: AppRole;
};

const roleStyle: Record<
  AppRole,
  { border: string; bg: string; text: string; label: string }
> = {
  admin: {
    border: "#a78bfa",
    bg: "rgba(167,139,250,0.15)",
    text: "#c4b5fd",
    label: "ADMIN",
  },
  manager: {
    border: "#38bdf8",
    bg: "rgba(56,189,248,0.14)",
    text: "#7dd3fc",
    label: "MG",
  },
  member: {
    border: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    text: "#60a5fa",
    label: "ME",
  },
};

export function AccountButton({ name, role }: AccountButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const style = roleStyle[role];

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
          "inline-flex h-[34px] items-center gap-2 rounded-xl border bg-transparent p-0.5 text-[color:var(--text-1)] transition",
          "border-[color:var(--border-2)]",
          "hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)]",
          isOpen
            ? "border-[color:var(--border-strong)] bg-[color:var(--surface-2)]"
            : ""
        )}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span
          className="inline-flex h-[29px] w-[29px] items-center justify-center rounded-lg border-[1.5px] font-['DM_Mono'] text-[11px] font-bold"
          style={{
            borderColor: style.border,
            background: style.bg,
            color: style.text,
          }}
        >
          {style.label}
        </span>
        <span className="pr-2.5 text-xs font-semibold">{name}</span>
        <ChevronDownIcon
          size={14}
          strokeWidth={1.8}
          className="mr-2 text-[color:var(--text-3)]"
        />
      </button>
      {isOpen ? (
        <div className="absolute top-[calc(100%+6px)] right-0 z-[140] min-w-[220px] rounded-xl border border-[color:var(--border-2)] bg-[color:var(--surface-overlay-strong)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <div className="border-b border-[color:var(--border-1)] px-2 pt-1 pb-2.5">
            <div className="text-[13px] font-semibold">{name}</div>
            <div
              className="mt-2 inline-flex items-center justify-center rounded-full border px-[7px] py-[3px] text-[11px] font-bold tracking-[0.04em]"
              style={{ color: style.text, background: style.bg }}
            >
              {style.label}
            </div>
          </div>
          <div className="pt-2">
            <button
              type="button"
              className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-[color:var(--text-1)] transition hover:bg-[color:var(--surface-2)]"
              onClick={() => setIsOpen(false)}
            >
              <User2Icon size={14} strokeWidth={1.8} />
              <span>Profile</span>
            </button>
            <button
              type="button"
              className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-[color:var(--text-1)] transition hover:bg-[color:var(--surface-2)]"
              onClick={() => setIsOpen(false)}
            >
              <SettingsIcon size={14} strokeWidth={1.8} />
              <span>Preferences</span>
            </button>
            <div className="mx-1 my-1.5 h-px bg-[color:var(--border-1)]" />
            <button
              type="button"
              className="flex h-[35px] w-full items-center gap-2.5 rounded-md bg-transparent px-2.5 text-left text-sm text-[color:var(--text-1)] transition hover:bg-[color:var(--surface-2)]"
              onClick={() => setIsOpen(false)}
            >
              <LogOutIcon size={14} strokeWidth={1.8} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
