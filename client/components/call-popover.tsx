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
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
export const CallPover = ({ type }: { type: "calling" | "receiving" }) => {
  const [open, setOpen] = useState(true);
  const { socket, peer } = useContext(SocketContext);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const handleAcceptCall = () => {
    socket.emit("acceptAudiocall", {
      peeId: peer?.id,
      roomId,
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
              <PhoneForwarded className="animate-pulse" color="green" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
