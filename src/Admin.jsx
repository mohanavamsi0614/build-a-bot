import axios from "axios";
import { useEffect, useState } from "react";
import api from "./api";
import PaymentCard from "./PaymentCard";
import Attd from "./Atten";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("attd");
  const [currentZone, setCurrentZone] = useState("A");

  const zones = ["A", "B", "C", "D", "E", "F"];
  const itemsPerZone = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/event/students`);
        setData(response.data);
        setCount(response.data.length);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="loader text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  const startIndex = zones.indexOf(currentZone) * itemsPerZone;
  const endIndex = startIndex + itemsPerZone;
  const currentZoneData = data.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">Admin Dashboard</h1>

      {/* Mode Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("attd")}
          className={`${
            mode === "attd" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          } text-white font-semibold py-2 px-6 rounded-full transition`}
        >
          Attendance
        </button>
        <button
          onClick={() => setMode("pro")}
          className={`${
            mode === "pro" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          } text-white font-semibold py-2 px-6 rounded-full transition`}
        >
          Project ID
        </button>
      </div>

      {/* Zone Navigation Buttons */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setCurrentZone(zone)}
            className={`${
              currentZone === zone
                ? "bg-green-600"
                : "bg-gray-700 hover:bg-gray-600"
            } text-white font-semibold py-2 px-4 rounded-lg transition`}
          >
            Zone {zone}
          </button>
        ))}
      </div>

      {/* Zone Content */}
      <div className="space-y-6">
        {currentZoneData && currentZoneData.length > 0 ? (
          <div className="space-y-5">
            <hr />
            <h1 className="text-3xl text-center">Zone {currentZone}</h1>
            <hr />
            {currentZoneData.map((team, index) => (
              <details
                key={team._id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
              >
                <summary className="cursor-pointer text-xl font-bold mb-2">
                  {startIndex + index + 1}. {team.teamName}
                </summary>
                <div className="mt-2">
                  {mode === "attd" ? (
                    <Attd team={team} />
                  ) : (
                    <PaymentCard team={team} />
                  )}
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No teams available.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-10">
        <p>Total Teams: {count}</p>
      </footer>
    </div>
  );
}

export default Admin;
