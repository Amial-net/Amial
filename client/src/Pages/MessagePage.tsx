import { Home, Bell, MessageCircle, Calendar, User } from "lucide-react";

export default function MessagePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <MainChatArea />
      <MessagesPanel />
    </div>
  );
}

function SideBar() {
  const buttons = [
    { name: "Amial", icon: User },
    { name: "Home", icon: Home },
    { name: "Notifications", icon: Bell },
    { name: "Chat", icon: MessageCircle },
    { name: "Calendar", icon: Calendar },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col justify-between p-4">
      <div className="space-y-1">
        {
          // Rendering navbar buttons
          buttons.map(({ name, icon: Icon }) => (
            <NavButton key={name} name={name} Icon={Icon} />
          ))
        }
      </div>

      <ProfileCard displayName="Richard Wei" username="VinceTheKing" />
    </aside>
  );
}

function NavButton({ name, Icon }: { name: string; Icon: React.ElementType }) {
  return (
    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-black">
      <Icon size={20} />
      <h3 className="text-sm font-medium">{name}</h3>
    </button>
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
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100"
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

function MainChatArea() {
  return <></>;
}

function MessagesPanel() {
  return (
    <>
      <MessagesHeader />
      <ConversationList />
      <SearchBar />
    </>
  );
}

function MessagesHeader() {
  return <></>;
}

function ConversationList() {
  return <></>;
}

function SearchBar() {
  return <></>;
}
