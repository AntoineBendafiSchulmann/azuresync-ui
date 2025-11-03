"use client";

import { DayPilotCalendar, DayPilot } from "@daypilot/daypilot-lite-react";
import { useState, useEffect, useRef } from "react";
import type { OutlookEvent } from "../../lib/graph";
import { CalendarLegendButtons } from "./CalendarLegendButtons";

export function DayPilotCalendarComponent({ events }: { events: OutlookEvent[] }) {
  const calendarRef = useRef<DayPilotCalendar | null>(null);
  const [viewType, setViewType] = useState<"month" | "week" | "day">("month");

  const cleanDate = (date: string) => {
    return date.split(".")[0];
  };

  const mappedEvents = events.map((evt) => ({
    id: evt.id,
    text: evt.subject,
    start: cleanDate(evt.start.dateTime),
    end: cleanDate(evt.end.dateTime),
  }));

  useEffect(() => {
    const calendarInstance = calendarRef.current;

    return () => {
      if (calendarInstance?.control) {
        calendarInstance.control.dispose();
      }
    };
  }, []);

  const convertViewType = (view: "month" | "week" | "day") => {
    switch (view) {
      case "month":
        return "Days";
      case "week":
        return "Week";
      case "day":
        return "Day";
      default:
        return "Days";
    }
  };

  const handleViewChange = (view: "month" | "week" | "day") => {
    setViewType(view);
    if (calendarRef.current?.control) {
      calendarRef.current.control.viewType = convertViewType(view);
      calendarRef.current.control.update();
    }
  };

  const handlePrev = () => {
    if (calendarRef.current?.control?.startDate instanceof DayPilot.Date) {
      const newStartDate = calendarRef.current.control.startDate.addDays(
        viewType === "month" ? -30 : viewType === "week" ? -7 : -1
      );
      calendarRef.current.control.startDate = newStartDate;
      calendarRef.current.control.update();
    }
  };

  const handleNext = () => {
    if (calendarRef.current?.control?.startDate instanceof DayPilot.Date) {
      const newStartDate = calendarRef.current.control.startDate.addDays(
        viewType === "month" ? 30 : viewType === "week" ? 7 : 1
      );
      calendarRef.current.control.startDate = newStartDate;
      calendarRef.current.control.update();
    }
  };

  const handleToday = () => {
    if (calendarRef.current?.control) {
      calendarRef.current.control.startDate = DayPilot.Date.today();
      calendarRef.current.control.update();
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <CalendarLegendButtons
        activeView={viewType}
        onViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />
      <DayPilotCalendar
        ref={calendarRef}
        events={mappedEvents}
        viewType={convertViewType(viewType)}
        startDate={DayPilot.Date.today()}
      />
    </div>
  );
}