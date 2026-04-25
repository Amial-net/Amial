import { createContext, useContext, useState, ReactNode } from "react";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;       // "YYYY-MM-DD"
  time: string;       // e.g. "6pm" or "10pm"
  location: string;
  tags: string[];
  attendees: number;
  source: "joined" | "created";
};

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: "Training Legs!",
    date: "2026-04-25",
    time: "6pm",
    location: "RPI Mueller",
    tags: ["Chill", "Legs", "Low-Key"],
    attendees: 3,
    source: "joined",
  },
  {
    id: 2,
    title: "Watching Anime",
    date: "2026-04-28",
    time: "10pm",
    location: "DCC 308",
    tags: ["fun", "Relaxing"],
    attendees: 3,
    source: "joined",
  },
];

type EventsContextType = {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  joinedIds: Set<number>;
  toggleJoin: (postId: number, event: CalendarEvent) => void;
};

const EventsContext = createContext<EventsContextType>({
  events: [],
  addEvent: () => {},
  joinedIds: new Set(),
  toggleJoin: () => {},
});

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(DEFAULT_EVENTS);
  const [joinedIds, setJoinedIds] = useState<Set<number>>(new Set([1, 2]));

  function addEvent(event: CalendarEvent) {
    setEvents((prev) => [...prev, event]);
  }

  function toggleJoin(postId: number, event: CalendarEvent) {
    setJoinedIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
        setEvents((evs) => evs.filter((e) => e.id !== postId));
      } else {
        next.add(postId);
        setEvents((evs) => [...evs, event]);
      }
      return next;
    });
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, joinedIds, toggleJoin }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}