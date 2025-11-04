"use client";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import type { OutlookEvent } from "../../lib/graph";
import { useMsal } from "@azure/msal-react";
import { createOutlookEvent } from "../../lib/createOutlookEvent";
import { useState } from "react";

const locales = { fr };

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) =>
    format(date, formatStr, { locale: options?.locale || fr }),
  parse: (value, formatStr, options) =>
    parse(value, formatStr, new Date(), { locale: options?.locale || fr }),
  startOfWeek: (date, options) =>
    startOfWeek(date, { locale: options?.locale || fr }),
  getDay,
  locales,
});

const messages = {
  today: "Aujourd'hui",
  previous: "Précédent",
  next: "Suivant",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement dans cette période.",
  showMore: (count: number) => `+ ${count} événement(s) supplémentaire(s)`,
};

export function ReactBigCalendar({ events }: { events: OutlookEvent[] }) {
  const { instance, accounts } = useMsal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  const mappedEvents = events
    .filter((evt) => evt && evt.subject && evt.start?.dateTime && evt.end?.dateTime)
    .map((evt) => ({
      title: evt.subject,
      start: new Date(evt.start.dateTime),
      end: new Date(evt.end.dateTime),
    }));

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const title = prompt("Titre de l’événement ?");
    if (title && accounts.length > 0) {
      createOutlookEvent(instance, accounts[0], {
        subject: title,
        startDate: slotInfo.start,
        endDate: slotInfo.end,
      })
        .then(() => {
          alert("Événement créé !");
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur création événement");
        });
    }
  };

  const handleNavigate = (date: Date) => {
    console.log("Navigating to date:", date);
    setCurrentDate(date);
  };

  const handleViewChange = (view: string) => {
    console.log("Changing view to:", view);
    setCurrentView(view);
  };

  return (
    <div className="h-[700px] rounded-md shadow-md calendar-container sm:h-[800px] md:h-[900px]">
      <BigCalendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        defaultDate={new Date()}
        defaultView="week"
        views={["month", "week", "day"]}
        popup
        style={{ height: "100%" }}
        messages={messages}
        selectable
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
        onView={handleViewChange}
      />
    </div>
  );
}
