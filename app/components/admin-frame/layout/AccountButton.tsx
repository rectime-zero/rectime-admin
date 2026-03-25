import {
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Role = "admin" | "operator" | "viewer";

type AccountButtonProps = {
  name: string;
  role: Role;
};

const roleStyle: Record<
  Role,
  { border: string; bg: string; text: string; label: string }
> = {
  admin: {
    border: "#a78bfa",
    bg: "rgba(167,139,250,0.15)",
    text: "#c4b5fd",
    label: "ADMIN",
  },
  operator: {
    border: "#f6821f",
    bg: "rgba(246,130,31,0.12)",
    text: "#f9a452",
    label: "OPE",
  },
  viewer: {
    border: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    text: "#60a5fa",
    label: "VIEW",
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
    <div className="account" ref={rootRef}>
      <button
        type="button"
        className="account__button"
        data-open={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span
          className="account__avatar"
          style={{
            borderColor: style.border,
            background: style.bg,
            color: style.text,
          }}
        >
          {style.label}
        </span>
        <span className="account__label">{name}</span>
        <ChevronDownIcon
          size={14}
          strokeWidth={1.8}
          style={{ marginRight: 8, color: "var(--tx3)" }}
        />
      </button>
      {isOpen ? (
        <div className="account-menu">
          <div className="account-menu__header">
            <div className="account-menu__name">{name}</div>
            <div
              className="account-menu__role"
              style={{ color: style.text, background: style.bg }}
            >
              {style.label}
            </div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <button
              type="button"
              className="account-menu__item"
              onClick={() => setIsOpen(false)}
            >
              <User2Icon size={14} strokeWidth={1.8} />
              <span>Profile</span>
            </button>
            <button
              type="button"
              className="account-menu__item"
              onClick={() => setIsOpen(false)}
            >
              <SettingsIcon size={14} strokeWidth={1.8} />
              <span>Preferences</span>
            </button>
            <div className="menu-divider" />
            <button
              type="button"
              className="account-menu__item"
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
