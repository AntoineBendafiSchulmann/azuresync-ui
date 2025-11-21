"use client";

import { useState } from "react";
import { Button } from "./button";
import { createOutlookEvent } from "../../lib/createOutlookEvent";
import { useMsal } from "@azure/msal-react";
import { formatLocalDateTime } from "../../lib/utils/dateUtils";

interface EventFormProps {
  onEventCreated: () => void;
}

export function EventForm({ onEventCreated }: EventFormProps) {
  const [newEvent, setNewEvent] = useState({ subject: "", start: "", end: "" });
  const { instance, accounts } = useMsal();

  const handleCreateEvent = async () => {
    if (accounts.length > 0) {
      try {
        const startDate = formatLocalDateTime(new Date(newEvent.start));
        const endDate = formatLocalDateTime(new Date(newEvent.end));

        await createOutlookEvent(instance, accounts[0], {
          subject: newEvent.subject,
          startDate,
          endDate,
        });
        alert("Événement créé avec succès !");
        setNewEvent({ subject: "", start: "", end: "" });
        onEventCreated();
      } catch (error) {
        console.error("Erreur lors de la création de l'événement :", error);
        alert("Erreur lors de la création de l'événement.");
      }
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Créer un événement</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateEvent();
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Titre de l'événement"
          value={newEvent.subject}
          onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="datetime-local"
          placeholder="Début"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="datetime-local"
          placeholder="Fin"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <Button type="submit" variant="default" className="bg-black text-white">
          Créer l'événement
        </Button>
      </form>
    </div>
  );
}