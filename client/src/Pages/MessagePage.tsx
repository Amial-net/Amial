import SideBar from "../components/SideBar";

import { Search, CheckCheck, Phone, Video } from "lucide-react";

export default function MessagePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <MainChatArea />
      <MessagesPanel />
    </div>
  );
}

function MainChatArea() {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <ConversationTopBar />
      <MiddleLayer />
      <MessageInputContainer />
    </main>
  );
}

function ConversationTopBar() {
  return (
    <div className="h-[72px] bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h2 className="text-sm font-semibold text-gray-900">Vincent Wang</h2>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <Phone size={18} className="text-gray-600" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <Video size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

function MiddleLayer() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50">
      <MessageBubble type="received" message="Hello, kind gentleman" />
      <MessageBubble type="sent" message="hi?" />
    </div>
  );
}
function MessageBubble({
  type = "received",
  message,
}: {
  type: string;
  message: string;
}) {
  const isSent = type === "sent";

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%] px-4 py-2.5 rounded-2xl text-sm
          ${
            isSent
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
}

function MessageInputContainer() {
  return (
    <div className="bg-white border-t border-gray-200 px-6 py-3">
      <form className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MessagesPanel() {
  return (
    <aside className="w-[340px] bg-white border-l border-gray-200 flex flex-col">
      <div className="px-6 py-5">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
      </div>

      <div className="px-6 pb-4">
        <SearchBar />
      </div>

      <div className="px-6 pb-2">
        <MessagesSort />
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <ConversationList />
      </div>
    </aside>
  );
}

function MessagesSort() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Sort by</span>
      <button className="text-blue-600 font-medium hover:underline">
        Newest
      </button>
    </div>
  );
}

function ConversationList() {
  const conversations = Array.from({ length: 3 });

  return (
    <div className="space-y-1">
      {conversations.map((_, i) => (
        <ConversationItem key={i} />
      ))}
    </div>
  );
}

function ConversationItem() {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            Vincent Wang
          </h3>
          <p className="text-xs text-gray-500 truncate">I really like Amial.</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-400">1 minute ago</span>

        <span className="bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          1
        </span>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <form className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <Search size={16} />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="w-full pl-9 pr-3 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}