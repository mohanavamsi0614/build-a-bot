import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";
import { io } from "socket.io-client";
import ScoreCard from "./ScoreCard";
const socket = io(api);

function Score() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zone, setZone] = useState("A");
  const [auth,setAuth]=useState(sessionStorage.getItem("ScoreAuth"))
  const [pass,setpass]=useState("")

  const zones = {
    A: [0, 12],
    B: [12, 21],
    C: [21, 37],
    D: [37, 51],
    E: [51, 61],
    F: [61, 70],
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

  if(! auth){
    return (
      <div className=" bg-gray-700 w-full flex-col h-screen flex justify-center items-center">
       <p className="text-3xl font-bold text-center text-balck">
                    <span className="text-[#E16254]">Coding Blocks Kare</span> Presents
                </p>
                <h1 className="text-5xl mt-2 text-white">Build a Bot</h1>
                <p className="text-xl m-2 text-white">A 24-Hours Hackathon</p>
        <div className=" bg-white rounded-md p-4 flex flex-col justify-center items-center"> 
       
        <h1 className=" font-semibold text-xl">Enter the password</h1>
          <input placeholder=" Enter the Password"  className=" border p-2 border-black h-8 rounded-lg" onChange={(e)=>{setpass(e.target.value)}}/>
          <button className=" w-20 p-2 mt-2  text-white rounded bg-[#E16254]" onClick={()=>{
            if(pass=="cbkare2024"){
              sessionStorage.setItem("ScoreAuth",true)
              setAuth(true)
            }
          }}>Submit</button>
        </div>
      </div>
    )
  }

  const getZoneData = () => {
    const [start, end] = zones[zone];
    console.log(start,end,zone)
    return data.slice(start, end);
  };

  if (loading) return <div className="text-center py-4 h-screen w-full text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="p-6 w-full h-full">
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

      <div className=" flex flex-col gap-5">
        {getZoneData().map((team, index) => (
          <details
            key={team._id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
          >
            <summary className="cursor-pointer text-xl font-bold mb-2">
              {zones[zone][0] + index + 1}. {team.teamName}
            </summary>
            <div className="mt-2">
              {!team?.SecoundReview ? (
                <ScoreCard key={team._id} team={team} />
              ) : (
                <div>
                  <div>
                    {Object.keys(team.SecoundReview).map((i) => (
                      <p key={i}>
                        {i} : {team.SecoundReview[i]}
                      </p>
                    ))}
                    <p>Total Score: {team.SecoundReviewScore}</p>
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

