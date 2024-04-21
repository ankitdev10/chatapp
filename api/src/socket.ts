import { SocketUser } from "./types/types";
import { Socket } from "socket.io";
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users: SocketUser[] = [];
let messages: { senderId: string; text: string }[] = [];
const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string): SocketUser | undefined => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket: Socket) => {
  //when connect
  console.log("user connected");
  console.log(socket.id);

  // take userId and socket Id from user
  socket.on("addUser", (userId: string) => {
    console.log("Adding user", userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // SEND AND GET MESSAGE
  socket.on("sendMessage", ({ senderId, receiverId, text }: any) => {
    const user = getUser(receiverId);
    messages.push({ senderId, text });
    console.log(user, "sending message");
    io.to(user?.socketId).emit("getMessage", messages);
    const sender = getUser(senderId);
    console.log("first one emitted");
    io.to(sender?.socketId).emit("getMessage", messages);
  });

  socket.on("audioCall", (data) => {
    console.log(data);
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    // TODO: Remove this
    messages = [];
    io.emit("getUsers", users);
  });
});
