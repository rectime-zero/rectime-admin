import { env } from "~/config/env";
import type {
  AppSession,
  PendingOAuthSession,
} from "~/features/auth/services/authSession";

type EventApiLoginResponse = {
  sessionToken: string;
  expiresIn: number;
  user: AppSession["user"];
};

type EventApiError = {
  code?: string;
  message?: string;
};

export async function loginToEventApi(
  pendingSession: PendingOAuthSession
): Promise<AppSession> {
  if (env.useMock) {
    return {
      sessionToken: "mock-api-session-token",
      expiresIn: 28800,
      authenticatedAt: new Date().toISOString(),
      user: {
        id: "1",
        email: pendingSession.email,
        displayName: "Mock Admin User",
        userType: "school_staff",
        appRole: "admin",
        firebaseUid: "mock-firebase-uid",
        profileImageUrl: null,
        eventId: pendingSession.eventId,
      },
    };
  }

  const response = await fetch(
    `${pendingSession.apiBaseUrl.replace(/\/+$/, "")}/v1/auth/login`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pendingSession.entryToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appVersion: "rectime-admin",
        platform: "web",
      }),
    }
  );

  if (!response.ok) {
    const error = (await safeParseJson(response)) as EventApiError | null;
    throw new Error(error?.message || "event API へのログインに失敗しました。");
  }

  const data = (await response.json()) as EventApiLoginResponse;
  return {
    sessionToken: data.sessionToken,
    expiresIn: data.expiresIn,
    authenticatedAt: new Date().toISOString(),
    user: data.user,
  };
}

async function safeParseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
