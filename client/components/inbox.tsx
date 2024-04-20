import { AllMessages } from "./all-messages";
import { InboxHeader } from "./inbox-header";
import { SendMessage } from "./send-message";
import { Input } from "./ui/input";

export const Inbox = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <header className="bg-white shadow-sm h-16  grid px-6 rounded-lg">
        <InboxHeader />
      </header>

      <AllMessages />
      <SendMessage />
    </div>
  );
};
