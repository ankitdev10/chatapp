"use client";

import { SOCKETURL } from "@/constants";
import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";
export const socket = io(SOCKETURL, {
  autoConnect: false,
});

export const SocketContext = createContext<{
  socket: Socket;
  allMessages: { senderId: string; text: string }[];
  setAllMessages: any;
  peer: Peer | undefined;
}>({
  socket,
  allMessages: [],
  setAllMessages: () => {},
  peer: undefined,
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allMessages, setAllMessages] = useState<
    {
      senderId: string;
      text: string;
    }[]
  >([]);

  const [peer, setPeer] = useState<Peer>();

  useEffect(() => {
    const fn = async () => {
      const Peer = (await import("peerjs")).default;
      const meId = uuidv4();
      const peer = new Peer(meId);
      setPeer(peer);
    };
    fn();
  }, []);
  return (
    <SocketContext.Provider
      value={{ socket, allMessages, setAllMessages, peer }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default ContextProvider;
