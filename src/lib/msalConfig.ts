export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MS_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MS_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_MS_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Calendars.ReadWrite"],
};
