import { useState } from "react";
import MainSideBar from "../components/SideBar.tsx";
import Calendar, { CalendarEvent } from "../components/Calendar";

// ─── Default seed events (mirror the initialPosts from PlaybackPage) ───
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

// ─── Tag colour map (shared with PlaybackPage) ─────────────────────────
const TAG_COLORS: Record<string, string> = {
  Chill: "bg-sky-100 text-sky-600",
  Study: "bg-violet-100 text-violet-600",
  GYM: "bg-orange-100 text-orange-600",
  Food: "bg-amber-100 text-amber-600",
  Anime: "bg-pink-100 text-pink-600",
  Fun: "bg-green-100 text-green-600",
  Relaxing: "bg-teal-100 text-teal-600",
  "Low-Key": "bg-gray-100 text-gray-500",
  Social: "bg-indigo-100 text-indigo-600",
  Legs: "bg-red-100 text-red-600",
  General: "bg-gray-100 text-gray-500",
};
function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "bg-[#5f8dee]/10 text-[#5f8dee]";
}

// ─── helpers ──────────────────────────────────────────────────────────
function formatDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function isUpcoming(event: CalendarEvent): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const evDate = new Date(event.date + "T00:00:00");
  return evDate >= today;
}

function isToday(event: CalendarEvent): boolean {
  return event.date === new Date().toISOString().slice(0, 10);
}

// ─── EventCard (right sidebar) ────────────────────────────────────────
function EventCard({ event }: { event: CalendarEvent }) {
  const accent = event.source === "created" ? "#5f8dee" : "#34c48b";
  const label = event.source === "created" ? "Created" : "Joined";

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-extrabold truncate">{event.title}</div>
          <div className="text-[11px] text-black/40 font-medium mt-0.5">
            {formatDateLabel(event.date)}{event.time ? `, ${event.time}` : ""}
          </div>
          {event.location && (
            <div className="text-[11px] text-black/35 mt-0.5">📍 {event.location}</div>
          )}
        </div>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: accent }}
        >
          {label}
        </span>
      </div>
      <div className="flex gap-1 mt-2 flex-wrap">
        {event.tags.slice(0, 3).map((tag) => (
          <span key={tag} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${tagColor(tag)}`}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CalendarPage ─────────────────────────────────────────────────────
export default function CalendarPage() {
  const [events] = useState<CalendarEvent[]>(DEFAULT_EVENTS);

  const todayEvents = events.filter(isToday);
  const upcomingEvents = events.filter((e) => isUpcoming(e) && !isToday(e));

  return (
    <div className="grid grid-cols-12 w-full h-screen overflow-hidden bg-[#f9f9fb]">

      {/* LEFT SIDEBAR */}
      <div className="col-span-3 h-screen overflow-hidden">
        <MainSideBar />
      </div>

      {/* CENTER — CALENDAR */}
      <div className="col-span-6 h-screen overflow-hidden flex flex-col border-x border-black/[0.06] bg-white">

        {/* Header */}
        <div className="shrink-0 px-6 pt-5 pb-4 border-b border-black/[0.07]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight">Calendar</h1>
              <p className="text-[13px] text-black/35 mt-0.5">
                Your joined and created activities, all in one place.
              </p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5f8dee] inline-block" />
                <span className="text-[11px] font-semibold text-black/40">Created</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#34c48b] inline-block" />
                <span className="text-[11px] font-semibold text-black/40">Joined</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar body */}
        <div className="flex-1 overflow-hidden p-5">
          <div className="h-full rounded-2xl border border-black/[0.07] bg-white shadow-sm p-5 overflow-hidden flex flex-col">
            <Calendar events={events} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-3 h-screen overflow-y-auto bg-[#f9f9fb] p-4 space-y-3">

        {/* Today */}
        <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-extrabold">Today</h3>
            <span className="text-[11px] font-bold text-black/30">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
          {todayEvents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/15 px-4 py-5 text-center">
              <div className="text-[13px] font-semibold text-black/30">Nothing today</div>
              <div className="text-[11px] text-black/20 mt-0.5">Join an activity on PlayBack!</div>
            </div>
          ) : (
            <div className="space-y-2">
              {todayEvents.map((ev) => <EventCard key={ev.id} event={ev} />)}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-extrabold">Upcoming</h3>
            <span className="text-[11px] font-bold text-[#5f8dee]">{upcomingEvents.length} events</span>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-[13px] text-black/30 font-medium">No upcoming events.</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((ev) => <EventCard key={ev.id} event={ev} />)}
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm p-4">
          <h3 className="text-[15px] font-extrabold mb-3">Your Activity</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Total Events", value: events.length },
              { label: "This Month", value: events.filter((e) => e.date.startsWith(new Date().toISOString().slice(0, 7))).length },
              { label: "Created", value: events.filter((e) => e.source === "created").length },
              { label: "Joined", value: events.filter((e) => e.source === "joined").length },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-[#f9f9fb] border border-black/[0.05] px-3 py-2.5 text-center">
                <div className="text-[20px] font-extrabold text-[#5f8dee]">{value}</div>
                <div className="text-[10px] font-semibold text-black/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}