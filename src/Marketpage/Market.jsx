import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import axios from "axios";  
import { toast } from "react-toastify";
import { Config } from '../utils/Token';


let initial = {
  productname: "",
  location: "",
  price: "",
  sellername: "",
  description: "",
  file:null
}



export const Market = () => {
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
            await axios.post("http://localhost:7000/marketData", formDataToSend, Config)
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
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[60px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>MARKET DATA</h2>
     <div className=''>
        <form className='w-full flex flex-col gap-[50px] justify-center items-center' onSubmit={handleSubmit} >
        <div className=' w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[50px] '>   
        <TextField id="Title" label="Title" variant="filled" type='text' name='productname' value={formdata.productname} onChange={handleChange} />
        <TextField id="location" label="Location" variant="filled" type='text' name='location' value={formdata.location} onChange={handleChange} />
        <TextField id="Price" label="Price" variant="filled" type='number' name='price' value={formdata.price} onChange={handleChange}/>
        <TextField id="SellerName" label="Seller Name" variant="filled" type='text' name='sellername' value={formdata.sellername} onChange={handleChange}/>
        <TextField id="Description" label="Description" variant="filled" type='text' name='description' value={formdata.description} onChange={handleChange} />
               <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">Product image:</label> 
        <input type="file" name='file'  onChange={handleChange}  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>
            {Issubmitting ?  "submiting.." : 
                            "submit"}</button></div>
        </form>
    
     </div>
     <Getproduct/>
    </div>

    
  )
}





export const Getproduct = () => {
  const[product,setproduct]=useState([])
  


  const Fetchprogramdata=async()=>{
    await axios.get("http://localhost:7000/getallData", Config)
    .then((res)=>setproduct(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchprogramdata();
},[])




  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Market details</h1>
  <div className='w-full grid md:grid-cols-2 grid-cols-1 px-[30px] gap-10 '>
{
                    product.map((prod)=>(
                        <div key={prod._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{prod.productname}</span></h1></div>
                            <h1 className='font-semibold' >location: <span className="text-[black] font-normal">{prod.location}</span></h1>
                            <h1 className='font-semibold'>Price: <span className="text-[black] font-normal">{prod.price}</span></h1>
                            <h1 className='font-semibold'>Seller Name: <span className="text-[black] font-normal">{prod.sellername}</span></h1>
                            <h1 className='font-semibold'>description: <span className="text-[black] font-normal">{prod.description}</span></h1>
                            <img src={`http://localhost:7000/view/${prod.filename}`} alt="" className='w-[200px] h-[200px] mx-auto' />
                            <h1 className='font-semibold'>posted: <span className="text-[black] font-normal">{prod.createdAt}</span></h1>
                            </div>
))}
</div>
</div>
    </div>
  )
}
