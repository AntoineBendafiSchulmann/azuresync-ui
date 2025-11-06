import { loginRequest } from "./msalConfig";
import type { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";

interface EventInput {
  subject: string;
  startDate: Date;
  endDate: Date;
  attendees?: string[];
}

interface GraphEventInput {
  subject: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: {
    emailAddress: { address: string };
    type: "required";
  }[];
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

  const body: GraphEventInput = {
    subject: event.subject,
    start: {
      dateTime: event.startDate.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: event.endDate.toISOString(),
      timeZone: "UTC",
    },
  };

  if (event.attendees?.length) {
    body.attendees = event.attendees.map((email) => ({
      emailAddress: { address: email },
      type: "required",
    }));
  }

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
