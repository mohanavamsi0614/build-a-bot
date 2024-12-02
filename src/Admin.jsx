import axios from "axios"
import { useEffect, useState } from "react"
import api from "./api"
function Admin(){
    const [data,setdata]=useState(["jhbehjw"])
    useEffect(()=>{
        const data=async ()=>{
        const data=await axios.get(`${api}/event/students`)
        setdata(data.data)
    }
    data()

},[])
async function send(id){
    const verifi=await axios.get(`${api}/event/team/${id}`)
    console.log(verifi.data)
    alert("verified")
}
    return(
<div className=" w-full h-full bg-gray-700">
{data && data.map((i,j)=>(

    <details key={j}>
    <summary className=" text-white">{i.teamName}</summary>
    <div>
        <img src={i.imgUrl}/>
        <h1 className=" text-white">Upi ID: {i.upiId}</h1>
        <h1 className=" text-white">transtationId: {i.transtationId}</h1>
        <button onClick={()=>{send(i._id)}}>Verify</button>
    </div>
    </details>
)
    
)}
</div>
    )
}
export default Admin