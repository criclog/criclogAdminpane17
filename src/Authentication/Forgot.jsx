import React, { useState } from 'react'
import logo from '../Assests/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";  
import { toast } from "react-toastify";



let forgotinit={
  email : "",
  password: "", 
}

export const Forgot = () => {
  const [updatedata, Setupdate] = useState(forgotinit);
  const [Issubmitting, Setissumitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target
    Setupdate((prevformdata) => ({ ...prevformdata, [name]: value }))
   
}

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    Setissumitting(true)

    try {
        
            await axios.put(`https://criclogbackendtest01.vercel.app/admin/putadmin`, updatedata)
                .then((res) => {
                    toast.success(res.data.message)

                    Setupdate(forgotinit)   
                    navigate("/")
                })
                .catch((err) => toast.error(err.response.data.message))
                .finally(() => Setissumitting(false))

    }
    catch (error) {
        console.log(error)
    }


    Setupdate(forgotinit)
    
}





  return (
   < div className='w-full min-h-[100vh] bg-[#4D28D4] flex ' >
    <div className='lg:w-[50%] w-[100%] mx-[25px] lg:mt-[0px] lg:mx-[0px] mt-[40px] min-h-[100vh] bg-[white] flex flex-col justify-center items-center gap-[35px] py-[20px] lg:rounded-r-[15px] rounded-t-[15px]'>
    <img src={logo} alt="couldn't load image" className='sm:w-[100px] w-[70px]'/>
    <h2 className='sm:text-[26px] text-[22px] font-semibold'>Change Password</h2>
    <form className="flex flex-col gap-[40px] px-[10px] " onSubmit={handleSubmit}>
        <div>
                <label className='font-semibold md:text-[20px] sm:text-[18px] text-[14px]'>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[140px] sm:text-[18px] text-[12px] ml-[45px] sm:ml-[60px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="email"
                    placeholder="Enter Your Email ID"
                    value={updatedata.email}
                    onChange={handleChange}   
                    required />
        </div>
        <div>
                <label className='font-semibold md:text-[20px] sm:text-[18px] text-[14px]'>New Password </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[140px] sm:text-[18px] text-[12px] ml-[4px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Password"
                    name="password"
                    placeholder="Enter your Password"
                    value={updatedata.password}
                    onChange={handleChange} 
                    required />
        </div>
        
        
        <div className='w-full flex justify-center'>
        <button type="submit" disabled={Issubmitting} className="py-[2px] sm:w-[100px] w-[70px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
        {Issubmitting ? 
                         "Submit..":
                            "Submit"}
                    </button>
                    </div>
           </form>
   <Link to={"/"}> <p className='sm:text-[18px] text-[13px] font-medium'>You don't have an account? <span className='text-[#4D28D4] underline-offset-2 underline cursor-pointer'>Sign up</span></p></Link>
</div>
<div className='lg:w-[50%] w-[0%] min-h-[100vh] flex flex-col justify-center items-center gap-[10px]'>
    <div className='lg:w-[140px] lg:h-[140px] w-[0px] h-[0px] bg-black rounded-full lg:px-5 lg:py-8 lg:border-2 border-[#00FFCF]'>
<img src={logo} alt="couldn't load image" className='lg:w-[120px]  w-[0px]'/>
</div>
<h1 className='lg:text-[34px]  text-[0px] font-semibold text-[#00FFCF]'>CRICLOG</h1>
<p className='lg:text-[32px] text-[0px]  font-medium text-[white] lg:px-[90px] text-center pt-[70px]'>WORLD'S BIGGEST CRICKET NETWORK</p>
</div>
</div>
  )
}
