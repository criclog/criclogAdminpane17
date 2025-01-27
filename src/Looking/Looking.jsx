import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import axios from "axios";  
import { toast } from "react-toastify";
import { Config } from '../utils/Token';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link, useNavigate, useParams } from 'react-router-dom';

let initial = {
  Description: "",
  category:'',
  file:null
}

export const Looking = () => {
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


  const getlookingById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getlookingbyid?objectid=${id}`, Config)
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
      getlookingById(id);
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
       await axios.put(`https://criclogbackendtest01.vercel.app/updatelooking?objectid=${formdata._id}`, formDataToSend, Config)
       .then((res) => {toast.success(res.data.message)
        navigate('/looking');
        
       })
       .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
    } else { await axios.post("https://criclogbackendtest01.vercel.app/postlooking", formDataToSend, Config)
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
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[90px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'Edit Data' : 'Looking Data'}</h2>
       <form onSubmit={handleSubmit} className='flex flex-col gap-7 '>
        <div className=' w-[80%] flex flex-col  justify-center gap-[30px] ml-[20px] '>
        <TextField id="Description" name='Description' label="Description" variant="filled"  type='text' value={formdata.Description} onChange={handleChange}/>
        <TextField id="category" name='category' label="category" variant="filled"  type='text' value={formdata.category} onChange={handleChange}/>
       <h1 className='w-full flex flex-col gap-2 text-[15px] font-semibold text-[#4D28D4]'> <label htmlFor="">Image:</label>
        <input type="file" name='file' onChange={handleChange} className='' /></h1> 
        </div>
        <div className='w-full flex justify-center'>
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/looking'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>
            </div>
       </form>

<div>
       <Getlookdata/>
       </div>
    </div>
  )
}

export const Getlookdata = () => {
  const[lookingdata,setlookingdata]=useState([])
  const navigate = useNavigate();

  const Fetchlookingdata=async()=>{
    try {
    await axios.get("https://criclogbackendtest01.vercel.app/getlooking", Config)
    .then((res)=>setlookingdata(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
     } catch (error) {
          toast.error(error.res.data.message )
        }
      }


useEffect(()=>{
  Fetchlookingdata();
},[])

const handledelete=async(id)=>{
       
  await axios.delete(`https://criclogbackendtest01.vercel.app/deletelooking?objectid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setlookingdata((Prevlookingdata)=> Prevlookingdata.filter((looking)=>looking._id !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/looking/${id}`);
};

  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Looking details</h1>
  <div className='w-full grid md:grid-cols-3 sm:grid-cols-2 grid-col-1 px-[30px] gap-10 '>
{
                    lookingdata.map((look)=>(
                        <div key={look._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{look.Description}</span></h1>
                           <div className='flex gap-6'>
                                         <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(look._id)} />
                                         <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(look._id)} />
                                         </div></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>category: <span className="text-[black]  font-normal">{look.category}</span></h1></div>
                            
                            <img src={`https://criclogbackendtest01.vercel.app/view/${look.filename}`} alt="" className='w-[200px] h-[200px] mx-auto' />
                            <h1 className='font-semibold'>posted: <span className="text-[black] font-normal">{look.createdAt}</span></h1>
                            </div>
))}
</div>
</div>
    </div>
  )
}