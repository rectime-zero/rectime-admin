import type { AppRole } from "~/config/permissions";

export type PendingOAuthSession = {
  email: string;
  eventId: string;
  apiBaseUrl: string;
  entryToken: string;
  expiresIn: number;
  resolvedAt: string;
};

export type AppSession = {
  sessionToken: string;
  expiresIn: number;
  authenticatedAt: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    userType: "student" | "school_staff" | "external";
    appRole: AppRole;
    firebaseUid: string;
    profileImageUrl: string | null;
    eventId: string;
  };
};

const PENDING_OAUTH_SESSION_KEY = "rectime-admin.pending-oauth-session";
const APP_SESSION_KEY = "rectime-admin.app-session";

export function savePendingOAuthSession(session: PendingOAuthSession) {
  saveSessionStorage(PENDING_OAUTH_SESSION_KEY, session);
}

export function loadPendingOAuthSession(): PendingOAuthSession | null {
  return loadSessionStorage<PendingOAuthSession>(
    PENDING_OAUTH_SESSION_KEY,
    isPendingOAuthSession
  );
}

export function clearPendingOAuthSession() {
  clearSessionStorage(PENDING_OAUTH_SESSION_KEY);
}

export function saveAppSession(session: AppSession) {
  saveSessionStorage(APP_SESSION_KEY, session);
}

export function loadAppSession(): AppSession | null {
  return loadSessionStorage<AppSession>(APP_SESSION_KEY, isAppSession);
}

export function clearAppSession() {
  clearSessionStorage(APP_SESSION_KEY);
}

function saveSessionStorage(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(key, JSON.stringify(value));
}

function clearSessionStorage(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(key);
}

function loadSessionStorage<T>(
  key: string,
  guard: (value: unknown) => value is T
): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return guard(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isPendingOAuthSession(value: unknown): value is PendingOAuthSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.email === "string" &&
    typeof candidate.eventId === "string" &&
    typeof candidate.apiBaseUrl === "string" &&
    typeof candidate.entryToken === "string" &&
    typeof candidate.expiresIn === "number" &&
    typeof candidate.resolvedAt === "string"
  );
}

function isAppSession(value: unknown): value is AppSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const user = candidate.user as Record<string, unknown> | undefined;
  return (
    typeof candidate.sessionToken === "string" &&
    typeof candidate.expiresIn === "number" &&
    typeof candidate.authenticatedAt === "string" &&
    !!user &&
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.displayName === "string" &&
    (user.userType === "student" ||
      user.userType === "school_staff" ||
      user.userType === "external") &&
    (user.appRole === "admin" ||
      user.appRole === "manager" ||
      user.appRole === "member") &&
    typeof user.firebaseUid === "string" &&
    typeof user.eventId === "string" &&
    (typeof user.profileImageUrl === "string" || user.profileImageUrl === null)
  );
}
