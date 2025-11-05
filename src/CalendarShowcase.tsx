"use client";

import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { fetchOutlookEvents, type OutlookEvent } from "./lib/graph";
import { Button } from "./components/ui/button";
import { ReactBigCalendar } from "./components/ui/react-big-calendar";
import { FullCalendarComponent } from "./components/ui/fullcalendar";
import { EventForm } from "./components/ui/EventForm";
import { SyncfusionScheduler } from "./components/ui/syncfusion-scheduler";
import { TUICalendar } from "./components/ui/tui-calendar";
import { DayPilotCalendarComponent } from "./components/ui/daypilot-calendar";

type CalendarType = "react-big-calendar" | "fullcalendar" | "syncfusion" | "tui-calendar" | "daypilot";

const calendarComponentMap: Record<CalendarType, React.FC<{ events: OutlookEvent[] }>> = {
  "react-big-calendar": ReactBigCalendar,
  "fullcalendar": FullCalendarComponent,
  "syncfusion": SyncfusionScheduler,
  "tui-calendar": TUICalendar,
  "daypilot": DayPilotCalendarComponent,
};

export function CalendarShowcase() {
  const [calendarView, setCalendarView] = useState<CalendarType>("react-big-calendar");
  const [events, setEvents] = useState<OutlookEvent[]>([]);
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

  const ActiveCalendar = calendarComponentMap[calendarView];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-2">
        {Object.keys(calendarComponentMap).map((key) => (
          <Button
            key={key}
            variant="default"
            className={`${
              calendarView === key ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
            }`}
            onClick={() => setCalendarView(key as CalendarType)}
          >
            {key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </Button>
        ))}
      </div>

      <EventForm onEventCreated={refreshEvents} />

      <div>
        <ActiveCalendar events={events} />
      </div>
    </div>
  );
}