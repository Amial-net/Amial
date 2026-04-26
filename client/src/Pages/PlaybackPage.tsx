import { useState } from "react";
import MainSideBar from "../components/SideBar.tsx";
import mypfp from "../assets/mypfp.jpg";
import animeGirl from "../assets/anime-girl.gif";
import { useEvents } from "../assets/context/EventsContext"; 

export default function PlaybackPage() {
  return (
    <div className="h-screen overflow-hidden bg-white text-black">
      <Playback />
    </div>
  );
}

type Post = {
  id: number;
  name: string;
  handle: string;
  tags: string[];
  title: string;
  subtitle: string;
  body: string;
  comments: number;
  attendees: number;
  date: string;
  time: string;
  location: string;
  image?: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    name: "Richard Wei",
    handle: "@Richardwei4174",
    tags: ["Chill", "Legs", "Low-Key"],
    title: "Training Legs!",
    subtitle: "Today, 6pm @ RPI Mueller",
    body: "Yo, I'm planning to hit legs for the first time in years! Please Join, I may not be able to walk after this insane session 😂",
    comments: 67,
    attendees: 3,
    date: "2026-04-25",
    time: "6pm",
    location: "RPI Mueller",
  },
  {
    id: 2,
    name: "Richard Wei",
    handle: "@Richardwei4174",
    tags: ["fun", "Relaxing"],
    title: "Watching Anime",
    subtitle: "Tuesday 10pm @ DCC 308",
    body: "Angle Next Door Season 2 coming out this Tuesday! Who would like to watch it with me? It'll be fun!",
    comments: 10,
    attendees: 3,
    image: animeGirl,
    date: "2026-04-28",
    time: "10pm",
    location: "DCC 308",
  },
];

function Playback() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showModal, setShowModal] = useState(false);
  const { addEvent } = useEvents();                      

  const handleNewPost = (post: Post) => {
    setPosts([post, ...posts]);
    setShowModal(false);
    //  also push to calendar as a "created" event
    addEvent({
      id: post.id,
      title: post.title,
      date: post.date,
      time: post.time,
      location: post.location,
      tags: post.tags,
      attendees: post.attendees,
      source: "created",
    });
  };

  return (
    <div className="grid grid-cols-12 w-full h-screen overflow-hidden bg-[#f9f9fb]">
      <div className="col-span-3 h-screen overflow-hidden">
        <MainSideBar onPost={() => setShowModal(true)} />
      </div>

      <div className="col-span-6 h-screen overflow-hidden flex flex-col border-x border-black/[0.06]">
        <CenterFeed posts={posts} />
      </div>

      <div className="col-span-3 h-screen overflow-hidden">
        <RightSidebar />
      </div>

      {showModal && (
        <PostModal onClose={() => setShowModal(false)} onSubmit={handleNewPost} />
      )}
    </div>
  );
}

