import { useState, useEffect } from "react";
import api from "./api";

function AllTeamsAttendance() {
  const [teamsAttendance, setTeamsAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all attendance data from the server
    const fetchAllAttendance = async () => {
      try {
        const response = await fetch(`${api}/event/students`);
        if (response.ok) {
          const data = await response.json();
          setTeamsAttendance(data);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        console.error("Error fetching all attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAttendance();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-5 ">
      <h1 className="text-2xl font-bold mb-4 text-white">All Teams Attendance</h1>
      {teamsAttendance.length === 0 ? (
        <p>No attendance data available.</p>
      ) : (
        <div className="overflow-auto">
          {teamsAttendance.map((team) => (
            <div key={team._id} className="bg-white p-5 rounded-md shadow-md mb-4">
              <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
              <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">First Attendance</th>
                    <th className="border border-gray-300 px-4 py-2">Second Attendance</th>
                    <th className="border border-gray-300 px-4 py-2">Third Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">{team.lead.name}</td>
                    <td className="border border-gray-300 px-4 py-2">Team Lead</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {team.lead.FirstAttd || "Not Marked"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {team.lead.SecondAttd || "Not Marked"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {team.lead.ThirdAttd || "Not Marked"}
                    </td>
                  </tr>
                  {team.members.map((member) => (
                    <tr key={member.name}>
                      <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                      <td className="border border-gray-300 px-4 py-2">Member</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.FirstAttd || "Not Marked"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.SecondAttd || "Not Marked"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.ThirdAttd || "Not Marked"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllTeamsAttendance;
