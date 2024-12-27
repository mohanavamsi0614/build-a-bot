import axios from "axios";
import api from "./api";
import { useState } from "react";

function PaymentCard({ team }) {
  const [photo, setPhoto] = useState(false);
  const [full, setFull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(team.verified);
  const [projectId, setProjectId] = useState("");
  const [finalprojectId,setfinalprojectId]=useState("")

  async function handleVerify(id) {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/event/team/${id}`,);
      console.log(response.data);
      setVerified(true);
    } catch (err) {
      console.error("Error verifying:", err);
      alert("Failed to verify the team.");
    } finally {
      setLoading(false);
    }
  }

  async function handleProjectIdSubmit(id) {
    if (!projectId) {
      alert("Please enter a Project ID before submitting.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${api}/event/pro/${id}`, { projectId });
      console.log("Project ID submitted:", response.data);
      setfinalprojectId(projectId)
    } catch (err) {
      console.error("Error submitting Project ID:", err);
      alert("Failed to submit Project ID.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg flex justify-between items-start space-x-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {team.teamName || "Team Name"}
        </h2>
        
        {full && (
          <div className="mb-4">
            <h3 className=" font-bold text-black">Team Lead:</h3>
            <p className=" text-gray-700">{team.lead.name}</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Team Members:
            </h3>
            {team.members?.map((member) => (
              <p key={member.name} className="text-gray-600">
                {member.name}
              </p>
            ))}
          </div>
        )}

        {/* <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => handleVerify(team._id)}
            className={`px-4 py-2 rounded font-semibold text-white flex items-center space-x-2 ${
              "bg-[#E16254] hover:bg-[#E16256] transition duration-300"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              <span>{verified ? "Verified" : "Verify"}</span>
            )}
          </button>

          {verified && (
            <span className="text-green-500 font-bold"> ✅ Verified</span>
          )}
        </div> */}

        {!team?.ProblemID && !finalprojectId ? 
          <div className="mt-4">
        <input
            type="text"
            placeholder="Enter Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="border text-black text-balc rounded px-3 py-2 w-full mb-4"
          />
          <button
            onClick={() => handleProjectIdSubmit(team._id)}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
          >
            Submit Project ID
          </button>
        </div> : <p className=" text-black text-3xl">Project ID:{team.ProblemID || finalprojectId}</p>
          }
          
        <button
          onClick={() => setFull(!full)}
          className="mt-4 text-blue-500 hover:underline transition duration-200"
        >
          {full ? "Hide Members" : "Show Members"}
        </button>
      </div>

      <div className="w-1/3">
        {team.imgUrl && (
          <img
            src={team.imgUrl}
            onClick={() => setPhoto(true)}
            alt={`${team.teamName} Logo`}
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
          />
        )}
      </div>

      {photo && (
        <div className="fixed inset-0 overflow-visible flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-gray-700 rounded-lg p-4 relative shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-white text-center w-full">
                {team.teamName}
              </p>
              <button
                className="absolute top-2 right-4 text-white text-xl hover:text-red-500"
                onClick={() => setPhoto(false)}
              >
                X
              </button>
            </div>

            <div className="flex justify-center items-center">
              <img
                src={team.imgUrl}
                alt="Team"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
