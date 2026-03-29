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

export const env = {
  useMock: readBooleanEnv(import.meta.env.VITE_USE_MOCK, true),
  entryApiBaseUrl: readStringEnv(import.meta.env.VITE_ENTRY_API_BASE_URL),
  oauthMockEmail: readStringEnv(import.meta.env.VITE_AUTH_MOCK_EMAIL),
};
