import { env } from "~/config/env";
import { authenticateWithMicrosoft } from "~/features/auth/services/firebaseAuth";

export type ResolvedEntryEndpoint = {
  email: string;
  eventId: string;
  apiBaseUrl: string;
};

export type ResolvedOAuthSession = ResolvedEntryEndpoint & {
  entryToken: string;
  expiresIn: number;
};

type ResolveEntryApiResponse = {
  eventId: string | number;
  apiBaseUrl: string;
  entryToken?: string;
  expiresIn?: number;
};

type ResolveEntryApiError = {
  code?: string;
  message?: string;
};

const APP_VERSION = "rectime-admin";
const MOCK_OAUTH_EMAIL = "admin@example.com";

export async function resolveEntryEndpointByEmail(
  email: string
): Promise<ResolvedEntryEndpoint | null> {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail.length === 0) {
    throw new Error("メールアドレスを入力してください。");
  }

  if (env.useMock || env.entryApiBaseUrl.length === 0) {
    return mockResolveEntryEndpoint(normalizedEmail);
  }

  const response = await fetch(buildEntryApiUrl("/v1/resolve-email"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizedEmail,
      appVersion: APP_VERSION,
      platform: "web",
    }),
  });

  if (!response.ok) {
    const error = (await safeParseJson(
      response
    )) as ResolveEntryApiError | null;

    if (
      response.status === 404 ||
      error?.code === "EVENT_NOT_FOUND" ||
      error?.code === "EVENT_INACTIVE" ||
      error?.code === "FORBIDDEN_EMAIL"
    ) {
      return null;
    }

    throw new Error(error?.message || "接続先イベントの解決に失敗しました。");
  }

  const data = (await response.json()) as ResolveEntryApiResponse;
  return {
    email: normalizedEmail,
    eventId: String(data.eventId),
    apiBaseUrl: data.apiBaseUrl,
  };
}

export async function resolveEntryEndpointForOAuth(): Promise<ResolvedOAuthSession> {
  if (env.useMock || env.entryApiBaseUrl.length === 0) {
    const mockEmail =
      env.oauthMockEmail.length > 0 ? env.oauthMockEmail : MOCK_OAUTH_EMAIL;

    const resolution = await resolveEntryEndpointByEmail(mockEmail);
    if (!resolution) {
      throw new Error(
        "OAuth ログイン用の接続先イベントを解決できませんでした。"
      );
    }

    return {
      ...resolution,
      entryToken: "mock-entry-token",
      expiresIn: 300,
    };
  }

  const authenticatedUser = await authenticateWithMicrosoft();
  const response = await fetchEntryApi("/v1/resolve", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authenticatedUser.idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appVersion: APP_VERSION,
      platform: "web",
    }),
  });

  if (!response.ok) {
    const error = (await safeParseJson(
      response
    )) as ResolveEntryApiError | null;
    throw new Error(
      error?.message || "接続先イベント API の解決に失敗しました。"
    );
  }

  const data = (await response.json()) as ResolveEntryApiResponse;
  if (
    typeof data.entryToken !== "string" ||
    data.entryToken.length === 0 ||
    typeof data.expiresIn !== "number"
  ) {
    throw new Error("entry-api の OAuth 応答が不正です。");
  }

  return {
    email: authenticatedUser.email,
    eventId: String(data.eventId),
    apiBaseUrl: data.apiBaseUrl,
    entryToken: data.entryToken,
    expiresIn: data.expiresIn,
  };
}

function buildEntryApiUrl(pathname: string) {
  const baseUrl = env.entryApiBaseUrl.replace(/\/+$/, "");
  return `${baseUrl}${pathname}`;
}

async function fetchEntryApi(pathname: string, init: RequestInit) {
  try {
    return await fetch(buildEntryApiUrl(pathname), init);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "entry-api への接続に失敗しました。CORS 設定または API 起動 URL を確認してください。"
      );
    }

    throw error;
  }
}

async function safeParseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function mockResolveEntryEndpoint(email: string): ResolvedEntryEndpoint {
  const domain = email.split("@")[1] || "example.com";

  if (email === "exception@example.com") {
    return {
      email,
      eventId: "9001",
      apiBaseUrl: "https://mock-exception-event.example.com",
    };
  }

  if (domain === "hal.ac.jp") {
    return {
      email,
      eventId: "1001",
      apiBaseUrl: "https://mock-hal-event.example.com",
    };
  }

  return {
    email,
    eventId: "1000",
    apiBaseUrl: "https://mock-shared-event.example.com",
  };
}
