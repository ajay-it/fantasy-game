import React from "react";
import { toast } from "react-toastify";

export default function PlayerCard({
  player,
  teamPlayers,
  setTeamPlayers,
}: any) {
  const handlePlayerSelection = (id: any) => {
    if (!teamPlayers[id] && Object.keys(teamPlayers).length >= 11) {
      toast.warn("Team size full!");
      return;
    }

    setTeamPlayers((prevPlayers: { [key: number]: string }) => {
      const updatedPlayers = { ...prevPlayers };

      if (updatedPlayers[id]) {
        delete updatedPlayers[id];
      } else {
        updatedPlayers[id] = player.name;
      }

      return updatedPlayers;
    });
  };

  return (
    <div
      onClick={() => handlePlayerSelection(player?.id)}
      className={`shadow-lg rounded-lg text-gray-700 text-base cursor-pointer ${
        teamPlayers && teamPlayers[player?.id] ? "bg-blue-100" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center gap-1 my-3">
        <div className="font-bold text-xl mb-2">{player?.name}</div>
        <p>
          Team: <span className="font-semibold">{player?.team}</span>
        </p>
        <p>
          Sport: <span className="font-semibold">{player?.sport}</span>
        </p>
        <p>
          Role: <span className="font-semibold">{player?.role}</span>
        </p>
        <p>
          Points: <span className="font-semibold">{player?.points}</span>
        </p>
      </div>
    </div>
  );
}
