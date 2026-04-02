import { useEffect, useState, startTransition } from "react";
import { Link, useNavigate } from "react-router";

import { AuthErrorMessage } from "~/features/auth/components/AuthErrorMessage";
import { AuthLayout } from "~/features/auth/components/AuthLayout";
import { AuthPrimaryButton } from "~/features/auth/components/AuthPrimaryButton";
import { AuthTitle } from "~/features/auth/components/AuthTitle";
import { loginToEventApi } from "~/features/auth/services/apiAuth";
import {
  clearPendingOAuthSession,
  loadPendingOAuthSession,
  saveAppSession,
  type PendingOAuthSession,
} from "~/features/auth/services/authSession";

export function AuthEndpointSelectionPage() {
  const navigate = useNavigate();
  const [session] = useState<PendingOAuthSession | null>(() =>
    loadPendingOAuthSession()
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!session) {
      return;
    }

    const activeSession = session;
    let isCancelled = false;

    async function run() {
      try {
        setIsSubmitting(true);
        setErrorMessage("");

        const appSession = await loginToEventApi(activeSession);
        if (isCancelled) {
          return;
        }

        saveAppSession(appSession);
        clearPendingOAuthSession();

        startTransition(() => {
          navigate("/dashboard");
        });
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "event API へのログインに失敗しました。"
        );
      } finally {
        if (!isCancelled) {
          setIsSubmitting(false);
        }
      }
    }

    void run();

    return () => {
      isCancelled = true;
    };
  }, [navigate, session]);

  const email = session?.email || "you@example.com";
  const eventId = session?.eventId || "unknown";
  const apiBaseUrl =
    session?.apiBaseUrl || "https://mock-shared-event.example.com";

  return (
    <AuthLayout>
      <div className="space-y-4">
        <AuthTitle
          title="ログインを完了しています"
          description="接続先 API の確定後、そのまま event API にログインしています。"
        />

        {errorMessage ? (
          <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        ) : null}

        {!session ? (
          <AuthErrorMessage>
            OAuth
            の解決結果が見つかりません。ログイン画面からやり直してください。
          </AuthErrorMessage>
        ) : (
          <div className="rounded-lg border border-[color:var(--border-2)] bg-[color:var(--surface-1)] px-4 py-3 text-left">
            <div className="text-xs font-medium tracking-[0.08em] text-[color:var(--text-3)]">
              ログイン対象メール
            </div>
            <div className="mt-1 text-sm font-semibold text-[color:var(--text-1)]">
              {email}
            </div>

            <div className="mt-4 text-xs font-medium tracking-[0.08em] text-[color:var(--text-3)]">
              イベント ID
            </div>
            <div className="mt-1 text-sm font-semibold text-[color:var(--text-1)]">
              {eventId}
            </div>

            <div className="mt-4 text-xs font-medium tracking-[0.08em] text-[color:var(--text-3)]">
              接続先 API
            </div>
            <div className="mt-1 text-sm font-semibold break-all text-[color:var(--text-1)]">
              {apiBaseUrl}
            </div>
          </div>
        )}

        <AuthPrimaryButton disabled>
          {isSubmitting ? "event API にログイン中..." : "ログインしています"}
        </AuthPrimaryButton>

        <Link
          to="/login"
          onClick={() => clearPendingOAuthSession()}
          className="mx-auto flex w-fit px-6 py-2 text-center text-sm font-medium text-[color:var(--text-2)] !underline decoration-current underline-offset-2 transition hover:text-[color:var(--text-1)]"
        >
          ログイン画面に戻る
        </Link>
      </div>
    </AuthLayout>
  );
}
