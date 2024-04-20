import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
dotenv.config();
