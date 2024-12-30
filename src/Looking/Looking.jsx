import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import axios from "axios";  
import { toast } from "react-toastify";
import { Config } from '../utils/Token';

let initial = {
  Description: "",
  category:'',
  file:null
}

export const Looking = () => {
  const [formdata, Setform] = useState(initial);
  const [Issubmitting, Setissumitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'file') {
      Setform((prevformdata) => ({ ...prevformdata, file: files[0] }));
    } else {
      Setform((prevformdata) => ({ ...prevformdata, [name]: value }));
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

  const formDataToSend = new FormData();
  for (const key in formdata) {
    formDataToSend.append(key, formdata[key]);
  }

  try {
          await axios.post("http://localhost:7000/postlooking", formDataToSend, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }
  
  catch (error) {
      console.log(error)
  }


  Setform(initial)

}


  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[90px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>LOOKING</h2>
       <form onSubmit={handleSubmit} className='flex flex-col gap-7 '>
        <div className=' w-[80%] flex flex-col  justify-center gap-[30px] ml-[20px] '>
        <TextField id="Description" name='Description' label="Description" variant="filled"  type='text' value={formdata.Description} onChange={handleChange}/>
        <TextField id="category" name='category' label="category" variant="filled"  type='text' value={formdata.category} onChange={handleChange}/>
       <h1 className='w-full flex flex-col gap-2 text-[15px] font-semibold text-[#4D28D4]'> <label htmlFor="">Image:</label>
        <input type="file" name='file' onChange={handleChange} className='' /></h1> 
        </div>
        <div className='w-full flex justify-center'>
        <button className='w-[80px] py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>
        {Issubmitting ?  "submiting.." : 
                            "submit"}
          </button>
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
  


  const Fetchlookingdata=async()=>{
    await axios.get("http://localhost:7000/getlooking", Config)
    .then((res)=>setlookingdata(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchlookingdata();
},[])




  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Looking details</h1>
  <div className='w-full grid md:grid-cols-3 sm:grid-cols-2 grid-col-1 px-[30px] gap-10 '>
{
                    lookingdata.map((look)=>(
                        <div key={look._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{look.Description}</span></h1></div>
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>category: <span className="text-[black]  font-normal">{look.category}</span></h1></div>
                            
                            <img src={`http://localhost:7000/view/${look.filename}`} alt="" className='w-[200px] h-[200px] mx-auto' />
                            <h1 className='font-semibold'>posted: <span className="text-[black] font-normal">{look.createdAt}</span></h1>
                            </div>
))}
</div>
</div>
    </div>
  )
}