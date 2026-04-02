import type { AppRole } from "~/config/permissions";
import { loadAppSession } from "~/features/auth/services/authSession";
import accountButtonMock from "~/mock/account-button.json";

type AccountButtonContent = {
  name: string;
  role: AppRole;
};

function normalizeRole(role: string): AppRole {
  if (role === "admin" || role === "manager" || role === "member") {
    return role;
  }

  return "member";
}

export function getAccountButtonContent(): AccountButtonContent {
  const session = loadAppSession();
  if (session) {
    return {
      name: session.user.displayName,
      role: session.user.appRole,
    };
  }

  return {
    name: accountButtonMock.name,
    role: normalizeRole(accountButtonMock.role),
  };
}
