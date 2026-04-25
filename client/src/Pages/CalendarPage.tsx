import MainSideBar from "../components/SideBar.tsx";

export default function CalendarPage() {
  return (
    <div className="grid grid-cols-12 w-full min-h-screen bg-white">

      {/* LEFT SIDEBAR */}
      <div className="col-span-3">
        <MainSideBar />
      </div>

      {/* CENTER CALENDAR */}
      <div className="col-span-6 border-r border-black/10 bg-white">

        {/* CALENDAR HEADER */}
        <div className="p-6 border-b border-black/10">
          <h1 className="text-[24px] font-extrabold">Calendar</h1>
          <p className="text-[14px] text-black/40">
            Plan your moments and keep track of meaningful connections.
          </p>
        </div>

        {/* CALENDAR BODY */}
        <div className="p-4">
          <div className="rounded-[18px] border border-black/10 p-5">
            Calendar goes here
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-3 bg-white p-4">

        <div className="rounded-[18px] border border-black/10 p-5">
          <h3 className="text-[18px] font-extrabold mb-4">Today</h3>
          <p className="text-[14px] text-black/60">
            No events yet.
          </p>
        </div>

      </div>
    </div>
  );
}