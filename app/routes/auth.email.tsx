import { Link } from "react-router";

import { AuthPageShell } from "~/components/auth/AuthPageShell";

const verificationDigits = Array.from({ length: 6 }, (_, index) => index);

export default function AuthEmailRoute() {
  return (
    <AuthPageShell
      badge="Email Verification"
      title="6桁の認証コードを入力"
      description="入力したメールアドレス宛に送信された確認コードを入力するページです。"
      asideTitle="メール認証の確認ステップ"
      asideDescription="ここではコード入力 UI のみを配置しています。送信や検証ロジックは含めていません。"
      asideItems={[
        "6桁を1文字ずつ入力する想定",
        "再送や検証は未実装",
        "前のページに戻る導線を配置",
      ]}
    >
      <div className="auth-stack">
        <div className="auth-code-group" aria-label="6 digit verification code">
          {verificationDigits.map((digit) => (
            <input
              key={digit}
              className="auth-code-group__input"
              inputMode="numeric"
              maxLength={1}
              aria-label={`verification digit ${digit + 1}`}
            />
          ))}
        </div>

        <p className="auth-code-hint">
          例: メール本文の 6 桁コードを左から順に入力
        </p>

        <div className="auth-actions">
          <button type="button" className="auth-button auth-button--primary">
            ログインする
          </button>
          <Link to="/login" className="auth-text-link">
            メールアドレス入力に戻る
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
