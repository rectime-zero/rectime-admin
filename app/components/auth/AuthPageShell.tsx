import type { ReactNode } from "react";

type AuthPageShellProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  asideTitle: string;
  asideDescription: string;
  asideItems: string[];
};

export function AuthPageShell({
  badge,
  title,
  description,
  children,
  asideTitle,
  asideDescription,
  asideItems,
}: AuthPageShellProps) {
  return (
    <main className="auth-page">
      <section className="auth-page__panel auth-page__panel--content">
        <div className="auth-page__badge">{badge}</div>
        <h1 className="auth-page__title">{title}</h1>
        <p className="auth-page__description">{description}</p>
        <div className="auth-page__body">{children}</div>
      </section>

      <aside className="auth-page__panel auth-page__panel--aside">
        <div className="auth-page__aside-label">Admin Access</div>
        <h2 className="auth-page__aside-title">{asideTitle}</h2>
        <p className="auth-page__aside-description">{asideDescription}</p>
        <ul className="auth-page__aside-list">
          {asideItems.map((item) => (
            <li key={item} className="auth-page__aside-item">
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
