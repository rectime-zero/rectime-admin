function readBooleanEnv(value: string | undefined, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  return value === "true";
}

export const env = {
  useMock: readBooleanEnv(import.meta.env.VITE_USE_MOCK, true),
};
