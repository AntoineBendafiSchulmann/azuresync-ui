"use client";

import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { fetchOutlookEvents, type OutlookEvent } from "./lib/graph";
import { Button } from "./components/ui/button"
import { ReactBigCalendar } from "./components/ui/react-big-calendar";
import { Calendar as ShadcnCalendar } from "./components/ui/calendar";
import { FullCalendarComponent } from "./components/ui/fullcalendar";
import { EventForm } from "./components/ui/EventForm";
import { SyncfusionScheduler } from "./components/ui/syncfusion-scheduler";
import { TUICalendar } from "./components/ui/tui-calendar";
import { DayPilotCalendarComponent } from "./components/ui/daypilot-calendar";

type CalendarType = "shadcn" | "react-big-calendar" | "fullcalendar" | "syncfusion" | "tui-calendar" | "daypilot";

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
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-2">
        <Button
          variant="default"
          className={`${
            calendarView === "shadcn" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("shadcn")}
        >
          Shadcn
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "react-big-calendar" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("react-big-calendar")}
        >
          React Big Calendar
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "fullcalendar" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("fullcalendar")}
        >
          FullCalendar
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "syncfusion" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("syncfusion")}
        >
          Syncfusion
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "tui-calendar" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("tui-calendar")}
        >
          TUI Calendar
        </Button>
        <Button
          variant="default"
          className={`${
            calendarView === "daypilot" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
          }`}
          onClick={() => setCalendarView("daypilot")}
        >
          DayPilot
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
        <div className="bg-white rounded-md shadow-md p-4">
          <ReactBigCalendar events={events} />
        </div>
      )}

      {calendarView === "fullcalendar" && (
        <div className="bg-white rounded-md shadow-md p-4">
          <FullCalendarComponent events={events} />
        </div>
      )}

      {calendarView === "syncfusion" && (
        <div className="bg-white rounded-md shadow-md p-4">
          <SyncfusionScheduler events={events} />
        </div>
      )}

      {calendarView === "tui-calendar" && (
        <div className="bg-white rounded-md shadow-md p-4">
          <TUICalendar events={events} />
        </div>
      )}

      {calendarView === "daypilot" && (
        <div className="bg-white rounded-md shadow-md p-4">
          <DayPilotCalendarComponent events={events} />
        </div>
      )}
    </div>
  );
}