import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import playerRoutes from "./routes/player.route.js";
import teamRoutes from "./routes/team.route.js";
import connectDB from "./db.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
