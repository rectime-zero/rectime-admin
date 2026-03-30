import type { AppRole } from "~/config/permissions";
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

export const accountButtonContent: AccountButtonContent = {
  name: accountButtonMock.name,
  role: normalizeRole(accountButtonMock.role),
};
