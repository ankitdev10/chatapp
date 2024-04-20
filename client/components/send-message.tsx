import { useContext, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SocketContext } from "@/lib/context/context";
import { useRouter, useSearchParams } from "next/navigation";

export const SendMessage = () => {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { socket } = useContext(SocketContext);

  return (
    <div className="flex items-center">
      <Input
        placeholder="Hey mate!!!"
        ref={inputRef}
        className="w-full  rounded-md border-none ring-0 focus:ring-0 focus-visible:ring-0"
      />
      <Button
        className="bg-theme hover:bg-theme/90"
        onClick={() => {
          if (inputRef.current?.value === "") return;
          socket.emit("sendMessage", {
            senderId: searchParams.get("id"),
            receiverId: searchParams.get("id") === "1" ? "2" : "1",
            text: inputRef.current?.value,
          });
          inputRef!.current!.value = "";
        }}
      >
        Send
      </Button>
    </div>
  );
};
