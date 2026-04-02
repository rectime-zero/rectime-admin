function readBooleanEnv(value: string | undefined, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  return value === "true";
}

function readStringEnv(value: string | undefined, fallback = "") {
  if (value === undefined) {
    return fallback;
  }

  return value.trim();
}

function hasConfiguredFirebaseValue(value: string) {
  return value.length > 0 && !value.startsWith("SET_");
}

export const env = {
  useMock: readBooleanEnv(import.meta.env.VITE_USE_MOCK, true),
  entryApiBaseUrl: readStringEnv(import.meta.env.VITE_ENTRY_API_BASE_URL),
  oauthMockEmail: readStringEnv(import.meta.env.VITE_AUTH_MOCK_EMAIL),
  firebaseApiKey: readStringEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  firebaseAuthDomain: readStringEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  firebaseProjectId: readStringEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  firebaseAppId: readStringEnv(import.meta.env.VITE_FIREBASE_APP_ID),
  firebaseTenantId: readStringEnv(import.meta.env.VITE_FIREBASE_TENANT_ID),
};

export function isFirebaseConfigured() {
  return (
    hasConfiguredFirebaseValue(env.firebaseApiKey) &&
    hasConfiguredFirebaseValue(env.firebaseAuthDomain) &&
    hasConfiguredFirebaseValue(env.firebaseProjectId) &&
    hasConfiguredFirebaseValue(env.firebaseAppId)
  );
}
