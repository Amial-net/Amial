import SideBar from "../components/SideBar";

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
