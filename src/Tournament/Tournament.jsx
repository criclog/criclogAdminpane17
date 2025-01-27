import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Config } from '../utils/Token';
import axios from "axios";  
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

let initial = {
  name: "",
  location:'',
  Date:'',
  status:'',
  ballType:'',
  category:'',
  livevideo:'',
  Team1:'',
  Team2:'',
  file:null
}

export const Tournament = () => {
  const [formdata, Setform] = useState(initial);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'file') {
      Setform((prevformdata) => ({ ...prevformdata, file: files[0] }));
    } else {
      Setform((prevformdata) => ({ ...prevformdata, [name]: value }));
    }
  };
  const gettournamentById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getidTournament?objectid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        Setform(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

  useEffect(() => {
    if (id) {
      gettournamentById(id);
    }
  }, [id]);


const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

  const formDataToSend = new FormData();
  for (const key in formdata) {
    formDataToSend.append(key, formdata[key]);
  }

  try {
    if (isEdit) {
       await axios.put(`https://criclogbackendtest01.vercel.app/updateTournament?objectid=${formdata._id}`, formDataToSend, Config)
       .then((res) => {toast.success(res.data.message)
        navigate('/tournament');
        
       })
       .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
    } else { await axios.post("https://criclogbackendtest01.vercel.app/postTournament", formDataToSend, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  Setform(initial)

}

const handleclear=()=>{
  setIsEdit(false)
  Setform(initial)
}

  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[60px] gap-[30px] '>
         <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'Edit Tournament Data' : 'TOURNAMENT DATA'}</h2>
         <div className=''>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[50px] justify-center items-center' >
            <div className=' w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[50px] '>   
            <TextField id="name" label="Name" variant="filled" type='text' name='name' value={formdata.name} onChange={handleChange} />
            <TextField id="location" label="Location" variant="filled" type='text' name='location' value={formdata.location} onChange={handleChange} />
            <TextField id="Date" label="Date" variant="filled" type='text' name='Date' value={formdata.Date} onChange={handleChange} />
            <TextField id="status" label="Status" variant="filled" type='text' name='status' value={formdata.status} onChange={handleChange} />
            <TextField id="ballType" label="Ball Type" variant="filled" type='text' name='ballType' value={formdata.ballType} onChange={handleChange} />
            <TextField id="category" label="Category" variant="filled" type='text' name='category' value={formdata.category} onChange={handleChange} />
            <TextField id="livevideo" label="Live video" variant="filled" type='text' name='livevideo' value={formdata.livevideo} onChange={handleChange} />
            <TextField id="Team1" label="Team 1" variant="filled" type='text' name='Team1' value={formdata.Team1} onChange={handleChange} />
            <TextField id="Team2" label="Team 2" variant="filled" type='text' name='Team2' value={formdata.Team2} onChange={handleChange}/>
                   <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">Match image:</label> 
            <input type="file" name='file' onChange={handleChange}  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>

            
            </div> 
            <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/tournament'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>
       
            </form>
        
         </div>
         <Gettournamentdata/>
        </div>
  )
}



export const Gettournamentdata = () => {
  const[tournamentdata,settournamentdata]=useState([])
  const navigate = useNavigate();

  const Fetchtournamentdata=async()=>{
    try {
    await axios.get("https://criclogbackendtest01.vercel.app/getallTournament", Config)
    .then((res)=>settournamentdata(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
     } catch (error) {
          toast.error(error.res.data.message )
        }
      }


useEffect(()=>{
  Fetchtournamentdata();
},[])

const handledelete=async(id)=>{
       
  await axios.delete(`https://criclogbackendtest01.vercel.app/deleteTournament?objectid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      settournamentdata((Prevtournamentdata)=> Prevtournamentdata.filter((tournament)=>tournament._id !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/tournament/${id}`);
};

  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Tournament details</h1>
  <div className='w-full grid md:grid-cols-2 grid-col-1 px-[30px] gap-10 '>
{
                    tournamentdata.map((tournament)=>(
                        <div key={tournament._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>Name: <span className="text-[black]  font-normal">{tournament.name}</span></h1>
                           <div className='flex gap-6'>
                                         <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(tournament._id)} />
                                         <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(tournament._id)} />
                                         </div></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Location: <span className="text-[black]  font-normal">{tournament.location}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Date: <span className="text-[black]  font-normal">{tournament.Date}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Status: <span className="text-[black]  font-normal">{tournament.status}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Ball Type: <span className="text-[black]  font-normal">{tournament.ballType}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>category: <span className="text-[black]  font-normal">{tournament.category}</span></h1></div>
                           <iframe width="250" height="150" src={tournament.livevideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Team 1: <span className="text-[black]  font-normal">{tournament.Team1}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Team 2: <span className="text-[black]  font-normal">{tournament.Team2}</span></h1></div>
                            
                            <img src={`https://criclogbackendtest01.vercel.app/view/${tournament.filename}`} alt="" className='w-[100px] h-[100px] mx-auto' />
                            
                            </div>
))}
</div>
</div>
    </div>
  )
}
