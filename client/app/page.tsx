"use client";
import { Inbox } from "@/components/inbox";
import { RecentChats } from "@/components/recent-chats";
import ContextProvider from "@/lib/context/context";

export default function Home() {
  return (
    <ContextProvider>
      <main className="min-h-screen flex flex-col py-12 px-24">
        <div className="h-1 shadow-lg  flex-grow rounded-lg p-8 overflow-y-scroll w-full bg-[#eee] grid grid-cols-[480px_1fr] gap-2">
          <section className="">
            <RecentChats />
          </section>

          <section className="max-w-[800px] ">
            <Inbox />
          </section>
        </div>
      </main>
    </ContextProvider>
  );
}
