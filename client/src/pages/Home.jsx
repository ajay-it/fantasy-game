import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const BASE_URL = "http://localhost:8000/api";
  const [players, setPlayers] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [teamName, setTeamName] = useState("");
  const limit = 21;
  const navigate = useNavigate();

  const createTeam = async () => {
    const playerIds = Object.keys(teamPlayers);
    if (playerIds.length < 11) {
      toast.warn("More players require to form a team!");
      return;
    }

    if (teamName.trim().length === 0) {
      toast.warn("Team name is required.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/team/create`, {
        teamName,
        playerIds,
      });
      toast.success(response.data.message);
      setTeamPlayers({});
    } catch (error) {
      console.error(error);
      toast.error("Error creating team.");
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/player?limit=${limit}&page=${currentPage}`
        );
        setPlayers(response.data.players);
        setTotalPages(response.data.totalPages);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  console.log("team ", teamPlayers);

  return (
    <>
      <div className="p-4 flex flex-col item">
        <div className="w-3/4">
          <div className="text-3xl flex justify-between items-center w-full bg-white rounded-lg shadow-lg p-4 mb-4 font-semibold">
            <h1>Fantasy Game App</h1>
            <button
              type="button"
              onClick={() => navigate("/team")}
              className="text-white bg-blue-700 px-4 text-base font-normal py-2 rounded-lg"
            >
              Search Team
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {players?.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                teamPlayers={teamPlayers}
                setTeamPlayers={setTeamPlayers}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-5 w-full">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded-md border border-gray-500"
            >
              Prev
            </button>
            <div className="mx-2">{`${currentPage} / ${totalPages}`}</div>
            <button
              onClick={handleNextPage}
              disabled={currentPage == totalPages}
              className="px-3 py-1 bg-gray-300 rounded-md border border-gray-500"
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-[23%] px-2 m text-center bg-white rounded-lg shadow-lg h-full fixed flex flex-col items-center justify-between right-4 top-4 mb-2 py-2 gap-y-2">
          <div className=" flex flex-col overflow-y-auto p-2">
            <h1 className="font-semibold text-lg mb-5">Selected Players</h1>
            {Object.values(teamPlayers).length > 0 ? (
              Object.values(teamPlayers).map((name, index) => (
                <span key={index}>{name}</span>
              ))
            ) : (
              <span className="text-gray-500">
                Selected players will shown here!
              </span>
            )}
          </div>
          <div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full px-3 py-2 border mb-3 border-gray-300 rounded-md"
            />
            <button
              onClick={createTeam}
              type="button"
              className="w-full text-white bg-blue-700 px-4 py-2 mb-5 rounded-lg"
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
