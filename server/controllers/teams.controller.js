import Team from "../models/team.model.js";
import Player from "../models/player.model.js";

export const createTeam = async (req, res) => {
  try {
    const { name, players } = req.body;
    const playerDocs = await Player.find({ _id: { $in: players } });

    if (playerDocs.length !== players.length) {
      return res
        .status(400)
        .json({ message: "One or more players are invalid." });
    }

    const totalPoints = playerDocs.reduce(
      (sum, player) => sum + player.points,
      0
    );
    const newTeam = new Team({ name, players, totalPoints });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create team", error });
  }
};

export const getTeam = async (req, res) => {};
