import React from 'react'
import logo from '../Assests/logo.png'
import { Link } from 'react-router-dom'

export const Forgot = () => {
  return (
   < div className='w-full min-h-[100vh] bg-[#4D28D4] flex ' >
    <div className='lg:w-[50%] w-[100%] mx-[25px] lg:mt-[0px] lg:mx-[0px] mt-[40px] min-h-[100vh] bg-[white] flex flex-col justify-center items-center gap-[35px] py-[20px] lg:rounded-r-[15px] rounded-t-[15px]'>
    <img src={logo} alt="couldn't load image" className='sm:w-[100px] w-[70px]'/>
    <h2 className='sm:text-[26px] text-[22px] font-semibold'>Change Password</h2>
    <form className="flex flex-col gap-[40px] px-[10px] ">
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[140px] sm:text-[18px] text-[12px] ml-[50px] sm:ml-[60px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="email"
                    placeholder="Enter Your Email ID"  
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>New Password </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[140px] sm:text-[18px] text-[12px] ml-[4px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Password"
                    name="Password"
                    placeholder="Enter your Password"
                    required />
        </div>
        
        
        <div className='w-full flex justify-center'>
        <button type="submit" className="py-[2px] sm:w-[100px] w-[70px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
                       Submit
                    </button>
                    </div>
           </form>
   <Link to={"/login"}> <p className='sm:text-[18px] text-[13px] font-medium'>You don't have an account? <span className='text-[#4D28D4] underline-offset-2 underline cursor-pointer'>Sign up</span></p></Link>
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