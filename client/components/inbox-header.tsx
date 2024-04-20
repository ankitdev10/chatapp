import { PhoneCallIcon, VideoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const InboxHeader = () => {
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
        <PhoneCallIcon className="cursor-pointer" color="green" />
        <VideoIcon className="cursor-pointer" color="brown" />
      </div>
    </div>
  );
};
