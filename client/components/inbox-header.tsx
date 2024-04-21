import { PhoneCallIcon, VideoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useContext } from "react";
import { SocketContext } from "@/lib/context/context";

export const InboxHeader = () => {
  const { socket } = useContext(SocketContext);

  const handleAudioCall = () => {
    socket.emit("audiocall", {
      senderId: "1",
      receiverId: "2",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">Ankit</h1>
          <h5 className="text-xs text-muted-foreground font-medium"> Online</h5>
        </div>
      </div>
      <div className="flex gap-6">
        <PhoneCallIcon
          onClick={() => handleAudioCall()}
          className="cursor-pointer"
          color="green"
        />
        <VideoIcon className="cursor-pointer" color="brown" />
      </div>
    </div>
  );
};
