import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import errorlogo from "/public/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail-removebg-preview.png"
const defaultData = {
  teamName: "",
  lead: {
    name: "",
    regNumber: "",
    email: "",
    type: "",
  },
  members: [ { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
    { name: '', regNumber: '', type: '' },
],
};
const Form = () => {
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  const [error,seterror]=useState("")
  const [teamName, setTeamName] = useState(storedData.teamName || defaultData.teamName);
  const [leadName, setLeadName] = useState(storedData.lead?.name || defaultData.lead.name);
  const [leadRegNumber, setLeadRegNumber] = useState(storedData.lead?.regNumber || defaultData.lead.regNumber);
  const [leadEmail, setLeadEmail] = useState(storedData.lead?.email || defaultData.lead.email);
  const [leadType, setLeadType] = useState(storedData.lead?.type || defaultData.lead.type);
  const [members, setMembers] = useState(storedData.members || defaultData.members);
  useEffect(() => {
    const formData = {
      teamName,
      lead: {
        name: leadName,
        regNumber: leadRegNumber,
        email: leadEmail,
        type: leadType,
      },
      members,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [teamName, leadName, leadRegNumber, leadEmail, leadType, members]);

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
        type:leadType
      },
      members,
    };
    console.log('Collected Form Data:', formData);
    // const leadRegNumberok=formData.lead.regNumber[6]=="8"
    // const membersok=formData.members.every((member)=>{
    //   return member.regNumber[6]=="8"
    // })
    // console.log(leadRegNumberok,membersok)
    
    nav("/payment",{state:formData})
    
   
  };

  return (
    <div className="flex-col items-center overflow-visible  p-6  justify-center h-full  flex w-full bg-[#090D0A]">
      <div className="border rounded-lg h-full p-6 flex flex-col items-center  max-w-lg  space-y-6 w-full container">
        <div className="relative p-3 w-[95%]">
          <div className="size-12 animate-bounce rounded-full bg-[#E16254] absolute top-2 left-1 p-4"></div>
          <div className="size-12 animate-bounce rounded-full bg-[#919294] absolute bottom-1 right-1"></div>
          <div className="relative p-6 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-lg border border-white border-opacity-30 w-full text-center">
            <h2 className="text-2xl font-bold text-white">Registration Form</h2>
            <p className="mt-2 text-white font-thin">Build a Bot</p>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="teamName" className="text-white">Team Name:  <span className=' text-red-700'>*</span></label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadName" className="text-white">Team Lead Name:  <span className=' text-red-700'>*</span></label>
          <input
            type="text"
            id="leadName"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            placeholder="Enter team lead name..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadRegNumber" className="text-white mt-3">Registration Number:  <span className=' text-red-700'>*</span></label>
          <input
            type="text"
            id="leadRegNumber"
            value={leadRegNumber}
            onChange={(e) => setLeadRegNumber(e.target.value)}
            placeholder="Enter registration number..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="leadEmail" className="text-white mt-3">Collage mail:  <span className=' text-red-700'>*</span></label>
          <input
            type="email"
            id="leadEmail"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            placeholder="Enter email address..."
            className="w-full p-3 mb-2 mt-1 text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
                            <label className="text-white">Type:  <span className=' text-red-700'>*</span></label>
                  <select
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value)}
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

        <div className="w-full">

            <div className="mt-4 space-y-4">
              {members.map((member, index) => (
                <div key={index}>
                  <label className="text-white">Member {index + 1} Name:  <span className=' text-red-700'>*</span></label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    placeholder={`Enter member ${index + 1} name...`}
                    className="w-full mt-1 mb-2  p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-white">Member {index + 1} Registration Number: <span className=' text-red-700'>*</span></label>
                  <input
                    type="text"
                    value={member.regNumber}
                    onChange={(e) => handleMemberChange(index, 'regNumber', e.target.value)}
                    placeholder={`Enter member ${index + 1} registration number...`}
                    className="w-full mt-1 mb-2 p-3  text-white shadow-inner bg-white bg-opacity-10 backdrop-blur-md rounded-lg border-none focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-white">Member {index + 1} Type:  <span className=' text-red-700'>*</span></label>
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
      {error && (
        <div className='modal-overlay'>
                <div className='modal-content flex flex-col justify-center items-center'>
                <img src={errorlogo} className=' w-16   animate-pulse'/>
                <p className="font-semibold mb-4">Registration is now open only for <span className='text-[#E16254] font-bold'>IT</span> students as all <span className='text-[#E16254] font-bold'>CSE</span> slots are filled.</p>

                <button className=' p-2 bg-[#E16254] rounded text-white' onClick={()=>{nav("/")}}>Home</button>
                </div>
                </div>
      )}

    </div>
  );
};

export default Form;
