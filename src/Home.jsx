import { useNavigate } from "react-router";
import "./App.css";
import kalasalingam from "/public/kalasalingam.png";
import cb from "/public/cb.png"
function Home() {
    const nav=useNavigate()
  return (
    <div className="home h-full w-screen bg-black text-white">
      <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className=" w-full flex justify-center items-center">
        <img src={kalasalingam} className=" size-20"/>
        <img src={cb} className="  size-32 relative top-3"/>
      </div>
        <p className="text-3xl font-bold">
          <span className="text-[#E16254]">Coding Blocks Kare</span> Presents
        </p>
        <h1 className="text-5xl mt-2">Build a Bot</h1>
        <p className="text-xl mt-2">An Amazing Hackathon</p>

        <div className="mt-4">
          <div className="flex justify-evenly items-center mb-2">
            <div className="icon" aria-label="Event Time">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.5 7.25a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25Z"></path>
                <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path>
              </svg>
            </div>
            <div className="text-2xl ml-1">Date & Time: [To Be Announced]</div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="icon" aria-label="Event Location">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Location_On">
                  <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
                  <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
                </g>
              </svg>
            </div>
            <div className="text-2xl ml-1">Kalasalingam University</div>
          </div>
        </div>

        <div>
          <button className="bg-white text-black p-3 rounded-full mt-5" onClick={()=>{nav("/registration")}}>
            Register Now!
          </button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center p-10 pt-2">
        <div className=" max-w-md flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl font-bold">What</h1>
          <h2 className="text-2xl mt-2">Is Build A Bot</h2>
          <p className=" m-3 ">
            This intensive, high-energy competition challenges teams of
            participants to design, develop, and deploy innovative bots within a
            24-hour timeframe.
          </p>
        </div>

        <div className=" w-96 flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl font-bold">Why</h1>
          <h2 className="text-2xl mt-2">Should You Join?</h2>
          <p className=" text-left m-3">
            By participating in <b className="text-[#E16254]">Build-a-Bot</b>,
            you’ll:
          </p>
          <ul className="list-disc m-3 text-left">
            <li>Enhance your problem-solving and technical skills.</li>
            <li>Network with like-minded peers and industry professionals.</li>
            <li>Showcase your creativity and innovation in robotics.</li>
            <li>Compete for exciting prizes and recognition.</li>
            <li>Have an unforgettable experience full of learning and fun!</li>
          </ul>
        </div>

        <div className="w-96 flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl font-bold">Who</h1>
          <h2 className="text-2xl mt-2">Are We</h2>
          <p className="text-left m-3 ml-6">
            <b className=" text-[#E16254]">The Coding Blocks KARE Student Chapter</b>, proudly affiliated with
            Coding Blocks, is a vibrant community of tech enthusiasts and future
            innovators at Kalasalingam Academy of Research and Education. We
            organize workshops, coding competitions, hackathons, and other
            amazing events. Join us to push the boundaries of technology!
          </p>
        </div>

        <div className=" w-96 flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl font-bold">Process</h1>
          <h2 className="text-2xl mt-2">Of Registration</h2>
          <p className="text-left m-3 ml-6">
            The <b className="text-[#E16254]">Build-a-Bot Hackathon</b> is open
            to all engineering students, regardless of their year or branch.
            Each team must consist of a{" "}
            <b className="text-[#E16254]">minimum of 5 members</b>, with a
            registration fee of <b className="text-[#E16254]">₹1,000</b> per
            team required to complete the registration process.
          </p>
        </div>
        <div className=" w-96 flex flex-col justify-center items-center mb-10">
        <h1 className="text-3xl font-bold">Where</h1>
          <h2 className="text-2xl mt-2">Is this happening</h2>
          <p className=" text-left m-3 ml-6">
          Build A bot is happening in the prestigious <b className=" text-[#E16254]">Kalasalingam University</b> in Krishnankoil, Tamil Nadu.
          </p>
        </div>
        <div className="prizes-section p-5 text-center  ">
  <h1 className="text-3xl font-bold mb-5">Prizes</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Prize 1 */}
    <div className="prize-card border  text-white rounded-lg p-5 shadow-lg">
      <h2 className="text-xl font-semibold">Grand Prize</h2>
      <p className="mt-2">₹10,000</p>
    </div>

    {/* Prize 2 */}
    <div className="prize-card border  text-white rounded-lg p-5 shadow-lg">
      <h2 className="text-xl font-semibold">Second Prize</h2>
      <p className="mt-2">₹7,000</p>
    </div>

    {/* Prize 3 */}
    <div className="prize-card border  text-white rounded-lg p-5 shadow-lg">
      <h2 className="text-xl font-semibold">Third Prize</h2>
      <p className="mt-2">₹5,000</p>
    </div>

    {/* Swags */}
    <div className="prize-card border  text-white rounded-lg p-5 shadow-lg">
      <h2 className="text-xl font-semibold">Exclusive Swags</h2>
      <p className="mt-2">Goodies from Coding Blocks</p>
    </div>
  </div>
</div>
<div className=" w-96 flex flex-col justify-center items-center mb-10">
<h1 className="text-3xl font-bold m-5">Register Now !</h1>
<p className=" m-5 ml-6">Ready for the big event? Make sure to fill the details carefully and pay the registration fee to complete the registration process. Once you have registered, you will receive a confirmation email with further instructions. We can't wait to see your project!
</p><p className=" m5-5 ml-6"><b className=" text-[#E16254]"> NOTE:</b> Please ensure the filled details are correct as they will be used for further communication. The details will also be verified at the time of the offline presentation. Use your college email address if available.
</p>
            <div>
          <button className="bg-white text-black p-3 rounded-full mt-5" onClick={()=>{nav("/registration")}}>
            Register Now!
          </button>
        </div>
</div>

      </div>
    </div>
  );
}

export default Home;
