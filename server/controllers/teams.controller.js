import Team from "../models/team.model.js";
import Player from "../models/player.model.js";

export const createTeam = async (req, res) => {
  try {
    const { teamName, playerIds } = req.body;
    console.log(teamName, playerIds);
    if (
      !teamName ||
      !playerIds.length ||
      !Array.isArray(playerIds) ||
      playerIds.length === 0
    ) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const playerDocs = await Player.find({ id: { $in: playerIds } });
    if (playerDocs.length !== playerIds.length) {
      return res
        .status(400)
        .json({ message: "One or more players are invalid." });
    }

    const playerObjectIds = playerDocs.map((player) => player._id);

    const totalPoints = playerDocs.reduce(
      (sum, player) => sum + player.points,
      0
    );

    const newTeam = new Team({
      name: teamName,
      players: playerObjectIds,
      totalPoints,
    });
    await newTeam.save();

    res
      .status(201)
      .json({ message: "Team created successfully!", team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create team", error });
  }
};

export const getTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
