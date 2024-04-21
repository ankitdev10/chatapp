"use client";

import { SocketContext } from "@/lib/context/context";
import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
export const AllMessages = () => {
  const { socket, setAllMessages, allMessages } = useContext(SocketContext);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [arrivedMessage, setArrivedMessage] = useState<{
    senderId: string;
    text: string;
  } | null>(null);
  useEffect(() => {
    console.log("use effect running");
    socket.connect();
    socket.emit("addUser", userId);
    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on("getMessage", (data) => {
    console.log(data);
    setAllMessages(data);
  });

  return (
    <div className="bg-white rounded-2xl h-1 flex-grow p-8 overflow-y-scroll space-y-4">
      {allMessages?.length === 0 && (
        <div className="w-full flex items-center justify-center gap-3">
          <Frown />
          No messages yet!
        </div>
      )}
      {allMessages?.map((message, index) =>
        message.senderId === userId ? (
          <h1
            className="w-fit ml-auto px-4 text-white py-1 rounded-lg bg-theme"
            key={index}
          >
            {message.text}
          </h1>
        ) : (
          <h1 key={index} className="w-fit px-4 py-1 bg-slate-200 rounded-lg">
            {message.text}
          </h1>
        ),
      )}
    </div>
  );
};
