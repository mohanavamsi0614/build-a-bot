import axios from "axios";
import { useEffect, useState } from "react";
import api from "./api";

function AllScore() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${api}/event/students`);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Team Scores
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {teams.map((team, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 w-60 text-center"
          >
 <h2 className="text-xl font-semibold text-gray-700">
              {index+1}
            </h2>          
            <h2 className="text-xl font-semibold text-gray-700">
              {team.teamName}
            </h2>
            <p className="text-gray-600 text-lg">Score: {team.Score}</p>
            <p className="text-gray-600 text-lg">SecoundReviewScore: {team.SecoundReviewScore}</p>
            <p className="text-gray-600 text-lg">ThirdReviewScore: {team?.ThirdReviewScore}</p>
            <p className="text-black text-lg font-bold">Final Score: {team?.FinalScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllScore;
