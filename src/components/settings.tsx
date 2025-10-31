import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/msalConfig";

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
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">Vous n'êtes pas connecté.</p>
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Connexion
          </button>
        </div>
      )}
    </div>
  );
}