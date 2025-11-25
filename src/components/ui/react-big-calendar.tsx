"use client";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "../../styles/big-calendar/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import type { OutlookEvent } from "../../lib/graph";
import { useMsal } from "@azure/msal-react";
import { createOutlookEvent } from "../../lib/createOutlookEvent";
import { useEffect, useRef, useState } from "react";
import { formatLocalDateTime } from "../../lib/utils/dateUtils";
import { registerCalendarDropHandlers } from "../../lib/utils/drop-handler";

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
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");
  const [localEvents, setLocalEvents] = useState<{ title: string; start: Date; end: Date }[]>([]);

  //console.log("événements reçus :", events);

  const mappedEvents = [
    ...events
      .filter((evt) => evt && evt.subject && evt.start?.dateTime && evt.end?.dateTime)
      .map((evt) => {
        const start = new Date(evt.start.dateTime + "Z");
        const end = new Date(evt.end.dateTime + "Z");

        return {
          title: evt.subject,
          start,
          end,
        };
      }),
    ...localEvents,
  ];

  useEffect(() => {
    if (calendarRef.current && accounts.length > 0) {
      const cleanup = registerCalendarDropHandlers(
        calendarRef,
        instance,
        accounts[0],
        (newEvent) => {
          setLocalEvents((prev) => [...prev, newEvent]);
        }
      );

      return () => cleanup?.();
    }
  }, [accounts, instance, currentView]);

  useEffect(() => {
    let isDataTimeGenerated = false;

    const generateDataTimeAttributes = () => {
      if (isDataTimeGenerated) {
        return;
      }

      const columns = document.querySelectorAll(".rbc-time-content .rbc-day-slot");
      if (!columns || columns.length === 0) return;

      const generatedTimesByColumn: string[][] = [];

      columns.forEach((colEl, colIndex) => {
        const col = colEl as HTMLElement;
        const baseDate = new Date(currentDate);

        if (currentView === "week") {
          const monday = new Date(baseDate);
          monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
          baseDate.setDate(monday.getDate() + colIndex);
        } else if (currentView === "day") {
          baseDate.setDate(currentDate.getDate());
        }

        const isoDate = baseDate.toISOString().split("T")[0];
        col.setAttribute("data-date", isoDate);

        const timeSlots = col.querySelectorAll(".rbc-time-slot");
        const generatedTimes: string[] = [];

        timeSlots.forEach((slot, index) => {
          const slotEl = slot as HTMLElement;
          const hour = Math.floor(index / 2);
          const minute = index % 2 === 0 ? "00" : "30";
          const datetime = new Date(`${isoDate}T${hour.toString().padStart(2, "0")}:${minute}:00`);
          slotEl.setAttribute("data-time", datetime.toISOString());
          generatedTimes.push(datetime.toISOString());
        });

        generatedTimesByColumn.push(generatedTimes);
        //console.log(`tranches horaires de 30 min générées pour ${isoDate}:`, generatedTimes);
      });

      isDataTimeGenerated = true;
    };

    generateDataTimeAttributes();

    const content = document.querySelector(".rbc-time-content");
    const observer = new MutationObserver(() => {
      generateDataTimeAttributes();
    });

    if (content) {
      observer.observe(content, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [currentDate, currentView]);

  useEffect(() => {
    document.body.dataset.calendarView = currentView;
  }, [currentView]);

  return (
    <div
      ref={calendarRef}
      className="h-[700px] rounded-md shadow-md calendar-container sm:h-[800px] md:h-[900px]"
    >
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
        onSelectSlot={({ start, end }) => {
          const title = prompt("Titre de l’événement ?");
          if (title && accounts.length > 0) {
            const startDate = formatLocalDateTime(start);
            const endDate = formatLocalDateTime(end);

            createOutlookEvent(instance, accounts[0], {
              subject: title,
              startDate,
              endDate,
            })
              .then(() => alert("Événement créé !"))
              .catch((err: unknown) => {
                console.error(err);
                alert("Erreur création événement");
              });
          }
        }}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => {
          setCurrentView(view);
          console.log(`Vue changée : ${view}`);
        }}
      />
    </div>
  );
}