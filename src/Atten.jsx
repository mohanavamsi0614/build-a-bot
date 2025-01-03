import { useState } from "react";
import { io } from "socket.io-client";
import api from "./api";

const socket = io(api);

function Attd({ team }) {
  const [attendance, setAttendance] = useState(() => {
    return {
        name:team.teamName,
      lead: { ...team.lead, FourthAttd: "" },
      members: team.members.map(member => ({ ...member, FourthAttd: "" }))
    };
  });
  const [submited,setsubmit]=useState(false)

  const handleAttendance = (type, role, name) => {
    setAttendance(prev => {
      if (role === "lead") {
        return { ...prev, lead: { ...prev.lead, FourthAttd: type } };
      } else {
        return {
          ...prev,
          members: prev.members.map(member =>
            member.name === name ? { ...member, FourthAttd: type } : member
          )
        };
      }
    });
  };

  const sub = (e) => {
    const allDone = attendance.members.every(i => i.FourthAttd === "P" || i.FourthAttd === "A");
    if (attendance.lead.FourthAttd && allDone) {
      e.currentTarget.disabled = true;
      e.currentTarget.style.backgroundColor="grey";
      setsubmit(true)
      socket.emit("admin", attendance)
    } else {
      alert("Please mark attendance for all members and the lead.");
    }
  };
  

  return (
    <div className="bg-white text-black p-5 rounded-md shadow-md">
      <div className="mb-4">
        <p className="font-semibold">{attendance.lead.name}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleAttendance("P", "lead")}
            className={`px-4 py-2 rounded-md ${
              attendance.lead.FourthAttd === "P"  ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Present
          </button>
          <button
            onClick={() => handleAttendance("A", "lead")}
            className={`px-4 py-2 rounded-md ${
              attendance.lead.FourthAttd === "A"  ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Absent
          </button>
        </div>
      </div>

      {attendance.members.map(member => (
        <div key={member.name} className="mb-4">
          <p className="font-semibold">{member.name}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleAttendance("P", "member", member.name)}
              className={`px-4 py-2 rounded-md ${
                member.FourthAttd === "P" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Present
            </button>
            <button
              onClick={() => handleAttendance("A", "member", member.name)}
              className={`px-4 py-2 rounded-md ${
                member.FourthAttd === "A" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              Absent
            </button>
          </div>
        </div>
      ))}

      <button
      disabled={team.lead?.FourthAttd}
        onClick={(e)=>{
        
            sub(e)}}
        className={`w-full mt-4 py-3 ${team.lead?.FourthAttd ? " bg-gray-700" : "bg-[#E16256]"}  text-white font-bold rounded-md  transition-colors`}
      >
        {submited || team.lead?.FourthAttd ? "Submited" : "Submit"}
      </button>
    </div>
  );
}

export default Attd;