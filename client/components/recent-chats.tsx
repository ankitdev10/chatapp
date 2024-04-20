import { Chat } from "./chat";
import { Separator } from "./ui/separator";

export const RecentChats = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <header className="bg-white shadow-sm px-6 h-16 grid items-center rounded-lg">
        <h1 className="text-lg font-semibold">Chats</h1>
      </header>

      <div className="bg-white rounded-2xl h-1 flex-grow space-y-4 overflow-y-scroll p-6">
        {Array.from({ length: 10 }).map((_item, i) => (
          <div key={i}>
            <Chat key={i} />
            <Separator className="my-3" />
          </div>
        ))}
        <Chat />
      </div>
    </div>
  );
};
