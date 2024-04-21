/* eslint-disable react-hooks/exhaustive-deps */
import { SocketContext } from "@/lib/context/context";
import { PhoneCallIcon, VideoIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CallPover } from "./call-popover";
export const InboxHeader = () => {
  const { socket, peer } = useContext(SocketContext);
  const searchParams = useSearchParams();
  const pathaname = usePathname();
  const router = useRouter();
  const userId = searchParams.get("id"); // sender id
  const [caller, setCaller] = useState<any>(null);
  const [reciever, setReciver] = useState<any>(null);

  const handleAudioCall = () => {
    socket.emit("audiocall", {
      senderId: userId,
      receiverId: userId === "1" ? "2" : "1",
      peerId: peer?.id,
    });
    setCaller({
      senderId: userId,
    });
    router.push(`call?id=${userId}`);
  };

  useEffect(() => {
    socket.on("gettingCall", (data) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("roomId", data.roomId);
      setReciver({
        recieverId: data.senderId,
      });
      router.push(`${pathaname}?${params.toString()}`);
    });
  }, []);

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

      {caller && <CallPover type={"calling"} />}

      {reciever && <CallPover type={"receiving"} />}
    </div>
  );
};
