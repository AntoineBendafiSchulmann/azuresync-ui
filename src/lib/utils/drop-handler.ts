import type { Activity } from "../../types/activity";
import { formatLocalDateTime } from "./dateUtils";
import { createOutlookEvent } from "../createOutlookEvent";
import type { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";

export function registerCalendarDropHandlers(
  calendarRef: React.RefObject<HTMLDivElement | null>,
  instance: IPublicClientApplication,
  account: AccountInfo,
  onEventAdd?: (e: { title: string; start: Date; end: Date }) => void
): () => void {
  const highlightSlot = (e: DragEvent) => {
    e.preventDefault();
    clearHighlights();

    const hovered = document.elementFromPoint(e.clientX, e.clientY);
    let slot = hovered?.closest(".rbc-time-slot, .rbc-day-bg") as HTMLElement | null;

    if (!slot) {
      const allSlots = document.querySelectorAll(".rbc-time-slot, .rbc-day-bg");
      allSlots.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          slot = el as HTMLElement;
        }
      });
    }

    if (slot) {
      slot.classList.add("dropped-slot");
    }
  };

  const clearHighlights = () => {
    document
      .querySelectorAll(".rbc-time-slot.dropped-slot, .rbc-day-bg.dropped-slot")
      .forEach((el) => el.classList.remove("dropped-slot"));
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    clearHighlights();

    if (document.body.dataset.calendarView === "month") {
      alert('Le glisser-déposer n\'est pas disponible en vue "Mois"');
      return;
    }

    const target = document.elementFromPoint(e.clientX, e.clientY);
    let slot = target?.closest(".rbc-time-slot, .rbc-day-bg") as HTMLElement | null;

    if (!slot) {
      const allSlots = document.querySelectorAll(".rbc-time-slot, .rbc-day-bg");
      allSlots.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          slot = el as HTMLElement;
        }
      });
    }

    if (!slot) {
      return;
    }

    const data = e.dataTransfer?.getData("application/json");
    if (!data) {
      return;
    }

    const activity = JSON.parse(data) as Activity;

    const dataTime = slot.getAttribute("data-time");
    if (!dataTime) {
      return;
    }

    const start = new Date(dataTime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const startDate = formatLocalDateTime(start);
    const endDate = formatLocalDateTime(end);

    try {
      await createOutlookEvent(instance, account, {
        subject: activity.title,
        startDate,
        endDate,
        attendees: activity.personEmails,
      });

      onEventAdd?.({ title: activity.title, start, end });
    } catch {
      alert("erreur lors de la création de l'événement");
    }
  };

  const calendar = calendarRef.current;
  if (calendar) {
    calendar.addEventListener("dragover", highlightSlot);
    calendar.addEventListener("dragleave", clearHighlights);
    calendar.addEventListener("drop", handleDrop);

    return () => {
      calendar.removeEventListener("dragover", highlightSlot);
      calendar.removeEventListener("dragleave", clearHighlights);
      calendar.removeEventListener("drop", handleDrop);
    };
  }

  return () => {};
}
