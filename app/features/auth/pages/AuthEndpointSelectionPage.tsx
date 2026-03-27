import { AuthLayout } from "~/features/auth/components/AuthLayout";
import { AuthTitle } from "~/features/auth/components/AuthTitle";

const endpoints = ["名古屁E", "東京", "大阪"] as const;

export function AuthEndpointSelectionPage() {
  return (
    <AuthLayout>
      <div className="space-y-4">
        <AuthTitle
          title="接続先を選択"
          description="接続先が表示されます。利用する環境を選択してください。"
        />

        <div className="rounded-lg border border-[color:var(--border-2)] bg-[color:var(--surface-1)] px-4 py-3 text-center">
          <div className="text-xs font-medium tracking-[0.08em] text-[color:var(--text-3)]">
            接続先を選択
          </div>
          <div className="mt-1 text-sm font-semibold text-[color:var(--text-1)]">
            Mock Endpoint
          </div>
        </div>

        <div className="space-y-3">
          {endpoints.map((endpoint) => (
            <button
              key={endpoint}
              type="button"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-[color:var(--border-2)] bg-[color:var(--surface-1)] px-4 text-sm font-semibold text-[color:var(--text-1)] shadow-[var(--shadow-soft)] transition hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--brand-1)]/30 focus-visible:outline-none"
            >
              {endpoint}
            </button>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
