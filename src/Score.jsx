import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";
import { io } from "socket.io-client";
const socket = io(api);

function Score() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zone, setZone] = useState("A");

  const zones = {
    A: [0, 12],
    B: [13, 21],
    C: [22, 37],
    D: [38, 51],
    E: [52, 61],
    F: [62, 70],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/event/students`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getZoneData = () => {
    const [start, end] = zones[zone];
    return data.slice(start, end);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-white text-3xl font-bold text-center mb-4">
        Scoring Panel
      </h1>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {Object.keys(zones).map((zoneKey) => (
          <button
            key={zoneKey}
            onClick={() => setZone(zoneKey)}
            className={`${
              zone === zoneKey ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            } text-white font-semibold py-2 px-4 rounded transition`}
          >
            Zone {zoneKey}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getZoneData().map((team, index) => (
          <details
            key={team._id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
          >
            <summary className="cursor-pointer text-xl font-bold mb-2">
              {zones[zone][0] + index + 1}. {team.teamName}
            </summary>
            <div className="mt-2">
              {team.Score === 0 || !team?.Score ? (
                <ScoreCard key={team._id} team={team} />
              ) : (
                <div>
                  <div>
                    {Object.keys(team.FirstReview).map((i) => (
                      <p key={i}>
                        {i} : {team.FirstReview[i]}
                      </p>
                    ))}
                    <p>Total Score: {team.Score}</p>
                  </div>
                  <p>Done!</p>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default Score;

function ScoreCard({ team }) {
  const [scores, setScores] = useState({
    "Understanding the PS": 0,
    "Approach and Planning": 0,
    "Out-of-the-Box Thinking": 0,
    "Team Collaboration": 0,
  });
  const [total, setTotal] = useState(0);
  const [submited, setIsSubmited] = useState(false);

  useEffect(() => {
    const calculatedTotal =
      scores["Understanding the PS"] +
      scores["Approach and Planning"] +
      scores["Out-of-the-Box Thinking"] +
      scores["Team Collaboration"];
    setTotal(calculatedTotal);
  }, [scores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const send = () => {
    const formData = {
      teamName: team.teamName,
      FirstReview: scores,
      Score: total,
    };
    console.log(formData);
    socket.emit("leaderboard", formData);
  };

  socket.on("leaderboard", (le) => {
    setIsSubmited(true);
  });

  if (submited) {
    return (
      <div>
        <div>
          {Object.keys(scores).map((i) => (
            <p key={i}>
              {i} : {scores[i]}
            </p>
          ))}
          <p>Total Score: {team.Score}</p>
        </div>
        <p>Done!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{team.teamName}</h2>

      {Object.keys(scores).map((criteria) => (
        <div key={criteria} className="mb-4">
          <label
            htmlFor={criteria}
            className="block text-sm font-medium text-gray-700"
          >
            {criteria}
          </label>
          <div className="flex items-center gap-2">
            <input
              id={criteria}
              name={criteria}
              placeholder={`Score for ${criteria}`}
              value={scores[criteria]}
              onChange={handleChange}
              className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-500">
              /{" "}
              {criteria === "Understanding the PS" ||
              criteria === "Approach and Planning"
                ? "30"
                : "20"}
            </span>
          </div>
        </div>
      ))}
      <h1 className="text-black font-semibold">Total: {total}</h1>
      <button
        onClick={send}
        disabled={submited}
        className={`${
          submited ? " bg-gray-600" : "bg-blue-500"
        } text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {submited ? "Submitted" : "Submit"}
      </button>
    </div>
  );
}
