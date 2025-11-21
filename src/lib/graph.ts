import { loginRequest } from "./msalConfig";
import type { AccountInfo } from "@azure/msal-browser";
import type { IPublicClientApplication } from "@azure/msal-browser";

export type OutlookEvent = {
  id: string;
  subject: string;
  start: { dateTime: string };
  end: { dateTime: string };
};

export async function fetchOutlookEvents(
  instance: IPublicClientApplication,
  account: AccountInfo
): Promise<OutlookEvent[]> {
  const response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });

  const res = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    headers: {
      Authorization: `Bearer ${response.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des événements");
  }

  const data = await res.json();
  return data.value;
}

export async function createOutlookEvent(
  instance: IPublicClientApplication,
  account: AccountInfo,
  event: { subject: string; start: string; end: string }
): Promise<void> {
  const response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });

  const res = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${response.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: event.subject,
      start: { dateTime: event.start, timeZone: "Europe/Paris" },
      end: { dateTime: event.end, timeZone: "Europe/Paris" },
    }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création de l'événement");
  }
}