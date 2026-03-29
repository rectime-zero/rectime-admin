import { Link, useSearchParams } from "react-router";

import { AuthLayout } from "~/features/auth/components/AuthLayout";
import { AuthTitle } from "~/features/auth/components/AuthTitle";

export function AuthEndpointSelectionPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email")?.trim() || "you@example.com";
  const eventId = searchParams.get("eventId")?.trim() || "unknown";
  const apiBaseUrl =
    searchParams.get("apiBaseUrl")?.trim() ||
    "https://mock-shared-event.example.com";

  return (
    <AuthLayout>
      <div className="space-y-4">
        <AuthTitle
          title="接続先イベントを確認"
          description="解決されたイベント API を確認して、管理画面へ進みます。"
        />

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

        <Link
          to="/dashboard"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[color:var(--tone-blue-border)] bg-[linear-gradient(135deg,var(--brand-button-1),var(--brand-button-2))] px-4 text-sm font-black text-[color:var(--brand-button-text)] shadow-[var(--shadow-soft)] transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-1)]/40 focus-visible:outline-none"
        >
          このイベントで続ける
        </Link>

        <Link
          to="/login"
          className="mx-auto flex w-fit px-6 py-2 text-center text-sm font-medium text-[color:var(--text-2)] !underline decoration-current underline-offset-2 transition hover:text-[color:var(--text-1)]"
        >
          ログイン画面に戻る
        </Link>
      </div>
    </AuthLayout>
  );
}
