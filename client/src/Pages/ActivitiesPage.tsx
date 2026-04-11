import {
  Search,
  SlidersHorizontal,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
} from "lucide-react";
import SideBar from "../components/SideBar";

export default function ActivityPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />

      <main className="flex-1 flex flex-col">
        <TopTabs />

        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ActivityFeed />
          </div>

          <div className="w-80 space-y-4">
            <FilterPanel />
            <UpcomingPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

function TopTabs() {
  const tabs = ["For You", "Following", "Trending"];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            index === 0
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    {
      author: "Ludwig Van Teeth",
      username: "zophiac",
      time: "2h ago",
      content: "I love trains.",
      type: "Design Update",
      likes: 24,
      comments: 8,
      reposts: 3,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500 w-full max-w-md">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search activity"
            className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-black">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Sort</span>
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityCard
            key={`${activity.username}-${activity.time}`}
            {...activity}
          />
        ))}
      </div>
    </section>
  );
}

function ActivityCard({
  author,
  username,
  time,
  content,
  type,
  likes,
  comments,
  reposts,
}: {
  author: string;
  username: string;
  time: string;
  content: string;
  type: string;
  likes: number;
  comments: number;
  reposts: number;
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt={author}
            className="w-11 h-11 rounded-full object-cover border border-gray-300"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">{author}</h3>
              <span className="text-xs text-gray-500">@{username}</span>
            </div>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>

        <span className="text-xs font-medium px-5 py-1 rounded-full bg-gray-100 text-gray-600">
          {type}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-800 leading-6">{content}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-6 text-gray-500">
        <button className="flex items-center gap-2 hover:text-black transition-colors">
          <Heart size={18} />
          <span className="text-sm">{likes}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-black transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">{comments}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-black transition-colors">
          <Repeat2 size={18} />
          <span className="text-sm">{reposts}</span>
        </button>

        <button className="ml-auto hover:text-black transition-colors">
          <Share size={18} />
        </button>
      </div>
    </article>
  );
}

function FilterPanel() {
  return <></>;
}

type Event = {
  title: string;
  date: string;
  time: string;
  host: string;
};

function UpcomingPanel() {
  const upcomingEvents: Event[] = [
    {
      title: "UI Workshop",
      date: "Apr 5, 2026",
      time: "3:00 PM - 5:00 PM",
      host: "Design Team",
    },
    {
      title: "Product Launch",
      date: "Apr 10, 2026",
      time: "12:00 PM - 1:00 PM",
      host: "Marketing",
    },
    {
      title: "Weekly Sync",
      date: "Apr 7, 2026",
      time: "10:00 AM - 11:00 AM",
      host: "Engineering",
    },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4">
      <PanelHeader title="Upcoming Events" />
      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
  );
}

type PanelHeaderProps = {
  title: string;
};

function PanelHeader({ title }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <button className="text-xs font-medium text-gray-500 hover:text-black transition-colors">
        View all
      </button>
    </div>
  );
}

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const { title, date, time, host } = event;

  return (
    <article className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {title}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {date} · {time}
          </p>
          <p className="mt-2 text-xs text-gray-400">Hosted by {host}</p>
        </div>

        <div className="shrink-0 px-2 py-1 rounded-lg bg-gray-100 text-[11px] font-medium text-gray-600">
          Event
        </div>
      </div>
    </article>
  );
}
