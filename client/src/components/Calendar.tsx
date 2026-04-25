import { useState } from "react";

type ViewMode = "day" | "week" | "month";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  function goBack() {
    if (viewMode === "day") {
      setCurrentDate(new Date(year, month, currentDate.getDate() - 1));
    } else if (viewMode === "week") {
      setCurrentDate(new Date(year, month, currentDate.getDate() - 7));
    } else {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  }

  function goForward() {
    if (viewMode === "day") {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 1));
    } else if (viewMode === "week") {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 7));
    } else {
      setCurrentDate(new Date(year, month + 1, 1));
    }
  }

  function getTitle() {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("default", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (viewMode === "week") {
      return "This Week";
    }

    return currentDate.toLocaleString("default", { month: "long" }) + " " + year;
  }

  return (
    <div className="rounded-[18px] border border-black/10 p-5">
      <div className="flex items-center justify-between mb-5">
        <button onClick={goBack} className="rounded-full border border-black/10 px-3 py-1">
          ←
        </button>

        <div className="text-center">
          <h2 className="text-[20px] font-extrabold">{getTitle()}</h2>

          <div className="flex gap-2 mt-3 justify-center">
            <button onClick={() => setViewMode("day")} className="rounded-full border px-3 py-1 text-sm">
              Day
            </button>
            <button onClick={() => setViewMode("week")} className="rounded-full border px-3 py-1 text-sm">
              Week
            </button>
            <button onClick={() => setViewMode("month")} className="rounded-full border px-3 py-1 text-sm">
              Month
            </button>
          </div>
        </div>

        <button onClick={goForward} className="rounded-full border border-black/10 px-3 py-1">
          →
        </button>
      </div>

      {viewMode === "day" && <DayView currentDate={currentDate} />}
      {viewMode === "week" && <WeekView currentDate={currentDate} />}
      {viewMode === "month" && <MonthView currentDate={currentDate} />}
    </div>
  );
}

function DayView({ currentDate }: { currentDate: Date }) {
  return (
    <div className="rounded-[16px] border border-black/10 p-5 min-h-[260px]">
      <p className="text-[14px] text-black/40 mb-4">Today&apos;s moments</p>

      <div className="rounded-[14px] border border-dashed border-black/20 p-5 text-center text-black/40">
        No events yet. Add a moment for today.
      </div>
    </div>
  );
}

function WeekView({ currentDate }: { currentDate: Date }) {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map((date) => (
        <div key={date.toDateString()} className="h-32 rounded-[12px] border border-black/10 p-2">
          <div className="text-[12px] font-bold text-black/40">
            {date.toLocaleDateString("default", { weekday: "short" })}
          </div>
          <div className="text-[18px] font-extrabold">{date.getDate()}</div>
        </div>
      ))}
    </div>
  );
}

function MonthView({ currentDate }: { currentDate: Date }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <>
      <div className="grid grid-cols-7 text-center text-[13px] font-bold text-black/50 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className="h-20 rounded-[12px] border border-black/10 p-2">
            {day}
          </div>
        ))}
      </div>
    </>
  );
}