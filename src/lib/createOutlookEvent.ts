import { loginRequest } from "./msalConfig";
import type { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";

interface EventInput {
  subject: string;
  startDate: Date;
  endDate: Date;
}

export async function createOutlookEvent(
  instance: IPublicClientApplication,
  account: AccountInfo,
  event: EventInput
) {
  const response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });

  const body = {
    subject: event.subject,
    start: {
      dateTime: event.startDate.toISOString(),
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: event.endDate.toISOString(),
      timeZone: "Europe/Paris",
    },
  };

  const res = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${response.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Erreur création événement : ${error}`);
  }

  return await res.json();
}