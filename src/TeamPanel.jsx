import { useEffect, useState } from "react";
import logo from "/public/cb.png";
import axios from "axios";
import api from "./api";
import { io } from "socket.io-client";
import problems from "./assets/problem"
import kalasalingam from "/public/kalasalingam.png"
import cb from "/KARE(latest).png"
import lod from "/image_processing20210907-13511-1juj33d.gif"
const socket = io(api);

function TeamPanel() {
    const [pass, setPass] = useState(localStorage.getItem("token") || "");
    const [team, setTeam] = useState(null);
    const eventSchedule = 
        [
            {
              "name": "Inauguration Ceremony",
              "date": "26",
              "time": "2:30 PM",
              "isDone": false
            },
            {
              "name": "Problem Statement Selection",
              "date": "28",
              "time": "11:40 AM",
              "isDone": false
            },
            {
              "name": "Lunch Break",
              "date": "28",
              "time": "1:00 PM - 2:00 PM",
              "isDone": false
            },
            {
              "name": "Review 1",
              "date": "28",
              "time": "3:00 PM",
              "isDone": false
            },
            {
              "name": "Refreshments",
              "date": "28",
              "time": "4:30 PM - 4:45 PM",
              "isDone": false
            },
            {
              "name": "Dinner",
              "date": "28",
              "time": "7:00 PM - 8:00 PM",
              "isDone": false
            },
            {
              "name": "Cultural Program",
              "date": "28",
              "time": "20:00 PM",
              "isDone": false
            },
            {
              "name": "Review 2",
              "date": "28",
              "time": "10:00 ",
              "isDone": false
            },
            {
              "name": "Midnight Refreshments",
              "date": "28",
              "time": "11:00 PM",
              "isDone": false
            },
            {
              "name": "Late-Night Refreshments",
              "date": "29",
              "time": "3:30 AM - 4:00 AM",
              "isDone": false
            },
            {
              "name": "Get Ready and Have Breakfast",
              "date": "29",
              "time": "7:00 AM - 8:00 AM",
              "isDone": false
            },
            {
              "name": "Final Review",
              "date": "29",
              "time": "8:00 AM",
              "isDone": false
            },
            {
              "name": "Prize Distribution Ceremony",
              "date": "29",
              "time": "10:00 AM",
              "isDone": false
            }
          ]
    const [events, setEvents] = useState(eventSchedule);

    const [link, setLink] = useState(localStorage.getItem("link") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [ProblemID,setProblemID]=useState()
    const [feedback,setfeedback]=useState("")
          
    function sendfeedback(){
        axios.post(`${api}/event/feedback/${team._id}`,{feedback}).then((res)=>{
            console.log('done')
            alert("done thanks for attending 😄")
            sendfeedback("")
        })
    }
function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      
      const updatedEvents = events.map((event) => {
        const eventDate = new Date(`${event.date} ${event.time}`); 

        if (currentDate.getDate() === parseInt(event.date) && currentTime >= eventDate.getTime() && !event.isDone) {
          return { ...event, isDone: true };
        }
        return event;
      });

      setEvents(updatedEvents); 
      setTime(currentDate.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, [events]); 


  return (
    <div style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
      Current Time: {time}
    </div>
  );
}


    const verify = () => {
        setLoading(true);
        setError("");
        axios.post(`${api}/event/team/${pass}`)
            .then((res) => {
                const data = res.data;
                localStorage.setItem("token", pass);
                setTeam(data);
                setProblemID(data.ProblemID)
                console.log(ProblemID)
                setLeaderboard(data.sort((a, b) => b.score - a.score));
            })
            .catch(() => {
                setError("Invalid password. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
            axios.get(`${api}/event/students`).then((res) => {
                const data = res.data;
                setLeaderboard(data.sort((a, b) => b.HuntScore - a.HuntScore).slice(0, 10));
            });
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoading(true);
            axios.get(`${api}/event/students`).then((res) => {
                const data = res.data;
                setLeaderboard(data.sort((a, b) => b.HuntScore - a.HuntScore).slice(0, 10));
            });
            axios.post(`${api}/event/team/${pass}`)
                .then((res) => {
                    const data = res.data;
                    setTeam(data);
                    setProblemID(data.ProblemID)
                })
                .catch(() => {
                    setError("Failed to fetch team data.");
                })
                .finally(() => {
                    setLoading(false);
                });
            socket.on("team", (team) => {
                setTeam(team);
                console.log(team)
            });
        }
    }, []);
    console.log(ProblemID)

    useEffect(() => {
        if (team) {
            socket.emit("join", team.teamName);
        }
    }, [team]);

        socket.on("leaderboard", (leaderboard) => {
            setLeaderboard(leaderboard.slice(0, 10));
            console.log(leaderboard)
        });

    const attendanceClass = (attendance) => 
        attendance === "P" ? "text-green-500" : "text-red-500";

    const Navbar = () => (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className=" flex items-center">
            <img src={logo} className=" size-16 rounded-full relative top-1  "/>
                <h1 className="text-white text-2xl font-bold">Coding Blocks KARE</h1></div>
                <div>
                    <a href="#schedule" className="text-white mx-4 hover:text-gray-400">Event Schedule </a>
                    <a href="#leaderboard" className="text-white mx-4 hover:text-gray-400">Leaderboard</a>
                    <a href="#resources" className="text-white mx-4 hover:text-gray-400">Resources</a>
                </div>
            </div>
        </nav>
    );

    if (!localStorage.getItem("token")) {
        return (
            <div className="bg-gray-800 w-full h-screen flex justify-center flex-col items-center font-mono">
                <div className="w-full flex justify-center items-center">
                    <img src={kalasalingam} className="size-20" alt="Kalasalingam Logo" />
                    <img src={cb} className="size-24 relative ml-5 rounded-full" alt="Coding Blocks Logo" />
                </div>
                <p className="text-3xl font-bold text-center text-white">
                    <span className="text-[#E16254]">Coding Blocks Kare</span> Presents
                </p>
                <h1 className="text-5xl mt-2 text-white">Build a Bot</h1>
                <p className="text-xl m-2 text-white">A 24-Hours Hackathon</p><div className="bg-white rounded-lg shadow-lg p-8 w-96 flex flex-col">
                    <h1 className="text-4xl font-semibold text-center mb-6">Team Access Panel</h1>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="flex flex-col mb-6">
                        <label htmlFor="pass" className="text-lg mb-2">Enter Password:</label>
                        <input
                            id="pass"
                            placeholder="Enter passcode"
                            className="border border-gray-400 h-12 px-3 rounded-md"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <p>The Password is on your table</p>
                    </div>
                    <button
                        className="bg-red-500 py-3 rounded-md text-white font-semibold hover:bg-red-600 transition duration-200"
                        onClick={verify}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Submit"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 w-full h-full text-white flex flex-col">
            <Navbar />
            {loading ? (
                <div className=" w-full h-screen flex flex-col justify-center items-center">
                <div><img src={lod} className=" size-48 rounded-full"/></div>
                <p className="text-center text-2xl mt-10 font-bold">Loading...</p></div>
            ) : (
                team ? (
                    <div className="w-full max-w-5xl p-6 mx-auto">
                        <h1 className="text-4xl text-center mb-6 text-white font-bold">Welcome, {team.teamName}!</h1>
                        <hr className="mb-6 border-gray-600" />
                        <div className="flex justify-between items-center mb-8">
                            <div className="border border-gray-700 rounded-lg p-6 w-[70%]">
                                <h2 className="text-2xl font-bold mb-4">Team Leader</h2>
                                <p className="text-lg mb-6">👑 {team.lead.name} ({team.lead.regNumber})</p>
                                <h2 className="text-xl font-bold mb-4">Members</h2>
                                <div className="border border-gray-700 rounded-lg h-40 overflow-y-auto p-4">
                                    {team.members.map((member, index) => (
                                        <p key={index} className="mb-2">{index+1}. {member.name} ({member.regNumber})</p>
                                    ))}
                                </div>
                                <Clock/>
                                <div>
                                    <table className="table-auto rounded-lg border-collapse border mt-4 border-gray-300 w-full text-left">
                                        <thead>
                                            <tr className="bg-[#E16256] text-white font-bold">
                                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                                <th className="border border-gray-300 px-4 py-2">1st Attd</th>
                                                <th className="border border-gray-300 px-4 py-2">2nd Attd</th>
                                                <th className="border border-gray-300 px-4 py-2">3rd Attd</th>
                                                <th className="border border-gray-300 px-4 py-2">4th Attd</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">{team.lead.name}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.FirstAttd)}`}>{team.lead?.FirstAttd}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.SecondAttd)}`}>{team.lead?.SecondAttd}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.ThirdAttd)}`}>{ team.lead?.ThirdAttd}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.FourthAttd)}`}>{ team.lead?.FourthAttd}</td>
                                            </tr>
                                            {team.members.map((member) => (
                                                <tr key={member.id}>
                                                    <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.FirstAttd)}`}>{member?.FirstAttd}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.SecondAttd)}`}>{member.SecondAttd}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.ThirdAttd)}`}>{member.ThirdAttd}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.FourthAttd)}`}>{member.FourthAttd}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-gray-700 rounded-lg flex justify-center items-center w-1/3 h-72 ml-11">
                                <img src={logo} alt="Team Logo" className="max-w-full max-h-full rounded-lg" />
                            </div>
                        </div>
                     
                        <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-4xl text-center font-bold text-[#E16255] mb-4">Assigned Task</h2>
    {ProblemID !== undefined ? (
        <>
            <h1 className="text-3xl font-semibold text-white text-center mb-4">{problems[ProblemID]?.title}</h1>
            <p className="text-2xl text-gray-300 break-words leading-relaxed">{problems[ProblemID]?.description}</p>
        </>
    ) : (
        <p className="text-center text-gray-400 italic">No task assigned yet. Please check back later.</p>
    )}
</div>

                        <div className="mb-6 flex justify-between h-96">
                            <div className="border w-1/2 p-4 h-96">
                                <h1 className="text-3xl text-center">Bot Hunt LeaderBoard</h1>
                                <div className="flex flex-col overflow-y-auto h-80 mt-2">
                                    {leaderboard.map((i, j) => (
                                        <div key={j} className="p-1  mb-1 rounded flex justify-between">
                                            <span className="   text-lg">{j + 1}. {i.teamName}</span>
                                            <span className="  mr-3"> {i.HuntScore}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6 border w-1/2 overflow-y-auto rounded ml-4 h-96">
                                <h2 className="text-3xl text-center font-bold mb-4 mt-4">Event Schedule</h2>
                                <div className="flex flex-col p-4 rounded">
                                    {events.map((item, index) => (
                                        <div key={index} className="flex justify-between border-b border-gray-600 py-2">
                                            <span className="text-lg font-semibold">{item.time}</span>
                                            <span className={` ${item.isDone && " bg-green-400 text-white"} text-lg `}>{item.name} {item.isDone && <span className="text-green-500">✔️</span>}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className=" mt-3">
                        <input placeholder="Your FeedBack Matters!" className=" p-2  rounded bg-gray-600" onChange={(e)=>{setfeedback(e.target.value)}} />
                        <button onClick={sendfeedback} className=" p-2 ml-2 bg-[#E16255] rounded">Submit</button>
                        </div>
                        {/* <div>
                            <h2 className="text-3xl text-center font-bold mb-4">Resources</h2>
                            <p className="text-lg">Please use the provided resources for development.</p>
                        </div> */}
                        {/* <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4">Submit GitHub Repository Link</h2>
                            <p className="text-lg mb-4">Share the repository link containing your progress and final submission.</p>
                            <div className="flex items-center">
                                {localStorage.getItem("link") ? (
                                    <a href={link} className="text-blue-400 underline mr-4">View Submitted Link</a>
                                ) : (
                                    <input
                                        placeholder="Enter GitHub link"
                                        className="border text-black border-gray-700 h-12 px-3 rounded-md mr-4"
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                )}
                                {!localStorage.getItem("link") && (
                                    <button
                                        className="bg-red-500 py-2 px-4 rounded-md text-white font-semibold hover:bg-red-600 transition duration-200"
                                        onClick={() => {
                                            localStorage.setItem("link", link);
                                            setLink(link);
                                            alert("Link submitted!");
                                        }}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div> */}
                    </div>
                ) : (
                    <p className="text-center text-xl mt-10">Failed to load team data. Please try again later.</p>
                )
            )}
            <hr/>
            <p className=" text-center p-4">Made with 💖 By Coding Blocks KARE</p>
        </div>
    );
}

export default TeamPanel;