function CenterFeed({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="grid grid-cols-2 border-b border-black/[0.07] shrink-0">
        <button className="py-4 text-[15px] font-semibold text-black/40 border-r border-black/[0.07] hover:bg-gray-50 transition-colors">
          Activities
        </button>
        <button className="py-4 text-[15px] font-bold text-black relative">
          PlayBack
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[#5f8dee] rounded-full" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const { joinedIds, toggleJoin } = useEvents();         
  const joined = joinedIds.has(post.id);                 

  const handleJoin = () => {                            
    toggleJoin(post.id, {
      id: post.id,
      title: post.title,
      date: post.date,
      time: post.time,
      location: post.location,
      tags: post.tags,
      attendees: post.attendees,
      source: "joined",
    });
  };

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img src={mypfp} alt="profile" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10" />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[14px] font-bold">{post.name}</span>
              <span className="text-[12px] text-black/30">{post.handle}</span>
            </div>
            <div className="flex gap-1 mt-0.5 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-semibold text-[#5f8dee]/80 bg-[#5f8dee]/[0.07] px-1.5 py-0.5 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="text-black/20 hover:text-black/50 text-lg leading-none transition-colors">⋯</button>
      </div>

      <div className="mt-3 text-center">
        <h2 className="text-[20px] font-extrabold tracking-tight">{post.title}</h2>
        <p className="text-[12px] font-medium text-black/35 mt-0.5">{post.subtitle}</p>
      </div>

      <p className="mt-2 text-[13px] text-black/70 leading-relaxed">{post.body}</p>

      {post.image && (
        <div className="mt-3">
          <img src={post.image} className="h-[180px] w-[180px] object-cover rounded-xl" alt="post visual" />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-black/35">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[13px] font-semibold">{post.comments}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold text-black/60">{post.attendees} attendees</span>
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <img key={i} src={mypfp} className="h-7 w-7 rounded-full border-2 border-white object-cover" alt="attendee" />
            ))}
          </div>
          {/*button now toggles join state */}
          <button
            onClick={handleJoin}
            className={`rounded-full transition-colors px-5 py-1.5 text-[13px] font-bold text-white ${
              joined
                ? "bg-[#34c48b] hover:bg-[#2aad7a]"
                : "bg-[#5f8dee] hover:bg-[#4a7de0]"
            }`}
          >
            {joined ? "JOINED ✓" : "JOIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

const TAG_OPTIONS = ["Chill", "Study", "GYM", "Food", "Anime", "Fun", "Relaxing", "Low-Key", "Social"];

function PostModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (post: Post) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;
    const dateLabel = date
      ? new Date(date).toLocaleDateString("en-US", { weekday: "long" })
      : "TBD";
    const subtitle = `${dateLabel}${time ? `, ${time}` : ""}${location ? ` @ ${location}` : ""}`;
    onSubmit({
      id: Date.now(),
      name: "Richard Wei",
      handle: "@Richardwei4174",
      tags: selectedTags.length ? selectedTags : ["General"],
      title: title.trim(),
      subtitle,
      body: body.trim(),
      comments: 0,
      attendees: 1,
      date: date || "",
      time: time || "",
      location: location || "",
    });
  };

  const isValid = title.trim().length > 0 && body.trim().length > 0;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/[0.07]">
          <h2 className="text-[17px] font-extrabold">New Activity Post</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-black/40 hover:text-black text-sm"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center gap-3">
            <img src={mypfp} alt="profile" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10" />
            <div>
              <div className="text-[14px] font-bold">Richard Wei</div>
              <div className="text-[11px] text-black/35">@Richardwei4174</div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Activity Title</label>
            <input
              type="text"
              placeholder="e.g. Morning Run, Study Session…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fb] px-3 py-2.5 text-[14px] font-semibold placeholder:text-black/25 focus:outline-none focus:border-[#5f8dee]/50 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Description</label>
            <textarea
              placeholder="Tell people what's happening…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fb] px-3 py-2.5 text-[13px] placeholder:text-black/25 resize-none focus:outline-none focus:border-[#5f8dee]/50 focus:bg-white transition-colors leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fb] px-2 py-2 text-[12px] focus:outline-none focus:border-[#5f8dee]/50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Time</label>
              <input
                type="text"
                placeholder="e.g. 6pm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fb] px-2 py-2 text-[12px] placeholder:text-black/25 focus:outline-none focus:border-[#5f8dee]/50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Location</label>
              <input
                type="text"
                placeholder="e.g. Mueller"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fb] px-2 py-2 text-[12px] placeholder:text-black/25 focus:outline-none focus:border-[#5f8dee]/50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/40 uppercase tracking-wider">Tags</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all border ${
                      active
                        ? "bg-[#5f8dee] text-white border-[#5f8dee]"
                        : "bg-[#f4f4f6] text-black/60 border-black/[0.08] hover:border-[#5f8dee]/40 hover:bg-[#eaeaf0]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 pb-5 pt-3 flex items-center justify-between border-t border-black/[0.07]">
          <span className="text-[12px] text-black/30 font-medium">
            {isValid ? "Ready to post!" : "Fill in a title and description"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-full border border-black/[0.08] px-5 py-2 text-[13px] font-semibold text-black/50 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`rounded-full px-6 py-2 text-[13px] font-bold text-white transition-all ${
                isValid ? "bg-[#5f8dee] hover:bg-[#4a7de0] shadow-sm" : "bg-[#5f8dee]/40 cursor-not-allowed"
              }`}
            >
              Post Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightSidebar() {
  const filters = ["GYM", "Study", "Food", "Anime", "Today", "Tomorrow", "Weekend"];
  const upcoming = [
    { title: "Training Legs!", subtitle: "Today, 6pm @ RPI Mueller" },
    { title: "Watching Anime", subtitle: "Tuesday 10pm @ DCC 308" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f9f9fb] p-4 space-y-3">
      <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm p-4">
        <h3 className="text-[15px] font-bold text-black">Filter Activities</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className="rounded-lg border border-black/[0.08] bg-[#f4f4f6] hover:bg-[#eaeaf0] hover:border-[#5f8dee]/40 transition-all px-3 py-1.5 text-[12px] font-semibold text-black/70"
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="mt-3 text-[12px] font-semibold text-[#5f8dee] hover:underline">Show more</button>
      </div>

      <div className="rounded-2xl border border-black/[0.07] bg-white shadow-sm p-4">
        <h3 className="text-[15px] font-bold text-black">Your Upcoming</h3>
        <div className="mt-3 space-y-2">
          {upcoming.map((item) => (
            <div key={item.title} className="rounded-xl border border-black/[0.07] bg-[#f9f9fb] p-3 flex gap-3 items-center">
              <img src={mypfp} alt="profile" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10 shrink-0" />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[13px] font-bold">Richard Wei</span>
                  <span className="text-[11px] text-black/30">@Richardwei4174</span>
                </div>
                <div className="text-[13px] font-extrabold text-black">{item.title}</div>
                <div className="text-[11px] text-black/50 font-medium">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-3 text-[12px] font-semibold text-[#5f8dee] hover:underline">View Calendar</button>
      </div>
    </div>
  );
}