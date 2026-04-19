import MainSideBar from "../components/SideBar.tsx"
import mypfp from "../assets/mypfp.jpg";
import animeGirl from "../assets/anime-girl.gif";
export default function PlaybackPage() {
  return (
    <div className="min-h-screen bg-white text-black">
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
  image?: string;
};

const posts: Post[] = [
  {
    id: 1,
    name: "Richard Wei",
    handle: "@Richardwei4174",
    tags: ["Chill", "Legs", "Low-Key"],
    title: "Training Legs!",
    subtitle: "Today, 6pm @ RPI Mueller",
    body: "Yo, I’m planning to hit legs for the first time in years! Please Join, I may not be able to walk after this insane session 😂",
    comments: 67,
    attendees: 3,
  },
  {
    id: 2,
    name: "Richard Wei",
    handle: "@Richardwei4174",
    tags: ["fun", "Relaxing"],
    title: "Watching Anime",
    subtitle: "Tuesday 10pm @ DCC 308",
    body: "Angle Next Door Season 2 coming out this Tuesday! Who would like to watch it with me? It’ll be fun!",
    comments: 10,
    attendees: 3,
    image: animeGirl
  },
];

function Playback() {
  return (
    <div className="grid grid-cols-12 w-full min-h-screen bg-white">
    <div className="col-span-3">
      <MainSideBar />
    </div>

    <div className="col-span-6">
      <CenterFeed />
    </div>

    <div className="col-span-3">
      <RightSidebar />
    </div>
        </div>
  );
}

function LeftSidebar() {
  return (
    <div className="col-span-3 flex min-h-[820px] flex-col justify-between border-r border-black/10 bg-white p-6">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6b90f0] text-[20px] font-bold text-white">
            A
          </div>
          <span className="text-[20px] font-bold">Amial</span>
        </div>

        <div className="space-y-6">
          <SidebarLink iconSrc="/icons/home.png" label="Home" />
          <SidebarLink iconSrc="/icons/notifications.png" label="Notifications" />
          <SidebarLink iconSrc="/icons/chat.png" label="Chat" />
          <SidebarLink iconSrc="/icons/calendar.png" label="Calendar" />
        </div>
      </div>

      <div>
        <button className="mb-10 h-[60px] w-full max-w-[210px] rounded-full bg-black text-[20px] font-bold text-white">
          Post
        </button>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={mypfp}
              alt="profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="text-[15px] font-bold">Richard Wei</div>
              <div className="text-[12px] text-black/30">@Richardwei4174</div>
            </div>
          </div>

          <img
            src="/icons/more.png"
            alt="more options"
            className="h-5 w-5 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  iconSrc,
  label,
}: {
  iconSrc: string;
  label: string;
}) {
  const href = label === "Home" ? "/" : "#";

  return (
    <a
      href={href}
      className="flex items-center gap-4 text-left text-[18px] font-semibold hover:opacity-80"
    >
      <img src={iconSrc} alt={`${label} icon`} className="h-7 w-7 object-contain" />
      <span>{label}</span>
    </a>
  );
}

function CenterFeed() {
  return (
    <div className="col-span-5 border-r border-black/10 bg-white">
      <div className="grid grid-cols-2 border-b border-black/10 bg-white text-center">
        <div className="border-r border-black/10 py-6 text-[20px] font-bold">
          Activities
        </div>
        <div className="py-6 text-[20px] font-bold">PlayBack</div>
      </div>

      <div className="space-y-4 p-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="rounded-[18px] border border-black/10 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={mypfp}
            alt="profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-bold">{post.name}</span>
              <span className="text-[13px] font-semibold text-black/25">
                {post.handle}
              </span>
            </div>
            <div className="text-[12px] font-semibold text-black/20">
              #{post.tags.join(" #")}
            </div>
          </div>
        </div>

        <img
          src="/icons/more.png"
          alt="more options"
          className="h-4 w-4 object-contain"
        />
      </div>

      <div className="mt-2 text-center">
        <h2 className="text-[22px] font-extrabold">{post.title}</h2>
        <p className="text-[13px] font-bold text-black/20">{post.subtitle}</p>
      </div>

      <p className="mt-4 text-[15px] font-semibold leading-[1.35]">{post.body}</p>

      {post.image && (
        <div className="mt-4">
          <img
            src={post.image}
            className="mt-4 h-[230px] w-[230px] object-cover rounded-xl"
          />
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-black/40">
          <img
            src="/icons/comment.png"
            alt="comment icon"
            className="h-6 w-6 object-contain"
          />
          <span className="text-[15px] font-bold">{post.comments}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[15px] font-extrabold">
            {post.attendees} attendees
          </span>

            <div className="flex -space-x-2">
              <img
                src={mypfp}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src={mypfp}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src={mypfp}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            </div>

          <button className="rounded-full bg-[#5f8dee] px-7 py-2 text-[14px] font-bold text-white">
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}

function RightSidebar() {
  const filters = ["GYM", "Study", "Food", "Anime", "Today", "Tomorrow", "Weekend"];

  const upcoming = [
    {
      title: "Training Legs!",
      subtitle: "Today, 6pm @ RPI Mueller",
    },
    {
      title: "Watching Anime",
      subtitle: "Tuesday 10pm @ DCC 308",
    },
  ];

  return (
    <div className="col-span-4 bg-white p-4">
      <div className="space-y-4">
        <div className="rounded-[18px] border border-black/10 bg-white p-5">
          <h3 className="text-[18px] font-extrabold">Filter Activities</h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="rounded-xl border border-black/10 bg-[#f8f8f8] px-3 py-2 text-[14px] font-bold"
              >
                {filter}
              </button>
            ))}
          </div>

          <button className="mt-4 text-[13px] font-bold text-[#4b74d8]">
            Show more
          </button>
        </div>

        <div className="rounded-[18px] border border-black/10 bg-white p-5">
          <h3 className="text-[18px] font-extrabold">Your Upcoming</h3>

          <div className="mt-4 space-y-3">
            {upcoming.map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/10 p-3">
                <div className="flex gap-3">
                  <img
                    src={mypfp}
                    alt="profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-bold">Richard Wei</span>
                      <span className="text-[12px] text-black/25">
                        @Richardwei4174
                      </span>
                    </div>
                    <div className="text-[15px] font-extrabold">{item.title}</div>
                    <div className="text-[14px] font-extrabold">{item.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-[13px] font-bold text-[#4b74d8]">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}