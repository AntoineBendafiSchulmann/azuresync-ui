"use client";

import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/ui/sidebar";
import { Calendar } from "./components/calendar";
import { Settings } from "./components/settings";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./lib/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-3xl font-bold mb-4">AzureSync UI</h1>
                  <p className="text-neutral-700">
                    Bienvenue dans ton tableau de bord de synchronisation Outlook.
                  </p>
                </>
              }
            />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </MsalProvider>
  );
}
