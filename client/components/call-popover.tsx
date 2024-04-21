"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SocketContext } from "@/lib/context/context";
import { PhoneForwarded } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useContext, useRef, useState } from "react";
export const CallPover = ({ type }: { type: "calling" | "receiving" }) => {
  const [open, setOpen] = useState(true);
  const { socket, peer } = useContext(SocketContext);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const videoRef = useRef<any>();
  const handleAcceptCall = async () => {
    socket.emit("acceptAudiocall", {
      peeId: peer?.id,
      roomId,
    });

    let getUserMedia = navigator?.mediaDevices?.getUserMedia;
    getUserMedia({ video: true, audio: true }).then((stream) => {
      console.log({ stream });
      videoRef.current.srcObject = stream;
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
          <DialogDescription>Hi</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 place-items-center">
          {type === "calling" ? (
            <div>Waiting for them to accept the call</div>
          ) : (
            <div>
              <PhoneForwarded
                onClick={handleAcceptCall}
                className="animate-pulse"
                color="green"
              />
            </div>
          )}
        </div>
        <video ref={videoRef} autoPlay />
      </DialogContent>
    </Dialog>
  );
};
