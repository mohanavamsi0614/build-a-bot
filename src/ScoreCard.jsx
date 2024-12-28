import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "./api";
import axios from "axios";

const socket = io(api);

function ScoreCard({ team }) {
  const [scores, setScores] = useState({
    "Progress and Milestones": 0,
    " Code Quality and Readability": 0,
    " Originality and No Plagiarism": 0,
    " Feedback Integration": 0,
" TeamDynamicsandProblem-Solving":0
  });
  const [total, setTotal] = useState(0);
  const [submitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const maxScores = {
    "Progress and Milestones": 30,
    " Code Quality and Readability": 25,
    " Originality and No Plagiarism": 20,
    " Feedback Integration":15,
" TeamDynamicsandProblem-Solving":10
  };

  useEffect(() => {
    const calculatedTotal = Object.values(scores).reduce((sum, value) => sum + value, 0);
    setTotal(calculatedTotal);
  }, [scores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Math.min(Math.max(Number(value), 0), maxScores[name] || 0);
    if (!isNaN(numericValue)) {
      setScores((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  const send = () => {
    const formData = {
      SecoundReview: scores,
      SecoundReviewScore: total,
    };
    setLoading(true);
    axios
      .post(`${api}/event/team/score/${team._id}`, {team:{...formData}})
      .then((res) => {
        console.log(res.data);
        setIsSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  if (submitted) {
    return (
      <div>
        <div>
          {Object.keys(scores).map((i) => (
            <p key={i}>
              {i} : {scores[i]}
            </p>
          ))}
          <p>Total Score: {team.SecoundReviewScore || total}</p>
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
              type="number"
              id={criteria}
              name={criteria}
              value={scores[criteria]}
              onChange={handleChange}
              className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Score for ${criteria}`}
              min="0"
              max={maxScores[criteria]}
            />
            <span className="text-sm text-gray-500">
              / {maxScores[criteria]}
            </span>
          </div>
        </div>
      ))}
      <h1 className="text-black font-semibold">Total: {total}</h1>
      <button
        className="border rounded p-3 bg-gray-600 text-white"
        onClick={() =>
          setScores({
            "Progress and Milestones": 0,
    " Code Quality and Readability": 0,
    " Originality and No Plagiarism": 0,
    " Feedback Integration": 0,
" TeamDynamicsandProblem-Solving":0
          })
        }
      >
        Clear
      </button>
      <button
        onClick={send}
        disabled={loading}
        className={`${
          loading ? "bg-gray-600" : "bg-blue-500"
        } text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {loading ? "Loading" : "Submit"}
      </button>
    </div>
  );
}

export default ScoreCard;
