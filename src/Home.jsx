import { useNavigate } from "react-router";
import "./App.css";
import kalasalingam from "/kalasalingam.png";
import cb from "/cb.png";

function Home() {
    const nav = useNavigate();
    return (
        <div className="home h-full w-screen bg-black text-white">
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-center items-center">
                    <img src={kalasalingam} className="size-20" alt="Kalasalingam Logo" />
                    <img src={cb} className="size-32 relative top-3" alt="Coding Blocks Logo" />
                </div>
                <p className="text-3xl font-bold text-center">
                    <span className="text-[#E16254]">Coding Blocks Kare</span> Presents
                </p>
                <h1 className="text-5xl mt-2">Build a Bot</h1>
                <p className="text-xl mt-2">A 24-Hours Hackathon</p>

                <div className="mt-4 text-center flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center mb-2 space-x-2">
                        
                        <div className="text-lg">
                            <span className="font-bold">Date & Time:</span>
                            <p>27-12-2024, 10:00 AM <span className=" text-[#E16254] font-bold">To</span> 28-12-2024, 10:00 AM</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-4 space-x-2">
                        
                        <div className="text-lg">
                            <span className="font-bold">Location:</span>
                            <p>Kalasalingam University</p>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="bg-white text-black p-3 rounded-full mt-5 hover:bg-gray-200" onClick={() => { nav("/registration") }}>
                        Register Now!
                    </button>
                </div>
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center p-10 pt-2">
                <div className="max-w-md flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold">What</h1>
                    <h2 className="text-2xl mt-2">Is Build A Bot</h2>
                    <p className="m-3 text-center">
                        This intensive, high-energy competition challenges teams of participants to design, develop, and deploy innovative bots within a 24-hour timeframe.
                    </p>
                </div>

                <div className="w-96 flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold">Why</h1>
                    <h2 className="text-2xl mt-2">Should You Join?</h2>
                    <ul className=" m-3">
                        <li className="mt-2"><span className=" font-bold">1. </span> Enhance your problem-solving and technical skills.</li>
                        <li className="mt-2"><span className=" font-bold">2. </span>Network with like-minded peers and industry professionals.</li>
                        <li className="mt-2"><span className=" font-bold">3.  </span>Showcase your creativity and innovation in robotics.</li>
                        <li className="mt-2"><span className=" font-bold">4. </span>Compete for exciting prizes and recognition.</li>
                        <li className="mt-2"><span className=" font-bold">5. </span>Have an unforgettable experience full of learning and fun!</li>
                    </ul>
                </div>

                <div className="w-96 flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold">Who</h1>
                    <h2 className="text-2xl mt-2">Are We</h2>
                    <p className="text-center m-3">
                        <b className="text-[#E16254]">The Coding Blocks KARE Student Chapter</b>, proudly affiliated with Coding Blocks, is a vibrant community of tech enthusiasts and future innovators at Kalasalingam Academy of Research and Education. We organize workshops, coding competitions, hackathons, and other amazing events. Join us to push the boundaries of technology!
                    </p>
                </div>

                <div className="w-96 flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold">Process</h1>
                    <h2 className="text-2xl mt-2">Of Registration</h2>
                    <p className="text-center m-3">
                        The <b className="text-[#E16254] ">Build-a-Bot Hackathon</b> is open to all engineering students, regardless of their year or branch. Each team must have a <b className="text-[#E16254]">minimum of 5 members</b>. The registration fee is <b className="text-[#E16254]">₹1,000 per team</b>, which amounts to <b className="text-[#E16254]">₹200 per person</b> for a team of 5 members. This fee is required to complete the registration process.
                    </p>
                </div>

                <div className="w-96 flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold">Where</h1>
                    <h2 className="text-2xl mt-2">Is this happening?</h2>
                    <p className="text-left m-3">
                        Build A Bot is happening at the prestigious <b className="text-[#E16254]">Kalasalingam University</b> in Krishnankoil, Tamil Nadu.
                    </p>
                </div>

                <div className="prizes-section p-5 text-center">
                    <h1 className="text-3xl font-bold mb-5">Prizes</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="prize-card border text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-xl font-semibold">Grand Prize</h2>
                            <p className="mt-2">₹7,000</p>
                        </div>

                        <div className="prize-card border text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-xl font-semibold">Second Prize</h2>
                            <p className="mt-2">₹5,000</p>
                        </div>

                        <div className="prize-card border text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-xl font-semibold">Third Prize</h2>
                            <p className="mt-2">₹3,000</p>
                        </div>

                        <div className="prize-card border text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-xl font-semibold">Exclusive Swags</h2>
                            <p className="mt-2">Goodies from Coding Blocks</p>
                        </div>
                    </div>
                </div>

                <div className="w-96 flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl font-bold m-5">Register Now!</h1>
                    <p className="m-5">
                        Ready for the big event? Make sure to fill in the details carefully and pay the registration fee to complete the process. Once registered, you will receive a confirmation email with further instructions. We can't wait to see your project!
                    </p>
                    <p className="m-5">
                        <b className="text-[#E16254]">NOTE:</b> Please ensure the details provided are correct, as they will be used for further communication. The details will also be verified during the offline presentation. Use your college email address if available.
                    </p>
                    <div>
                        <button className="bg-white text-black p-3 rounded-full mt-5 hover:bg-gray-200" onClick={() => { nav("/registration") }}>
                            Register Now!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
