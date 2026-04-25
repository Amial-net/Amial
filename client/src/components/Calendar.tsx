export default function Calendar() {
  return (
    <div className="rounded-[18px] border border-black/10 p-5">
      <div className="flex items-center justify-between mb-5">
        <button className="rounded-full border border-black/10 px-3 py-1">
          
        </button>

        <h2 className="text-[20px] font-extrabold">April 2026</h2>

        <button className="rounded-full border border-black/10 px-3 py-1">
          
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[13px] font-bold text-black/50 mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        <div className="h-20 rounded-[12px] border border-black/10 p-2">1</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">2</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">3</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">4</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">5</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">6</div>
        <div className="h-20 rounded-[12px] border border-black/10 p-2">7</div>
      </div>
    </div>
  );
}