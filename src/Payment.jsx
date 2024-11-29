import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Payment() {
    const [upi,setupi]=useState("")
    const [txn,settxn]=useState("")
    const data=useLocation().state
    console.log(data)
    const handlePayment = () => {
        const upiId = "mohanavamsi14@okhdfcbank";
        const amount = "1000";
        const name = "Mohana Vamsi";
    
        const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;
    
        window.location.href = upiUrl;
      };
    return(   
        <div className="flex-col items-center overflow-visible p-6 justify-center  h-full flex w-full bg-[#090D0A]">
              <div className=' relative right-28'>
      <Link to="/registration"><button className="w-40 font-semibold bg-white rounded-full h-11 m-3 border text-black ">&#8592; Back</button></Link></div>

    <div className="w-full max-w-md space-y-4 container p-6 border rounded">
          <h3 className="text-xl text-white">Payment</h3>
          <p className=' text-white'> <b>Info:</b> Please scan the QR code below to make a payment for: 
          {<p>{data.lead.name} x 200</p>}
            {
            data.members.map((i)=>(
                <p className=" m-1"><b>{i.name}</b> x 200</p>
            ))
            }
            Total of <b>1000 </b>
          
          using any UPI app. And also provide your upi Id and Transaction Number for our refrence</p>
          <div className="w-full flex  flex-col justify-center p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-md">
            <img src="path/to/qr-code-placeholder.png" alt="QR Code for Payment" className="w-32 h-32 object-contain" />
          <div onClick={handlePayment} className=' w-20 bg-green-700 h-3 text-white border p-5 flex justify-center items-center cursor-pointer '>Pay</div>
          </div>
        <label htmlFor="upi" className="text-white">Your Upi id:</label>
          <input
            type="text"
            id="upi"
            value={upi}
            onChange={(e)=>{setupi(e.target.value)}}
            placeholder="Upi ID"
            className="w-full p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="txn" className="text-white">Transaction Number:</label>
          <input
            type="text"
            id="txn"
            onChange={(e)=>{settxn(e.target.value)}}
            value={txn}
            placeholder="Transation Number"
            className="w-full p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="transactionScreenshot" className="text-white">Transaction Screenshot:</label>
          <input
            type="file"
            id="transactionScreenshot"
            className="w-full p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button>Submit</button>
        </div>
        )
}
export default  Payment