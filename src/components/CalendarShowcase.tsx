"use client";

import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { fetchOutlookEvents, type OutlookEvent } from "../lib/graph";
import { Button } from "./ui/button";
import { ReactBigCalendar } from "./ui/react-big-calendar";
import { Calendar as ShadcnCalendar } from "./ui/calendar";
import { FullCalendarComponent } from "./ui/fullcalendar";
import { EventForm } from "./ui/EventForm";

type CalendarType = "shadcn" | "react-big-calendar" | "fullcalendar";

export function CalendarShowcase() {
  const [calendarView, setCalendarView] = useState<CalendarType>("shadcn");
  const [events, setEvents] = useState<OutlookEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      fetchOutlookEvents(instance, accounts[0])
        .then(setEvents)
        .catch((e) => console.error("Erreur fetch events:", e));
    }
  }, [accounts, instance]);

  const refreshEvents = () => {
    if (accounts.length > 0) {
      fetchOutlookEvents(instance, accounts[0])
        .then(setEvents)
        .catch((e) => console.error("Erreur fetch events:", e));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        <Button
          variant="default"
          className={`${
            calendarView === "shadcn" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => setCalendarView("shadcn")}
        >
          Shadcn
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "react-big-calendar" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => setCalendarView("react-big-calendar")}
        >
          React Big Calendar
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "fullcalendar" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => setCalendarView("fullcalendar")}
        >
          FullCalendar
        </Button>
      </div>

      <EventForm onEventCreated={refreshEvents} />

      {calendarView === "shadcn" && (
        <div className="flex flex-col">
          <div className="bg-white rounded shadow p-6 w-fit">
            <ShadcnCalendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      )}

      {calendarView === "react-big-calendar" && (
        <ReactBigCalendar events={events} />
      )}

      {calendarView === "fullcalendar" && (
        <FullCalendarComponent events={events} />
      )}
    </div>
  );
}