import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/msalConfig";
import { Button } from "./ui/button";

export function Settings() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((error) => {
      console.error("Login failed:", error);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
      {accounts.length > 0 ? (
        <div>
          <p className="text-lg mb-2">Connecté en tant que :</p>
          <p className="text-xl font-semibold">{accounts[0].name}</p>
          <p className="text-sm text-neutral-400">
            Email : {accounts[0].username}
          </p>
          <p className="text-sm text-neutral-400">
            ID utilisateur : {accounts[0].localAccountId}
          </p>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-500 text-white mt-4"
          >
            Déconnexion
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">Vous n'êtes pas connecté.</p>
          <Button
            onClick={handleLogin}
            variant="default"
            className="bg-blue-500 text-white mt-4"
          >
            Connexion
          </Button>
        </div>
      )}
    </div>
  );
}