import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "./api";
import axios from "axios";
const socket=io(api)

function ScoreCard({ team }) {
    const [scores, setScores] = useState({
      "Understanding the PS": 0,
      "Approach and Planning": 0,
      "Out-of-the-Box Thinking": 0,
      "Team Collaboration": 0,
    });
    const [total, setTotal] = useState(0);
    const [submited, setIsSubmited] = useState(false);
    const [loading,setloading]=useState(false)
  
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
      setloading(true)
      axios.get(`${api}/event/team/score/${team._id}`,formData).then((res)=>{
        console.log(res.data)
        setIsSubmited(true)
      }).catch((e)=>{console.log(e)})
      console.log(formData);
    };
    if (submited) {
      return (
        <div>
          <div>
            {Object.keys(scores).map((i) => (
              <p key={i}>
                {i} : {scores[i]}
              </p>
            ))}
            <p>Total Score: {team.Score || total}</p>
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
        <button className=" border rounded p-3 bg-gray-600 text-white" onClick={()=>{setScores({
      "Understanding the PS": 0,
      "Approach and Planning": 0,
      "Out-of-the-Box Thinking": 0,
      "Team Collaboration": 0,
    })}}>Clear</button>
        <button
          onClick={send}
          disabled={submited}
          className={`${
            loading ? " bg-gray-600" : "bg-blue-500"
          } text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
    );
  }
export default ScoreCard;