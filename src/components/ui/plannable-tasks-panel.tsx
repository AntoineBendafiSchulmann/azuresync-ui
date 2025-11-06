"use client";

import { useEffect, useRef } from "react";
import { MOCK_ACTIVITIES } from "../../tests/mock/mock-activities";
import { Draggable } from "@fullcalendar/interaction";

export function PlannableTasksPanel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.getAttribute("data-draggable-initialized")) {
      new Draggable(containerRef.current, {
        itemSelector: ".fc-event",
        eventData: function (el) {
          const data = el.getAttribute("data-event");
          return data ? JSON.parse(data) : {};
        },
      });
      containerRef.current.setAttribute("data-draggable-initialized", "true");
    }
  }, []);

  return (
    <div ref={containerRef} className="border p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-lg font-bold mb-2">Activités à planifier</h2>
      <ul className="space-y-2">
        {MOCK_ACTIVITIES.map((activity) => (
          <li
            key={activity.id}
            className="fc-event bg-gray-100 p-2 rounded cursor-move"
            data-event={JSON.stringify({
              title: activity.title,
              attendees: activity.personEmails,
              description: activity.description,
            })}
          >
            <strong>{activity.title}</strong>
            {activity.description && (
              <p className="text-sm text-gray-600">{activity.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
