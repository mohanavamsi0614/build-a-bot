import { useState } from 'react';

const Form = () => {
  const [showMembers, setShowMembers] = useState(false);

  const toggleMembers = () => setShowMembers(!showMembers);

  const handlePayment = () => {
    const upiId = "mohanavamsi14@okhdfcbank";
    const amount = "1000";
    const name = "Mohana Vamsi";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
  };

  return (
    <div className="flex-col items-center overflow-visible p-10 justify-center h-full flex w-full bg-[#090D0A]">
      <div className="border rounded-lg h-full p-6 flex flex-col items-center space-y-6 w-full max-w-md container">
        
        <div className="relative p-3 w-[95%]">
          <div className="size-12 animate-bounce rounded-full bg-[#E16254] absolute top-2 left-1 p-4"></div>
          <div className="size-12 animate-bounce rounded-full bg-[#919294] absolute bottom-1 right-1"></div>
          <div className="relative p-6 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-lg border border-white border-opacity-30 w-full text-center">
            <h2 className="text-2xl font-bold text-white">Registration Form</h2>
            <p className="mt-2 text-white font-thin">Build a Bot</p>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="teamName" className="text-white">Team Name:</label>
          <input
            type="text"
            id="teamName"
            placeholder="Enter team name..."
            className="w-full p-3 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadName" className="text-white">Team Lead Name:</label>
          <input
            type="text"
            id="leadName"
            placeholder="Enter team lead name..."
            className="w-full p-3 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadRegNumber" className="text-white mt-3">Registration Number:</label>
          <input
            type="text"
            id="leadRegNumber"
            placeholder="Enter registration number..."
            className="w-full p-3 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadEmail" className="text-white mt-3">Email:</label>
          <input
            type="email"
            id="leadEmail"
            placeholder="Enter email address..."
            className="w-full p-3 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
        </div>


        <div className="w-full">
          <button
            type="button"
            onClick={toggleMembers}
            className="w-full text-white p-3 bg-[#919294] bg-opacity-30 rounded-lg hover:bg-opacity-40 mt-3"
          >
            {showMembers ? 'Hide' : 'Show'} Team Members Details
          </button>
          {showMembers && (
            <div className="mt-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-white">Member {i + 1} Name:</label>
                  <input
                    type="text"
                    placeholder={`Enter member ${i + 1} name...`}
                    className="w-full mt-1  p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-white">Member {i + 1} Registration Number:</label>
                  <input
                    type="text"
                    placeholder={`Enter member ${i + 1} registration number...`}
                    className="w-full mt-1 p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full space-y-4">
          <h3 className="text-xl text-white">Payment</h3>
          <p className=' text-white'> <b>Info:</b> Please scan the QR code below to make a payment of 200 X 5 members 1000 using any UPI app.</p>
          <div className="w-full flex  flex-col justify-center p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-md">
            <img src="path/to/qr-code-placeholder.png" alt="QR Code for Payment" className="w-32 h-32 object-contain" />
          <div onClick={handlePayment} className=' w-20 bg-green-700 h-3 text-white border p-5 flex justify-center items-center cursor-pointer '>Pay</div>
          </div>
          <label htmlFor="transactionScreenshot" className="text-white">Transaction Screenshot:</label>
          <input
            type="file"
            id="transactionScreenshot"
            className="w-full p-3 text-white bg-white bg-opacity-10 rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      
      <button className="w-60 h-20 m-3 border text-white">Submit</button>
    </div>
  );
};

export default Form;
