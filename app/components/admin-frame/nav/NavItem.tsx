import { ChevronRightIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { useNavState } from "~/hooks/useNavState";
import type { NavChildDef, NavItemDef } from "~/types/nav";

import { NavAccordion } from "./NavAccordion";

type NavItemProps = {
  def: NavItemDef;
};

function pathMatches(pathname: string, to: string) {
  if (to === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

function closeOnSmallScreen(closeForMobile: () => void) {
  if (typeof window !== "undefined" && window.innerWidth <= 720) {
    closeForMobile();
  }
}

function ChildLink({
  child,
  closeForMobile,
}: {
  child: NavChildDef;
  closeForMobile: () => void;
}) {
  return (
    <NavLink
      to={child.to}
      className={({ isActive }) =>
        `nav-item__row ${isActive ? "is-active" : ""}`
      }
      onClick={() => closeOnSmallScreen(closeForMobile)}
    >
      <span className="nav-item__icon" />
      <span className="nav-item__text">{child.label}</span>
      {child.badge ? (
        <span className="nav-item__badge">{child.badge}</span>
      ) : null}
    </NavLink>
  );
}

export function NavItem({ def }: NavItemProps) {
  const pathname = useLocation().pathname;
  const isSidebarOpen = useNavState((state) => state.isOpen);
  const openAccordions = useNavState((state) => state.openAccordions);
  const toggleAccordion = useNavState((state) => state.toggleAccordion);
  const closeForMobile = useNavState((state) => state.closeForMobile);
  const hasChildren = Boolean(def.children?.length);
  const isAccordionOpen = openAccordions.includes(def.id);
  const isActive = hasChildren
    ? (def.children?.some((child) => pathMatches(pathname, child.to)) ?? false)
    : def.to
      ? pathMatches(pathname, def.to)
      : false;

  if (hasChildren && def.children) {
    return (
      <div className="nav-item">
        <button
          type="button"
          className={`nav-item__button ${isActive ? "is-active" : ""}`}
          onClick={() => {
            if (isSidebarOpen) {
              toggleAccordion(def.id);
            }
          }}
        >
          <span className="nav-item__icon">{def.icon}</span>
          <span className="nav-item__text">{def.label}</span>
          {def.badge ? (
            <span className="nav-item__badge">{def.badge}</span>
          ) : null}
          <ChevronRightIcon
            size={14}
            strokeWidth={1.8}
            className={`nav-item__chevron ${isAccordionOpen ? "is-open" : ""}`}
          />
        </button>
        <NavAccordion isOpen={isSidebarOpen && isAccordionOpen}>
          {def.children.map((child) => (
            <ChildLink
              key={child.id}
              child={child}
              closeForMobile={closeForMobile}
            />
          ))}
        </NavAccordion>
        <div className="hover-popup" aria-hidden={isSidebarOpen}>
          <div className="hover-popup__header">
            <span className="nav-item__icon">{def.icon}</span>
            <span>{def.label}</span>
            {def.badge ? (
              <span className="hover-popup__badge">{def.badge}</span>
            ) : null}
          </div>
          <div className="hover-popup__items">
            {def.children.map((child) => {
              const childActive = pathMatches(pathname, child.to);

              return (
                <NavLink
                  key={child.id}
                  to={child.to}
                  className={`hover-popup__item ${childActive ? "is-active" : ""}`}
                  onClick={() => closeOnSmallScreen(closeForMobile)}
                >
                  <span>{child.label}</span>
                  {child.badge ? (
                    <span className="hover-popup__badge">{child.badge}</span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!def.to) {
    return null;
  }

  return (
    <div className="nav-item">
      <NavLink
        to={def.to}
        className={({ isActive: linkActive }) =>
          `nav-item__row ${linkActive ? "is-active" : ""}`
        }
        onClick={() => closeOnSmallScreen(closeForMobile)}
      >
        <span className="nav-item__icon">{def.icon}</span>
        <span className="nav-item__text">{def.label}</span>
        {def.badge ? (
          <span className="nav-item__badge">{def.badge}</span>
        ) : null}
      </NavLink>
      <div className="hover-label" aria-hidden={isSidebarOpen}>
        {def.label}
      </div>
    </div>
  );
}
