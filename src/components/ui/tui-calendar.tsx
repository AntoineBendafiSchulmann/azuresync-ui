"use client";

import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { useEffect, useRef, useState } from "react";
import type { OutlookEvent } from "../../lib/graph";
import { CalendarLegendButtons } from "./CalendarLegendButtons";

export function TUICalendar({ events }: { events: OutlookEvent[] }) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarInstance, setCalendarInstance] = useState<Calendar | null>(null);
  const [activeView, setActiveView] = useState<"month" | "week" | "day">("month");

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.innerHTML = "";

      const instance = new Calendar(calendarRef.current, {
        defaultView: "month",
        useCreationPopup: true,
        useDetailPopup: true,
        template: {
          monthDayname: (day) => `<span>${day.label.charAt(0).toUpperCase() + day.label.slice(1)}</span>`,
        },
        month: {
          daynames: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          startDayOfWeek: 1,
        },
        week: {
          daynames: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          startDayOfWeek: 1,
        },
      });

      setCalendarInstance(instance);
    }
  }, []);

  useEffect(() => {
    if (calendarInstance) {
      const formattedEvents = events.map((evt) => ({
        id: evt.id,
        title: evt.subject,
        start: evt.start.dateTime,
        end: evt.end.dateTime,
        category: "time",
      }));
      calendarInstance.clear();
      calendarInstance.createSchedules(formattedEvents);
    }
  }, [events, calendarInstance]);

  const handleViewChange = (view: "month" | "week" | "day") => {
    setActiveView(view);
    calendarInstance?.changeView(view);
  };

  const handlePrev = () => {
    calendarInstance?.prev();
  };

  const handleNext = () => {
    calendarInstance?.next();
  };

  const handleToday = () => {
    calendarInstance?.today();
  };

  return (
    <div className="rounded-md shadow-md">
      <CalendarLegendButtons
        activeView={activeView}
        onViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />
      <div
        ref={calendarRef}
        className="calendar-container h-[500px] sm:h-[600px] md:h-[700px] overflow-auto"
      />
    </div>
  );
}