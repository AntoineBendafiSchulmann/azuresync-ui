import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/msalConfig";

export function useAuth() {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  const login = () => instance.loginRedirect(loginRequest);
  const logout = () => instance.logoutRedirect();

  return { login, logout, account };
}