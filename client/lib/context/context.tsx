import { SOCKETURL } from "@/constants";
import { createContext, useState } from "react";
import { Socket, io } from "socket.io-client";

export const socket = io(SOCKETURL, {
  autoConnect: false,
});

export const SocketContext = createContext<{
  socket: Socket;
  allMessages: { senderId: string; text: string }[];
  setAllMessages: any;
}>({
  socket,
  allMessages: [],
  setAllMessages: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allMessages, setAllMessages] = useState<
    {
      senderId: string;
      text: string;
    }[]
  >([]);
  return (
    <SocketContext.Provider value={{ socket, allMessages, setAllMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export default ContextProvider;
