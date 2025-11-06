import type { Activity } from "../../types/activity";

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "0",
    title: "RDV à fixer avec Mme Dupont",
    description: "Planifier avant le 20/11",
    personEmails: ["dupont@exemple.com"],
  },
  {
    id: "1",
    title: "Point RH",
    personEmails: ["rh1@exemple.com", "rh2@exemple.com"],
  },
];