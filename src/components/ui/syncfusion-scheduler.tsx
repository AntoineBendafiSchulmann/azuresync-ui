"use client";

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
import { useEffect, useState } from "react";
import type { OutlookEvent } from "../../lib/graph";
import type { SyncfusionEvent } from "../../types/syncfusion-event";

export function SyncfusionScheduler({ events }: { events: OutlookEvent[] }) {
  const [mappedEvents, setMappedEvents] = useState<SyncfusionEvent[]>([]);

  useEffect(() => {
    const formattedEvents = events.map((evt) => ({
      Subject: evt.subject,
      StartTime: new Date(evt.start.dateTime),
      EndTime: new Date(evt.end.dateTime),
    }));
    setMappedEvents(formattedEvents);
  }, [events]);

  return (
    <div className="rounded-md shadow-md">
      <ScheduleComponent
        eventSettings={{ dataSource: mappedEvents }}
        currentView="Month"
        locale="fr"
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}