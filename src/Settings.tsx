"use client";

import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./lib/msalConfig";
import { Button } from "./components/ui/button";

const SESSION_DURATION_SECONDS = 60 * 60 * 24;

export function Settings() {
  const { instance, accounts } = useMsal();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (accounts.length === 0) return;

    const key = "sessionStart";
    let sessionStart = localStorage.getItem(key);

    if (!sessionStart) {
      const now = Date.now();
      localStorage.setItem(key, now.toString());
      sessionStart = now.toString();
    }

    const expirationTime = parseInt(sessionStart, 10) + SESSION_DURATION_SECONDS * 1000;

    const initialRemaining = Math.floor((expirationTime - Date.now()) / 1000);
    if (initialRemaining <= 0) {
      localStorage.removeItem(key);
      setCountdown(0);
      instance.logoutRedirect();
      return;
    } else {
      setCountdown(initialRemaining);
    }

    const interval = setInterval(() => {
      const remaining = Math.floor((expirationTime - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(key);
        setCountdown(0);
        instance.logoutRedirect();
      } else {
        setCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [accounts, instance]);

  const handleLogin = () => {
    localStorage.setItem("sessionStart", Date.now().toString());
    instance.loginRedirect(loginRequest).catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionStart");
    instance.logoutRedirect().catch(console.error);
  };

  const formatCountdown = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `La connexion expire dans ${h}h ${m}min ${s < 10 ? "0" : ""}${s}s`;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Paramètres</h2>

      {accounts.length > 0 ? (
        <div>
          <p className="text-lg mb-2">Connecté en tant que :</p>
          <p className="text-xl font-semibold">{accounts[0].name}</p>
          <p className="text-sm text-neutral-400">Email : {accounts[0].username}</p>
          <p className="text-sm text-neutral-400">ID utilisateur : {accounts[0].localAccountId}</p>

          {countdown !== null && countdown > 0 && (
            <p className="text-sm text-yellow-600 mt-2 font-medium">{formatCountdown(countdown)}</p>
          )}

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