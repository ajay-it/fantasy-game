import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  team: { type: String, required: true },
  sport: { type: String, required: true },
  points: { type: Number, required: true },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
