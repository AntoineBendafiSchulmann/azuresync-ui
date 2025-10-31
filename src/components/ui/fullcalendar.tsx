"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import type { OutlookEvent } from "../../lib/graph";
import { useMsal } from "@azure/msal-react";
import { createOutlookEvent } from "../../lib/createOutlookEvent";

export function FullCalendarComponent({ events }: { events: OutlookEvent[] }) {
  const { instance, accounts } = useMsal();

  const mappedEvents = events.map((evt) => ({
    title: evt.subject,
    start: new Date(evt.start.dateTime),
    end: new Date(evt.end.dateTime),
  }));

  return (
    <div className="bg-white rounded-md shadow-md p-4 calendar-container sm:p-6 md:p-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        events={mappedEvents}
        locale={frLocale}
        select={(info) => {
          const title = prompt("Titre de l’événement ?");
          if (title && accounts.length > 0) {
            createOutlookEvent(instance, accounts[0], {
              subject: title,
              startDate: info.start,
              endDate: info.end,
            })
              .then(() => {
                alert("Événement créé !");
              })
              .catch((err) => {
                console.error(err);
                alert("Erreur création événement");
              });
          }
        }}
        height="auto"
        contentHeight="auto"
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
      />
    </div>
  );
}