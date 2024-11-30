import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Form = () => {
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadRegNumber, setLeadRegNumber] = useState('');
  const [leadEmail, setLeadEmail] = useState('');

  const [members, setMembers] = useState([
    { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
  ]);

  const [showMembers, setShowMembers] = useState(false);

  const toggleMembers = () => setShowMembers(!showMembers);

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };
  const nav=useNavigate()

  const validateForm = () => {
    if (!teamName.trim()) return "Team Name is required.";
    if (!leadName.trim()) return "Team Lead Name is required.";
    if (!leadRegNumber.trim()) return "Team Lead Registration Number is required.";
    if (!leadEmail.trim() || !/\S+@\S+\.\S+/.test(leadEmail)) return "A valid Team Lead Email is required.";

    for (let i = 0; i < members.length; i++) {
      const { name, regNumber, type } = members[i];
      if (!name.trim()) return `Member ${i + 1} Name is required.`;
      if (!regNumber.trim()) return `Member ${i + 1} Registration Number is required.`;
      if (!type.trim()) return `Member ${i + 1} Type is required.`;
    }

    return null; 
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }
    const formData = {
      teamName,
      lead: {
        name: leadName,
        regNumber: leadRegNumber,
        email: leadEmail,
      },
      members,
    };
    console.log('Collected Form Data:', formData);
    nav("/payment",{state:formData})
  };

  return (
    <div className="flex-col items-center overflow-visible  p-6  justify-center h-full  flex w-full bg-[#090D0A]">
      <div className="border rounded-lg h-full p-6 flex flex-col items-center max-w-md  space-y-6 w-full container">
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
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadName" className="text-white">Team Lead Name:</label>
          <input
            type="text"
            id="leadName"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            placeholder="Enter team lead name..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadRegNumber" className="text-white mt-3">Registration Number:</label>
          <input
            type="text"
            id="leadRegNumber"
            value={leadRegNumber}
            onChange={(e) => setLeadRegNumber(e.target.value)}
            placeholder="Enter registration number..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadEmail" className="text-white mt-3">Email:</label>
          <input
            type="email"
            id="leadEmail"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            placeholder="Enter email address..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
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
              {members.map((member, index) => (
                <div key={index}>
                  <label className="text-white">Member {index + 1} Name:</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    placeholder={`Enter member ${index + 1} name...`}
                    className="w-full mt-1 mb-2  p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-white">Member {index + 1} Registration Number:</label>
                  <input
                    type="text"
                    value={member.regNumber}
                    onChange={(e) => handleMemberChange(index, 'regNumber', e.target.value)}
                    placeholder={`Enter member ${index + 1} registration number...`}
                    className="w-full mt-1 mb-2 p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-white">Member {index + 1} Type:</label>
                  <select
                    value={member.type}
                    onChange={(e) => handleMemberChange(index, 'type', e.target.value)}
                    className="w-full mt-1 mb-2 p-3 scroll-m-1  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option className=' bg-black text-white' value="">Select Type</option>
                    <option className=' bg-black text-white' value="Day's Scholar">Day's Scholar</option>
                    <option className=' bg-black text-white' value="Mh-1">Mh-1</option>
                    <option className=' bg-black text-white' value="Mh-2">Mh-2</option>
                    <option className=' bg-black text-white' value="Mh-3">Mh-3</option>
                    <option className=' bg-black text-white' value="Mh-4">Mh-4</option>
                    <option className=' bg-black text-white' value="Mh-5">Mh-5</option>
                    <option className=' bg-black text-white' value="Mh-6">Mh-6</option>
                    <option className=' bg-black text-white' value="Mh-7">Mh-7</option>
                    <option className=' bg-black text-white' value="Lh-1">Lh-1</option>
                    <option className=' bg-black text-white' value="Lh-2">Lh-2</option>
                    <option className=' bg-black text-white' value="Lh-3">Lh-3</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end m-3 items-center h-auto">
        <button
          onClick={handleSubmit}
          className="w-40 font-semibold bg-white rounded-full h-14 m-3 border text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form;
