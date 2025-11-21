"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import type { OutlookEvent } from "../../lib/graph";
import { useMsal } from "@azure/msal-react";
import { createOutlookEvent } from "../../lib/createOutlookEvent";
import type { Activity } from "../../types/activity";
import { useRef } from "react";
import { formatLocalDateTime } from "../../lib/utils/dateUtils";

interface Props {
  events: OutlookEvent[];
  onEventCreated?: () => void;
}

export function FullCalendarComponent({ events, onEventCreated }: Props) {
  const { instance, accounts } = useMsal();
  const calendarRef = useRef(null);

const mappedEvents = events.map((evt) => ({
    title: evt.subject,
    start: new Date(evt.start.dateTime + "Z"),
    end: new Date(evt.end.dateTime + "Z"),
}));
  
  return (
    <div className="shadow-md calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="local"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        droppable={true}
        events={mappedEvents}
        locale={frLocale}
        height="auto"
        contentHeight="auto"
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
        eventReceive={async (info) => {
          try {
            info.event.remove();

            const data = JSON.parse(info.draggedEl?.dataset?.event || "{}") as Activity;

            const startDate = formatLocalDateTime(info.event.start!);
            const endDate = formatLocalDateTime(
              info.event.end ?? new Date(info.event.start!.getTime() + 30 * 60 * 1000)
            );

            if (data && accounts.length > 0) {
              await createOutlookEvent(instance, accounts[0], {
                subject: data.title,
                startDate,
                endDate,
                attendees: data.personEmails,
              });
            }

            onEventCreated?.();
          } catch (e) {
            console.error("Erreur eventReceive:", e);
          }
        }}
      />
    </div>
  );
}
