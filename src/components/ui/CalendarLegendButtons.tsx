"use client";

import { cn } from "../../lib/utils";

interface CalendarLegendButtonsProps {
  activeView: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarLegendButtons({
  activeView,
  onViewChange,
  onPrev,
  onNext,
  onToday,
}: CalendarLegendButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
      <button
        className={cn(
          "px-4 py-2 rounded border",
          activeView === "month" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
        )}
        onClick={() => onViewChange("month")}
      >
        Mois
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded border",
          activeView === "week" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
        )}
        onClick={() => onViewChange("week")}
      >
        Semaine
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded border",
          activeView === "day" ? "bg-white text-black border-black" : "bg-black text-white border-transparent"
        )}
        onClick={() => onViewChange("day")}
      >
        Jour
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded border border-transparent"
        onClick={onPrev}
      >
        Précédent
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded border border-transparent"
        onClick={onToday}
      >
        Aujourd'hui
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded border border-transparent"
        onClick={onNext}
      >
        Suivant
      </button>
    </div>
  );
}