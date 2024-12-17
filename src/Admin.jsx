import axios from "axios";
import { useEffect, useState } from "react";
import api from "./api";
import PaymentCard from "./PaymentCard";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(new Set()); 

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

  async function send(id) {
    try {
      const response = await axios.get(`${api}/event/team/${id}`);
      console.log(response.data);

      setVerified((prev) => new Set(prev).add(id));
      alert("Verified successfully!");
    } catch (err) {
      console.error("Error verifying:", err);
      alert("Failed to verify the team.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-700">
        <div className="loader text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-700">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-700 p-5">
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        Admin Dashboard
      </h1>
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((team, index) => (
            <details
              key={index}
              className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
            >
              <summary className="cursor-pointer text-lg font-semibold">
                {team.teamName}
              </summary>
              <PaymentCard team={team}/>
              {/* <div className="mt-4 space-y-2">
                {team.imgUrl && (
                  <img
                    src={team.imgUrl}
                    alt={`${team.teamName} Logo`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <p className="text-gray-400">UPI ID: {team.upiId || "N/A"}</p>
                <p className="text-gray-400">
                  Transaction ID: {team.transtationId || "N/A"}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => send(team._id)}
                    disabled={team.verified}
                    className={`px-4 py-2 rounded ${
                      verified.has(team._id)
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {team.verified ? "Verified" : "Verify"}
                  </button>
                  {team.verified && (
                    <span className="text-green-400 font-bold">✔ Verified</span>
                  )}
                </div>
              </div> */}
            </details>
          ))
        ) : (
          <p className="text-center text-gray-400">No teams available.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
