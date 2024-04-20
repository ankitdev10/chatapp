import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Chat = () => {
  return (
    <div className="flex gap-4 items-center justify-between cursor-pointer">
      <div className="flex gap-4 items-center">
        <div>
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <h1 className="text-lg font-semibold">Ankit</h1>
          <p className="text-sm text-accent-foreground ">Hey mate!!!</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-accent-foreground ">2h ago</p>
        <p className="bg-theme w-fit aspect-square text-white font-semibold text-sm rounded-full grid place-items-center">
          1
        </p>
      </div>
    </div>
  );
};
