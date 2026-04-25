import MainSideBar from "../components/SideBar";

export default function CalendarPage() {
  return (
    <div className="grid grid-cols-12 w-full min-h-screen bg-white">

      {/* LEFT SIDEBAR */}
      <div className="col-span-3">
        <MainSideBar />
      </div>

      {/* RIGHT CONTENT (calendar will go here) */}
      <div className="col-span-9 p-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
      </div>

    </div>
  );
}