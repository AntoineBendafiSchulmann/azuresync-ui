import { toDate } from "date-fns-tz";

export function formatLocalDateTime(date: Date): string {
  const parisDate = toDate(date, { timeZone: "Europe/Paris" });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${parisDate.getFullYear()}-${pad(parisDate.getMonth() + 1)}-${pad(parisDate.getDate())}` +
    `T${pad(parisDate.getHours())}:${pad(parisDate.getMinutes())}:00`
  );
}
