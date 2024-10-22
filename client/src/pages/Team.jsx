import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PlayerCard from "../components/PlayerCard";

export default function Team() {
  const [teamId, setTeamId] = useState("");
  const [team, setTeam] = useState({});

  const searchTeam = async () => {
    if (teamId.trim().length === 0) {
      toast.warning("Enter a valid team Id");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/team/get/${teamId}`
      );
      setTeam(res.data);
    } catch (error) {
      if (error.status == 404) {
        toast.info("No team found! Enter a valid team Id");
        return;
      }
      console.log(error);
      toast.error("Error fetching team");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchTeam();
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-5 my-8">
        <input
          type="text"
          value={teamId}
          onKeyDown={handleKeyPress}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Enter team Id"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={searchTeam}
          type="button"
          className="text-white bg-blue-700 px-4 py-2 rounded-lg"
        >
          Search Team
        </button>
      </div>
      <div className="flex flex-col items-center my-8 w-full">
        {team.players && (
          <>
            <h1 className="font-semibold text-3xl">Team Name : {team.name}</h1>
            <h1 className="font-semibold text-lg mt-2">
              Team Points : {team.totalPoints}
            </h1>
          </>
        )}
        <div className="grid grid-cols-3 gap-3 w-4/5 mt-6">
          {team.players?.map((player) => (
            <PlayerCard key={player?.id} player={player} />
          ))}
        </div>
      </div>
    </>
  );
}
