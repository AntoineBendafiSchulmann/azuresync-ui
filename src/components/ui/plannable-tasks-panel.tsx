"use client";

import { useRef } from "react";
import { MOCK_ACTIVITIES } from "../../tests/mock/mock-activities";

export function PlannableTasksPanel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, activityJson: string) => {
    e.dataTransfer.setData("application/json", activityJson);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div ref={containerRef} className="border p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-lg font-bold mb-2">Activités à planifier</h2>
      <p className="text-sm text-gray-500 mb-4">
        Cette fonctionnalité est disponible uniquement en vue "Semaine" et "Jour".
      </p>
      <ul className="space-y-2">
        {MOCK_ACTIVITIES.map((activity) => {
          const activityJson = JSON.stringify({
            title: activity.title,
            attendees: activity.personEmails,
            description: activity.description,
          });

          return (
            <li
              key={activity.id}
              className="bg-gray-100 p-2 rounded cursor-move border"
              draggable
              onDragStart={(e) => handleDragStart(e, activityJson)}
              onDragEnd={() => {
                const calendarEl = document.querySelector(".calendar-container") as HTMLElement;
                calendarEl?.focus();
              }}
            >
              <strong>{activity.title}</strong>
              {activity.description && (
                <p className="text-sm text-gray-600">{activity.description}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}