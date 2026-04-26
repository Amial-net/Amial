import { useState } from "react";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;       // "YYYY-MM-DD"
  time: string;       // e.g. "6pm" or "7:30pm"
  location: string;
  tags: string[];
  attendees: number;
  source: "joined" | "created";
};

// ─── tiny time parser ────────────────────────────────────────────────
function parseHour(time: string): number {
  if (!time) return 0;
  const lower = time.toLowerCase().trim();
  const pm = lower.includes("pm");
  const am = lower.includes("am");
  const digits = lower.replace(/[^0-9:]/g, "");
  const [h, m] = digits.split(":").map(Number);
  let hour = h || 0;
  if (pm && hour !== 12) hour += 12;
  if (am && hour === 12) hour = 0;
  return hour + (m || 0) / 60;
}

function formatTime(time: string): string {
  if (!time) return "";
  return time.trim();
}

// ─── tag colour helper ────────────────────────────────────────────────
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

// ─── HOURS shown in day / week views ─────────────────────────────────
const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0–23
const SLOT_H = 56; // px per hour

// ─── EventPill ───────────────────────────────────────────────────────
function EventPill({ event, compact = false }: { event: CalendarEvent; compact?: boolean }) {
  const topPct = (parseHour(event.time) / 24) * 100;
  const accent = event.source === "created" ? "#5f8dee" : "#34c48b";

  if (compact) {
    return (
      <div
        className="rounded-lg px-2 py-1 text-white text-[11px] font-bold truncate shadow-sm"
        style={{ background: accent }}
        title={`${event.title} • ${event.time}`}
      >
        {event.time && <span className="opacity-75 mr-1">{formatTime(event.time)}</span>}
        {event.title}
      </div>
    );
  }

  return (
    <div
      className="absolute left-1 right-1 rounded-xl px-2.5 py-1.5 text-white shadow-md z-10"
      style={{
        top: `${topPct}%`,
        minHeight: 36,
        background: `linear-gradient(135deg, ${accent}ee, ${accent}bb)`,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div className="text-[12px] font-extrabold leading-tight truncate">{event.title}</div>
      {event.time && (
        <div className="text-[10px] opacity-80 mt-0.5">{formatTime(event.time)}{event.location ? ` · ${event.location}` : ""}</div>
      )}
    </div>
  );
}

// ─── DayView ─────────────────────────────────────────────────────────
function DayView({ currentDate, events }: { currentDate: Date; events: CalendarEvent[] }) {
  const dateStr = currentDate.toISOString().slice(0, 10);
  const dayEvents = events.filter((e) => e.date === dateStr);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="relative" style={{ height: SLOT_H * 24 }}>
          {/* Hour grid */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="absolute w-full flex items-start"
              style={{ top: h * SLOT_H, height: SLOT_H }}
            >
              <span className="w-12 shrink-0 text-[11px] text-black/30 font-semibold pt-0.5 pr-2 text-right select-none">
                {h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
              </span>
              <div className="flex-1 border-t border-black/[0.06]" />
            </div>
          ))}

          {/* Events */}
          <div className="absolute left-12 right-0 top-0 bottom-0">
            {dayEvents.map((ev) => (
              <EventPill key={ev.id} event={ev} />
            ))}
            {dayEvents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rounded-2xl border border-dashed border-black/15 px-8 py-5 text-center">
                  <div className="text-[13px] font-semibold text-black/30">No events today</div>
                  <div className="text-[11px] text-black/20 mt-0.5">Join or create activities on PlayBack</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WeekView ────────────────────────────────────────────────────────
function WeekView({ currentDate, events }: { currentDate: Date; events: CalendarEvent[] }) {
  const start = new Date(currentDate);
  start.setDate(currentDate.getDate() - currentDate.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2 shrink-0 pl-10">
        {weekDays.map((d) => {
          const ds = d.toISOString().slice(0, 10);
          const isToday = ds === today;
          return (
            <div key={ds} className="text-center">
              <div className="text-[10px] font-bold text-black/40 uppercase">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div
                className={`mx-auto mt-0.5 h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-extrabold ${
                  isToday ? "bg-[#5f8dee] text-white" : "text-black"
                }`}
              >
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrollable time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: SLOT_H * 24 }}>
          {/* Hour labels */}
          <div className="w-10 shrink-0 relative">
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute w-full"
                style={{ top: h * SLOT_H }}
              >
                <span className="text-[10px] text-black/25 font-semibold">
                  {h === 0 ? "" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex-1 grid grid-cols-7 gap-px">
            {weekDays.map((d) => {
              const ds = d.toISOString().slice(0, 10);
              const dayEvs = events.filter((e) => e.date === ds);
              return (
                <div key={ds} className="relative border-l border-black/[0.05]">
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="absolute w-full border-t border-black/[0.05]"
                      style={{ top: h * SLOT_H, height: SLOT_H }}
                    />
                  ))}
                  {dayEvs.map((ev) => (
                    <EventPill key={ev.id} event={ev} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MonthView ───────────────────────────────────────────────────────
function MonthView({ currentDate, events }: { currentDate: Date; events: CalendarEvent[] }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function ds(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-black/35 uppercase py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const dateStr = ds(day);
          const dayEvents = events.filter((e) => e.date === dateStr);
          const isToday = dateStr === today;
          return (
            <div
              key={dateStr}
              className="min-h-[80px] rounded-xl border border-black/[0.07] p-1.5 bg-white hover:border-[#5f8dee]/30 transition-colors"
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[12px] font-bold mb-1 ${
                  isToday ? "bg-[#5f8dee] text-white" : "text-black/70"
                }`}
              >
                {day}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((ev) => (
                  <EventPill key={ev.id} event={ev} compact />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-black/40 font-semibold pl-1">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Calendar Export ─────────────────────────────────────────────
type ViewMode = "day" | "week" | "month";

export default function Calendar({ events = [] }: { events?: CalendarEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  function goBack() {
    if (viewMode === "day") setCurrentDate(new Date(year, month, currentDate.getDate() - 1));
    else if (viewMode === "week") setCurrentDate(new Date(year, month, currentDate.getDate() - 7));
    else setCurrentDate(new Date(year, month - 1, 1));
  }

  function goForward() {
    if (viewMode === "day") setCurrentDate(new Date(year, month, currentDate.getDate() + 1));
    else if (viewMode === "week") setCurrentDate(new Date(year, month, currentDate.getDate() + 7));
    else setCurrentDate(new Date(year, month + 1, 1));
  }

  function getTitle() {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      });
    }
    if (viewMode === "week") {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    return currentDate.toLocaleString("en-US", { month: "long" }) + " " + year;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Calendar Nav */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <button
          onClick={goBack}
          className="h-9 w-9 rounded-full border border-black/[0.08] bg-white hover:bg-gray-50 flex items-center justify-center text-black/50 hover:text-black transition-all shadow-sm"
        >
          ←
        </button>

        <div className="text-center">
          <h2 className="text-[16px] font-extrabold tracking-tight">{getTitle()}</h2>
          <div className="flex gap-1.5 mt-2 justify-center">
            {(["day", "week", "month"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`rounded-full px-4 py-1 text-[12px] font-bold transition-all capitalize ${
                  viewMode === v
                    ? "bg-[#5f8dee] text-white shadow-sm"
                    : "border border-black/[0.08] text-black/50 hover:bg-gray-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={goForward}
          className="h-9 w-9 rounded-full border border-black/[0.08] bg-white hover:bg-gray-50 flex items-center justify-center text-black/50 hover:text-black transition-all shadow-sm"
        >
          →
        </button>
      </div>

      {/* View */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "day" && <DayView currentDate={currentDate} events={events} />}
        {viewMode === "week" && <WeekView currentDate={currentDate} events={events} />}
        {viewMode === "month" && <MonthView currentDate={currentDate} events={events} />}
      </div>
    </div>
  );
}