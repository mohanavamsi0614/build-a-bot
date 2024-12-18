import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "./api";
import Modal from "./Model";
import done from "/1cbd3594bb5e8d90924a105d4aae924c.gif"
import qr from "/public/WhatsApp Image 2024-10-25 at 22.50.47_5fab87af.jpg"
function Payment() {
  const [upiId, setupi] = useState("");
  const [transtationId, settxn] = useState("");
  const [imgUrl, seturl] = useState("");
  const [e, sete] = useState("");
  const [isDone,setisDone]=useState(false)
  const [link,setlink]=useState("")
  const [isLoading, setIsLoading] = useState(false);
  const data = useLocation().state;
  const wid=useRef()
  useEffect(() => {
    let myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dus9hgplo",
        uploadPreset: "vh0llv8b",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setlink(result.info.secure_url);
        }
      }
    );
    wid.current = myWidget;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function url(e) {
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dus9hgplo/image/upload", {
        file: e,
        upload_preset: "vh0llv8b",
      });
      console.log("File uploaded successfully:", response.data);
      return response.data.secure_url
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    console.log(data, upiId, transtationId, imgUrl);

    if (upiId !== "" && transtationId !== "" && link !== "") {
      const imgurl=link
      const finaldata = { ...data, upiId, transtationId, imgUrl:imgurl };
      console.log(finaldata);

      try {
        const response = await axios.post(`${api}/event/register`, finaldata);
        console.log(response);
        setIsLoading(false);
        setisDone(true)
      } catch (error) {
        console.error("Error during payment submission", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  const handlePayment = () => {
    const upiId = "deepakbussa-1@oksbi";
    const amount = "1000";
    const name = "Deepak Bussa";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
  };

  return (
    <div className="flex-col items-center overflow-visible p-6 justify-center h-full flex w-full bg-[#090D0A]">
      <div className="w-full justify-items-start">
        <Link to="/registration">
          <button className="w-40 font-semibold bg-white rounded-full h-11 m-3 border text-black">
            &#8592; Back
          </button>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-4 container p-6 border rounded">
        <h3 className="text-xl text-white">🔒Payment</h3>
        <p className="text-white">
          <b>Info:</b> Please scan the QR code below to make a payment or click on the pay button for:
        </p>
        <div className="text-white border p-4 rounded">
          <p className="font-bold text-center">{data.teamName}</p>
          <hr />
          <p className="m-1">
            <b>Team Lead</b>: {data.lead.name} x 200
          </p>
          {data.members.map((i, j) => (
            <p className="m-1" key={i.name}>
              <b>Member {j + 1}: </b>
              {i.name} x 200
            </p>
          ))}
          <b className="m-1">
            Total: <i className="text-[#E16254] text-lg">₹1000 </i>
          </b>
        </div>
        <p className="text-white">
          Total of <b className="text-[#E16254] text-xl">₹1000 </b> using any UPI app. And also provide your UPI
          Id and Transaction Number for our reference.
        </p>
        <div className="w-full flex flex-col justify-center p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-md">
          <p className="text-white">Scan Here To Pay:</p>
          <div className="w-full flex justify-center items-center">
            <div>
              <img src={qr} alt="QR Code for Payment" className="w-32 h-32 object-contain" />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <hr className="w-1/2" /> <p className="text-white font-bold m-2">OR</p> <hr className="w-1/2" />
          </div>
          <div onClick={handlePayment} className="w-auto bg-[#E16254] h-3 text-white border p-5 flex justify-center items-center cursor-pointer">
            <p>Click here to Pay</p>
          </div>
        </div>

        <div>
          <label htmlFor="upi" className="text-white">
            Your UPI id: <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="upi"
            value={upiId}
            onChange={(e) => {
              setupi(e.target.value);
            }}
            placeholder="UPI Id"
            className="w-full p-3 text-white bg-white m-0 bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="txn" className="text-white">
            Transaction Number: <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="txn"
            onChange={(e) => {
              settxn(e.target.value);
            }}
            value={transtationId}
            placeholder="Transaction Number"
            className="w-full mb-2 mt-1 p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="transactionScreenshot" className="text-white">
            Transaction Screenshot: <span className="text-red-700">*</span>
          </label>
         <div className=" flex justify-center"><button onClick={()=>{wid.current.open()}} className="  w-72 h-12 rounded-lg bg-[#E16254] text-white">Upload Your Screenshot</button></div>
        </div>
      </div>

      <button onClick={handleSubmit} className="w-40  font-semibold bg-white rounded-full h-14 m-3 border text-black">
        Submit
      </button>
      {(isLoading || isDone) && (
        <Modal isLoading={isLoading}>
        <div className="modal-content">
        <img src={done}/>
          <p className=" text-xl font-bold">Registration successfully!</p>
          <p className=" font-mono w-full">Please have a look in your inbox we will be sending you the conformation mail. Thank you!</p>
          <Link to="/"><button className=" bg-[#E16254] w-24 p-4 text-white rounded mt-5">Home</button></Link>
        </div>
      </Modal>)}
      
    </div>
  );
}

export default Payment;
