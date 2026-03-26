import { useState } from "react";
import { Link } from "react-router";

import { AuthPageShell } from "~/components/auth/AuthPageShell";

export default function AuthLoginRoute() {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  return (
    <AuthPageShell
      badge="Rectime Zero Admin"
      title="管理画面にログイン"
      description="Microsoft アカウント、またはメールアドレス認証で管理画面へアクセスします。"
      asideTitle="大会運営チーム向けサインイン"
      asideDescription="アクセス方法を2つに分けて、スタッフごとのログイン導線を分かりやすくした状態です。"
      asideItems={[
        "Microsoft ログインを最上段に固定",
        "その他のログインからメール認証へ遷移",
        "新規登録導線は表示しない",
      ]}
    >
      <div className="auth-stack">
        <button type="button" className="auth-button auth-button--microsoft">
          <span className="auth-button__mark">M</span>
          <span>Microsoft でログイン</span>
        </button>

        <div className="auth-divider">
          <span>その他のログイン</span>
        </div>

        <button
          type="button"
          className="auth-button auth-button--secondary"
          onClick={() => setIsEmailFormOpen((current) => !current)}
          aria-expanded={isEmailFormOpen}
        >
          <span>メールアドレスでログイン</span>
          <span className="auth-button__chevron">
            {isEmailFormOpen ? "-" : "+"}
          </span>
        </button>

        {isEmailFormOpen ? (
          <div className="auth-email-card">
            <label className="auth-field">
              <span className="auth-field__label">メールアドレス</span>
              <input
                className="auth-field__input"
                type="email"
                placeholder="staff@rectimezero.jp"
              />
            </label>

            <Link
              to="/login/email"
              className="auth-button auth-button--primary"
            >
              認証コードを受け取る
            </Link>
          </div>
        ) : null}
      </div>
    </AuthPageShell>
  );
}
