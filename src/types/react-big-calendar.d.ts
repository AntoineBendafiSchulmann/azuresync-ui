declare module "react-big-calendar" {
  import { ComponentType } from "react";

  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: Record<string, unknown>;
  }

  export interface Localizer {
    format: (date: Date, format: string, locale: Locale) => string;
    parse: (value: string, format: string, locale: Locale) => Date;
    startOfWeek: (date: Date, locale: Locale) => Date;
    getDay: (date: Date, locale: Locale) => number;
    locales: { [key: string]: Locale };
  }

  export interface Messages {
    today?: string;
    previous?: string;
    next?: string;
    month?: string;
    week?: string;
    day?: string;
    agenda?: string;
    date?: string;
    time?: string;
    event?: string;
    noEventsInRange?: string;
    showMore?: (count: number) => string;
  }

  export interface CalendarProps {
    events: Event[];
    localizer: Localizer;
    startAccessor: string;
    endAccessor: string;
    defaultView?: string;
    views?: string[];
    popup?: boolean;
    style?: React.CSSProperties;
    messages?: Messages;
    selectable?: boolean;
    onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
    defaultDate?: Date;
  }

  export const Calendar: ComponentType<CalendarProps>;
  export const dateFnsLocalizer: (config: {
    format: (date: Date, format: string, locale: Locale) => string;
    parse: (value: string, format: string, locale: Locale) => Date;
    startOfWeek: (date: Date, locale: Locale) => Date;
    getDay: (date: Date, locale: Locale) => number;
    locales: { [key: string]: Locale };
  }) => Localizer;
}