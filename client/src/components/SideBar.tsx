import { Home, Bell, MessageCircle, Calendar, User } from "lucide-react";

import mypfp from "../assets/mypfp.jpg";

export default function SideBar({ onPost }: { onPost?: () => void }) {
  const buttons = [
    { name: "Amial", icon: User },
    { name: "Home", icon: Home },
    { name: "Notifications", icon: Bell },
    { name: "Chat", icon: MessageCircle },
    { name: "Calendar", icon: Calendar },
  ];

  return (
    <aside className="w-full h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-4 pl-4 pr-2">
      <div className="space-y-1">
        {buttons.map(({ name, icon: Icon }) => (
          <NavButton key={name} name={name} Icon={Icon} />
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={onPost}
          className="w-full max-w-[240px] rounded-full bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 px-6 py-3.5 text-[15px] font-bold text-white tracking-wide"
        >
          Post
        </button>

        <ProfileCard displayName="Richard Wei" username="VinceTheKing" />
      </div>
    </aside>
  );
}

function NavButton({ name, Icon }: { name: string; Icon: React.ElementType }) {
  const href = name === "Home" ? "/" : "#";

  return (
    <a
      href={href}
      className="flex items-center gap-4 w-fit px-4 py-3 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-black"
    >
      <Icon size={24} />
      <h3 className="text-[18px] font-semibold">{name}</h3>
    </a>
  );
}

function ProfileCard({
  displayName,
  username,
}: {
  displayName: string;
  username: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer max-w-[240px]">
      <div className="flex items-center gap-3">
        <img
          src={mypfp}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{displayName}</h3>
          <span className="text-xs text-gray-500">@{username}</span>
        </div>
      </div>

      <button className="text-gray-400 hover:text-gray-700 text-lg">⋯</button>
    </div>
  );
}