import axios from "axios";
import { useEffect, useState } from "react";
import api from "./api";

function High() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let data = await axios.get(`${api}/event/students`);
                data = data.data;
                setTeams(data.sort((a, b) => {
                    return (b.Score + b.SecoundReviewScore+b?.ThirdReviewScore) - (a.Score + a.SecoundReviewScore+a?.ThirdReviewScore);
                }));
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };
        fetchTeams();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h1>
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-3 rounded ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                            }`}
                        >
                            <span className="font-semibold text-gray-700">{index + 1}</span>
                            <span className="text-gray-600">{team.teamName}</span>
                            <span className=" text-black">{team.Score + team.SecoundReviewScore+team?.ThirdReviewScore}</span>
                            {/* <span>{team.FinalScore}</span> */}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No teams found.</p>
                )}
            </div>
        </div>
    );
}

export default High;
