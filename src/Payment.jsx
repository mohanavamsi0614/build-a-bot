import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "./api"
function Payment() {
    const [upiId,setupi]=useState("")
    const [transtationId,settxn]=useState("")
    const [imgUrl,seturl]=useState("")
    const data=useLocation().state
    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
    async function url(e){
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dus9hgplo/image/upload', {file:e.target.result,upload_preset:"vh0llv8b"});
        console.log('File uploaded successfully:', response.data);
        seturl(response.data.secure_url)
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
    const photo = async (e) => {
      const reader=new FileReader()
      reader.onload =async  function(e) {
          seturl(e)
      }
      reader.readAsDataURL(e.target.files[0]);    
    };
    async function handleSubmit(){
      console.log(data,upiId , transtationId , imgUrl)
        if(upiId!="" && transtationId!="" && imgUrl!=""){
         await url(imgUrl)
          const finaldata={...data,upiId,transtationId,imgUrl}
          console.log(finaldata)
           const response = await axios.post(`${api}/event/register`,finaldata)
           console.log(response)
        }
    }
    const handlePayment = () => {
        const upiId = "mohanavamsi14@okhdfcbank";
        const amount = "1000";
        const name = "Mohana Vamsi";
    
        const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;
    
        window.location.href = upiUrl;
      };
    return(   
        <div className="flex-col items-center overflow-visible p-6 justify-center  h-full flex w-full bg-[#090D0A]">
              <div className=' w-full justify-items-start'>
      <Link to="/registration"><button className="w-40 font-semibold bg-white rounded-full h-11 m-3 border text-black ">&#8592; Back</button></Link></div>

    <div className="w-full max-w-md space-y-4 container p-6 border rounded">
          <h3 className="text-xl text-white">🔒Payment</h3>
          <p className=' text-white'> <b>Info:</b> Please scan the QR code below to make a payment or click on the pay button for: 
          
          </p><div className=" text-white border p-4 rounded">
          <p className=" font-bold text-center">{data.teamName}</p>
          <hr/>
          {<p className=" m-1"><b>Team Lead</b>: {data.lead.name} x 200</p>}
            {
            data.members.map((i,j)=>(
                <p className=" m-1" key={i.name}><b>Member {j+1}: </b>{i.name} x 200</p>
            ))
            }
            <b className=" m-1">Total: <i className=" text-[#E16254] text-lg">₹1000 </i> </b>
            </div>
            <p className=" text-white">
        Total of <b className=" text-[#E16254] text-xl">₹1000 </b>
          
          using any UPI app. And also provide your upi Id and Transaction Number for our refrence.</p>
          <div className="w-full flex  flex-col justify-center p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-md">
          <p className=" text-white">Scan Here To Pay:</p>
            <div className=" w-full  flex justify-center items-center"><div><img src="path/to/qr-code-placeholder.png" alt="QR Code for Payment" className="w-32 h-32 object-contain" /></div></div>
            <div className=" w-full flex justify-between items-center"><hr className=" w-1/2"/> <p className=" text-white font-bold m-2">OR</p> <hr className=" w-1/2"/></div>
          <div onClick={handlePayment} className=' w-auto  bg-[#E16254] h-3 text-white border p-5 flex justify-center items-center cursor-pointer '><p >Click here to Pay</p></div>
          </div>
          <div>

        <label htmlFor="upi" className="text-white">Your Upi id: <span className=" text-red-700">*</span></label>
          <input
            type="text"
            id="upi"
            value={upiId}
            onChange={(e)=>{setupi(e.target.value)}}
            placeholder="Upi Id"
            className="w-full p-3 text-white bg-white m-0 bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="txn" className="text-white">Transaction Number: <span className=" text-red-700">*</span></label>
          <input
            type="text"
            id="txn"
            onChange={(e)=>{settxn(e.target.value)}}
            value={transtationId}
            placeholder="Transation Number"
            className="w-full mb-2 mt-1 p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="transactionScreenshot" className="text-white">Transaction Screenshot: <span className=" text-red-700">*</span></label>
          <input
            type="file"
            onChange={(e)=>{photo(e)}}
            id="transactionScreenshot"
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-40 font-semibold bg-white rounded-full h-14 m-3 border text-black"
        >
          Submit
        </button>        </div>
        )
}
export default  Payment