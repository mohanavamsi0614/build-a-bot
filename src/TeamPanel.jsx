import { useEffect, useState } from "react";
import logo from "/public/cb.png";
import axios from "axios";
import api from "./api";
import { io } from "socket.io-client";
import problems from "./assets/problem"

const socket = io(api);

function TeamPanel() {
    const [pass, setPass] = useState(localStorage.getItem("token") || "");
    const [team, setTeam] = useState(null);
    const [link, setLink] = useState(localStorage.getItem("link") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [ProblemID,setProblemID]=useState()

    const eventSchedule = [
        { time: "20:30", event: "Inauguration Ceremony" },
        { time: "9:45", event: "Prayer" },
        { time: "10:00", event: "Lighting the Lamp" },
        { time: "10:15", event: "Welcome Address: Dr. R. Sundarrajan" },
        { time: "10:25", event: "Felicitation Address: HOD, IT Department" },
        { time: "10:40", event: "Chief Guest Speech" },
        { time: "10:50", event: "Introduction to Resource Person" },
        { time: "11:05", event: "Resource Person 1 (Ibunu Abdul Rahman B)" },
        { time: "11:20", event: "Overview of the Hackathon: By Athitya" },
        { time: "11:30", event: "Resource Person 2 (Justice)" },
        { time: "10:00", event: "Prize Distribution Ceremony" },
        { time: "10:20", event: "Feedback from Resource Persons" },
        { time: "10:30", event: "Vote of Thanks" },
        { time: "10:40", event: "National Anthem" },
        { time: "10:50", event: "Initiatives and Future Plans" },
    ];

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
                setLeaderboard(data.sort((a, b) => b.Score - a.Score).slice(0, 10));
            });
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoading(true);
            axios.get(`${api}/event/students`).then((res) => {
                const data = res.data;
                setLeaderboard(data.sort((a, b) => b.Score - a.Score).slice(0, 10));
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
        attendance === "Present" ? "text-green-500" : "text-red-500";

    const isEventDone = (eventTime) => {
        const [hours, minutes] = eventTime.split(':');
        const eventDate = new Date();
        eventDate.setHours(hours, minutes, 0, 0);
        // console.log(eventDate)
        return eventDate < new Date();
    };

    const Navbar = () => (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Coding Blocks KARE</h1>
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
                <h1 className="text-4xl text-center mb-6 text-white font-bold">Coding Blocks Kare <span className="text-[#E16255]">Build A Bot</span> 24</h1>
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 flex flex-col">
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
                <p className="text-center text-xl mt-10">Loading...</p>
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
                                        <p key={index} className="mb-2"> 🦖 {member.name} ({member.regNumber})</p>
                                    ))}
                                </div>
                                <div>
                                    <table className="table-auto rounded-lg border-collapse border mt-4 border-gray-300 w-full text-left">
                                        <thead>
                                            <tr className="bg-[#E16256] text-white font-bold">
                                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                                <th className="border border-gray-300 px-4 py-2">1st Attd</th>
                                                <th className="border border-gray-300 px-4 py-2">2nd Attd</th>
                                                <th className="border border-gray-300 px-4 py-2">3rd Attd</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">{team.lead.name}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.FirstAttd)}`}>{team.lead?.FirstAttd}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.SecondAttd)}`}>{team.lead?.SecondAttd}</td>
                                                <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(team.lead?.ThirdAttd)}`}>{ team.lead?.ThirdAttd}</td>
                                            </tr>
                                            {team.members.map((member) => (
                                                <tr key={member.id}>
                                                    <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.FirstAttd)}`}>{member?.FirstAttd}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.SecondAttd)}`}>{member.SecondAttd}</td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center ${attendanceClass(member?.ThirdAttd)}`}>{member.ThirdAttd}</td>
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
                     
                        <div className="mb-6">
                            <h2 className="text-3xl text-center font-bold mb-4">Assigned Task</h2>
                            <h1>{problems[(ProblemID)].title}</h1> 
                             <pre className="text-lg  break-words w-96">{problems[(ProblemID)].description}</pre>
                        </div>
                        <div className="mb-6 flex justify-between h-96">
                            <div className="border w-1/2 p-4">
                                <h1 className="text-3xl text-center">LeaderBoard</h1>
                                <div className="flex flex-col overflow-y-auto h-80">
                                    {leaderboard.map((i, j) => (
                                        <div key={j} className="py-1 flex justify-between">
                                            <span>{j + 1}. {i.teamName}</span>
                                            <span>{i.Score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6 border w-1/2 overflow-y-auto rounded ml-4">
                                <h2 className="text-3xl text-center font-bold mb-4">Event Schedule</h2>
                                <div className="flex flex-col p-4 rounded">
                                    {eventSchedule.map((item, index) => (
                                        <div key={index} className="flex justify-between border-b border-gray-600 py-2">
                                            <span className="text-lg font-semibold">{item.time}</span>
                                            <span className="text-lg">{item.event} {isEventDone(item.time) && <span className="text-green-500">✔️</span>}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl text-center font-bold mb-4">Resources</h2>
                            <p className="text-lg">Please use the provided resources for development.</p>
                        </div>
                        <div className="mb-6">
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
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-xl mt-10">Failed to load team data. Please try again later.</p>
                )
            )}
        </div>
    );
}

export default TeamPanel;